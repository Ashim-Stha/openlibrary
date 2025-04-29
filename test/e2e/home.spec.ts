import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage({ page });
  await homePage.navigateToHome();
});

test('is homepage',async ({page})=>{
    const homePage=new HomePage({page})
    await expect(homePage.welcomeLocator).toBeVisible()
    await expect(homePage.browseBySubjectLocator).toBeVisible()
})

test("go to login", async ({ page }) => {
  const homePage = new HomePage({ page });
  await homePage.goToLogin();
  await expect(page.getByRole("button", { name: "Log In" })).toBeVisible();
});

test("go to signup", async ({ page }) => {
  const homePage = new HomePage({ page });
  await homePage.goToSignup();
  await expect(
    page.getByRole("button", { name: "Sign up with Email" })
  ).toBeVisible();
});
