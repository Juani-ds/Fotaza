import express from 'express';
import { mostrarFormulario, crearPublicacion } from '../controllers/pubController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/crear', requireAuth, mostrarFormulario);
router.post('/crear', requireAuth, crearPublicacion);

export default router;