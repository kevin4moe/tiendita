import { Router } from 'express';
import usersRouter from './users.router.js';
import categoriesRouter from './categories.router.js';
import productsRouter from './products.router.js';
import ticketsRouter from './tickets.router.js';
import { isAuthorized } from '../middleware/auth.middleware.js';

function routerApi(app) {
  const router = Router();

  app.use('/api/v1', router);
  router.get('/auth', isAuthorized, (req, res) => {
    res.send('Hello World!');
  });
  router.post('/myservice', (req, res) => {
    console.log('req.body', req.body);
    console.log('name', req.body.name);
  });
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/tickets', ticketsRouter);
}

export default routerApi;
