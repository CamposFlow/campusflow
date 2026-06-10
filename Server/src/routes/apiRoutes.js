import express from 'express';
import { getHome } from '../controllers/apiController.js';

const router = express.Router();

router.get('/', getHome);
// You can add more routes here:
// router.get('/health', getHealthCheck);

export default router;