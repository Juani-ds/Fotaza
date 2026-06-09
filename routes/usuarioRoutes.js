import express from 'express';
import { verPerfil, seguir, dejarDeSeguir } from '../controllers/usuarioController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/:id', verPerfil);
router.post('/:id/seguir', requireAuth, seguir);
router.post('/:id/dejar-seguir', requireAuth, dejarDeSeguir);

export default router;