import { Locator, Page } from "@playwright/test";
import { SEARCH_RESULTS_URL } from "../helper-config";

export class SearchResultsPage {
    page: Page;
    SEARCH_RESULTS_URL = SEARCH_RESULTS_URL;
    searchBooksHeading: Locator;
    bookNameLocator: Locator;
    authorNameLocator: Locator;

    constructor({page}: {page: Page}) {
        this.searchBooksHeading = page.locator('#test-body-mobile #contentHead h1');
        this.searchBooksHeading = page.locator('#test-body-mobile #contentHead h1');
        this.bookNameLocator = page.locator('#searchResults .booktitle a');
        this.authorNameLocator = page.locator('#searchResults .bookauthor a');
    }

    navigateToSearchResults() {
      this.page.goto('SEARCH_RESULTS_URL')
    }
}