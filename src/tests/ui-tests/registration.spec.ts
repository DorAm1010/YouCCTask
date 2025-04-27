import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsModelPage, BuggyCarsRankingPage, BuggyCarsRegistrationPage } from '../../pom/index';
import { ApiRegistrationUtils } from '../../api-utils/index';

test.describe('Registration Flows', () => {
  let registrationPage: BuggyCarsRegistrationPage;
  let apiRegistrationUtils: ApiRegistrationUtils;
  
    test.beforeEach(async ({ page }) => {
      await page.goto('https://buggy.justtestit.org/register');
      registrationPage = new BuggyCarsRegistrationPage(page);
      await registrationPage.initialize();
  });

  test('Successfull registration flow', async ({ page }) => {
    const username = 'user_' + Math.random().toString(36).substring(2, 10);
    const firstName = 'Test';
    const lastName = 'User';
    const password = 'Password123!@';
    const confirmPassword = password;

    await registrationPage.fullRegistration(username, firstName, lastName, password, confirmPassword);
    await registrationPage.waitForSuccessfullMessage(15000);

  });
});