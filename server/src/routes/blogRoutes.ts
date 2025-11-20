import { Router } from 'express';
import { BlogController } from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/public', BlogController.getAll);
router.get('/public/:id', BlogController.getById);
router.get('/search', BlogController.search);
router.get('/categories', BlogController.getCategories);
router.post('/:id/like', BlogController.like);

// Admin routes (protected)
router.get('/admin', authenticateToken, BlogController.getAllAdmin);
router.get('/admin/:id', authenticateToken, BlogController.getByIdAdmin);
router.post('/', authenticateToken, BlogController.create);
router.put('/:id', authenticateToken, BlogController.update);
router.delete('/:id', authenticateToken, BlogController.delete);

export default router;
