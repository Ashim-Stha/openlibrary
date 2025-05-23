import { Locator, Page } from "@playwright/test";
import { BASE_URL } from "../helper-config";

const AUTHOR_IMAGE_URL: string = `${BASE_URL}/authors/OL18283A/Daniel_Defoe`;
const DEFAULT_AUTHOR_IMAGE: string = "/images/icons/avatar_author-lg.png ";

export class AuthorImage {
  page: Page;
  addAuthorPhotoLocator: Locator;
  chooseFileLocator: Locator;
  uploadLocator: Locator;
  finishedButtonForAdd: Locator;
  manageAuthorImagesLocator: Locator;
  manageLocator: Locator;
  uploadedImagesLocator: Locator;
  trashCanLocator: Locator;
  saveForTrashcanButton: Locator;
  savedTickLocatorForAdd: Locator;
  savedTickLocatorForManage: Locator;
  afterImage: Locator;
  check: Locator;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.addAuthorPhotoLocator = page
      .locator("a")
      .filter({ hasText: "Add Author Photo" })
      .nth(1);

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
    this.finishedButtonForAdd = page
      .getByRole("tabpanel", { name: "Add" })
      .locator("iframe")
      .contentFrame()
      .getByRole("button", { name: "Finished" });
    this.manageAuthorImagesLocator = page
      .locator("a")
      .filter({ hasText: "Manage Author Photos" })
      .nth(1);

    this.manageLocator = page.getByRole("link", {
      name: "Manage",
      exact: true,
    });
    this.uploadedImagesLocator = page
      .getByRole("tabpanel", { name: "Manage" })
      .locator("iframe")
      .contentFrame()
      .locator("img");
    this.trashCanLocator = page
      .getByRole("tabpanel", { name: "Manage" })
      .locator("iframe")
      .contentFrame()
      .locator(".trash");
    this.saveForTrashcanButton = page
      .getByRole("tabpanel", { name: "Manage" })
      .locator("iframe")
      .contentFrame()
      .getByRole("button", { name: "Save" });
    this.savedTickLocatorForAdd = page
      .getByRole("tabpanel", { name: "Add" })
      .locator("iframe")
      .contentFrame()
      .getByText("Saved!");
    this.savedTickLocatorForManage = page
      .getByRole("tabpanel", { name: "Manage" })
      .locator("iframe")
      .contentFrame()
      .getByText("Saved!");
    this.afterImage = page
      .getByRole("tabpanel", { name: "Add" })
      .locator("iframe")
      .contentFrame()
      .getByRole("img", { name: "New book cover" });
    this.check = page.locator("img.cover").nth(1);
  }

  async add(filepath: string) {
    const url = await this.check.getAttribute("src");
    if (url === DEFAULT_AUTHOR_IMAGE) {
      await this.addNew(filepath);
    } else {
      await this.addMore(filepath);
    }
  }

  async addNew(filepath: string) {
    await this.addAuthorPhotoLocator.click();
    await this.chooseFileLocator.setInputFiles(filepath);
    await this.uploadLocator.click();
    await this.savedTickLocatorForAdd.waitFor();
  }

  async addMore(filepath: string) {
    await this.manageAuthorImagesLocator.click();
    await this.chooseFileLocator.setInputFiles(filepath);
    await this.uploadLocator.click();
    await this.savedTickLocatorForAdd.waitFor({ state: "attached" });
  }

  async remove() {
    await this.manageAuthorImagesLocator.waitFor({
      state: "visible",
      timeout: 60000,
    });
    await this.manageAuthorImagesLocator.click();
    await this.manageLocator.click();
    for (const result of await this.uploadedImagesLocator.all()) {
      await result.dragTo(this.trashCanLocator);
    }
    await this.saveForTrashcanButton.click();
    await this.savedTickLocatorForManage.waitFor({ state: "attached" });
  }

  async finished() {
    await this.finishedButtonForAdd.click();
  }

  async navigate() {
    await this.page.goto(AUTHOR_IMAGE_URL, { waitUntil: "networkidle" });
  }
}
