import { test, expect } from "@playwright/test";
import { BASE_URL } from "../helper-config";
import { SearchPage } from "../pages/SearchPage";

const existingBook: string = "Alice";
const nonexistingBook: string = "hfur";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test("search existing book", async ({ page }) => {
  const searchPage = new SearchPage({ page });
  await searchPage.search(existingBook);
  for (const result of await searchPage.getResults()) {
    await expect(result).toContainText(existingBook);
  }
});

test("search non-existing book", async ({ page }) => {
  const searchPage = new SearchPage({ page });
  await searchPage.search(nonexistingBook);
  await expect(searchPage.getSearchNotMatchText()).toBeVisible();
});
