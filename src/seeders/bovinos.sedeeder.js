const db = require('../configs/db');

const generaciones = [
    {
        siniiga: '123ABC',
        arete_bovino: 'A001',
        arete_toro: 'T001',
        arete_vaca: 'V001',
        nombre: 'Bovino1_G1',
        raza: 'Holstein',
        genero: 'Hembra',
        fecha_nacimiento: '2022-01-01',
        foto_perfil: 'url_imagen1.jpg',
        pedigri: 'Pedigree1',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '456DEF',
        arete_bovino: 'A002',
        arete_toro: 'T002',
        arete_vaca: 'V002',
        nombre: 'Bovino2_G1',
        raza: 'Angus',
        genero: 'Macho',
        fecha_nacimiento: '2022-02-01',
        foto_perfil: 'url_imagen2.jpg',
        pedigri: 'Pedigree2',
        tipo_nacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '789GHI',
        arete_bovino: 'A003',
        arete_toro: 'T003',
        arete_vaca: 'V003',
        nombre: 'Bovino3_G1',
        raza: 'Hereford',
        genero: 'Hembra',
        fecha_nacimiento: '2022-03-01',
        foto_perfil: 'url_imagen3.jpg',
        pedigri: 'Pedigree3',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '012JKL',
        arete_bovino: 'A004',
        arete_toro: 'T004',
        arete_vaca: 'V004',
        nombre: 'Bovino4_G1',
        raza: 'Simmental',
        genero: 'Macho',
        fecha_nacimiento: '2022-04-01',
        foto_perfil: 'url_imagen4.jpg',
        pedigri: 'Pedigree4',
        tipo_nacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '345MNO',
        arete_bovino: 'A005',
        arete_toro: 'T005',
        arete_vaca: 'V005',
        nombre: 'Bovino5_G1',
        raza: 'Limousin',
        genero: 'Hembra',
        fecha_nacimiento: '2022-05-01',
        foto_perfil: 'url_imagen5.jpg',
        pedigri: 'Pedigree5',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '678PQR',
        arete_bovino: 'A006',
        arete_toro: 'T001', // Padre de generación 1
        arete_vaca: 'V001', // Madre de generación 1
        nombre: 'Bovino1_G2',
        raza: 'Simmental',
        genero: 'Hembra',
        fecha_nacimiento: '2023-01-01',
        foto_perfil: 'url_imagen6.jpg',
        pedigri: 'Pedigree6',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '901STU',
        arete_bovino: 'A007',
        arete_toro: 'T002', // Padre de generación 1
        arete_vaca: 'V002', // Madre de generación 1
        nombre: 'Bovino2_G2',
        raza: 'Angus',
        genero: 'Macho',
        fecha_nacimiento: '2023-02-01',
        foto_perfil: 'url_imagen7.jpg',
        pedigri: 'Pedigree7',
        tipo_nacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '234VWX',
        arete_bovino: 'A008',
        arete_toro: 'T003', // Padre de generación 1
        arete_vaca: 'V003', // Madre de generación 1
        nombre: 'Bovino3_G2',
        raza: 'Hereford',
        genero: 'Hembra',
        fecha_nacimiento: '2023-03-01',
        foto_perfil: 'url_imagen8.jpg',
        pedigri: 'Pedigree8',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '567YZA',
        arete_bovino: 'A009',
        arete_toro: 'T004', // Padre de generación 1
        arete_vaca: 'V004', // Madre de generación 1
        nombre: 'Bovino4_G2',
        raza: 'Simmental',
        genero: 'Macho',
        fecha_nacimiento: '2023-04-01',
        foto_perfil: 'url_imagen9.jpg',
        pedigri: 'Pedigree9',
        tipo_nacimiento: 'Cesárea',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '890ABC',
        arete_bovino: 'A010',
        arete_toro: 'T005', // Padre de generación 1
        arete_vaca: 'V005', // Madre de generación 1
        nombre: 'Bovino5_G2',
        raza: 'Limousin',
        genero: 'Hembra',
        fecha_nacimiento: '2023-05-01',
        foto_perfil: 'url_imagen10.jpg',
        pedigri: 'Pedigree10',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },

    // Generación 3
    {
        siniiga: '123BCD',
        arete_bovino: 'A011',
        arete_toro: 'T001', // Padre de generación 2
        arete_vaca: 'V001', // Madre de generación 2
        nombre: 'Bovino1_G3',
        raza: 'Angus',
        genero: 'Hembra',
        fecha_nacimiento: '2024-01-01',
        foto_perfil: 'url_imagen11.jpg',
        pedigri: 'Pedigree11',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '456CDE',
        arete_bovino: 'A012',
        arete_toro: 'T002', // Padre de generación 2
        arete_vaca: 'V002', // Madre de generación 2
        nombre: 'Bovino2_G3',
        raza: 'Hereford',
        genero: 'Macho',
        fecha_nacimiento: '2024-02-01',
        foto_perfil: 'url_imagen12.jpg',
        pedigri: 'Pedigree12',
        tipo_nacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '789DEF',
        arete_bovino: 'A013',
        arete_toro: 'T003', // Padre de generación 2
        arete_vaca: 'V003', // Madre de generación 2
        nombre: 'Bovino3_G3',
        raza: 'Simmental',
        genero: 'Hembra',
        fecha_nacimiento: '2024-03-01',
        foto_perfil: 'url_imagen13.jpg',
        pedigri: 'Pedigree13',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '012EFG',
        arete_bovino: 'A014',
        arete_toro: 'T004', // Padre de generación 2
        arete_vaca: 'V004', // Madre de generación 2
        nombre: 'Bovino4_G3',
        raza: 'Angus',
        genero: 'Macho',
        fecha_nacimiento: '2024-04-01',
        foto_perfil: 'url_imagen14.jpg',
        pedigri: 'Pedigree14',
        tipo_nacimiento: 'Cesárea',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '345GHI',
        arete_bovino: 'A015',
        arete_toro: 'T005', // Padre de generación 2
        arete_vaca: 'V005', // Madre de generación 2
        nombre: 'Bovino5_G3',
        raza: 'Limousin',
        genero: 'Hembra',
        fecha_nacimiento: '2024-05-01',
        foto_perfil: 'url_imagen15.jpg',
        pedigri: 'Pedigree15',
        tipo_nacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
];

const insertarBovinos = async () => {
    try {
        for (const bovino of generaciones) {
            const { siniiga, arete_bovino, arete_toro, arete_vaca, nombre, raza, genero, fecha_nacimiento, foto_perfil, pedigri, tipo_nacimiento, idAdminResult } = bovino;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT id_bovino FROM bovino WHERE arete_bovino = ?', [arete_toro]);
        const [idVacaResult] = await db.execute('SELECT id_bovino FROM bovino WHERE arete_bovino = ?', [arete_vaca]);
        const [created_byResult] = await db.execute('SELECT id_administrador FROM administradores WHERE correo = ? limit 1', [idAdminResult]);

        console.log("idToro:", idToroResult);
        console.log("idVaca:", idVacaResult);
        console.log("created_by:", created_byResult);

        // Manejar posibles valores nulos
        const idToro = idToroResult && idToroResult[0] ? idToroResult[0].id_bovino : null;
        const idVaca = idVacaResult && idVacaResult[0] ? idVacaResult[0].id_bovino : null;
        const created_by = created_byResult && created_byResult[0] ? created_byResult[0].id_administrador : null;

        // Verificar los resultados de las consultas
/*         console.log("idToro:", idToro);
        console.log("idVaca:", idVaca);
        console.log("created_by:", created_by); */

            await db.execute(
                'INSERT INTO bovino (siniiga, arete_bovino, id_toro, id_vaca, nombre, raza, genero, fecha_nacimiento, foto_perfil, pedigri, tipo_nacimiento, created_by ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [siniiga || null, arete_bovino || "No definido", idToro, idVaca, nombre, raza, genero, fecha_nacimiento, foto_perfil || null, pedigri || null, tipo_nacimiento, created_by ]
            );

            console.log(`Bovino ${nombre} creado exitosamente`);
        }

        console.log('Datos de bovinos insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de bovinos:', error.message);
    }
};

insertarBovinos();