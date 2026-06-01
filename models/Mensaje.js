import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Mensaje = sequelize.define('Mensaje', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    remitente_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    destinatario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'mensajes',
    timestamps: false
});

export default Mensaje;