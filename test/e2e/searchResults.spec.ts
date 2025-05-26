import { test, expect, Page } from "@playwright/test";
import { SearchResultsPage } from "../pages/SearchResultsPage";

let searchResultsPage: SearchResultsPage;

test.beforeEach(async({page}: {page: Page}) => {
    searchResultsPage = new SearchResultsPage({page});
    searchResultsPage.navigateToSearchResults();
    expect(searchResultsPage.searchBooksHeading).toBeVisible()
});


