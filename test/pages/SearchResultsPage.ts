import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";

export class SearchResultsPage {
    page: Page;
    searchBooksHeading: Locator;
    bookNameLocator: Locator;
    authorNameLocator: Locator;
    static readonly SEARCH_RESULTS_URL: string = `${BASE_URL}/search?title=Robinson&author=Daniel+Defoe`

    constructor({page}: {page: Page}) {
        this.searchBooksHeading = page.locator('#test-body-mobile #contentHead h1');
        this.bookNameLocator = page.locator('#searchResults .booktitle a');
        this.authorNameLocator = page.locator('#searchResults .bookauthor a');
    }

    async navigateToSearchResults() {
      await this.page.goto(SearchResultsPage.SEARCH_RESULTS_URL);
    }

    async getSearchResultsURL({title, author}: {title: string, author: string}) {
      const encodedTitle = encodeURIComponent(title).replace(/%20/g, '+');
      const encodedAuthor = encodeURIComponent(author).replace(/%20/g, '+');
      return `${BASE_URL}/search?title=${encodedTitle}&author=${encodedAuthor}`;
    }
}