import { type Locator, type Page } from '@playwright/test';

export class BuggyCarsProfilePage {
    readonly page: Page;
    private usernameInput: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private genderDropdown: Locator;
    private ageInput: Locator;
    private addressInput: Locator;
    private phoneInput: Locator;
    private hobbyInput: Locator;
    private currentPasswordInput: Locator;  
    private newPasswordInput: Locator;
    private confirmNewPasswordInput: Locator;
    private saveButton: Locator;
    private cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async initialize() {
        await this.page.waitForSelector('[id="username"]');
        this.usernameInput = this.page.locator('[id="username"]');
        this.firstNameInput = this.page.locator('[id="firstName"]');
        this.lastNameInput = this.page.locator('[id="lastName"]');
        this.genderDropdown = this.page.locator('');
        this.ageInput = this.page.locator('[id="age"]');
        this.addressInput = this.page.locator('[id="address"]');
        this.phoneInput = this.page.locator('[id="phone"]');
        this.hobbyInput = this.page.locator('[id="hobby"]');
        this.currentPasswordInput = this.page.locator('[id="currentPassword"]');
        this.newPasswordInput = this.page.locator('[id="newPassword"]');
        this.confirmNewPasswordInput = this.page.locator('[id="newPasswordConfirmation"]');
        this.saveButton = this.page.locator('button[type="submit"]');
        this.cancelButton = this.page.locator('a[href="/"]');

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

    async fillGender(gender: string) {
        await this.genderDropdown.fill(gender);
    }

    async fillAge(age: string) {
        await this.ageInput.fill(age);
    }

    async fillPhone(phone: string) {
        await this.phoneInput.fill(phone);
    }

    async fillHobby(hobby: string) {
        await this.hobbyInput.fill(hobby);
    }

    async fillCurrentPassword(currentPassword: string) {
        await this.currentPasswordInput.fill(currentPassword);
    }

    async fillNewPassword(password: string) {
        await this.newPasswordInput.fill(password);
    }

    async fillAddress(address: string) {
        await this.addressInput.fill(address);
    }

    async fillConfirmNewPassword(confirmPassword: string) {
        await this.confirmNewPasswordInput.fill(confirmPassword);
    }

    async clickSave() {
        await this.saveButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async changePassword(currentPassword: string, newPassword) {
        await this.currentPasswordInput.fill(currentPassword);
        await this.newPasswordInput.fill(newPassword);
        await this.confirmNewPasswordInput.fill(newPassword);
        await this.saveButton.click();
    }
}