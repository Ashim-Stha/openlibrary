import test, { expect } from "@playwright/test";
import { home_url, validEmail, validPassword } from "../helper-config";
import { LoginPage } from "../pages/LoginPage";
import { AddAuthorImage } from "../pages/AddAuthorImage";

test.beforeEach(async ({ page }) => {
  await page.goto(home_url);
  const loginPage = new LoginPage({ page });
  await loginPage.navigateToLoginPage();
  await loginPage.login(validEmail, validPassword);
});

test("should add author image", async ({ page }) => {
  const addAuthorImage = new AddAuthorImage({ page });
  await addAuthorImage.addImage();
  await addAuthorImage.finishedButtonLocator.waitFor()
  await expect(addAuthorImage.finishedButtonLocator).toBeVisible();
});
