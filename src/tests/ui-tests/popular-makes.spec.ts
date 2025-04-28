import { test, expect } from '@playwright/test';
import { BuggyCarsMainPage, PopularMakesRankingPage } from '../../pom/index';
import { ApiPopularMakesUtils } from '../../api-utils/api-popular-makes';

test.describe('Popular makes tests', () => {
    let mainPage: BuggyCarsMainPage;
    let popularMakesPage: PopularMakesRankingPage;
    let apiPopularMakesUtils: ApiPopularMakesUtils;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://buggy.justtestit.org/');
        mainPage = new BuggyCarsMainPage(page);
        await mainPage.initialize();
        
        await mainPage.goToPopularMakesPage();
        popularMakesPage = new PopularMakesRankingPage(page);
        await popularMakesPage.initialize();
        apiPopularMakesUtils = new ApiPopularMakesUtils();
      });
    
    test('Compare total popular make votes in main page and response', async ({ page }) => {
        const url = page.url();
        const partAfterMake = url.substring(url.indexOf('/make'));
        let votesInRespone = 0;
        await apiPopularMakesUtils.initialize('/prod'+partAfterMake.replace('make', 'makes'));
        const apiResponse = await apiPopularMakesUtils.getModelsResponse();
        const firstPageModels = apiResponse.models['models'];
        firstPageModels.forEach(model => {
            const votes = model['votes'];
            votesInRespone += votes;
        });
        const pages = apiResponse.models['totalPages'];
        for (let i = 2; i <= pages; i++) {
            const apiResponse = await apiPopularMakesUtils.getModelsResponse(i);
            const nextPageModels = apiResponse.models['models'];
            nextPageModels.forEach(model => {
                const votes = model['votes'];
                votesInRespone += votes;
            });
        }
        expect(votesInRespone, 'Votes in main page should equal response from the server').toEqual(mainPage.getPopularMakesVotes());
    });

    test('Compare total popular make votes in response and table', async ({ page }) => {
        const url = page.url();
        const partAfterMake = url.substring(url.indexOf('/make'));
        let votesInRespone = 0;
        let votesInTable = 0;
        await apiPopularMakesUtils.initialize('/prod'+partAfterMake.replace('make', 'makes'));
        const apiResponse = await apiPopularMakesUtils.getModelsResponse();
        const firstPageModels = apiResponse.models['models'];
        firstPageModels.forEach(model => {
            const votes = model['votes'];
            votesInRespone += votes;
        });
        const pages = apiResponse.models['totalPages'];
        for (let i = 2; i <= pages; i++) {
            const apiResponse = await apiPopularMakesUtils.getModelsResponse(i);
            const nextPageModels = apiResponse.models['models'];
            nextPageModels.forEach(model => {
                const votes = model['votes'];
                votesInRespone += votes;
            });
        }
        for (let i = 0; i < pages; i++) {
            const votes = await popularMakesPage.getVotesInTable();
            votesInTable += votes;
            await popularMakesPage.clickNextPage();
        }
        expect(votesInRespone, 'Votes in main page should equal response from the server').toEqual(votesInTable);
    });

    test('Ranking table should be sorted by votes', async ({ page }) => {
        let rank = 1;
        await popularMakesPage.buildRankingTable();
        const rankingTableRows = (await popularMakesPage.getRankingTable()).getRows();
        rankingTableRows.forEach(row => {
            const rankInTable = parseInt(row.rank, 10);
            expect(rankInTable, 'Ranking table should be sorted by votes').toEqual(rank);
            rank++;
        });
    });
}); 