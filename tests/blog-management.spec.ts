import { test, expect } from '@playwright/test';
import { loginUser } from './utils';

test.describe('Blog Management', () => {
    // Reset data before tests to ensure clean state
    test.beforeAll(async ({ request }) => {
        // We can run the reset script or use API if available. 
        // Since we don't have direct DB access easily from here without setting it up, 
        // let's rely on the environment being seeded or just create unique data.
        // Ideally we'd spawn `npm run reset && npm run seed` here.
    });

    test.beforeEach(async ({ page }) => {
        await loginUser(page);
    });

    test('should create and publish a new blog post', async ({ page }) => {
        const timestamp = Date.now();
        const uniqueTitle = `Test Blog Post ${timestamp}`;

        await page.getByRole('button', { name: 'New Blog Post' }).click();

        await page.getByLabel('Title').fill(uniqueTitle);
        await page.getByLabel('Excerpt').fill('This is a test excerpt for automation.');

        // React Quill: the editor usually has a role or class. .ql-editor is standard.
        await page.locator('.ql-editor').fill('This is the main content of the blog post.');

        // Category Select
        // Using simple class selector as MUI Select structure is complex
        await page.locator('.MuiSelect-select').first().click();
        await page.getByRole('option', { name: 'Technology' }).click();

        // Tags Select (multiple)
        await page.locator('.MuiSelect-select').nth(1).click();
        await page.getByRole('option', { name: 'React' }).click();
        // Close the select menu by clicking outside (backdrop)
        await page.keyboard.press('Escape');

        // Publish
        // The "Publish Now" button is only visible if standard Save was clicked or if we toggle status?
        // Code says: if status === 'draft', show Publish Now button (if title etc filled).
        // And there is a Status toggle group. Default is draft.
        // We can just click "Publish Now" button if visible.

        await expect(page.getByRole('button', { name: 'Publish Now' })).toBeVisible();
        await page.getByRole('button', { name: 'Publish Now' }).click();

        // Verify redirection to Admin Dashboard
        await expect(page).toHaveURL('/admin');

        // Verify post is in the list
        const row = page.locator('tr').filter({ hasText: uniqueTitle });
        await expect(row).toBeVisible();
        await expect(row.getByText('published', { exact: false })).toBeVisible();
    });

    test('should delete a blog post', async ({ page }) => {
        // Assuming there's at least one post. If not, we should create one or seed.
        // Let's create one specifically to delete to be safe.
        const timestamp = Date.now();
        const titleToDelete = `Delete Me ${timestamp}`;

        // Crate post to delete
        await page.goto('/admin/blog/new');
        await page.getByLabel('Title').fill(titleToDelete);
        await page.getByLabel('Excerpt').fill('To be deleted');
        await page.locator('.ql-editor').fill('Content');
        await page.locator('.MuiSelect-select').first().click();
        await page.getByRole('option', { name: 'Technology' }).click();
        await page.getByRole('button', { name: 'Save' }).click(); // Save as draft is fine

        await page.waitForURL('/admin');

        // Find the row with the title
        const row = page.locator('tr', { hasText: titleToDelete });
        await expect(row).toBeVisible();

        // Click delete button in that row
        await row.getByTitle('Delete').click();

        // Dialog should appear
        await expect(page.getByText('Are you sure you want to delete this blog post?')).toBeVisible();

        // Confirm delete
        await page.getByTestId('confirm-delete-button').click();

        // Verify it's gone
        await expect(page.getByText(titleToDelete)).not.toBeVisible();
    });
});
