import express from 'express';
import {createUniversity} from '../controllers/solana.controllers.js'
import {fetchAllUniversity} from '../controllers/solana.controllers.js'
import {createIncidentReport} from '../controllers/solana.controllers.js'
import authMiddleware from '../middlewares/rateLimiter.middleware.js'
const routes = express.Router();

routes.post('/', createUniversity);

routes.get('/',  fetchAllUniversity);
routes.post('/incidents',authMiddleware, createIncidentReport)

export default routes;