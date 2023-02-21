import { Router, static as expressStatic } from 'express';
import usersRouter from './users.router.js';
import categoriesRouter from './categories.router.js';
import productsRouter from './products.router.js';
import homeRouter from './home.router.js';

function routerApi(app) {
  const router = Router();
  app.use(expressStatic('views'));

  app.use('/', homeRouter);

  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
}

export default routerApi;
