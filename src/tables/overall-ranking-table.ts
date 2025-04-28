import { Locator } from "@playwright/test";

// Represents a single row in the ranking table
export class BuggyCarsOverallRankingTableRow {
  readonly make: string;
  readonly model: string;
  readonly rank: string;
  readonly votes: string;
  readonly engine: string;
  readonly comments: string[];
  readonly viewMoreButton: Locator;

  constructor(
    make: string,
    model: string,
    rank: string,
    votes: string,
    engine: string,
    comments: string[],
    viewMoreButton: Locator
  ) {
    this.make = make;
    this.model = model;
    this.rank = rank;
    this.votes = votes;
    this.engine = engine;
    this.comments = comments;
    this.viewMoreButton = viewMoreButton;
  }
}

// Represents the entire ranking table
export class BuggyCarsOverallRankingTable {
  private rows: BuggyCarsOverallRankingTableRow[];

  constructor(rows: BuggyCarsOverallRankingTableRow[]) {
    this.rows = rows;
  }

  getRows(): BuggyCarsOverallRankingTableRow[] {
    return this.rows;
  }

  findByMake(make: string): BuggyCarsOverallRankingTableRow[] {
    return this.rows.filter((row) => row.make === make);
  }

  findByModel(model: string): BuggyCarsOverallRankingTableRow[] {
    return this.rows.filter((row) => row.model === model);
  }

  sortByRank(): BuggyCarsOverallRankingTableRow[] {
    return [...this.rows].sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
  }

  sortByVotes(): BuggyCarsOverallRankingTableRow[] {
    return [...this.rows].sort((a, b) => parseInt(b.votes) - parseInt(a.votes));
  }
}