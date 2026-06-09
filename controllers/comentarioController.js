import { Comentario, Imagen, Publicacion } from '../models/index.js';

export const comentar = async (req, res) => {
    try {
        const { contenido } = req.body;
        const imagen_id = parseInt(req.params.imagen_id);
        const usuario_id = req.session.usuario.id;

        const imagen = await Imagen.findByPk(imagen_id, {
            include: [{ model: Publicacion }]
        });
        if (!imagen) return res.status(404).send('Imagen no encontrada');

        if (!imagen.Publicacion.comentarios_abiertos) {
            return res.redirect(`/publicaciones/${imagen.publicacion_id}?error=comentarios_cerrados`);
        }

        await Comentario.create({ imagen_id, usuario_id, contenido });
        res.redirect(`/publicaciones/${imagen.publicacion_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al comentar');
    }
};

export const eliminarComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findByPk(req.params.id, {
            include: [{ model: Imagen, include: [{ model: Publicacion }] }]
        });
        if (!comentario) return res.status(404).send('Comentario no encontrado');

        const publicacion_id = comentario.Imagen.publicacion_id;
        const es_autor = comentario.Imagen.Publicacion.usuario_id === req.session.usuario.id;

        if (!es_autor) return res.status(403).send('No autorizado');

        await comentario.destroy();
        res.redirect(`/publicaciones/${publicacion_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar comentario');
    }
};