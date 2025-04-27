import { expect, type Locator, type Page } from '@playwright/test';

export class BuggyCarsRegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[id="username"]');
    this.firstNameInput = page.locator('[id="firstName"]');
    this.lastNameInput = page.locator('[id="lastName"]');
    this.passwordInput = page.locator('[id="password"]');
    this.confirmPasswordInput = page.locator('[id="confirmPassword"]');
    this.registerButton = page.locator('[type="submit"]');
    this.cancelButton = page.locator('a["href="/"]');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}