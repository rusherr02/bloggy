# Fullstack Blog Application

A modern, fullstack blogging platform built with React, Express, TypeScript, and SQLite.

## Features

### Public Features
- Browse and view blog posts
- Search blogs by keywords
- Filter by categories and tags
- Anonymous commenting
- Like posts
- Pagination for blog lists
- Dark/Light mode toggle with persistence
- Visual marking of read blogs (browser storage)
- Responsive Material-UI design

### Admin Features
- Secure JWT-based authentication
- Create, edit, and delete blog posts
- Rich text editor for content creation
- Draft and published status management
- View analytics (views, likes, comments per blog)
- Comment as author (highlighted)
- Delete comments
- Category and tag management

## Tech Stack

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **SQLite** - Database (better-sqlite3)
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **React Router** - Navigation
- **React Quill** - Rich text editor
- **Axios** - HTTP client

### Build Tools
- **Vite** - Frontend build tool
- **tsx** - TypeScript execution for backend

## Project Structure

```
max-sandbox/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── contexts/    # React contexts
│   │   └── App.tsx      # Main app component
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth middleware
│   │   └── db/          # Database setup
├── shared/              # Shared TypeScript types
└── package.json         # Root package with scripts
```

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

This will install dependencies for the root, client, server, and shared packages.

2. (Optional) Seed the database with test data:
```bash
npm run seed
```

This creates an admin user and 12 realistic blog posts with comments and engagement metrics.

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### Running the Application

#### Development Mode

To run both client and server concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1 - Backend (http://localhost:3001)
npm run dev:server

# Terminal 2 - Frontend (http://localhost:5173)
npm run dev:client
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

#### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Public Endpoints

- `GET /api/blogs/public` - Get all published blogs (paginated)
- `GET /api/blogs/public/:id` - Get a specific blog
- `GET /api/blogs/search` - Search blogs
- `GET /api/blogs/categories` - Get all categories
- `POST /api/blogs/:id/like` - Like a blog
- `GET /api/comments/blog/:blogId` - Get comments for a blog
- `POST /api/comments` - Create a comment

### Admin Endpoints (require JWT)

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new admin
- `GET /api/blogs/admin` - Get all blogs (including drafts)
- `GET /api/blogs/admin/:id` - Get blog by ID (admin)
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog
- `POST /api/comments/author` - Create comment as author
- `DELETE /api/comments/:id` - Delete a comment

## Environment Variables

Server environment variables (`.env`):
```
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## Database

The application uses SQLite with the following schema:

- **users** - Admin users
- **blogs** - Blog posts
- **comments** - Comments on blogs
- **likes** - Like records

The database is automatically initialized on first run at `server/database.sqlite`.

### Database Commands

```bash
# Seed database with test data (creates admin user and sample blogs)
npm run seed

# Reset database (drops all tables)
npm run reset
```

**Note:** After running `npm run reset`, the database will be empty. Run `npm run seed` to populate it with test data, or start the server to recreate empty tables.

## Default Admin Account

To create an admin account:
1. Run `npm run seed` for the default admin (username: `admin`, password: `admin123`)
2. Or use the Register tab on the login page (http://localhost:5173/login)

## Features in Detail

### Rich Text Editor
- Formatting (bold, italic, underline, strike)
- Headers (H1, H2, H3)
- Lists (ordered and unordered)
- Colors and backgrounds
- Links and images
- Clean paste

### Search & Filtering
- Full-text search across title, content, and excerpt
- Category filtering
- Tag-based filtering
- Combined filters support

### Blog Management
- Draft mode for work-in-progress posts
- One-click publish from draft
- View count tracking
- Like count tracking
- Comment management

### Theme & UX
- Dark/Light mode toggle (persisted in localStorage)
- Visual marking of read blogs with badge
- Reduced opacity for read articles
- Read status tracked in browser storage

### Security
- Password hashing with bcrypt
- JWT-based authentication
- Protected admin routes
- Input validation
- CORS enabled

## Development

### Adding New Categories
Edit the `categories` array in `client/src/pages/BlogEditor.tsx`

### Adding New Tags
Edit the `availableTags` array in `client/src/pages/BlogEditor.tsx`

## License

MIT
