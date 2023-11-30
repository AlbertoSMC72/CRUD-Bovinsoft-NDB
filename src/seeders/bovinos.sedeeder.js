const db = require('../configs/db');

const generaciones = [
    {
        siniiga: '123ABC',
        areteBovino: 'A001',
        areteToro: 'T001',
        areteVaca: 'V001',
        nombre: 'Bovino1_G1',
        raza: 'Holstein',
        genero: 'Hembra',
        fechaNacimiento: '2022-01-01',
        fotoPerfil: 'url_imagen1.jpg',
        pedigri: 'Pedigree1',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '456DEF',
        areteBovino: 'A002',
        areteToro: 'T002',
        areteVaca: 'V002',
        nombre: 'Bovino2_G1',
        raza: 'Angus',
        genero: 'Macho',
        fechaNacimiento: '2022-02-01',
        fotoPerfil: 'url_imagen2.jpg',
        pedigri: 'Pedigree2',
        tipoNacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '789GHI',
        areteBovino: 'A003',
        areteToro: 'T003',
        areteVaca: 'V003',
        nombre: 'Bovino3_G1',
        raza: 'Hereford',
        genero: 'Hembra',
        fechaNacimiento: '2022-03-01',
        fotoPerfil: 'url_imagen3.jpg',
        pedigri: 'Pedigree3',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '012JKL',
        areteBovino: 'A004',
        areteToro: 'T004',
        areteVaca: 'V004',
        nombre: 'Bovino4_G1',
        raza: 'Simmental',
        genero: 'Macho',
        fechaNacimiento: '2022-04-01',
        fotoPerfil: 'url_imagen4.jpg',
        pedigri: 'Pedigree4',
        tipoNacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '345MNO',
        areteBovino: 'A005',
        areteToro: 'T005',
        areteVaca: 'V005',
        nombre: 'Bovino5_G1',
        raza: 'Limousin',
        genero: 'Hembra',
        fechaNacimiento: '2022-05-01',
        fotoPerfil: 'url_imagen5.jpg',
        pedigri: 'Pedigree5',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '678PQR',
        areteBovino: 'A006',
        areteToro: 'T001', // Padre de generación 1
        areteVaca: 'V001', // Madre de generación 1
        nombre: 'Bovino1_G2',
        raza: 'Simmental',
        genero: 'Hembra',
        fechaNacimiento: '2023-01-01',
        fotoPerfil: 'url_imagen6.jpg',
        pedigri: 'Pedigree6',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '901STU',
        areteBovino: 'A007',
        areteToro: 'T002', // Padre de generación 1
        areteVaca: 'V002', // Madre de generación 1
        nombre: 'Bovino2_G2',
        raza: 'Angus',
        genero: 'Macho',
        fechaNacimiento: '2023-02-01',
        fotoPerfil: 'url_imagen7.jpg',
        pedigri: 'Pedigree7',
        tipoNacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '234VWX',
        areteBovino: 'A008',
        areteToro: 'T003', // Padre de generación 1
        areteVaca: 'V003', // Madre de generación 1
        nombre: 'Bovino3_G2',
        raza: 'Hereford',
        genero: 'Hembra',
        fechaNacimiento: '2023-03-01',
        fotoPerfil: 'url_imagen8.jpg',
        pedigri: 'Pedigree8',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '567YZA',
        areteBovino: 'A009',
        areteToro: 'T004', // Padre de generación 1
        areteVaca: 'V004', // Madre de generación 1
        nombre: 'Bovino4_G2',
        raza: 'Simmental',
        genero: 'Macho',
        fechaNacimiento: '2023-04-01',
        fotoPerfil: 'url_imagen9.jpg',
        pedigri: 'Pedigree9',
        tipoNacimiento: 'Cesárea',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '890ABC',
        areteBovino: 'A010',
        areteToro: 'T005', // Padre de generación 1
        areteVaca: 'V005', // Madre de generación 1
        nombre: 'Bovino5_G2',
        raza: 'Limousin',
        genero: 'Hembra',
        fechaNacimiento: '2023-05-01',
        fotoPerfil: 'url_imagen10.jpg',
        pedigri: 'Pedigree10',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin1@example.com',
    },

    // Generación 3
    {
        siniiga: '123BCD',
        areteBovino: 'A011',
        areteToro: 'T001', // Padre de generación 2
        areteVaca: 'V001', // Madre de generación 2
        nombre: 'Bovino1_G3',
        raza: 'Angus',
        genero: 'Hembra',
        fechaNacimiento: '2024-01-01',
        fotoPerfil: 'url_imagen11.jpg',
        pedigri: 'Pedigree11',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '456CDE',
        areteBovino: 'A012',
        areteToro: 'T002', // Padre de generación 2
        areteVaca: 'V002', // Madre de generación 2
        nombre: 'Bovino2_G3',
        raza: 'Hereford',
        genero: 'Macho',
        fechaNacimiento: '2024-02-01',
        fotoPerfil: 'url_imagen12.jpg',
        pedigri: 'Pedigree12',
        tipoNacimiento: 'Cesárea',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '789DEF',
        areteBovino: 'A013',
        areteToro: 'T003', // Padre de generación 2
        areteVaca: 'V003', // Madre de generación 2
        nombre: 'Bovino3_G3',
        raza: 'Simmental',
        genero: 'Hembra',
        fechaNacimiento: '2024-03-01',
        fotoPerfil: 'url_imagen13.jpg',
        pedigri: 'Pedigree13',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
    {
        siniiga: '012EFG',
        areteBovino: 'A014',
        areteToro: 'T004', // Padre de generación 2
        areteVaca: 'V004', // Madre de generación 2
        nombre: 'Bovino4_G3',
        raza: 'Angus',
        genero: 'Macho',
        fechaNacimiento: '2024-04-01',
        fotoPerfil: 'url_imagen14.jpg',
        pedigri: 'Pedigree14',
        tipoNacimiento: 'Cesárea',
        idAdminResult: 'admin1@example.com',
    },
    {
        siniiga: '345GHI',
        areteBovino: 'A015',
        areteToro: 'T005', // Padre de generación 2
        areteVaca: 'V005', // Madre de generación 2
        nombre: 'Bovino5_G3',
        raza: 'Limousin',
        genero: 'Hembra',
        fechaNacimiento: '2024-05-01',
        fotoPerfil: 'url_imagen15.jpg',
        pedigri: 'Pedigree15',
        tipoNacimiento: 'Natural',
        idAdminResult: 'admin2@example.com',
    },
];

const insertarBovinos = async () => {
    try {
        for (const bovino of generaciones) {
            const { siniiga, areteBovino, areteToro, areteVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, tipoNacimiento, idAdminResult } = bovino;

            const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
            const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);
            const [created_byResult] = await db.execute('SELECT idAdministrador FROM Administradores WHERE correo = ? limit 1', [idAdminResult]);

            const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
            const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;
            const created_by = created_byResult[0] ? created_byResult[0].idAdministrador : null;

            await db.execute(
                'INSERT INTO Bovino (siniiga, areteBovino, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, tipoNacimiento, created_by ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                [siniiga || null, areteBovino || "No definido", idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil || null, pedigri || null, tipoNacimiento, created_by]
            );

            console.log(`Bovino ${nombre} creado exitosamente`);
        }

        console.log('Datos de bovinos insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos de bovinos:', error.message);
    }
};

insertarBovinos();