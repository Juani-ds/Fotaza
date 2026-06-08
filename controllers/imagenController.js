import { Valoracion, Imagen } from '../models/index.js';

export const valorar = async (req, res) => {
    try {
        const { puntuacion } = req.body;
        const imagen_id = parseInt(req.params.id);
        const usuario_id = req.session.usuario.id;

        const imagen = await Imagen.findByPk(imagen_id, {
            include: [{ model: (await import('../models/index.js')).Publicacion }]
        });
        if (!imagen) return res.status(404).send('Imagen no encontrada');

        if (imagen.Publicacion.usuario_id === usuario_id) {
            return res.redirect(`/publicaciones/${imagen.publicacion_id}?error=no_puedes_valorar_tu_imagen`);
        }

        const yaValoro = await Valoracion.findOne({ where: { imagen_id, usuario_id } });
        if (yaValoro) {
            return res.redirect(`/publicaciones/${imagen.publicacion_id}?error=ya_valoraste`);
        }

        await Valoracion.create({ imagen_id, usuario_id, puntuacion });
        res.redirect(`/publicaciones/${imagen.publicacion_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al valorar');
    }
};