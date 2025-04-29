import { test, expect } from "@playwright/test";
import { home_url } from "../helper-config";
import { SearchPage } from "../pages/SearchPage";

const existingBook: string = "Luffy";
const nonexistingBook: string = "hfur";

test.beforeEach(async ({ page }) => {
  await page.goto(home_url);
});

test("search existing book", async ({ page }) => {
  const searchPage = new SearchPage({ page });
  await searchPage.search(existingBook);
  await expect(page.locator(".results")).toContainText(existingBook);
});

test("search nonexisting book", async ({ page }) => {
  const searchPage = new SearchPage({ page });
  await searchPage.search(nonexistingBook);
  await expect(
    page.getByText("No books directly matched your search.")
  ).toBeVisible();
});
