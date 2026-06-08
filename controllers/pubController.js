import { Etiqueta, Licencia, Publicacion, Imagen, Usuario, Valoracion, sequelize } from '../models/index.js';

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
        try {
        const { titulo, descripcion, etiquetas_ids, etiquetas_nuevas, imagenes_base64, es_copyright, marca_agua } = req.body;

        const publicacion = await Publicacion.create({
            usuario_id: req.session.usuario.id,
            titulo,
            descripcion: descripcion || null
        });

        let etiquetasFinales = [];
        if (etiquetas_ids) {
            const ids = Array.isArray(etiquetas_ids) ? etiquetas_ids : [etiquetas_ids];
            etiquetasFinales = [...ids.map(id => parseInt(id))];
        }

        if (etiquetas_nuevas && etiquetas_nuevas.trim() !== '') {
            const nuevas = etiquetas_nuevas.split(',').map(e => e.trim()).filter(e => e !== '');
            for (const nombre of nuevas) {
                const [etiqueta] = await Etiqueta.findOrCreate({ where: { nombre } });
                etiquetasFinales.push(etiqueta.id);
            }
        }

        if (etiquetasFinales.length > 0) {
            for (const etiquetaId of etiquetasFinales) {
                await sequelize.query(
                    'INSERT INTO pub_etiquetas (publicacion_id, etiqueta_id) VALUES (:pubId, :etId)',
                    { replacements: { pubId: publicacion.id, etId: etiquetaId } }
                );
            }
        }

        const esCopy = es_copyright === 'on';
        const licencia = await Licencia.findOne({ where: { es_copyright: esCopy } });

        const imagenes = Array.isArray(imagenes_base64) ? imagenes_base64 : [imagenes_base64];
        for (const base64 of imagenes) {
            await Imagen.create({
                publicacion_id: publicacion.id,
                licencia_id: licencia.id,
                url: base64,
                marca_agua: esCopy ? (marca_agua || null) : null
            });
        }

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la publicacion');
    }
};
export const verPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.findByPk(req.params.id, {
            include: [
                { model: Usuario, attributes: ['nombre'] },
                { model: Imagen, include: [{ model: Valoracion }] },
                { model: Etiqueta }
            ]
        });

        if (!publicacion) {
            return res.status(404).send('Publicación no encontrada');
        }

        const usuario_id = req.session.usuario?.id;
        publicacion.Imagens.forEach(imagen => {
            const votos = imagen.Valoracions || [];
            imagen.totalVotos = votos.length;
            imagen.promedio = votos.length > 0
                ? votos.reduce((acc, v) => acc + v.puntuacion, 0) / votos.length
                : 0;
            imagen.yaValoro = usuario_id
                ? votos.some(v => v.usuario_id === usuario_id)
                : false;
        });

        res.render('publicaciones/ver', { publicacion });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar la publicación');
    }
};