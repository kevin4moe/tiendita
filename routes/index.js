import { Router } from 'express';
import usersRouter from './users.router.js';
import categoriesRouter from './categories.router.js';
import productsRouter from './products.router.js';
import { isAuthorized } from '../middleware/auth.middleware.js';

function routerApi(app) {
  const router = Router();

  app.use('/api/v1', router);
  router.get('/auth', isAuthorized, (req, res) => {
    res.send('Hello World!');
  });
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
}

export default routerApi;
