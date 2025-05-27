import { test, expect, Page } from "@playwright/test";
import { BookDetailPage } from "../pages/BookDetailPage";
import { LoginPage } from "../pages/LoginPage";
import { VALID_EMAIL, VALID_PASSWORD } from "../helper-config";

const rating: number = 2;

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(LoginPage.LOGIN_URL);
  const loginPage = new LoginPage({ page });
  await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
  const bookDetailPage = new BookDetailPage({ page });
  await bookDetailPage.navigate();
  await bookDetailPage.waitForLoad();
});

test("rate book", async ({ page }: { page: Page }) => {
  const bookDetailPage = new BookDetailPage({ page });
  await bookDetailPage.review(rating);
  await expect(bookDetailPage.getRatedLocator(rating)).toContainClass(
    bookDetailPage.ratedClass
  );
});
