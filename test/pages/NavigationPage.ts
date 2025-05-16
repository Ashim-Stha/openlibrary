import { Locator, Page } from "@playwright/test"
import { LoginPage } from "./LoginPage";

export class NavigationPage {
    page : Page;
    myBooksLink: Locator;
    textToLogin: Locator;
    loginPage: LoginPage;
    booksDropdown: Locator;
    browseLink: Locator;
    dropdownOnBrowse: Locator;
    optionOnBrowseDropdown: Locator;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.myBooksLink = page.getByRole('link', {name: 'My Books'});
        this.textToLogin = page.getByText('Log in to use your free Open Library card to borrow digital books from the nonprofit Internet Archive', {exact: true});
        this.booksDropdown = page.locator('.disguised-select');
        this.browseLink = page.locator('#header-bar .browse-component details > summary');
        this.dropdownOnBrowse = page.locator('#header-bar .browse-dropdown-component .browse-dropdown-menu');
        this.optionOnBrowseDropdown = page.locator('#header-bar .browse-dropdown-component .browse-dropdown-menu li');
        }

    async navigateToMyBooks() {
        await this.myBooksLink.click();
    }

    async navigateToLogin(): Promise<LoginPage> {
        const loginPage = new LoginPage({ page: this.page });
        await loginPage.waitForLoad();
        return loginPage;
    }

    async navigateToBrowse() {
        await this.browseLink.click();
    }

}