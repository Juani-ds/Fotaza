import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Notificacion = sequelize.define('Notificacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_evento: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['comentario', 'valoracion', 'me_interesa', 'nuevo_seguidor']]
        }
    },
    actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    leida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'notificaciones',
    timestamps: false
});

export default Notificacion;