import bcrypt from 'bcrypt';
import { Usuario } from '../models/index.js';

export const mostrarRegistro = (req, res) => {
    res.render('auth/registro');
};

export const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Verifico el usuario
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.render('auth/registro', { error: 'El email ya está registrado' });
        }

        // Hasheo contraseña 
        const password_hash = await bcrypt.hash(password, 10);

        // creo usuario
        await Usuario.create({ nombre, email, password_hash });

        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.render('auth/registro', { error: 'Error al registrar usuario' });
    }
};

export const mostrarLogin = (req, res) => {
    res.render('auth/login');
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.render('auth/login', { error: 'Email o contraseña incorrectos' });
        }

        if (!usuario.activo) {
            return res.render('auth/login', { error: 'Tu cuenta está inactiva' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password_hash);
        if (!passwordValida) {
            return res.render('auth/login', { error: 'Email o contraseña incorrectos' });
        }

        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('auth/login', { error: 'Error al iniciar sesión' });
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};