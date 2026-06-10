import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';
import '../models/index.js';
import { Usuario } from '../models/index.js';

try {
    const pass = await bcrypt.hash('123456', 10);

    await Usuario.bulkCreate([
        { id: 1, nombre: 'juani', email: 'juanig@g', password_hash: pass, rol: 'usuario', activo: true },
        { id: 2, nombre: 'Pia', email: 'pi@g', password_hash: pass, rol: 'usuario', activo: true },
        { id: 3, nombre: 'Maxi', email: 'max@g', password_hash: pass, rol: 'usuario', activo: true }
    ]);

    console.log('Seed completado exitosamente');
    process.exit(0);
} catch (error) {
    console.error('Error en el seed:', error);
    process.exit(1);
}