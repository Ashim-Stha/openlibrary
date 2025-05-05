import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import path from "path";
export class AddAuthorImage {
  page: Page;
  profileIcon: Locator;
  myProfileLocator: Locator;
  listLinkLocator: Locator;
  imageLocator: Locator;
  addAuthorPhotoLocator: Locator;
  chooseFileLocator: Locator;
  uploadLocator: Locator;
  finishedButtonLocator: Locator;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.profileIcon = page.getByAltText("My account");
    this.myProfileLocator = page.getByRole("link", { name: "My Profile" });
    this.listLinkLocator = page.locator(".results");
    this.imageLocator = page.locator(".bookcover img");
    this.addAuthorPhotoLocator = page.locator(
      `//span[@class="desktop-only"]//div[@class="manageCovers"]`
    );
    this.chooseFileLocator = page
      .getByRole("tabpanel", { name: "Add" })
      .locator("iframe")
      .contentFrame()
      .getByRole("button", { name: "Choose a JPG, GIF or PNG on" });
    this.uploadLocator = page
      .getByRole("tabpanel", { name: "Add" })
      .locator("iframe")
      .contentFrame()
      .getByRole("button", { name: "Upload" });
    this.finishedButtonLocator = page
      .getByRole("tabpanel", { name: "Add" })
      .locator("iframe")
      .contentFrame()
      .getByRole("button", { name: "Finished" });
  }

  async addImage() {
    await this.profileIcon.click();
    await this.myProfileLocator.click();
    await this.listLinkLocator.click();
    await this.imageLocator.click();
    await this.addAuthorPhotoLocator.click();
    await this.chooseFileLocator.setInputFiles(
      path.join(__dirname, "photo.png")
    );
    await this.uploadLocator.click();
  }
}
