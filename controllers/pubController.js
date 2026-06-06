import { Etiqueta, Licencia } from '../models/index.js';

export const mostrarFormulario = async (req, res) => {
    try {
        const etiquetas = await Etiqueta.findAll();
        const licencias = await Licencia.findAll();
        res.render('publicaciones/crear', { etiquetas, licencias });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario');
    }
};

export const crearPublicacion = async (req, res) => {
    res.send('crear publicacion');
};