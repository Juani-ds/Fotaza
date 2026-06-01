import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import Licencia from './Licencia.js';
import Publicacion from './Publicacion.js';
import Etiqueta from './Etiqueta.js';
import Imagen from './Imagen.js';
import Comentario from './Comentario.js';
import Valoracion from './Valoración.js';
import Denuncia from './Denuncia.js';
import Seguidor from './Seguidor.js';
import Coleccion from './Coleccion.js';
import Notificacion from './Notificacion.js';
import Mensaje from './Mensaje.js';

export { sequelize, Usuario, Licencia, Publicacion, Etiqueta, Imagen, Comentario, Valoracion, Denuncia, Seguidor, Coleccion, Notificacion, Mensaje };