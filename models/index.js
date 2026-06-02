import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import Licencia from './Licencia.js';
import Publicacion from './Publicacion.js';
import Etiqueta from './Etiqueta.js';
import Imagen from './Imagen.js';
import Comentario from './Comentario.js';
import Valoracion from './Valoracion.js';
import Denuncia from './Denuncia.js';
import Seguidor from './Seguidor.js';
import Coleccion from './Coleccion.js';
import Notificacion from './Notificacion.js';
import Mensaje from './Mensaje.js';


Usuario.hasMany(Publicacion, { foreignKey: 'usuario_id' });
Publicacion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Publicacion.hasMany(Imagen, { foreignKey: 'publicacion_id' });
Imagen.belongsTo(Publicacion, { foreignKey: 'publicacion_id' });

Licencia.hasMany(Imagen, { foreignKey: 'licencia_id' });
Imagen.belongsTo(Licencia, { foreignKey: 'licencia_id' });

Publicacion.belongsToMany(Etiqueta, { through: 'pub_etiquetas', foreignKey: 'publicacion_id' });
Etiqueta.belongsToMany(Publicacion, { through: 'pub_etiquetas', foreignKey: 'etiqueta_id' });

Imagen.hasMany(Comentario, { foreignKey: 'imagen_id' });
Comentario.belongsTo(Imagen, { foreignKey: 'imagen_id' });

Usuario.hasMany(Comentario, { foreignKey: 'usuario_id' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Imagen.hasMany(Valoracion, { foreignKey: 'imagen_id' });
Valoracion.belongsTo(Imagen, { foreignKey: 'imagen_id' });

Usuario.hasMany(Valoracion, { foreignKey: 'usuario_id' });
Valoracion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Denuncia, { foreignKey: 'usuario_id' });
Denuncia.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Seguidor, { foreignKey: 'seguidor_id', as: 'siguiendo' });
Usuario.hasMany(Seguidor, { foreignKey: 'seguido_id', as: 'seguidores' });

Usuario.hasMany(Coleccion, { foreignKey: 'usuario_id' });
Coleccion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Coleccion.belongsToMany(Publicacion, { through: 'col_publicaciones', foreignKey: 'coleccion_id' });
Publicacion.belongsToMany(Coleccion, { through: 'col_publicaciones', foreignKey: 'publicacion_id' });

Usuario.hasMany(Notificacion, { foreignKey: 'usuario_id' });
Notificacion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Usuario.hasMany(Mensaje, { foreignKey: 'remitente_id', as: 'mensajes_enviados' });
Usuario.hasMany(Mensaje, { foreignKey: 'destinatario_id', as: 'mensajes_recibidos' });

export { sequelize, Usuario, Licencia, Publicacion, Etiqueta, Imagen, Comentario, Valoracion, Denuncia, Seguidor, Coleccion, Notificacion, Mensaje };