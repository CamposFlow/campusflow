import express from 'express';
import {createUniversity} from '../controllers/solana.controllers.js'
import {fetchAllUniversity} from '../controllers/solana.controllers.js'

const routes = express.Router();

routes.post('/', createUniversity);
export default routes;

routes.get('/',  fetchAllUniversity);