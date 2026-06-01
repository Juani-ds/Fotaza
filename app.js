import 'dotenv/config';
import express from 'express';
import { sequelize } from './models/index.js';


//constantes
const app = express();
const PORT = process.env.PORT;


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//motor de plantillas
app.set('view engine', 'pug');
app.set('views' , './views');

//rutas
app.get('/', (req, res)=> {
    res.send('Hola, mundo!')
})


//servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${PORT}`)
})