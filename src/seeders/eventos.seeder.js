const db = require('mysql2/promise');

require('dotenv').config();

const eventos = [
  {
    idBovino: 1, // ID del bovino asociado al evento
    titulo: 'Evento 1', // Título del evento 1
    asunto: 'Asunto 1', // Asunto del evento 1 (puede ser nulo si no hay asunto)
    fecha_Reporte: '2023-11-10', // Fecha de reporte del evento 1 en formato 'YYYY-MM-DD'
    descripcion: 'Descripción del evento 1', // Descripción del evento 1
    fecha_Reinsidio: '2023-11-11', // Fecha de reinsidio del evento 1 en formato 'YYYY-MM-DD'
  },
  {
    idBovino: 2, // ID del bovino asociado al evento
    titulo: 'Evento 2', // Título del evento 2
    asunto: 'Asunto 2', // Asunto del evento 2 (puede ser nulo si no hay asunto)
    fecha_Reporte: '2023-11-15', // Fecha de reporte del evento 2 en formato 'YYYY-MM-DD'
    descripcion: 'Descripción del evento 2', // Descripción del evento 2
    fecha_Reinsidio: '2023-11-16', // Fecha de reinsidio del evento 2 en formato 'YYYY-MM-DD'
  },

];

const insertarEventos = async () => {
  const connection = await db.createConnection({
    host: process.env.HOST, // Host de la base de datos
    user: process.env.USER, // Usuario de la base de datos
    password: process.env.PASSWORD, // Contraseña de la base de datos
    database: process.env.DATABASE, // Nombre de la base de datos
    port: process.env.PORT, // Puerto de la base de datos
  });

  try {
    for (const evento of eventos) {
      // Realizar la inserción de eventos en la base de datos
      // Usar la conexión 'connection' para ejecutar las consultas

      // Ejemplo de consulta para insertar un evento:
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
    connection.end(); // Cerrar la conexión a la base de datos al finalizar
  }
};

insertarEventos();
