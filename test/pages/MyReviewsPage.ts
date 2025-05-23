import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";
import { BookDetailPage } from "./BookDetailPage";
import { BookReviewPopup } from "../components/BookReviewPopup";

export class MyReviewsPage {
    page: Page;
    static readonly REVIEW_PAGE_URL = `${BASE_URL}/people/openlibrary/books/observations`;
    updateReviewsLinkLocator: Locator;
    listedReviewsLocator: Locator;

    constructor({page}: {page: Page}) {
        this.page = page; 
        this.updateReviewsLinkLocator = page.getByRole('link', { name: 'Update Reviews' });
        this.listedReviewsLocator = page.locator('.observations-list li');
    }
    
    async openBookReviewPopup(trigger: 'add' | 'update'): Promise<BookReviewPopup> {
        if (trigger == 'add') {
            const bookDetailPage = new BookDetailPage({page: this.page});
            await bookDetailPage.reviewIconLink.click();
        }
        else if (trigger == 'update') {
            await this.updateReviewsLinkLocator.click();
        }
        return new BookReviewPopup({page: this.page});
    }

    async getListedReviewsText(): Promise<string[]> {
        const listedReviewsText = await this.listedReviewsLocator.allInnerTexts();
        return listedReviewsText;
    }
}