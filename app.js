import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import { sequelize } from './models/index.js';
import pubRoutes from './routes/pubRoutes.js';
import { Publicacion, Imagen, Usuario } from './models/index.js';
import imagenRoutes from './routes/imagenRoutes.js';


//constantes
const app = express();
const PORT = process.env.PORT;


//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
                { model: Usuario, attributes: ['nombre'] },
                { model: Imagen, attributes: ['url'], limit: 1 }
            ],
            order: [['creado_en', 'DESC']]
        });
        res.render('home', { publicaciones });
    } catch (error) {
        console.error(error);
        res.render('home', { publicaciones: [] });
    }
});
app.use('/imagenes', imagenRoutes);


//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`)
})