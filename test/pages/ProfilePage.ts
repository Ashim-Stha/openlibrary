import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";

export class ProfilePage {
    page: Page;
    static readonly PROFILE_URL = `${BASE_URL}/people/openlibrary`;
    profileName: Locator;
    websiteName: Locator;
    profileDescription: Locator;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.profileName = page.locator('#contentHead h1').nth(1);
        this.websiteName = page.locator('#contentBody > p').nth(0);
        this.profileDescription = page.locator('#contentBody > p').nth(1);
    }
}