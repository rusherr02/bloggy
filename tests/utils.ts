import { Page } from '@playwright/test';

export async function loginUser(page: Page) {
    const response = await page.request.post('/api/auth/login', {
        data: { username: 'admin', password: 'admin123' }
    });

    if (!response.ok()) {
        throw new Error(`API Login failed: ${await response.text()}`);
    }

    const { token, user } = await response.json();

    // Go to app origin to set localStorage
    await page.goto('/');

    await page.evaluate(({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }, { token, user });

    await page.goto('/admin');
}

export async function createBlogPost(page: Page, title: string, category: string = 'Technology') {
    await page.goto('/admin/blog/new');
    await page.getByLabel('Title').fill(title);
    await page.getByLabel('Excerpt').fill('This is a test excerpt');

    // Fill React Quill content
    await page.locator('.ql-editor').fill('This is the blog content.');

    // Select Category
    await page.getByRole('combobox', { name: 'Category' }).click();
    await page.getByRole('option', { name: category }).click();
}
