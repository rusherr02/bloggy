## Overview

You've been provided with a fullstack blog application built with React, Express, TypeScript, and SQLite. Your task is to create a comprehensive test suite that demonstrates your testing skills, automation expertise, and attention to quality.

## Application Overview

### Public Features
- Browse and search blog posts
- View individual blog posts
- Like posts (anonymous)
- Comment on posts (anonymous)
- Filter by category and tags
- Dark/light mode toggle
- Pagination

### Admin Features (requires login)
- Create, edit, and delete blog posts
- Rich text editor with image upload
- Draft and published status management
- View analytics (views, likes, comments)
- Comment as author (highlighted)
- Delete comments

### Technical Features
- Real-time comments via WebSocket
- Form validation (client and server)
- Image upload with validation
- Browser storage (theme, read status)
- JWT authentication

## Getting Started

### Setup
```bash
npm install           # Install all dependencies
npm run seed          # Generate test data
npm run dev           # Start both servers
npm run reset         # Clear all data
```

**Admin Credentials (after seeding):**
- Username: `admin`
- Password: `admin123`

**URLs:**
- Frontend: http://localhost:5173 (or 5174)
- Backend: http://localhost:3001

## Assignment Requirements

Create a test suite covering the following scenarios. You may use **any testing framework** you're comfortable with (Playwright, Cypress, Selenium, etc.).

#### Flows to test:

1. **Blog Management**
   - Create a new blog post and publish it
   - Delete a blog post with confirmation

2. **Public Blog Viewing**
   - View list of published blogs
   - Search for blogs by keyword
   - View a blog
   - Theme preference persists across sessions
   - Read blogs are visually marked across sessions

3. **Pagination**
   - Navigate through multiple pages
   - Page state persists in URL

### Deliverables

Submit the following:

1. **Test Code**
   - All test files
   - Configuration files
   - Helper/utility files
   - Page Object Models (if used)

2. **README.md** with:
   - Framework/tools you chose and why
   - Setup instructions
   - How to run tests
   - Test coverage summary
   - Any assumptions or notes

3. **Test Report**
   - Can be HTML report, JSON, or screenshots
   - Should show test results

4. **(Optional) CI/CD Integration**
   - GitHub Actions, CircleCI, or similar
   - Shows tests running automatically

## Testing Tips

1. **Use the `/api/delay/:ms` endpoint** to test loading states explicitly
2. **Consider API-level testing** for better speed and reliability
3. **Test both happy paths and edge cases**
4. **Handle async properly** - wait for elements, network calls, etc.
5. **Use test data commands** - `npm run reset && npm run seed` between test runs

## Questions?

If you have questions about:
- **Application behavior**: Test it and document assumptions
- **Requirements**: Use your best judgment for realistic scenarios
- **Technical issues**: Document in your README

## Timeline

Please submit your work within **5 days** of receiving this assignment.

Good luck! We're excited to see your approach to testing this application.
