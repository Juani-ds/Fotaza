import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Seguidor = sequelize.define('Seguidor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seguidor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seguido_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'seguidores',
    timestamps: false
});

export default Seguidor;