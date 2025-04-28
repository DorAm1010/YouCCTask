import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsModelPage, BuggyCarsRankingPage } from '../../pom/index';

test.describe('Unregistered User', () => {
  let mainPage: BuggyCarsMainPage;
    test.beforeEach(async ({ page }) => {
      await page.goto('https://buggy.justtestit.org/');
      mainPage = new BuggyCarsMainPage(page);
      await mainPage.initialize();
  });

  test('Unregistered user cant vote', async ({ page }) => {
    await mainPage.goToOverallRatingPage();
    const overallRatingPage: BuggyCarsRankingPage = new BuggyCarsRankingPage(page);
    await overallRatingPage.initialize();
    const models = await overallRatingPage.getModels();
    // Select a random model
    const randomModel = models[Math.floor(Math.random() * models.length)];
    await overallRatingPage.viewModelPageByName(randomModel);
    const modelPage = new BuggyCarsModelPage(page);
    await modelPage.initialize();
    expect(await modelPage.commentInput.isVisible(), 'Comment input should not be visible for unregistered users')
    .toBe(false);
    expect(await modelPage.voteButton.isVisible(), 'Vote button should not be visible for unregistered users.')
    .toBe(false);
    expect(await modelPage.getUnregisterdUserComment(), 'Unregistered user message should be visible for unregistered users.')
    .toEqual('You need to be logged in to vote.');
  });

  test('All top bar buttons are visible for unregistered user', async ({ page }) => {
    expect(await mainPage.isUsernameInputVisible(), 'Username input should be visible to an unregisterd user').toBe(true);
    expect(await mainPage.isPasswordInputVisible(), 'Passwor input should be visible to an unregisterd user').toBe(true);
    expect(await mainPage.isLoginbuttonVisible(), 'Login button should be visible to an unregisterd user').toBe(true);
    expect(await mainPage.isRegisterButtonVisible(), 'Register button should be visible to an unregisterd user').toBe(true);
  });
});