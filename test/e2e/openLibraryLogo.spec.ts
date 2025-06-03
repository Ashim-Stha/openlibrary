import { test, expect, Page } from "@playwright/test";
import { OpenLibraryLogo } from "../pages/OpenLibraryLogo";
import { BASE_URL } from "../helper-config";

let openLibraryLogoPage: OpenLibraryLogo;

test.beforeEach(async({ page }: {page: Page}) => {
    openLibraryLogoPage = new OpenLibraryLogo({page});
    await openLibraryLogoPage.navigateToHome();
});

test("open-library logo is visible", async() => {
    await expect(openLibraryLogoPage.openLibraryLogo).toBeVisible();
});

test("open-library logo click redirects to base URL", async({page}: {page: Page}) => {
    await openLibraryLogoPage.click();
    await expect(page).toHaveURL(BASE_URL);
});

test("tooltip appears on hovering over open-library logo", async() => {
    await openLibraryLogoPage.hover();
    const titleAttr = await openLibraryLogoPage.openLibraryLogo.getAttribute('title');
    expect(titleAttr).toBe("The Internet Archive's Open Library: One page for every book");
});


