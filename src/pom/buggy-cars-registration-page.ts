import { expect, type Locator, type Page } from '@playwright/test';

export class BuggyCarsRegistrationPage {
  readonly page: Page;
  private usernameInput: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private registerButton: Locator;
  private cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async initialize(): Promise<void> {
    await this.page.waitForSelector('div[class="form-group"] input[id="username"]');
    this.usernameInput = this.page.locator('div[class="form-group"] input[id="username"]');
    this.firstNameInput = this.page.locator('[id="firstName"]');
    this.lastNameInput = this.page.locator('[id="lastName"]');
    this.passwordInput = this.page.locator('[id="password"]');
    this.confirmPasswordInput = this.page.locator('[id="confirmPassword"]');
    this.registerButton = this.page.locator('button[class="btn btn-default"]');
    this.cancelButton = this.page.locator('a["href="/"]');

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
    await this.registerButton.waitFor({ state: 'visible' });
    if (!(await this.registerButton.isEnabled())) {
      throw new Error('Register button is not clickable');
    }
    await this.registerButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async fullRegistration(username: string, firstName: string, lastName: string, password: string, confirmPassword: string) {
    await this.fillUsername(username);
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPassword(password);
    await this.fillConfirmPassword(confirmPassword);
    await this.clickRegister();
  }

  async waitForSuccessfullMessage(timeout: number = 30000) {
    const successfullMessageLocator = this.page.locator('xpath=.//div[@class="result alert alert-success"]');
    await expect(successfullMessageLocator).toBeVisible( {timeout} );
    await expect(successfullMessageLocator).toHaveText('Registration is successful', {timeout});
  }

  async getErrorMessage(timeout: number = 20000): Promise<string | null> {
    await this.page.waitForSelector('xpath=.//div[@class="result alert alert-danger"]', {timeout});
    const errorMessageLocator = this.page.locator('xpath=.//div[@class="result alert alert-danger"]');
    return await errorMessageLocator.textContent();
  }

  async checkErrorMessage(errorMessage: string) {
    const errorMessageLocator = this.page.locator('');
    await expect(errorMessageLocator).toHaveText(errorMessage);
  }
}