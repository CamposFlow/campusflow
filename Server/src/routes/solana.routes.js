<<<<<<< HEAD
import { Router } from 'express';
import { createUniversity } from '../controllers/solana.controllers.js'
import { fetchAllUniversity } from '../controllers/solana.controllers.js'

const routes = Router();

routes.post('/', createUniversity);


routes.get('/', fetchAllUniversity);
=======
import express from 'express';
import {createUniversity} from '../controllers/solana.controllers.js'
import {fetchAllUniversity} from '../controllers/solana.controllers.js'
import {createIncidentReport} from '../controllers/solana.controllers.js'
import authMiddleware from '../middlewares/rateLimiter.middleware.js'
const routes = express.Router();

routes.post('/', createUniversity);

routes.get('/',  fetchAllUniversity);
routes.post('/incidents',authMiddleware, createIncidentReport)
>>>>>>> b1ea098ae72162b45f314dce902839d277048857

export default routes;