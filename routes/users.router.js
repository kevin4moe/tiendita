import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  // http://localhost:3000/api/v1/users?limit=10&offset=0
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({ limit, offset });
  } else {
    res.json({ error: 'Missing limit or offset' });
  }
});

export default router;
