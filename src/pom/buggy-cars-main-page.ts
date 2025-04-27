import { type Locator, type Page } from '@playwright/test';

export class BuggyCarsMainPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly popularMakesCard: Locator;
  readonly popularModelCard: Locator;
  readonly overallRatingCard: Locator;
  readonly greetingMessage: Locator;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator('button[type=submit]');
    this.usernameInput = page.locator('[name=login]');
    this.passwordInput = page.locator('[name=password]');
    this.registerButton = page.locator('a[href="/register"]');
    this.popularMakesCard = page.locator('xpath=.//h2[text()="Popular Make"]/parent::div[@class="card"]');
    this.popularModelCard = page.locator('xpath=.//h2[text()="Popular Model"]/parent::div[@class="card"]');
    this.overallRatingCard = page.locator('xpath=.//h2[text()="Overall Rating"]/parent::div[@class="card"]');
    this.greetingMessage = page.locator('xpath=.//span[contains(text(),"Hi, ")]');
    this.profileButton = page.locator('a[href="/profile"]');
    this.logoutButton = page.locator('xpath=.//a[text()="Logout"]');
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
    await this.overallRatingCard.locator('a').click();
  }

  async clickProfileButton() {
    await this.profileButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}