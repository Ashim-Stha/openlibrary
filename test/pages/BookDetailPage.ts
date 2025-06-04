import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";

export class BookDetailPage {
    page: Page;
    reviewIconLink: Locator;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.reviewIconLink = page.locator('.desktop .observations-modal-link .icon-link__image');
    }

    static getBookDetailURl(bookID: string, slug: string) {
        return `${BASE_URL}/books/${bookID}/${slug}`;
    }
}