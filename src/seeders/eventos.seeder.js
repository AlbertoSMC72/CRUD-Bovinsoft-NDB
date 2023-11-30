const db = require('../configs/db');

const eventos = [
    {
        idBovino: 1,
        tituloEvento: 'Evento 1 para Bovino 1',
        asunto: 'Asunto del Evento 1',
        descripcion: 'Descripción del Evento 1',
        fechaTerminar: '2023-01-01',
        created_bySub: 'admin1@example.com',
        fecha_Reporte: '2023-01-02',
    },
    {
        idBovino: 1,
        tituloEvento: 'Evento 2 para Bovino 1',
        asunto: 'Asunto del Evento 2',
        descripcion: 'Descripción del Evento 2',
        fechaTerminar: '2023-02-01',
        created_bySub: 'admin2@example.com',
        fecha_Reporte: '2023-02-02',
    },
    {
        idBovino: 2,
        tituloEvento: 'Evento 1 para Bovino 2',
        asunto: 'Asunto del Evento 1',
        descripcion: 'Descripción del Evento 1',
        fechaTerminar: '2023-03-01',
        created_bySub: 'admin3@example.com',
        fecha_Reporte: '2023-03-02',
    },
    {
        idBovino: 2,
        tituloEvento: 'Evento 2 para Bovino 2',
        asunto: 'Asunto del Evento 2',
        descripcion: 'Descripción del Evento 2',
        fechaTerminar: '2023-04-01',
        created_bySub: 'admin4@example.com',
        fecha_Reporte: '2023-04-02',
    },
];

const insertarEventos = async () => {
    const query = 'INSERT INTO Eventos (idBovino, titulo, asunto, descripcion, fecha_Reinsidio, created_by, fecha_Reporte) VALUES (?, ?, ?, ?, ?, ?, ?)';

    for (const evento of eventos) {
        const [created_byResult] = await db.execute('SELECT idAdministrador FROM Administradores WHERE correo = ? limit 1', [evento.created_bySub]);
        const created_by = created_byResult[0] ? created_byResult[0].idAdministrador : null;
        await db.execute(
            query,
            [evento.idBovino, evento.tituloEvento, evento.asunto || null, evento.descripcion || null, evento.fechaTerminar || null, created_by, evento.fecha_Reporte || null]
        );
    }

    console.log('Datos de eventos insertados correctamente');
};

insertarEventos();