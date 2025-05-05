import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { home_url, validEmail, validPassword } from "../helper-config";
import { AddBookPage } from "../pages/AddBookPage";

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(home_url);
  const loginPage = new LoginPage({ page });
  await loginPage.navigateToLoginPage();
  await loginPage.login(validEmail, validPassword);
});

test("add book", async ({ page }: { page: Page }) => {
  const title: string = "One Piece";
  const publisher: string = "Luffy and Zoro";
  const published: string = "1999";
  
  const addBookPage = new AddBookPage({ page });
  await addBookPage.navigateToAddBook();
  await addBookPage.addBook(title, publisher, published);
  await expect(
    page.getByText(
      "Thank you for adding that book! Any more information you could provide would be wonderful!",
      { exact: true }
    )
  ).toBeVisible();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(
    page.getByText("Thank you very much for adding that new book!")
  ).toBeVisible();
});
