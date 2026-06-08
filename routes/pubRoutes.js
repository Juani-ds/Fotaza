import express from 'express';
import { mostrarFormulario, crearPublicacion, verPublicacion } from '../controllers/pubController.js';
import { requireAuth } from '../middlewares/auth.js';



const router = express.Router();

router.get('/crear', requireAuth, mostrarFormulario);
router.post('/crear', requireAuth, crearPublicacion);
router.get('/:id', verPublicacion);

export default router;