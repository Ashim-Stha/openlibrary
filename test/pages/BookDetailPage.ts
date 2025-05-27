import { Locator, Page } from "@playwright/test";

export class BookDetailPage {
  page: Page;
  reviewLocator: Locator;
  ratingsLocator: Locator;
  static readonly url: string =
    "http://localhost:8080/works/OL45310W/Robinson_Crusoe";
  ratedClass: string = "star-selected";

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.reviewLocator = page.locator(
      '//*[@id="read-options"]/div[4]/div[1]/a'
    );
    this.ratingsLocator = page.locator("#starRatingSection label");
  }

  getRatedLocator(rating: number): Locator {
    return this.ratingsLocator.filter({ hasText: rating.toString() });
  }

  async review(rating: number) {
    await this.getRatedLocator(rating).click();
  }

  async navigate() {
    await this.page.goto(BookDetailPage.url);
  }

  async waitForLoad() {
    await this.page.waitForURL(BookDetailPage.url);
    await this.reviewLocator.waitFor();
  }
}
