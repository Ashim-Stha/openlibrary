import {Locator, Page} from "@playwright/test";
import { BASE_URL } from "../helper-config";

export class OpenLibraryLogo {
    page: Page;
    openLibraryLogo: Locator;
    openLibraryLogoAltText: Locator;
    openLibraryLogoTooltip: Locator;

    constructor({ page }: { page: Page }) {
        this.page = page;
        this.openLibraryLogo = page.locator('#header-bar .logo-component a img');
        this.openLibraryLogoAltText = page.getByAltText('open Library logo');
        this.openLibraryLogoTooltip = page.getByText(`The Internet Archive's Open Library: One page for every book`, {exact: true});
    }

    async navigateToHome() {
        await this.page.goto(BASE_URL);
    }

    async click() {
        await this.openLibraryLogo.click()
    }

    async hover() {
        await this.openLibraryLogo.hover();
    }
}
