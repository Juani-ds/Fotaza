import sequelize from '../config/db.js';
import '../models/index.js';

try {
    await sequelize.sync({ force: true });
    console.log('Tablas creadas exitosamente');
    process.exit(0);
} catch (error) {
    console.error('Error al crear las tablas:', error);
    process.exit(1);
}