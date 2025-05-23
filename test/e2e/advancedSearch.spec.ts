import { test, expect, Page } from "@playwright/test";
import { AdvancedSearchPage } from "../pages/AdvancedSearchPage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

let advancedSearchPage: AdvancedSearchPage;
const searchedBookName: string = 'Robinson';
const searchedAuthorName: string = 'Daniel Defoe';

test.beforeEach(async({page}: {page: Page}) => {
    advancedSearchPage = new AdvancedSearchPage({page});
    await advancedSearchPage.navigateToAdvancedSearch();
});

test("advanced search heading is visible", async({page}: {page: Page}) => {
    await expect(advancedSearchPage.advancedSearchHeading).toBeVisible();
});

test("advanced book search", async({page}: {page: Page}) => {
    const searchResultsPage = await advancedSearchPage.search({
        title: searchedBookName,
        author: searchedAuthorName
    });
    const searchURL = await searchResultsPage.getSearchResultsURL({title: searchedBookName, author: searchedAuthorName});
    await expect(page).toHaveURL(searchURL);
    await expect(searchResultsPage.searchBooksHeading).toBeVisible();
    await expect(searchResultsPage.bookNameLocator).toContainText(searchedBookName);
    await expect(searchResultsPage.authorNameLocator).toContainText(searchedAuthorName);
});