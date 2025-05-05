import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import {
  home_url,
  invalidEmail,
  validEmail,
  validPassword,
} from "../helper-config";

test.beforeEach(async ({ page }) => {
  await page.goto(home_url);
});

test("login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage({ page });
  await loginPage.navigateToLoginPage();
  await loginPage.login(validEmail, validPassword);
  await page.getByAltText("My account").click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});

test("login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage({ page });
  await loginPage.navigateToLoginPage();
  await loginPage.login(invalidEmail, "");
  const validationMessage = await page
    .locator("input#username")
    .evaluate((element) => {
      const input = element as HTMLInputElement;
      return input.validationMessage;
    });
  await expect(validationMessage).toContain(loginPage.errorMessage);
});
