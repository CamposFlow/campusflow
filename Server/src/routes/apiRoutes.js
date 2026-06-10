import express from 'express';
import { getHome } from '../controllers/apiController.js';

const router = express.Router();

router.get('/', getHome);

export default router;