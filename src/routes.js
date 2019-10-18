import { Router } from 'express';

const routes = new Router();

routes.get('/', async (req, res) => res.json({ message: 'Hello World' }));

export default routes;
