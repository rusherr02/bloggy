# Quick Start Guide

## Your Blog App is Ready!

The development servers are currently running:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## Getting Started

### Option A: Use Seeded Test Data (Recommended)

The fastest way to explore the app:

```bash
npm run seed
```

This creates:
- Admin user (username: `admin`, password: `admin123`)
- 12 realistic blog posts (11 published, 1 draft)
- Comments and engagement metrics
- Various categories and tags

Then visit http://localhost:5173 and explore! Log in at http://localhost:5173/login with the admin credentials.

### Option B: Create Your Own Content

1. Visit http://localhost:5173/login
2. Click on the "Register" tab
3. Enter a username and password (min 6 characters)
4. Click "Register"

You'll be automatically logged in and redirected to the admin dashboard.

### 2. Create Your First Blog Post

1. Click "New Blog Post" button
2. Fill in the form:
   - **Title**: Your blog post title
   - **Excerpt**: A short summary (shown in blog list)
   - **Content**: Use the rich text editor to write your content
   - **Category**: Choose a category
   - **Tags**: Select relevant tags
   - **Status**: Choose "Draft" or "Published"
3. Click "Save" to save as draft, or "Publish Now" to publish immediately

### 3. View Your Blog

1. Navigate to http://localhost:5173
2. You'll see your published blogs on the home page
3. Click "Read More" to view the full blog post

### 4. Test Public Features

As a visitor (logged out), you can:
- Browse all published blogs
- Search for blogs using the search bar
- Filter by category
- Toggle between dark and light mode (button in navbar)
- View individual blog posts (automatically marked as "Read")
- Like posts
- Leave anonymous comments
- See visual indicators for blogs you've already read

### 5. Test Admin Features

As an admin (logged in), you can:
- View all blogs (including drafts) in the dashboard
- Edit or delete any blog post
- View analytics (views, likes, comments)
- Comment on blogs as "Author" (highlighted)
- Delete any comment
- Publish draft posts

## Available Scripts

### Development
```bash
npm run dev              # Run both servers
npm run dev:server       # Run backend only
npm run dev:client       # Run frontend only
```

### Production
```bash
npm run build            # Build both client and server
npm start                # Start production server
```

## Example Blog Content

Try creating a blog with this content:

**Title**: Getting Started with TypeScript

**Excerpt**: Learn the basics of TypeScript and why it's becoming essential for modern web development.

**Content**:
```
# Introduction

TypeScript has revolutionized JavaScript development by adding static typing.

## Key Benefits

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete and refactoring
- **Improved Code Quality**: Self-documenting code

## Example Code

TypeScript interfaces make your code more maintainable:

interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "John Doe",
  email: "john@example.com"
};
```

**Category**: Programming

**Tags**: TypeScript, Tutorial

## Troubleshooting

### Port Already in Use
If you see a port conflict, you can change the ports in:
- Frontend: `client/vite.config.ts` (currently 5173)
- Backend: `server/.env` (currently 3001)

### Database Issues
The SQLite database is at `server/database.sqlite`. To reset it:
```bash
npm run reset    # Drops all tables
npm run seed     # Repopulate with test data
```

### Clear Read Status
Read blogs are stored in your browser's localStorage. To clear:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Find localStorage
4. Delete the `readBlogs` key
5. Or run: `localStorage.removeItem('readBlogs')`

### Missing Dependencies
If you encounter missing dependencies:
```bash
npm install
```

## Next Steps

1. Customize the categories in `client/src/pages/BlogEditor.tsx`
2. Customize the tags in `client/src/pages/BlogEditor.tsx`
3. Modify the theme colors in `client/src/App.tsx`
4. Add your own branding and styling

## Tips

- Use draft status while working on posts
- Rich text editor supports images via URLs
- Comments are anonymous by default (visitors)
- Admin comments are highlighted with "Author" badge
- View tracking is automatic on each blog view
- Likes are tracked (simplified, no duplicate prevention for anonymous)
- Dark/light mode preference is saved in your browser
- Read blogs are marked with a green "Read" badge and reduced opacity
- All read status is stored locally (not on the server)

## New Features

### Dark/Light Mode
- Click the sun/moon icon in the navbar to toggle
- Your preference is automatically saved
- Works across all pages

### Read Blog Tracking
- Blogs you've read are automatically marked
- Visual indicators: green "Read" badge and 70% opacity
- Tracked in browser storage (persists across sessions)
- Clear by removing `readBlogs` from localStorage

### Test Data Commands
```bash
npm run seed     # Create 12 blog posts with realistic content
npm run reset    # Clear all data and start fresh
```

Enjoy your new blog platform!
