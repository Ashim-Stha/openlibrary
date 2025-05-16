import { test, expect, Page } from "@playwright/test"
import { NavigationPage } from "../pages/NavigationPage";
import { BASE_URL, MY_BOOKS_BEFORE_LOGIN_URL, MY_BOOKS_URL, VALID_EMAIL, VALID_PASSWORD } from "../helper-config";

let navigationPage: NavigationPage;

test.beforeEach(async({page}: {page: Page}) => {
    navigationPage = new NavigationPage({page});
    await page.goto(BASE_URL);
});

test("navigating my books link before login", async({page}: {page: Page}) => {
    await navigationPage.navigateToMyBooks();    
    await expect(page).toHaveURL(MY_BOOKS_BEFORE_LOGIN_URL);
    await expect(navigationPage.textToLogin).toBeVisible();
});

test("navigating my books link redirect to it's page after login", async({page}: {page: Page}) => {
    await navigationPage.navigateToMyBooks();    
    const loginPage = await navigationPage.navigateToLogin();
    loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(page).toHaveURL(MY_BOOKS_URL);
    await expect(navigationPage.booksDropdown).toBeVisible();
})

test("navigate to browse with dropdown", async({page}: {page: Page}) => {
    await navigationPage.navigateToBrowse();
    await expect(navigationPage.dropdownOnBrowse).toBeVisible();
    await expect(navigationPage.optionOnBrowseDropdown).toHaveText([
        'Subjects',
        'Trending',
        'Library Explorer',
        'Lists',
        'Collections',
        'K-12 Student Library',
        'Book Talks',
        'Random Book',
        'Advanced Search'
      ], { timeout: 5000 });
})