import express from 'express';
import { mostrarRegistro, registrar, mostrarLogin, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/registro', mostrarRegistro);
router.post('/registro', registrar);
router.get('/login', mostrarLogin);
router.post('/login', login);
router.get('/logout', logout);

export default router;