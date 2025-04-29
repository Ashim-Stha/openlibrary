import { Locator, Page } from "@playwright/test";

export class SearchPage {
  page: Page;
  searchBoxLocator: Locator;
  searchButton: Locator;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.searchBoxLocator = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.getByRole("button", { name: "Search submit" });
  }

  async search(searchString:string){
    await this.searchBoxLocator.fill(searchString)
    await this.searchButton.click()
  }
}
