import { Locator } from "@playwright/test";

// Represents a single row in the ranking table
export class BuggyCarsRankingTableRow {
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
export class BuggyCarsRankingTable {
  private rows: BuggyCarsRankingTableRow[];

  constructor(rows: BuggyCarsRankingTableRow[]) {
    this.rows = rows;
  }

  // Get all rows
  getRows(): BuggyCarsRankingTableRow[] {
    return this.rows;
  }

  // Find rows by make
  findByMake(make: string): BuggyCarsRankingTableRow[] {
    return this.rows.filter((row) => row.make === make);
  }

  // Find rows by model
  findByModel(model: string): BuggyCarsRankingTableRow[] {
    return this.rows.filter((row) => row.model === model);
  }

  // Sort rows by rank
  sortByRank(): BuggyCarsRankingTableRow[] {
    return [...this.rows].sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
  }

  // Sort rows by votes
  sortByVotes(): BuggyCarsRankingTableRow[] {
    return [...this.rows].sort((a, b) => parseInt(b.votes) - parseInt(a.votes));
  }
}