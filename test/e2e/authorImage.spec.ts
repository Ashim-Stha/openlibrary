import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  IMAGE_PATH,
  VALID_EMAIL,
  VALID_PASSWORD,
} from "../helper-config";
import { LoginPage } from "../pages/LoginPage";
import { AuthorImage } from "../pages/AuthorImagePage";

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
  const loginPage = new LoginPage({ page });
  await loginPage.navigate();
  await loginPage.waitForLoad();
  await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
  const authorImage = new AuthorImage({ page });
  await authorImage.navigate();
});

test("add author image", async ({ page }) => {
  const authorImage = new AuthorImage({ page });
  await authorImage.add(IMAGE_PATH);
  await expect(authorImage.afterImage).toBeVisible();
});

test("remove author image", async ({ page }) => {
  const authorImage = new AuthorImage({ page });
  await authorImage.add(IMAGE_PATH);
  await authorImage.finished();
  await authorImage.page.reload();
  await authorImage.remove();
  await expect(authorImage.afterImage).not.toBeVisible();
});

test.afterEach(async ({ page }) => {
  const authorImage = new AuthorImage({ page });
  await authorImage.page.reload();
});
