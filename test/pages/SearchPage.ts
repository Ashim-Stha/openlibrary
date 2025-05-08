import { Locator, Page } from "@playwright/test";

export class SearchPage {
  page: Page;
  searchBoxLocator: Locator;
  searchButton: Locator;
  resultLocator: Locator;
  notMatchLocator: Locator;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.searchBoxLocator = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.getByRole("button", { name: "Search submit" });
    this.resultLocator = page.locator(".results");
    this.notMatchLocator = page.getByText(
      "No books directly matched your search."
    );
  }

  async search(searchString: string) {
    await this.searchBoxLocator.fill(searchString);
    await this.searchButton.click();
  }

  async getResults(): Promise<Locator[]> {
    const results: Locator[] = [];
    for (const result of await this.resultLocator.all()) {
      results.push(result);
    }
    return results;
  }

  getSearchNotMatchText(): Locator {
    return this.notMatchLocator;
  }
}
