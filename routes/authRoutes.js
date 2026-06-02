import express from 'express';
import { mostrarRegistro, registrar, mostrarLogin, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/signup', mostrarRegistro);
router.post('/signup', registrar);
router.get('/login', mostrarLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;