import { Router } from 'express';
import { CommentController } from '../controllers/commentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/blog/:blogId', CommentController.getByBlogId);
router.post('/', CommentController.create);

// Admin routes (protected)
router.post('/author', authenticateToken, CommentController.createAsAuthor);
router.delete('/:id', authenticateToken, CommentController.delete);

export default router;
