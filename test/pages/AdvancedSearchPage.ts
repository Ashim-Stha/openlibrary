import {Locator, Page} from "@playwright/test"
import { ADVANCED_SEARCH_URL } from "../helper-config";

export class AdvancedSearchPage {
    page: Page;
    advancedSearchLink: Locator;
    advancedSearchHeading: Locator;
    titleFieldLocator: Locator;
    authorFieldLocator: Locator;
    isbnFieldLocator: Locator;
    subjectFieldLocator: Locator;
    placeFieldLocator: Locator;
    personFieldLocator: Locator;
    publisherFieldLocator: Locator;
    searchButton: Locator;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.advancedSearchLink = page.locator('#test-body-mobile .nav-bar a[href="/advancedsearch"]');
        this.advancedSearchHeading = page.getByRole('heading', {name: 'Advanced Search'});
        this.titleFieldLocator = page.getByRole('textbox', {name: 'Title'});
        this.authorFieldLocator = page.getByRole('textbox', {name: 'Author'});
        this.isbnFieldLocator = page.getByRole('textbox', {name: 'ISBN'});
        this.subjectFieldLocator = page.getByRole('textbox', {name: 'Subject'});
        this.placeFieldLocator = page.getByRole('textbox', {name: 'Place'});
        this.personFieldLocator = page.getByRole('textbox', {name: 'Person'});
        this.publisherFieldLocator = page.getByRole('textbox', {name: 'Publisher'});
        this.searchButton = page.locator('#test-body-mobile #contentBody .cta-btn--search');
    }

    async navigateToAdvancedSearch() {
        await this.page.goto(ADVANCED_SEARCH_URL);
    }

    async advancedSearch({title, author, isbn, subject, place, person, publisher}:{title?:string, author?:string, isbn?:string, subject?:string, place?:string, person?:string, publisher?:string}) {
        if (title) {
            await this.titleFieldLocator.fill(title);
        };
        if (author) {
            await this.authorFieldLocator.fill(author);
        };
        if (isbn) {
            await this.isbnFieldLocator.fill(isbn);
        };
        if (subject) {
            await this.subjectFieldLocator.fill(subject);
        };
        if (place) {
            await this.placeFieldLocator.fill(place);
        };
        if (person) {
            await this.personFieldLocator.fill(person);
        };
        if (publisher) {
            await this.publisherFieldLocator.fill(publisher);
        };
        await this.searchButton.click();
    }
}