import { test, expect, Page } from "@playwright/test";
import { MyReviewsPage } from "../pages/MyReviewsPage";
import { LoginPage } from "../pages/LoginPage";
import { TIMEOUTS, VALID_EMAIL, VALID_PASSWORD } from "../helper-config";
import { BookDetailPage } from "../pages/BookDetailPage";

let reviewPage: MyReviewsPage;
const bookID = 'OL5M';
const slug = 'One_Piece4';

test.beforeEach(async({page}: {page: Page}) => {
    await page.goto(LoginPage.LOGIN_URL);
    const loginPage = new LoginPage({page});
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    reviewPage = new MyReviewsPage({page});
});

test('adds and updates book review', async({page}) => {
    await test.step('Add review from Book Detail Page', async() => {
        const bookDetailURL = BookDetailPage.getBookDetailURl(bookID, slug);
        await page.goto(bookDetailURL, {waitUntil: 'networkidle'});
        await expect(page).toHaveURL(bookDetailURL);
        const bookReviewPopup = await reviewPage.openBookReviewPopup('add');
        await expect(bookReviewPopup.bookReviewPopupLocator).toBeVisible();
        const reviewsBefore = await bookReviewPopup.getSelectedReviewCounts();
        await bookReviewPopup.selectReviewOptions();
        await bookReviewPopup.close();
        await expect(bookReviewPopup.bookReviewPopupLocator).toBeHidden();
        const reviewsAfter = await bookReviewPopup.getSelectedReviewCounts();
        expect(reviewsAfter).toBeGreaterThan(reviewsBefore);
    });

    await test.step('Update review from My Review Page', async() => {
        const myReviewPage = MyReviewsPage.REVIEW_PAGE_URL;
        await page.goto(myReviewPage, { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(myReviewPage);
        await expect(reviewPage.updateReviewsLinkLocator).toBeVisible({ timeout: TIMEOUTS.MEDIUM });
        const bookReviewPopup =  await reviewPage.openBookReviewPopup('update');
        await expect(bookReviewPopup.bookReviewPopupLocator).toBeVisible();
        await expect(bookReviewPopup.reviewsContainerLocator).toBeVisible();
        await bookReviewPopup.closeSelectedReview();
        const selectedReviewsText = await bookReviewPopup.getSelectedReviewsText();
        await bookReviewPopup.close();
        await expect(bookReviewPopup.bookReviewPopupLocator).toBeHidden();
        await page.reload();
        const listedReviewsText = await reviewPage.getListedReviewsText();
        expect([...selectedReviewsText].sort()).toEqual([...listedReviewsText].sort());
    });
});