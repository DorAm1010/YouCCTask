import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, BuggyCarsModelPage } from '../../pom/index';
import { ApiPopularMakesUtils } from '../../api-utils/api-popular-makes';

test.describe('Popular makes tests', () => {
    let mainPage: BuggyCarsMainPage;
    let popularModelsPage: BuggyCarsModelPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://buggy.justtestit.org/');
        mainPage = new BuggyCarsMainPage(page);
        await mainPage.initialize();
        
        await mainPage.goToPopularModelPage();
        popularModelsPage = new BuggyCarsModelPage(page);
        await popularModelsPage.initialize();
    });

    test('Top model is same in popular model page and first rank in popular makes', async ({ page }) => {
        const popularModelName = await popularModelsPage.getModelName();
        const apiPopularMakesUtils = new ApiPopularMakesUtils();

        await page.goto('https://buggy.justtestit.org/');
        mainPage = new BuggyCarsMainPage(page);
        await mainPage.initialize();
        await mainPage.goToPopularMakesPage();

        const url = page.url();
        const partAfterMake = url.substring(url.indexOf('/make'));
        await apiPopularMakesUtils.initialize('/prod'+partAfterMake.replace('make', 'makes'));
        const apiResponse = await apiPopularMakesUtils.getModelsResponse();
        const firstRankModelName = apiResponse.models['models'][0].name;

        expect(popularModelName, 'Top model in popular model page should be the same as the first rank in popular makes').toEqual(firstRankModelName);
    })

});