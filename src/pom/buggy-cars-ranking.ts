import { Locator, Page } from "@playwright/test";
import { BuggyCarsRankingTable, BuggyCarsRankingTableRow } from "../tables/ranking-table";


export class BuggyCarsRankingPage {
  readonly page: Page;
  readonly rankingTableElement: Locator;
  readonly rankingTableRows: Locator;
  private rankingTable: BuggyCarsRankingTable;

  constructor(page: Page) {
    this.page = page;
    this.rankingTableElement = page.locator('xpath=.//table[@class="table"]');
    this.rankingTableRows = this.rankingTableElement.locator('xpath=.//tbody/tr');
  }

  async buildRankingTable(): Promise<void> {
    const rows = await this.rankingTableRows.count();
    const tableRows: BuggyCarsRankingTableRow[] = [];

    for (let i = 0; i < rows; i++) {
        const row = this.rankingTableRows.nth(i);
        const make = await row.locator('xpath=./td[2]').textContent();
        const model = await row.locator('xpath=./td[3]').textContent();
        const rank = await row.locator('xpath=./td[4]').textContent();
        const votes = await row.locator('xpath=./td[5]').textContent();
        const engine = await row.locator('xpath=./td[6]').textContent();
        const commentsCell = row.locator('xpath=./td[7]');
        const comments = await commentsCell.locator('p').allTextContents();
        const viewMoreButton = commentsCell.locator('a');  
        tableRows.push(
            new BuggyCarsRankingTableRow(
              make?.trim() || '',
              model?.trim() || '',
              rank?.trim() || '',
              votes?.trim() || '',
              engine?.trim() || '',
              comments.map((comment) => comment.trim()),
              viewMoreButton
            )
          );
    }

    this.rankingTable = new BuggyCarsRankingTable(tableRows);
  }

  async getModels(): Promise<string[]> {
    if (!this.rankingTable) {
      await this.buildRankingTable();
    }
  
    // Map the rows in the ranking table to an array of objects containing model
    return this.rankingTable.getRows().map((row) => row.model);
  }

  async viewModelPageByName(model: string): Promise<void> {
    if (!this.rankingTable) {
      await this.buildRankingTable();
    }
  
    // Find the row with the specified model name
    const targetRow = this.rankingTable.getRows().find((row) => row.model === model);
  
    if (!targetRow) {
      throw new Error(`Model "${model}" not found in the ranking table.`);
    }
  
    // Click the "View More" button for the specified model
    await targetRow.viewMoreButton.click();
  }


}