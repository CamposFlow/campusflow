import { Router } from 'express';
import { createUniversity } from '../controllers/solana.controllers.js'
import { fetchAllUniversity } from '../controllers/solana.controllers.js'

const routes = Router();

routes.post('/', createUniversity);


routes.get('/', fetchAllUniversity);

export default routes;