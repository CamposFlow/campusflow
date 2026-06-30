import express from 'express';
import { uploadDocument } from '../configs/cloudinary';
import { createCertificate } from '../controllers/admin.controller';
import Admin from '../models/admin.model';

const router = express.Router();

router.post('/upload-certificate', uploadDocument.single('certificate'), createCertificate);
router.get('/get_all_users', Admin.getAllUsers);

export default router;