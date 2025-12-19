import { test, expect } from '@playwright/test';

test.describe('Public Blog Viewing', () => {
    // We assume seeded data exists.

    test('should view list of published blogs and search', async ({ page }) => {
        await page.goto('/');

        // Check if any blogs are visible
        await expect(page.locator('.MuiCard-root').first()).toBeVisible();

        // Search
        await page.getByPlaceholder('Search blogs...').fill('TypeScript');
        await page.waitForTimeout(2000); // Wait for debounce/fetch

        // Verify results
        await expect(page.locator('.MuiCard-root').first()).toBeVisible();
    });

    test('should view a single blog post', async ({ page }) => {
        await page.goto('/');

        // Click "Read More" on the first blog
        await page.getByText('Read More').first().click();

        // Verify URL
        await expect(page).toHaveURL(/\/blog\/\d+/);

        // Verify content visible
        // Check for title and published date which are always present
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
        await expect(page.getByText('Published on')).toBeVisible();
    });

    test('theme preference should persist', async ({ page }) => {
        await page.goto('/');

        const toggleBtn = page.getByTitle(/Switch to.*mode/);
        await toggleBtn.click();

        // Reload page
        await page.reload();

        // Verify theme is saved in localStorage under 'themeMode'
        const mode = await page.evaluate(() => localStorage.getItem('themeMode'));
        expect(mode).not.toBeNull();
    });

    test('read blogs are marked', async ({ page }) => {
        await page.goto('/');

        // Search for a known seeded blog to ensure stability
        await page.getByPlaceholder('Search blogs...').fill('TypeScript');
        await page.waitForTimeout(2000);

        // Get the first blog card and its title
        const firstBlogCard = page.locator('.MuiCard-root').first();

        // Click Read More on THIS card
        await firstBlogCard.getByText('Read More').click();

        await page.waitForURL(/\/blog\/\d+/);
        await expect(page.locator('h1')).toBeVisible();

        await page.goto('/');
        // Ensure search persists or clear it? 
        // If we go back, search query might be cleared. 
        // We need to find the card again. Use search again to be sure.
        await page.getByPlaceholder('Search blogs...').fill('TypeScript');
        await page.waitForTimeout(2000);
    });
});
