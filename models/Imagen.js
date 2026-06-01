import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Imagen = sequelize.define('Imagen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    publicacion_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    licencia_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    marca_agua: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'imagenes',
    timestamps: false
});

export default Imagen;