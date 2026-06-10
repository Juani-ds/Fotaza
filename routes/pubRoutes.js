import express from 'express';
import { mostrarFormulario, crearPublicacion, verPublicacion, buscar } from '../controllers/pubController.js';
import { requireAuth } from '../middlewares/auth.js';



const router = express.Router();

router.get('/crear', requireAuth, mostrarFormulario);
router.post('/crear', requireAuth, crearPublicacion);
router.get('/buscar', buscar);
router.get('/:id', verPublicacion);


export default router;