import express from 'express';
import CardControllers from './controllers/CardControllers';

const routes = express.Router();

const cardController = new CardControllers();


routes.get('/card', cardController.index);
routes.post('/card', cardController.create);


export default routes;