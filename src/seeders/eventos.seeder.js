const db = require('mysql2/promise');

require('dotenv').config();

const eventos = [
  {
    idBovino: 1, 
    titulo: 'Evento 1', 
    asunto: 'Asunto 1', 
    fecha_Reporte: '2023-11-10', 
    descripcion: 'Descripción del evento 1',
    fecha_Reinsidio: '2023-11-11', 
  }

];

const insertarEventos = async () => {
  const connection = await db.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, 
    port: process.env.PORT, 
  });

  try {
    for (const evento of eventos) {
      await connection.execute(
        'INSERT INTO Eventos (idBovino, titulo, asunto, fecha_Reporte, descripcion, fecha_Reinsidio, eventoTerminado) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          evento.idBovino,
          evento.titulo,
          evento.asunto,
          evento.fecha_Reporte,
          evento.descripcion,
          evento.fecha_Reinsidio,
          evento.eventoTerminado,
        ]
      );
    }

    console.log('Eventos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar eventos:', error);
  } finally {
    connection.end(); 
  }
};

insertarEventos();
