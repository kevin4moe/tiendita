import { resolve } from 'path';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(resolve('./views/home.html'));
});

export default router;
