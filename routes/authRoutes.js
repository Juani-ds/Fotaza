import express from 'express';
import { mostrarRegistro, registrar, mostrarLogin, login, logout } from '../controllers/authController.js';
import { requireAuth, requireGuest } from '../middlewares/auth.js';

const router = express.Router();

router.get('/signup', requireGuest, mostrarRegistro);
router.post('/signup', requireGuest, registrar);
router.get('/login', requireGuest, mostrarLogin);
router.post('/login', requireGuest, login);
router.get('/logout', requireAuth, logout);

export default router;