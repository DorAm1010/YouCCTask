import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsProfilePage } from '../../pom/index';
import { ApiRegistrationUtils } from '../../api-utils';

test.describe('Profile page tests', () => {
    let mainPage: BuggyCarsMainPage;
    let profilePage: BuggyCarsProfilePage;
    let apiRegistrationUtils: ApiRegistrationUtils;
    const user = {
        grant_type: 'password',
        username: 'DorAmrani',
        password: 'NewPassword!@#456'
    }
    

    test.beforeEach(async ({ page }) => {
        apiRegistrationUtils = new ApiRegistrationUtils();
        await apiRegistrationUtils.initialize();
        const token = await apiRegistrationUtils.getToken(user);
        expect(token, 'Could not get a token').toBeTruthy();
        const loginResponse = await apiRegistrationUtils.login(token);
        expect(loginResponse.status(), 'Could not login via api').toBe(200);
        await page.goto('https://buggy.justtestit.org/', { waitUntil: 'domcontentloaded' });

        await page.evaluate((tokenFromApi) => {
            localStorage.setItem('token', tokenFromApi);
        }, token);
        await page.reload();
        // await page.goto('https://buggy.justtestit.org/profile', { waitUntil: 'domcontentloaded' });
        mainPage = new BuggyCarsMainPage(page);
        await mainPage.initialize();
        await mainPage.clickProfileButton();
        profilePage = new BuggyCarsProfilePage(page);
        await profilePage.initialize();
    });

    // test('Change password', async ({ page }) => {
    //     let changedPasswordResponse;
    //     const profilePage = new BuggyCarsProfilePage(page);
    //     await profilePage.initialize();

    //     const oldPassword = user.password;
    //     const newPassword = 'NewPassword!@#456';
  
    //     page.on('response', (response) => {
    //         if (response.url().includes('profile') && response.request().method() === 'PUT') {
    //             changedPasswordResponse = response;
    //         }
    //     });
        
  
    //     await profilePage.changePassword(oldPassword, newPassword);
        
    //     await page.waitForResponse((response) => 
    //         response.url().includes('profile') && response.request().method() === 'PUT'
    //     );
    //     expect(changedPasswordResponse, 'Could not find password change PUT request in network').toBeDefined();
    //     expect(await changedPasswordResponse!.status()).toBe(200);
  
    //     await profilePage.changePassword(newPassword, oldPassword);
    // })

});