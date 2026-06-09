import { Usuario, Seguidor, Publicacion, Imagen } from '../models/index.js';

export const verPerfil = async (req, res) => {
    try {
        const perfil = await Usuario.findByPk(req.params.id, {
            attributes: ['id', 'nombre', 'email']
        });
        if (!perfil) return res.status(404).send('Usuario no encontrado');

        const publicaciones = await Publicacion.findAll({
            where: { usuario_id: perfil.id },
            include: [{ model: Imagen, attributes: ['url'] }],
            order: [['creado_en', 'DESC']]
        });

        const seguidores = await Seguidor.count({ where: { seguido_id: perfil.id } });
        const siguiendo = await Seguidor.count({ where: { seguidor_id: perfil.id } });

        let yaSigue = false;
        if (req.session.usuario) {
            yaSigue = await Seguidor.findOne({
                where: { seguidor_id: req.session.usuario.id, seguido_id: perfil.id }
            });
        }

        res.render('usuarios/perfil', { perfil, publicaciones, seguidores, siguiendo, yaSigue });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el perfil');
    }
};

export const seguir = async (req, res) => {
    try {
        const seguido_id = parseInt(req.params.id);
        const seguidor_id = req.session.usuario.id;

        if (seguido_id === seguidor_id) {
            return res.redirect(`/usuarios/${seguido_id}`);
        }

        const yaExiste = await Seguidor.findOne({ where: { seguidor_id, seguido_id } });
        if (!yaExiste) {
            await Seguidor.create({ seguidor_id, seguido_id });
        }

        res.redirect(`/usuarios/${seguido_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al seguir');
    }
};

export const dejarDeSeguir = async (req, res) => {
    try {
        const seguido_id = parseInt(req.params.id);
        const seguidor_id = req.session.usuario.id;

        await Seguidor.destroy({ where: { seguidor_id, seguido_id } });
        res.redirect(`/usuarios/${seguido_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dejar de seguir');
    }
};