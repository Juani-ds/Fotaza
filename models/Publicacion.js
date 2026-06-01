import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Publicacion = sequelize.define('Publicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    comentarios_abiertos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'activa',
        validate: {
            isIn: [['activa', 'bajada', 'en_revision']]
        }
    }
}, {
    tableName: 'publicaciones',
    timestamps: false
});

export default Publicacion;