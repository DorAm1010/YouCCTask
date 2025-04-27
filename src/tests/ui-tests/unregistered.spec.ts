import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsModelPage, BuggyCarsRankingPage } from '../../pom/index';

test.describe('Unregistered User', () => {
  let mainPage: BuggyCarsMainPage;
    test.beforeEach(async ({ page }) => {
      await page.goto('https://buggy.justtestit.org/');
      mainPage = new BuggyCarsMainPage(page);
  });

  test('Unregistered user cant vote', async ({ page }) => {
    await mainPage.goToOverallRatingPage();
    const overallRatingPage: BuggyCarsRankingPage = new BuggyCarsRankingPage(page);
    const models = await overallRatingPage.getModels();
    // Select a random model
    const randomModel = models[Math.floor(Math.random() * models.length)];
    await overallRatingPage.viewModelPageByName(randomModel);
    const modelPage = new BuggyCarsModelPage(page);
    expect(modelPage.commentInput, 'Comment input should not be visible for unregistered users')
    .toBeNull();
    expect(modelPage.voteButton, 'Vote button should not be visible for unregistered users.')
    .toBeNull();
    expect(await modelPage.getUnregisterdUserComment(), 'Unregistered user message should be visible for unregistered users.')
    .toEqual('You need to be logged in to vote.');
  });
});