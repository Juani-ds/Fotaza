import sequelize from '../config/db.js';
import '../models/index.js';
import { Licencia } from '../models/index.js';

try {
    await sequelize.sync({ force: true });
    console.log('Tablas creadas exitosamente');

    await Licencia.bulkCreate([
        { tipo: 'Sin copyright', es_copyright: false },
        { tipo: 'Copyright', es_copyright: true }
    ]);
    console.log('Datos base insertados');

    process.exit(0);
} catch (error) {
    console.error('Error al inicializar:', error);
    process.exit(1);
}