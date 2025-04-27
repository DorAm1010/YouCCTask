import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsProfilePage, BuggyCarsRegistrationPage } from '../../pom/index';

test.describe('Top Bar Tests', () => {
  let mainPage: BuggyCarsMainPage;
  let mockUser = {
    username: 'DorAmrani',
    password: '123Arba%%'
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('https://buggy.justtestit.org/');
    mainPage = new BuggyCarsMainPage(page);
    await mainPage.initialize();
    await mainPage.login(mockUser.username, mockUser.password);
    await page.waitForSelector('xpath=.//*[contains(text(), "Hi,")]')
  });

  test('All top bar buttons are visible', async () => {
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
    expect(page.url()).toContain('https://buggy.justtestit.org/profile')
  });


});