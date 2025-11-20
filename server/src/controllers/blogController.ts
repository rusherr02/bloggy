import { Request, Response } from 'express';
import { BlogModel } from '../models/blogModel.js';
import { AuthRequest } from '../middleware/auth.js';
import type { BlogCreateInput, BlogUpdateInput } from 'shared';

export const BlogController = {
  // Public endpoints
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = BlogModel.findAll(page, limit);
      res.json(result);
    } catch (error) {
      console.error('Get all blogs error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const blog = BlogModel.findById(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      if (blog.status === 'draft') {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Increment views
      BlogModel.incrementViews(id);

      res.json(blog);
    } catch (error) {
      console.error('Get blog by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async search(req: Request, res: Response) {
    try {
      const query = req.query.query as string || '';
      const category = req.query.category as string | undefined;
      const tags = req.query.tags ? (req.query.tags as string).split(',') : undefined;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = BlogModel.search(query, category, tags, page, limit);
      res.json(result);
    } catch (error) {
      console.error('Search blogs error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getCategories(req: Request, res: Response) {
    try {
      const categories = BlogModel.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Admin endpoints (require authentication)
  async getAllAdmin(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = BlogModel.findAllAdmin(page, limit);
      res.json(result);
    } catch (error) {
      console.error('Get all blogs (admin) error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getByIdAdmin(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const blog = BlogModel.findById(id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      res.json(blog);
    } catch (error) {
      console.error('Get blog by ID (admin) error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const data: BlogCreateInput = req.body;

      if (!data.title || !data.content || !data.excerpt || !data.category) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!data.tags) {
        data.tags = [];
      }

      if (!data.status) {
        data.status = 'draft';
      }

      const blog = BlogModel.create(data, req.userId!);
      res.status(201).json(blog);
    } catch (error) {
      console.error('Create blog error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data: BlogUpdateInput = { ...req.body, id };

      const existingBlog = BlogModel.findById(id);
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      if (existingBlog.authorId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized to update this blog' });
      }

      const updatedBlog = BlogModel.update(data);
      res.json(updatedBlog);
    } catch (error) {
      console.error('Update blog error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const existingBlog = BlogModel.findById(id);
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      if (existingBlog.authorId !== req.userId) {
        return res.status(403).json({ error: 'Unauthorized to delete this blog' });
      }

      const deleted = BlogModel.delete(id);
      if (deleted) {
        res.json({ message: 'Blog deleted successfully' });
      } else {
        res.status(404).json({ error: 'Blog not found' });
      }
    } catch (error) {
      console.error('Delete blog error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async like(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const blog = BlogModel.findById(id);
      if (!blog || blog.status === 'draft') {
        return res.status(404).json({ error: 'Blog not found' });
      }

      BlogModel.incrementLikes(id);
      const updatedBlog = BlogModel.findById(id);

      res.json({ likes: updatedBlog!.likes });
    } catch (error) {
      console.error('Like blog error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
