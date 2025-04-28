import { expect, Locator, Page } from "@playwright/test";
import { PopularMakesRankingTableRow, PopularMakesRankingTable } from "../tables/index";


export class PopularMakesRankingPage {
  readonly page: Page;
  rankingTableElement: Locator;
  rankingTableRows: Locator;
  private rankingTable: PopularMakesRankingTable;

  constructor(page: Page) {
    this.page = page;
  }

  async initialize(): Promise<void> {
    // Wait for the table to appear before proceeding
    await this.waitForPageToLoad();
    this.rankingTableElement = this.page.locator('xpath=//table[@class="cars table table-hover"]');
    this.rankingTableRows = this.rankingTableElement.locator('xpath=//tbody/tr');
  }


  async waitForPageToLoad(): Promise<void> {
    await this.page.waitForSelector('xpath=.//tbody/tr');
  }

  async buildRankingTable(): Promise<void> {
    const rows = await this.rankingTableRows.count();
    const tableRows: PopularMakesRankingTableRow[] = [];

    for (let i = 0; i < rows; i++) {
        const row = this.rankingTableRows.nth(i);
        
        const model = await row.locator('xpath=./td[2]').textContent();
        const rank = await row.locator('xpath=./td[3]').textContent();
        const votes = await row.locator('xpath=./td[4]').textContent();
        const commentsCell = row.locator('xpath=./td[5]');
        const comments = await commentsCell.locator('p').allTextContents();
        const viewMoreButton = commentsCell.locator('a');  
        
        tableRows.push(
            new PopularMakesRankingTableRow(
              model?.trim() || '',
              rank?.trim() || '',
              votes?.trim() || '',
              comments.map((comment) => comment.trim()),
              viewMoreButton
            )
          );
    }

    this.rankingTable = new PopularMakesRankingTable(tableRows);
  }

  async viewModelPageByName(model: string): Promise<void> {
    if (!this.rankingTable) {
      await this.buildRankingTable();
    }
  
    // Find the row with the specified model name
    const targetRow = this.rankingTable.findByModel(model);
    if (!targetRow) {
      throw new Error(`Model "${model}" not found in the ranking table.`);
    }

    const viewMoreButton = targetRow[0].viewMoreButton;
  
    // Click the "View More" button for the specified model
    await viewMoreButton.click();
  }

  async getVotesInTable(): Promise<number> {
    if (!this.rankingTable) {
      await this.buildRankingTable();
    }
  
    let votesInTable = 0;
    this.rankingTable.getRows().forEach(row => {
      const votes = parseInt(row.votes, 10);
      votesInTable += votes;
    });
  
    return votesInTable;
  }

  async clickNextPage(): Promise<void> {
    const firstRow = this.page.locator('table tbody tr').nth(0);
    const oldText = await firstRow.textContent() as string;
    const nextPageButton = this.page.locator('a[class="btn"]');
    
    await nextPageButton.click();
    await expect(firstRow).not.toHaveText(oldText, {timeout: 15000});
    await this.buildRankingTable();
  }

  async getRankingTable(): Promise<PopularMakesRankingTable> {
    if (!this.rankingTable) {
      await this.buildRankingTable();
    }
    return this.rankingTable;
  }

}