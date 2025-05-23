import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";
import { LoginPage } from "./LoginPage";
import { BookPage } from "./BookPage";

export class MyReviewPage {
    page: Page;
    static readonly REVIEW_PAGE_URL = `${BASE_URL}/people/openlibrary/books/observations`;
    userIconLocator: Locator;
    reviewsDropdownLocator: Locator;
    updateReviewsLinkLocator: Locator;
    bookReviewPopupLocator: Locator;
    reviewsContainerLocator: Locator;
    selectedReviewsLocator: Locator;
    listedReviewsLocator: Locator;
    reviewPopupCloseIconLocator: Locator;

    constructor({page}: {page: Page}) {
        this.page = page; 
        this.userIconLocator = page.locator('.hamburger-component .account__icon');
        this.reviewsDropdownLocator = page.locator('.account-settings-menu .disguised-select');
        this.updateReviewsLinkLocator = page.locator('.observations-update-link  .observations-modal-link');
        this.bookReviewPopupLocator = page.locator('#colorbox #cboxWrapper');
        this.reviewsContainerLocator = page.locator('div.selection-panel[data-v-6e9271b9]');
        this.selectedReviewsLocator = page.locator('.selection-chip[data-v-777415fd]');
        this.listedReviewsLocator = page.locator('.observations-list li');
        this.reviewPopupCloseIconLocator = page.getByRole('link', {name: '× Close'});
    }

    async goToReviewPage(): Promise<LoginPage | MyReviewPage> {
        const loginPage = new LoginPage({page: this.page});
        const currentURL = this.page.url();
        const loginLinkVisible = await loginPage.loginLinkLocator.isVisible().catch(() => false);
        if (currentURL.includes(BookPage.MY_BOOKS_URL) && loginLinkVisible ) {
            return loginPage;
        } 
        return new MyReviewPage({page: this.page});
    }

    async updateReviews() {
        await this.updateReviewsLinkLocator.click();
    }
}