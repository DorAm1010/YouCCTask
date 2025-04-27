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

  constructor(page: Page) {
    this.page = page;
  }

  async initialize(): Promise<void> {
    this.page.waitForSelector('xpath=.//h2[text()="Popular Make"]/parent::div[@class="card"]');
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
}