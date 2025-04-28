import { type Locator, type Page } from '@playwright/test';

export class BuggyCarsMainPage {
  readonly page: Page;
  private loginButton: Locator;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private registerButton: Locator;
  private popularMakesCard: Locator;
  private popularModelCard: Locator;
  private overallRatingCard: Locator;
  private greetingMessage: Locator;
  private profileButton: Locator;
  private logoutButton: Locator;
  private popularMakesVotes: number;
  private popularModelVotes: number;

  constructor(page: Page) {
    this.page = page;
  }

  async initialize(): Promise<void> {
    await this.page.waitForSelector('xpath=.//h2[text()="Popular Make"]/parent::div[@class="card"]');
    this.loginButton = this.page.locator('button[type=submit]');
    this.usernameInput = this.page.locator('[name=login]');
    this.passwordInput = this.page.locator('[name=password]');
    this.registerButton = this.page.locator('a[href="/register"]');
    this.popularMakesCard = this.page.locator('xpath=.//h2[text()="Popular Make"]/parent::div[@class="card"]');
    this.popularModelCard = this.page.locator('xpath=.//h2[text()="Popular Model"]/parent::div[@class="card"]');
    this.overallRatingCard = this.page.locator('xpath=//h2[text()="Overall Rating"]/parent::div[@class="card"]');
    this.greetingMessage = this.page.locator('xpath=.//span[contains(text(),"Hi, ")]');
    this.profileButton = this.page.locator('a[href="/profile"]');
    this.logoutButton = this.page.locator('xpath=.//a[text()="Logout"]');
    await this.setPopularMakesVotes();
    await this.setPopularModelsVotes();

  }

  async setPopularMakesVotes(): Promise<void> {
    const votesText = await this.popularMakesCard.locator('small').textContent();
    const votes = votesText?.match(/\d+/g);
    if (votes && votes.length > 0) {
      this.popularMakesVotes = parseInt(votes[0], 10);
    } else {
      this.popularMakesVotes = 0;
    }
  }

  async setPopularModelsVotes(): Promise<void> {
    const votesText = await this.popularModelCard.locator('small').textContent();
    const votes = votesText?.match(/\d+/g);
    if (votes && votes.length > 0) {
      this.popularModelVotes = parseInt(votes[0], 10);
    } else {
      this.popularModelVotes = 0;
    }
  }

  getPopularMakesVotes(): number {
    return this.popularMakesVotes;
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickRegisterButton() {
    await this.registerButton.click();
  }

  async goToPopularMakesPage() {
    await this.popularMakesCard.locator('a').click();
  }

  async goToPopularModelPage() {
    await this.popularModelCard.locator('a').click();
  }

  async goToOverallRatingPage() {
    const card = await this.overallRatingCard.count();
    await this.overallRatingCard.locator('a').click();
  }

  async clickProfileButton() {
    await this.profileButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async isUsernameInputVisible(): Promise<boolean> {
    return await this.usernameInput.isVisible();
  }

  async isPasswordInputVisible(): Promise<boolean> {
    return await this.passwordInput.isVisible();
  }

  async isLoginbuttonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  async isRegisterButtonVisible(): Promise<boolean> {
    return await this.registerButton.isVisible();
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }

  async getGreetingMessage(): Promise<string> {
    const message = await this.greetingMessage.textContent();
    return message ? message.trim() : '';
  }

}