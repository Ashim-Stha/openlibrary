import { Locator, Page } from "@playwright/test";

export class BookReviewPopup {
    page: Page;
    bookReviewPopupLocator: Locator;
    reviewsContainerLocator: Locator;
    selectedReviewsLocator: Locator;
    reviewPopupCloseIconLocator: Locator;
    reviewClarityTitleLocator: Locator;
    reviewClarityFeatureLocator: Locator;
    reviewPaceTitleLocator: Locator;
    reviewPaceFeatureLocator: Locator;
    selectedReviewCloseIconLocator: Locator;

    constructor({page}: {page: Page}) {
        this.page = page;
        this.bookReviewPopupLocator = page.locator('#colorbox #cboxWrapper');
        this.reviewsContainerLocator = page.locator('div.selection-panel');
        this.selectedReviewsLocator = page.locator('.selection-chip');
        this.reviewPopupCloseIconLocator = page.getByRole('link', {name: '× Close'});
        this.reviewClarityTitleLocator = page.locator('#cboxLoadedContent').getByText('• Clarity').nth(0);
        this.reviewClarityFeatureLocator = page.locator('.card-body').getByText('Dense').nth(0);
        this.reviewPaceTitleLocator = page.locator('#cboxLoadedContent').getByText('• Pace').nth(0);
        this.reviewPaceFeatureLocator = page.locator('.card-body').getByText('Slow paced').nth(0);
        this.selectedReviewCloseIconLocator = page.locator('.selection-panel .close-icon').nth(0);
    }

    async getSelectedReviewCounts(): Promise<number> {
        return await this.selectedReviewsLocator.count();
    }

    async selectReviewOptions() {
        await this.reviewClarityTitleLocator.click();
        await this.reviewClarityFeatureLocator.click();
        await this.reviewPaceTitleLocator.click();
        await this.reviewPaceFeatureLocator.click();
    }

    async close() {
        await this.reviewPopupCloseIconLocator.click();
    }

    async getSelectedReviewsText(): Promise<string[]> {
        const selectedReviewsText = await this.selectedReviewsLocator.allInnerTexts();
        const cleanedSelectedReviews = selectedReviewsText.map((text)=> text.replace(/×$/, '').trim()); 
        return cleanedSelectedReviews;
    }

    async closeSelectedReview() {
        await this.selectedReviewCloseIconLocator.click();
    }
}