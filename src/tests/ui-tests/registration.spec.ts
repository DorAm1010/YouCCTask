import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsModelPage, BuggyCarsRankingPage, BuggyCarsRegistrationPage } from '../../pom/index';
import { ApiRegistrationUtils } from '../../api-utils/index';

test.describe('Registration Flows', () => {
  let registrationPage: BuggyCarsRegistrationPage;

    test.beforeEach(async ({ page }) => {
      await page.goto('https://buggy.justtestit.org/register');
      registrationPage = new BuggyCarsRegistrationPage(page);
      await registrationPage.initialize();
  });

  test('Successfull registration flow', async ({ page }) => {
    let latestRequest;

    page.on('request', (request) => {
        if (request.url().includes('prod/users') && request.method() === 'POST') {
            latestRequest = request;
        }
    });
    const username = 'user_' + Math.random().toString(36).substring(2, 10);
    const firstName = 'Test';
    const lastName = 'User';
    const password = 'Password123!@';
    const confirmPassword = password;

    await registrationPage.fullRegistration(username, firstName, lastName, password, confirmPassword);
    await registrationPage.waitForSuccessfullMessage(15000);
    expect(latestRequest, 'Could not find POST request in network').toBeDefined();
    expect(latestRequest.postData(), 'Different data sent in request than in UI').toEqual(
        JSON.stringify({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
            confirmPassword: confirmPassword
        })
    );
  });

  test('Invalid password registration', async ({ page }) => {
    let latestRequest;

    page.on('request', (request) => {
        if (request.url().includes('prod/users') && request.method() === 'POST') {
            latestRequest = request;
        }
    });
    const username = 'user_invalid_password';
    const firstName = 'Test';
    const lastName = 'User';
    const password = 'abcd1234';
    const confirmPassword = password;

    await registrationPage.fillUsername(username);
    await registrationPage.fillFirstName(firstName);
    await registrationPage.fillLastName(lastName);
    await registrationPage.fillPassword(password);
    await registrationPage.fillConfirmPassword(confirmPassword);
    await registrationPage.clickRegister();

    // Wait for the request to complete and get the response
    const response = await latestRequest?.response();
    const status = response?.status();

    // Assert the status code
    expect(status, 'Expected a 400 status code for invalid password').toBe(400);

    const errorMessage = await registrationPage.getErrorMessage();

    expect(errorMessage, 'Did not see an error message on wrong password').toBeTruthy();
    console.log('Error message:', errorMessage)
    expect(errorMessage, 'Error message is not correct').toContain('InvalidPasswordException: Password did not conform with policy:');
  });
});