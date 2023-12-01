const db = require('../configs/db');
const bcrypt = require('bcrypt'); // Asegúrate de tener instalada esta biblioteca
const saltosBcrypt = process.env.SALTOS_BCRYPT

const administradores = [
    {
        correo: 'admin3@example.com',
        password: 'contrasena1',
    },
    {
        correo: 'admin4@example.com',
        password: 'contrasena2',
    },
];


const insertarAdministradores = async () => {
    const query = 'INSERT INTO administradores (correo, password) VALUES (?, ?)';

    for (const admin of administradores) {
        const hashedPassword = bcrypt.hashSync(admin.password, parseInt(saltosBcrypt));
        try {
            await db.execute(query, [admin.correo, hashedPassword]);
            console.log(`administrador ${admin.correo} creado exitosamente`);
        } catch (error) {
            console.error(`Error al crear el administrador ${admin.correo}:`, error.message);
        }
    }

    console.log('Datos de administradores insertados correctamente');
};

insertarAdministradores();