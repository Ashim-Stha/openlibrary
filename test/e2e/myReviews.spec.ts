import { test, expect, Page } from "@playwright/test";
import { BookPage } from "../pages/BookPage";
import { MyReviewPage } from "../pages/MyReviewsPage";
import { LoginPage } from "../pages/LoginPage";
import { VALID_EMAIL, VALID_PASSWORD } from "../helper-config";

let reviewPage: MyReviewPage;

test.beforeEach(async({page}: {page: Page}) => {
    reviewPage = new MyReviewPage({page});
    await page.goto(BookPage.MY_BOOKS_URL);
});

async function performUpdateReviews(page) {
    await expect(reviewPage.updateReviewsLinkLocator).toBeVisible();
    await reviewPage.updateReviews();
    await expect(reviewPage.bookReviewPopupLocator).toBeVisible();
    await expect(reviewPage.reviewsContainerLocator).toBeVisible();
    let selectedReviewsText = await reviewPage.selectedReviewsLocator.allInnerTexts();
    let cleanedSelectedReviews = selectedReviewsText.map((text)=> text.replace(/×$/, '').trim()); 
    let uniqueSelectedReviewsText = [...new Set(cleanedSelectedReviews)];
    await reviewPage.reviewPopupCloseIconLocator.click();
    let listedReviewsText = await reviewPage.listedReviewsLocator.allInnerTexts();
    expect([...uniqueSelectedReviewsText].sort()).toEqual([...listedReviewsText].sort());
}

test('redirects unauthenticated user to login and updates review after login', async({page}) => {
    const loginPage = await reviewPage.goToReviewPage() as LoginPage;
    await loginPage.navigate();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(reviewPage.userIconLocator).toBeVisible();
    await page.goto(MyReviewPage.REVIEW_PAGE_URL);
    await expect(reviewPage.reviewsDropdownLocator).toBeVisible();
    await performUpdateReviews(page);
});

test("updates review page when user is already logged in", async({page})=> {
    const loginPage = new LoginPage({page});
    await loginPage.navigate();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD); 
    await reviewPage.goToReviewPage() as MyReviewPage;
    await page.goto(MyReviewPage.REVIEW_PAGE_URL);
    await expect(reviewPage.reviewsDropdownLocator).toBeVisible();
    await performUpdateReviews(page);
});