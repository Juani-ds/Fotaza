import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import { sequelize } from './models/index.js';


//constantes
const app = express();
const PORT = process.env.PORT;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//sesiones
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views' , './views');

//rutas
app.use('/auth', authRoutes);

app.get('/', (req, res)=> {
    res.render('home', { usuario: req.session.usuario })
})


//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`)
})