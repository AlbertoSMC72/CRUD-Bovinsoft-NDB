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

async function actualizarEstado(idBovino, asunto) {
  await Estados.create(idBovino, asunto);
}

const create = async (req, res) => {
  try {
    const { idBovino, titulo, asunto, descripcion, fecha_Reinsidio, eventoTerminado } = req.body;
    const fecha_Reporte = new Date();

    const asuntosPosibles = ['cargada', 'enferma', 'esperInseminar', 'nacimientoEsp', 'lecionada', 'fueraFinca', 'favorito', 'vendido', 'muerta'];

    if (asuntosPosibles.includes(asunto)) {
      await actualizarEstado(idBovino, asuntoACambiar);
    } else if (asunto === null) {
      console.log('No se actualiza el estado del bovino');
    }

    await db.execute(
      'INSERT INTO Eventos (idBovino, titulo, asunto, fecha_Reporte, descripcion, fecha_Reinsidio, eventoTerminado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [idBovino, titulo, asunto || null, fecha_Reporte, descripcion || null, fecha_Reinsidio || null, eventoTerminado]
    );

    return res.status(201).json({
      message: 'Evento creado exitosamente',
    });
  } catch (error) {
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
    await db.execute('UPDATE Eventos SET delete = 1, deleted_at = ? WHERE idEvento = ?', [hoy, idEvento]);

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

module.exports = {
  index,
  getById,
  create,
  update,
  eventoTerminado,
  deleteLogico,
  deleteFisico,
};
