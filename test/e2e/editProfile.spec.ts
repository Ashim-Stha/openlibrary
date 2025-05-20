import { test, expect, Page } from "@playwright/test";
import { EditProfilePage } from "../pages/EditProfilePage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { VALID_EMAIL, VALID_PASSWORD } from "../helper-config";

let editProfilePage: EditProfilePage;
const displayName: string = 'Open Library';
const website: string = 'openlibrary.com';
const description: string = 'This is the edited content.';
const changedNotes: string = 'Edit';

test.beforeEach(async({page}: {page: Page})=> {
    editProfilePage = new EditProfilePage({page});
    await page.goto(EditProfilePage.EDIT_PROFILE_URL);
});

async function performEditProfile(page: Page) {
    const profilePage = await editProfilePage.editProfile
    ({displayName: displayName, website: website, description: description, changedNotes: changedNotes});
    await expect(page).toHaveURL(ProfilePage.PROFILE_URL);
    await expect(profilePage.profileName).toHaveText(displayName);
    await expect(profilePage.websiteName).toHaveText(website);
    await expect(profilePage.profileDescription).toHaveText(description);
}

test("redirects unauthenticated user to login and edits profile after login", async({page})=> {
    const loginPage = await editProfilePage.goToEditProfile() as LoginPage;
    await loginPage.navigateToLogin();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(page).toHaveURL(EditProfilePage.EDIT_PROFILE_URL);
    await expect(editProfilePage.userIconLocator).toBeVisible();
    await performEditProfile(page);
});

test("edits profile when user is already logged in", async({page})=> {
    const loginPage = new LoginPage({page});
    await loginPage.navigate();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD); 
    await editProfilePage.goToEditProfile() as EditProfilePage;
    await expect(page).toHaveURL(EditProfilePage.EDIT_PROFILE_URL);
    await expect(editProfilePage.userIconLocator).toBeVisible();
    await performEditProfile(page);
});