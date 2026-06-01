import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Licencia = sequelize.define('Licencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    es_copyright: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'licencias',
    timestamps: false
});

export default Licencia;