import {test, expect, Page} from "@playwright/test";
import {AdvancedSearchPage} from "../pages/AdvancedSearchPage"
import { SearchResultsPage } from "../pages/SearchResultsPage";

let advancedSearchPage: AdvancedSearchPage;
let searchResultsPage: SearchResultsPage;
const searchedBookName: string = 'Robinson'
const searchedAuthorName: string = 'Daniel Defoe'

test.beforeEach(async({page}: {page: Page}) => {
    advancedSearchPage = new AdvancedSearchPage({page});
    await advancedSearchPage.navigateToAdvancedSearch();
});

test("advanced search heading is visible", async({page}: {page: Page}) => {
    await expect (advancedSearchPage.advancedSearchHeading).toBeVisible();
});

test("advanced search", async({page}: {page: Page}) => {
    searchResultsPage = new SearchResultsPage({page});
    await advancedSearchPage.advancedSearch({
        title: searchedBookName,
        author: searchedAuthorName
    });
    await expect(page).toHaveURL(searchResultsPage.SEARCH_RESULTS_URL);
    await expect(searchResultsPage.searchBooksHeading).toBeVisible();
    await expect(searchResultsPage.bookNameLocator).toContainText(searchedBookName);
    await expect(searchResultsPage.authorNameLocator).toContainText(searchedAuthorName);
})