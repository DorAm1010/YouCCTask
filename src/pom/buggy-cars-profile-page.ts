import { type Locator, type Page } from '@playwright/test';

export class BuggyCarsProfilePage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly genderDropdown: Locator;
    readonly ageInput: Locator;
    readonly addressImput: Locator;
    readonly phoneInput: Locator;
    readonly hobbyInput: Locator;
    readonly currentPasswordInput: Locator;  
    readonly newPasswordInput: Locator;
    readonly confirmNewPasswordInput: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[id="username"]');
        this.firstNameInput = page.locator('[id="firstName"]');
        this.lastNameInput = page.locator('[id="lastName"]');
        this.genderDropdown = page.locator('');
        this.ageInput = page.locator('[id="age"]');
        this.addressImput = page.locator('[id="address"]');
        this.phoneInput = page.locator('[id="phone"]');
        this.hobbyInput = page.locator('[id="hobby"]');
        this.currentPasswordInput = page.locator('[id="currentPassword"]');
        this.newPasswordInput = page.locator('[id="newPassword"]');
        this.confirmNewPasswordInput = page.locator('[id="confirmNewPassword"]');
        this.saveButton = page.locator('button[type="submit"]');
        this.cancelButton = page.locator('a[href="/"]');
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