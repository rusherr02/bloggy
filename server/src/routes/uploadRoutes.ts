import { Router } from 'express';
import { UploadController } from '../controllers/uploadController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Protected upload endpoint
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  UploadController.uploadImage
);

export default router;
