import express from 'express';
import NomeControllers from './controllers/NomeControllers';

const routes = express.Router();

const nomeController = new NomeControllers();


routes.get('/nome', nomeController.index);
routes.post('/nome', nomeController.create);


export default routes;