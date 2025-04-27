import { Locator, Page } from "@playwright/test";

export class BuggyCarsModelPage {
    readonly page: Page;
    readonly modelName: Locator;
    readonly modelMake: Locator
    readonly modelDescription: Locator;
    readonly modelEngine: Locator;
    readonly modelMaxSpeed: Locator;
    readonly modelVotes: Locator;
    readonly commentsTableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modelMake = page.locator('xpath=.//div[@class="col-lg-2"]//h4')
        this.modelName = page.locator('xpath=.//my-model/div/div[2]/h3');
        this.modelDescription = page.locator('xpath=.//my-model/div/div[2]/div');
        this.modelEngine = page.locator('xpath=.//div[@class="col-lg-4"]//li[1]');
        this.modelMaxSpeed = page.locator('xpath=.//div[@class="col-lg-4"]//li[2]');
        this.modelVotes = page.locator('xpath=.//div[@class="col-lg-4"]//h4[contains(text(), "Votes:")]//strong');
        this.commentsTableRows = page.locator('xpath=.//tbody/tr');
    }

    async getModelMake(): Promise<string | null> {
        return await this.modelMake.textContent();
    }

    async getModelName(): Promise<string | null> {
        return await this.modelName.textContent();
    }

    async getModelDescription(): Promise<string | null> {
        return await this.modelDescription.textContent();
    }

    async getModelEngine(): Promise<string | null> {
        return await this.modelEngine.textContent();
    }

    async getModelMaxSpeed(): Promise<string | null> {
        return await this.modelMaxSpeed.textContent();
    }

    async getModelVotes(): Promise<number | null> {
        const votesText = await this.modelVotes.textContent();
        return votesText ? parseInt(votesText.trim()) : null;
    }

    async buildCommentsTable(rowsCount: number = 0): Promise<Array<{ date: string; author: string; comment: string }>> {
        const rows = rowsCount == 0 ? await this.commentsTableRows.count() : rowsCount;
        const commentsTable: Array<{ date: string; author: string; comment: string }> = [];

        for (let i = 0; i < rows; i++) {
            const row = this.commentsTableRows.nth(i);
            const date = await row.locator('xpath=./td[1]').textContent();
            const author = await row.locator('xpath=./td[2]').textContent();
            const comment = await row.locator('xpath=./td[3]').textContent();

            commentsTable.push({
                date: date?.trim() || '',
                author: author?.trim() || '',
                comment: comment?.trim() || '',
            });
        }

        return commentsTable;
    }
}