# Bloggy Automation Test Suite

Comprehensive automated tests for the Bloggy application using Playwright.

## 🛠 Tech Stack

- **Framework**: [Playwright](https://playwright.dev/) - Chosen for its speed, reliability, built-in waiting mechanisms, and modern browser support.
- **Language**: TypeScript - For type safety and better developer experience.
- **Reporting**: Playwright HTML Reporter - Provides detailed test results and traces.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm

## 🚀 Setup & Installation

1.  **Install dependencies**
    ```bash
    npm install
    # Also installs Playwright browsers
    npx playwright install chromium
    ```

2.  **Start the Application**
    Ensure backend and frontend are running.
    ```bash
    npm run dev
    ```
    *Note: The test configuration is set to reuse the existing server or start it if not running.*

3.  **Seed Data (Optional but Recommended)**
    To ensure consistent test data:
    ```bash
    npm run reset && npm run seed
    ```

## 🏃‍♂️ Running Tests

### Run all tests (Headless)
```bash
npx playwright test
```

### Run tests with UI Mode
Great for debugging and watching execution.
```bash
npx playwright test --ui
```

### Run specific test file
```bash
npx playwright test tests/blog-management.spec.ts
```

### View Test Report
After running tests:
```bash
npx playwright show-report
```

## 🧪 Test Coverage

The suite covers the following key flows:

### 1. Blog Management (`tests/blog-management.spec.ts`)
- **Create & Publish**: Verifies creating a new post with Title, Excerpt, Content (Quill), Category, and Tags. Checks publishing flow.
- **Delete**: Verifies deleting a post using the admin dashboard and confirming the deletion dialog.

### 2. Public Viewing (`tests/public-viewing.spec.ts`)
- **List & Search**: Verifies blogs act as expected on home page and search functionality filters results.
- **View Post**: Verifies clicking a blog navigates to the detail view and displays content.
- **Theme Persistence**: Verifies toggling dark/light mode persists across page reloads (via localStorage).
- **Read Status**: Verifies visited blogs are marked as read (visual indicator).

### 3. Pagination (`tests/pagination.spec.ts`)
- **Navigation**: Verifies pagination controls exist (when enough data seeded).

## 📝 Notes & Assumptions

- **Authentication**: Tests use a helper `loginUser` which bypasses UI login for speed (using API) but sets proper client-state (localStorage).
- **Seed Data**: Tests assume the database is seeded (`npm run seed`) to have categories and initial blogs.
- **Selectors**: Used resilient selectors (Role, Label) where possible, falling back to CSS selectors where MUI structure required it.

