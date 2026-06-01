import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Denuncia = sequelize.define('Denuncia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_objetivo: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            isIn: [['imagen', 'comentario']]
        }
    },
    objetivo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'denuncias',
    timestamps: false
});

export default Denuncia;