import { db } from '../db/database.js';
import type { Blog, BlogCreateInput, BlogUpdateInput, BlogListItem, PaginatedResponse } from 'shared';

interface BlogRow {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string;
  status: 'draft' | 'published';
  author_id: number;
  image_url?: string;
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
  comment_count?: number;
}

function rowToBlog(row: BlogRow): Blog {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    excerpt: row.excerpt,
    category: row.category,
    tags: JSON.parse(row.tags),
    status: row.status,
    authorId: row.author_id,
    imageUrl: row.image_url,
    views: row.views,
    likes: row.likes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function rowToBlogListItem(row: BlogRow): BlogListItem {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    tags: JSON.parse(row.tags),
    status: row.status,
    views: row.views,
    likes: row.likes,
    commentCount: row.comment_count || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export const BlogModel = {
  create(data: BlogCreateInput, authorId: number): Blog {
    const stmt = db.prepare(`
      INSERT INTO blogs (title, content, excerpt, category, tags, status, author_id, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.title,
      data.content,
      data.excerpt,
      data.category,
      JSON.stringify(data.tags),
      data.status,
      authorId,
      data.imageUrl || null
    );

    const blog = this.findById(result.lastInsertRowid as number);
    if (!blog) throw new Error('Failed to create blog');
    return blog;
  },

  findById(id: number): Blog | undefined {
    const stmt = db.prepare('SELECT * FROM blogs WHERE id = ?');
    const row = stmt.get(id) as BlogRow | undefined;
    return row ? rowToBlog(row) : undefined;
  },

  findAll(page: number = 1, limit: number = 10): PaginatedResponse<BlogListItem> {
    const offset = (page - 1) * limit;

    const countStmt = db.prepare('SELECT COUNT(*) as count FROM blogs WHERE status = ?');
    const { count } = countStmt.get('published') as { count: number };

    const stmt = db.prepare(`
      SELECT b.*, COUNT(c.id) as comment_count
      FROM blogs b
      LEFT JOIN comments c ON b.id = c.blog_id
      WHERE b.status = ?
      GROUP BY b.id
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `);
    const rows = stmt.all('published', limit, offset) as BlogRow[];

    return {
      data: rows.map(rowToBlogListItem),
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  },

  findAllAdmin(page: number = 1, limit: number = 10): PaginatedResponse<BlogListItem> {
    const offset = (page - 1) * limit;

    const countStmt = db.prepare('SELECT COUNT(*) as count FROM blogs');
    const { count } = countStmt.get() as { count: number };

    const stmt = db.prepare(`
      SELECT b.*, COUNT(c.id) as comment_count
      FROM blogs b
      LEFT JOIN comments c ON b.id = c.blog_id
      GROUP BY b.id
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `);
    const rows = stmt.all(limit, offset) as BlogRow[];

    return {
      data: rows.map(rowToBlogListItem),
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  },

  search(query: string, category?: string, tags?: string[], page: number = 1, limit: number = 10): PaginatedResponse<BlogListItem> {
    const offset = (page - 1) * limit;
    let sql = `
      SELECT b.*, COUNT(c.id) as comment_count
      FROM blogs b
      LEFT JOIN comments c ON b.id = c.blog_id
      WHERE b.status = 'published'
    `;
    const params: any[] = [];

    if (query) {
      sql += ` AND (b.title LIKE ? OR b.content LIKE ? OR b.excerpt LIKE ?)`;
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      sql += ` AND b.category = ?`;
      params.push(category);
    }

    if (tags && tags.length > 0) {
      const tagConditions = tags.map(() => `b.tags LIKE ?`).join(' AND ');
      sql += ` AND (${tagConditions})`;
      tags.forEach(tag => params.push(`%"${tag}"%`));
    }

    sql += ` GROUP BY b.id ORDER BY b.created_at DESC`;

    const countSql = sql.replace(/SELECT b\.\*, COUNT\(c\.id\) as comment_count/, 'SELECT COUNT(DISTINCT b.id) as count')
      .replace(/GROUP BY b\.id ORDER BY b\.created_at DESC/, '');
    const countStmt = db.prepare(countSql);
    const { count } = countStmt.get(...params) as { count: number };

    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const stmt = db.prepare(sql);
    const rows = stmt.all(...params) as BlogRow[];

    return {
      data: rows.map(rowToBlogListItem),
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    };
  },

  update(data: BlogUpdateInput): Blog | undefined {
    const updates: string[] = [];
    const params: any[] = [];

    if (data.title !== undefined) {
      updates.push('title = ?');
      params.push(data.title);
    }
    if (data.content !== undefined) {
      updates.push('content = ?');
      params.push(data.content);
    }
    if (data.excerpt !== undefined) {
      updates.push('excerpt = ?');
      params.push(data.excerpt);
    }
    if (data.category !== undefined) {
      updates.push('category = ?');
      params.push(data.category);
    }
    if (data.tags !== undefined) {
      updates.push('tags = ?');
      params.push(JSON.stringify(data.tags));
    }
    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }
    if (data.imageUrl !== undefined) {
      updates.push('image_url = ?');
      params.push(data.imageUrl);
    }

    if (updates.length === 0) {
      return this.findById(data.id);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    params.push(data.id);

    const stmt = db.prepare(`UPDATE blogs SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...params);

    return this.findById(data.id);
  },

  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM blogs WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  },

  incrementViews(id: number): void {
    const stmt = db.prepare('UPDATE blogs SET views = views + 1 WHERE id = ?');
    stmt.run(id);
  },

  incrementLikes(id: number): void {
    const stmt = db.prepare('UPDATE blogs SET likes = likes + 1 WHERE id = ?');
    stmt.run(id);
  },

  getCategories(): string[] {
    const stmt = db.prepare('SELECT DISTINCT category FROM blogs WHERE status = ? ORDER BY category');
    const rows = stmt.all('published') as { category: string }[];
    return rows.map(row => row.category);
  }
};
