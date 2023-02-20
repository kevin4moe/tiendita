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

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  res.json({ id: productId, name: 'Product Name', price: 100 });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({ msg: 'created', data: body });
});

router.patch('/:productId', (req, res) => {
  const { productId } = req.params;
  const body = req.body;
  res.json({ msg: 'updated', data: body, productId });
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  res.json({ msg: 'deleted', productId });
});

export default router;
