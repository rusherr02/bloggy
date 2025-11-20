import { Request, Response } from 'express';
import { CommentModel } from '../models/commentModel.js';
import { BlogModel } from '../models/blogModel.js';
import { AuthRequest } from '../middleware/auth.js';
import type { CommentCreateInput } from 'shared';

export const CommentController = {
  async getByBlogId(req: Request, res: Response) {
    try {
      const blogId = parseInt(req.params.blogId);

      const blog = BlogModel.findById(blogId);
      if (!blog || blog.status === 'draft') {
        return res.status(404).json({ error: 'Blog not found' });
      }

      const comments = CommentModel.findByBlogId(blogId);
      res.json(comments);
    } catch (error) {
      console.error('Get comments error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const data: CommentCreateInput = req.body;

      if (!data.blogId || !data.content || !data.authorName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const blog = BlogModel.findById(data.blogId);
      if (!blog || blog.status === 'draft') {
        return res.status(404).json({ error: 'Blog not found' });
      }

      const comment = CommentModel.create(data, false);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Create comment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createAsAuthor(req: AuthRequest, res: Response) {
    try {
      const data: CommentCreateInput = req.body;

      if (!data.blogId || !data.content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const blog = BlogModel.findById(data.blogId);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      if (blog.authorId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      // Use authorName from request or default to "Author"
      data.authorName = data.authorName || 'Author';

      const comment = CommentModel.create(data, true);
      res.status(201).json(comment);
    } catch (error) {
      console.error('Create comment as author error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const comment = CommentModel.findById(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      const blog = BlogModel.findById(comment.blogId);
      if (!blog || blog.authorId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized to delete this comment' });
      }

      const deleted = CommentModel.delete(id);
      if (deleted) {
        res.json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).json({ error: 'Comment not found' });
      }
    } catch (error) {
      console.error('Delete comment error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
