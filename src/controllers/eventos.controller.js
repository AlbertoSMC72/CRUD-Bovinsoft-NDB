const db = require('../configs/db');
const Estados = require('../controllers/estados.controller');

const index = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;
    let eventos;

    if (page && limit) {
      eventos = await db.execute(
        `SELECT * FROM Eventos WHERE eventoTerminado = 0 LIMIT ${skip},${limit}`
      );
    } else {
      eventos = await db.execute('SELECT * FROM Eventos WHERE eventoTerminado = 0');
    }

    return res.status(200).json({
      message: 'Eventos obtenidos correctamente',
      eventos: eventos[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  const idEvento = req.params.id;

  try {
    const [evento] = await db.execute('SELECT * FROM Eventos WHERE idEvento = ? AND eventoTerminado = 0', [idEvento]);

    if (evento.length === 0) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    return res.status(200).json({
      message: 'Evento obtenido correctamente',
      evento: evento[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};



const create = async (req, res) => {
  try {
    const {
      idBovino,
      tituloEvento,
      asunto,
      descripcion,
      fechaTerminar,
      created_bySub,
      fecha_Reporte,
    } = req.body;

    // Obtener el ID del administrador
    const [created_byResult] = await db.execute('SELECT idAdministrador FROM Administradores WHERE correo = ? limit 1', [created_bySub]);
    const created_by = created_byResult[0] ? created_byResult[0].idAdministrador : null;

    // Insertar el evento en la base de datos
    await db.execute(
      'INSERT INTO Eventos (idBovino, titulo, asunto, descripcion, fecha_Reinsidio, created_by, fecha_Reporte) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [idBovino, tituloEvento, asunto || null, descripcion || null, fechaTerminar || null, created_by, fecha_Reporte || null]
    );

    return res.status(201).json({
      message: 'Evento creado exitosamente',
    });
  } catch (error) {
    console.error('Error en la función create:', error);
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};


const update = async (req, res) => {
  const idEvento = req.params.id;
  const {titulo, asunto, descripcion, fecha_Reinsidio } = datosActualizados;
  const hoy = new Date();
  try {
    await db.execute(
      'UPDATE Eventos SET titulo = ?, asunto = ?, descripcion = ?, fecha_Reinsidio = ?, updated_at = ? WHERE idEvento = ?',
      [titulo, asunto || null, descripcion || null, fecha_Reinsidio || null, hoy, idEvento]
    );

    return res.status(200).json({
      message: 'Evento actualizado correctamente',
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor al actualizar el evento',
      error: error.message,
    });
  }
};


const deleteLogico = async (req, res) => {
  const idEvento = req.params.id;
  const hoy = new Date();

  try {
    await db.execute('UPDATE Eventos SET deleted = 1, deleted_at = ? WHERE idEvento = ?', [hoy, idEvento]);

    return res.status(200).json({
      message: 'Evento eliminado (lógicamente) correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const eventoTerminado = async (req, res) => {
  const idEvento = req.params.id;
  const hoy = new Date();

  try {
    await db.execute('UPDATE Eventos SET eventoTerminado = 1, updated_at = ? WHERE idEvento = ?', [hoy, idEvento]);

    return res.status(200).json({
      message: 'Evento eliminado (lógicamente) correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  const idEvento = req.params.id;

  try {
    await db.execute('DELETE FROM Eventos WHERE idEvento = ?', [idEvento]);

    return res.status(200).json({
      message: 'Evento eliminado (físicamente) correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const getByBovino = async (req, res) => {
  const idBovino = req.params.id;

  try {
    const [eventos] = await db.execute('SELECT titulo,asunto,fecha_Reporte,descripcion,fecha_Reinsidio FROM Eventos WHERE idBovino = ? ', [idBovino]);

    if (eventos.length === 0) {
      return res.status(404).json({ message: 'Eventos no encontrados' });
    }

    return res.status(200).json({
      message: 'Eventos obtenidos correctamente',
      eventos,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor al obtener los eventos',
      error: error.message,
    });
  }
};

const muyImportante = async (req, res) => {
  try {
    const [eventos] = await db.execute(`
      SELECT 
        e.idEvento,
        e.titulo,
        e.asunto,
        e.fecha_Reporte,
        e.descripcion,
        e.fecha_Reinsidio,
        b.nombre as nombreBovino,
        b.areteBovino
      FROM Eventos e
      JOIN Bovino b ON e.idBovino = b.idBovino
      WHERE 
        e.eventoTerminado = 0
        AND e.deleted = 0
        AND DATEDIFF(CURDATE(), e.fecha_Reinsidio) <= 5
    `);

    if (eventos.length === 0) {
      return res.status(404).json({ message: 'No hay eventos importantes' });
    }

    return res.status(200).json({
      message: 'Eventos obtenidos correctamente',
      eventos,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor al obtener los eventos',
      error: error.message,
    });
  }
};



module.exports = {
  index,
  getById,
  getByBovino,
  muyImportante,
  create,
  update,
  eventoTerminado,
  deleteLogico,
  deleteFisico,
};
