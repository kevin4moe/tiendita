import { Router } from 'express';
import ProductsService from '../service/products.service.js';

const router = Router();

const productsService = new ProductsService();

router.get('/', (req, res) => {
  const products = productsService.productsRepository;

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.json({ msg: 'You are hitting products filter' });
});

router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productsService.getProduct(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    const id = await productsService.create(data);

    res.status(201).json({ msg: 'created', id });
  } catch (error) {
    next(error);
  }
});

router.patch('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const body = req.body;
    const product = await productsService.update(productId, body);
    res.json({ msg: 'updated', product });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    await productsService.delete(productId);
    res.json({ msg: 'deleted', productId });
  } catch (error) {
    next(error);
  }
});

export default router;
