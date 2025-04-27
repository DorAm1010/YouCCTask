import { Locator, Page } from "@playwright/test";
import { BuggyCarsRankingTable, BuggyCarsRankingTableRow } from "../tables/ranking-table";


export class BuggyCarsRankingPage {
  readonly page: Page;
  readonly rankingTable: Locator;
  readonly rankingTableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rankingTable = page.locator('xpath=.//table[@class="table"]');
    this.rankingTableRows = this.rankingTable.locator('.//tbody/tr');
  }

  async buildRankingTable(): Promise<BuggyCarsRankingTable> {
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

    return new BuggyCarsRankingTable(tableRows);
}

}