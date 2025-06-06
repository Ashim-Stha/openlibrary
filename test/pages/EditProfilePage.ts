import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";
import { ProfilePage } from "./ProfilePage";
import { LoginPage } from "./LoginPage";
export class EditProfilePage {
    page: Page;
    static readonly EDIT_PROFILE_URL = `${BASE_URL}/people/openlibrary?m=edit`;
    userIconLocator: Locator;
    displayNameFieldLocator: Locator;
    websiteFieldLocator: Locator;
    descriptionFieldLocator: Locator;
    changedNotesFieldLocator: Locator;
    saveButtonLocator: Locator;
    cancelLinkLocator: Locator;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.userIconLocator = page.locator('.hamburger-component .account__icon');
        this.displayNameFieldLocator = page.getByRole('textbox', {name: 'Display Name'});
        this.websiteFieldLocator = page.locator('#clone_website input');
        this.descriptionFieldLocator = page.locator('.formElement .markdown');
        this.changedNotesFieldLocator = page.getByRole('textbox', 
            {name: 'Please, leave a short note about what you changed:'});
        this.saveButtonLocator = page.getByRole('button', {name: 'Save'});
        this.cancelLinkLocator = page.getByRole('link', {name:'Cancel'});
    }

    async goToEditProfile(): Promise<LoginPage | EditProfilePage> {
        const loginPage = new LoginPage({page: this.page});
        const currentURL = this.page.url();
        const loginLinkVisible = await loginPage.loginLinkLocator.isVisible().catch(() => false);
        if (currentURL.includes(EditProfilePage.EDIT_PROFILE_URL) && loginLinkVisible ) {
            return loginPage;
        } 
        return new EditProfilePage({page: this.page});
    }

    async editProfile(
        {displayName, website, description, changedNotes}: 
        {displayName?: string, website?: string, description?: string, changedNotes?: string}
        ): Promise<ProfilePage> {
        if(displayName) {
            await this.displayNameFieldLocator.fill(displayName);
        }
         if(website) {
            await this.websiteFieldLocator.fill(website);
        }
         if(description) {
            await this.descriptionFieldLocator.fill(description);
        }
         if(changedNotes) {
            await this.changedNotesFieldLocator.fill(changedNotes);
        }
        await this.saveButtonLocator.click();
        const profilePage = new ProfilePage({page: this.page});
        return profilePage;
    }
}