import {Locator, Page} from "@playwright/test";
import { BASE_URL } from "../helper-config";

export class OpenLibraryLogo {
    page: Page;
    openLibraryLogo: Locator;
    openLibraryLogoAltText: Locator;
    openLibraryLogoTooltip: Locator;

    constructor({ page }: { page: Page }) {
        this.page = page;
        this.openLibraryLogo = page.locator('.logo-component a');
    }

    async navigateToHome() {
        await this.page.goto(BASE_URL, {waitUntil: 'networkidle'});
    }

    async click() {
        await this.openLibraryLogo.click();
    }

    async hover() {
        await this.openLibraryLogo.hover();
    }
}
