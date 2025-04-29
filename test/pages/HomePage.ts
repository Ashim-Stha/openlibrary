import { Locator, Page } from "@playwright/test";
import { home_url } from "../helper-config";

export class HomePage {
  page: Page;
  loginLinkLocator: Locator;
  signupLinkLocator: Locator;
  welcomeLocator: Locator;
  browseBySubjectLocator:Locator

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.loginLinkLocator = page.getByRole("link", { name: "Log In" });
    this.signupLinkLocator = page.getByRole("link", { name: "Sign Up" });
    this.welcomeLocator = page.getByRole("heading", {
      name: "Welcome to Open Library",
    });
    this.browseBySubjectLocator=page.getByRole('link',{
      name:'Browse by Subject'
    })
  }

  async navigateToHome() {
    await this.page.goto(home_url);
  }

  async goToLogin() {
    await this.loginLinkLocator.click();
  }

  async goToSignup() {
    await this.signupLinkLocator.click();
  }
}
