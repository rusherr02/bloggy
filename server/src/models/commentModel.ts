import { db } from '../db/database.js';
import type { Comment, CommentCreateInput } from 'shared';

interface CommentRow {
  id: number;
  blog_id: number;
  content: string;
  author_name: string;
  is_author: number;
  created_at: string;
}

function rowToComment(row: CommentRow): Comment {
  return {
    id: row.id,
    blogId: row.blog_id,
    content: row.content,
    authorName: row.author_name,
    isAuthor: Boolean(row.is_author),
    createdAt: row.created_at
  };
}

export const CommentModel = {
  create(data: CommentCreateInput, isAuthor: boolean = false): Comment {
    const stmt = db.prepare(`
      INSERT INTO comments (blog_id, content, author_name, is_author)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(data.blogId, data.content, data.authorName, isAuthor ? 1 : 0);

    const comment = this.findById(result.lastInsertRowid as number);
    if (!comment) throw new Error('Failed to create comment');
    return comment;
  },

  findById(id: number): Comment | undefined {
    const stmt = db.prepare('SELECT * FROM comments WHERE id = ?');
    const row = stmt.get(id) as CommentRow | undefined;
    return row ? rowToComment(row) : undefined;
  },

  findByBlogId(blogId: number): Comment[] {
    const stmt = db.prepare('SELECT * FROM comments WHERE blog_id = ? ORDER BY created_at DESC');
    const rows = stmt.all(blogId) as CommentRow[];
    return rows.map(rowToComment);
  },

  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM comments WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  },

  countByBlogId(blogId: number): number {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM comments WHERE blog_id = ?');
    const { count } = stmt.get(blogId) as { count: number };
    return count;
  }
};
