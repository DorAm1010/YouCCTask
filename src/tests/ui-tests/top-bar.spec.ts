import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsProfilePage, BuggyCarsRegistrationPage } from '../../pom/index';
import { ApiRegistrationUtils } from '../../api-utils/index';

test.describe('Top Bar Tests', () => {
  let mainPage: BuggyCarsMainPage;
  let user = {
    username: 'DorAmrani',
    password: 'NewPassword!@#456',
    firstName: 'Dor'
  };

  test.beforeEach(async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/');
    mainPage = new BuggyCarsMainPage(page);
    await mainPage.initialize();
    await mainPage.login(user.username, user.password);
    await page.waitForSelector(`xpath=.//*[contains(text(), "Hi, ${user.firstName}")]`);
  });

  test('All top bar buttons are visible for logged in user', async () => {
    expect(await mainPage.isUsernameInputVisible(), 'Logged in user shouldnt see username input').toBe(false);
    expect(await mainPage.isPasswordInputVisible(), 'Logged in user shouldnt see password input').toBe(false);
    expect(await mainPage.isLoginbuttonVisible(), 'Logged in user shouldnt see login button').toBe(false);
    expect(await mainPage.isRegisterButtonVisible(), 'Logged in user shouldnt see register button').toBe(false);
    expect(await mainPage.isLogoutButtonVisible(), 'Logged in user shouldnt see register button').toBe(true);
    expect(await mainPage.getGreetingMessage()).toEqual('Hi, Dor');
  });

  test('Go to Profile page', async ({ page }) => {
    await mainPage.clickProfileButton();
    const profilePage = new BuggyCarsProfilePage(page);
    await profilePage.initialize();
    expect(page.url()).toContain('https://buggy.justtestit.org/profile');
  });

  test('Login ', async ({ page }) => {
    await mainPage.clickProfileButton();
    const profilePage = new BuggyCarsProfilePage(page);
    await profilePage.initialize();
    expect(page.url()).toContain('https://buggy.justtestit.org/profile');
  });


});