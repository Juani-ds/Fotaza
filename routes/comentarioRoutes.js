import express from 'express';
import { comentar, eliminarComentario } from '../controllers/comentarioController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/imagen/:imagen_id', requireAuth, comentar);
router.delete('/:id', requireAuth, eliminarComentario);

export default router;