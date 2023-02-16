import { Router } from 'express';
import { faker } from '@faker-js/faker';

const router = Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.imageUrl(),
    });
  }

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
