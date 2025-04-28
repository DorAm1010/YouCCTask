import { Locator } from "@playwright/test";

// Represents a single row in the ranking table
export class PopularMakesRankingTableRow {
  readonly make: string;
  readonly model: string;
  readonly rank: string;
  readonly votes: string;
  readonly engine: string;
  readonly comments: string[];
  readonly viewMoreButton: Locator;

  constructor(
    model: string,
    rank: string,
    votes: string,
    comments: string[],
    viewMoreButton: Locator
  ) {
    this.model = model;
    this.rank = rank;
    this.votes = votes;
    this.comments = comments;
    this.viewMoreButton = viewMoreButton;
  }
}

// Represents the entire ranking table
export class PopularMakesRankingTable {
  private rows: PopularMakesRankingTableRow[];

  constructor(rows: PopularMakesRankingTableRow[]) {
    this.rows = rows;
  }

  getRows(): PopularMakesRankingTableRow[] {
    return this.rows;
  }
  findByModel(model: string): PopularMakesRankingTableRow[] {
    return this.rows.filter((row) => row.model === model);
  }

  sortByRank(): PopularMakesRankingTableRow[] {
    return [...this.rows].sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
  }

  sortByVotes(): PopularMakesRankingTableRow[] {
    return [...this.rows].sort((a, b) => parseInt(b.votes) - parseInt(a.votes));
  }
}