import express from 'express';
import { valorar } from '../controllers/imagenController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/:id/valorar', requireAuth, valorar);

export default router;