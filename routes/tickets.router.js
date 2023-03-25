import { Router } from 'express';
import { selectYourPDF } from '../helpers/pdf.js';

const router = Router();

router.post('/create', async (req, res, next) => {
  try {
    const data = req.body;

    selectYourPDF('createTicket', data);

    res.status(201).json({ msg: 'created', data });
  } catch (error) {
    next(error);
  }
});

export default router;
