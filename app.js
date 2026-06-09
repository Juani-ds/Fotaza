import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import authRoutes from './routes/authRoutes.js';
import { sequelize } from './models/index.js';
import pubRoutes from './routes/pubRoutes.js';
import { Publicacion, Imagen, Usuario } from './models/index.js';
import imagenRoutes from './routes/imagenRoutes.js';
import comentarioRoutes from './routes/comentarioRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import { Seguidor } from './models/index.js';
import { Op } from 'sequelize';

//constantes
const app = express();
const PORT = process.env.PORT;


//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(methodOverride('_method'));

//sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}));

//para vistas
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    next();
});

//motor de plantillas
app.set('view engine', 'pug');
app.set('views' , './views');

//rutas
app.use('/auth', authRoutes);
app.use('/publicaciones', pubRoutes);
app.get('/', async (req, res) => {
    try {
        const publicaciones = await Publicacion.findAll({
            include: [
                { model: Usuario, attributes: ['nombre', 'id'] },
                { model: Imagen, attributes: ['url'] }
            ],
            order: [['creado_en', 'DESC']]
        });

        let publicacionesSeguidos = [];
        if (req.session.usuario) {
            const { Seguidor } = await import('./models/index.js');
            const seguidos = await Seguidor.findAll({
                where: { seguidor_id: req.session.usuario.id },
                attributes: ['seguido_id']
            });
            const seguidosIds = seguidos.map(s => s.seguido_id);

            if (seguidosIds.length > 0) {
                const { Op } = await import('sequelize');
                publicacionesSeguidos = await Publicacion.findAll({
                    where: { usuario_id: seguidosIds },
                    include: [
                        { model: Usuario, attributes: ['nombre', 'id'] },
                        { model: Imagen, attributes: ['url'], limit: 1 }
                    ],
                    order: [['creado_en', 'DESC']]
                });
            }
        }

        res.render('home', { publicaciones, publicacionesSeguidos });
    } catch (error) {
        console.error(error);
        res.render('home', { publicaciones: [], publicacionesSeguidos: [] });
    }
});
app.use('/imagenes', imagenRoutes);
app.use('/comentarios', comentarioRoutes);
app.use('/usuarios', usuarioRoutes);

//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`)
})