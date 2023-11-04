const mysql = require('mysql2/promise');

const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
};


console.log('HOST:', process.env.HOST);
console.log('USER:', process.env.USER);
console.log('PASSWORD:', process.env.PASSWORD);
console.log('DATABASE:', process.env.DATABASE);

const eventos = [
  {
    idBovino: 1,
    titulo: "Evento 1",
    asunto: "Asunto 1",
    fecha_Reporte: "2023-11-02",
    descripcion: "Descripción del evento 1",
    fecha_Reinsidio: "2023-11-03",
    eventoTerminado: 0,
  },
  // Agrega más eventos aquí
];

async function insertarEventos() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    for (const evento of eventos) {
      // Verifica que los campos no sean undefined y reemplaza con null si es necesario
      for (const key in evento) {
        if (evento.hasOwnProperty(key) && evento[key] === undefined) {
          evento[key] = null;
        }
      }

      const [results] = await connection.execute(
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
      console.log(`Evento insertado con ID: ${results.insertId}`);
    }

    await connection.end();
  } catch (error) {
    console.error('Error al insertar eventos:', error);
  }
}

insertarEventos();

