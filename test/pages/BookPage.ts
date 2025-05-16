import { Locator, Page } from "@playwright/test"
import { MY_BOOKS_URL } from "../helper-config";

export class BookPage {
    page: Page;
    booksDropdown: Locator;
    MY_BOOKS_URL = MY_BOOKS_URL;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.booksDropdown = page.locator('.disguised-select');
    }
}