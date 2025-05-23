import { test, expect, Page } from "@playwright/test";
import { ProfilePage } from "../pages/ProfilePage";

let profilePage: ProfilePage;

test.beforeEach(async({page}: {page: Page})=> {
    profilePage = new ProfilePage({page});
    await page.goto(ProfilePage.PROFILE_URL);
});

test("profile name and description", async({page}: {page: Page})=> {
    await expect(profilePage.profileName).toHaveText('Open Library');
    await expect(profilePage.profileDescription).toHaveText('This is the edited content.');
});