const db = require('../configs/db');


const index = async (req, res) => {
  try {
    const estados = await db.execute('SELECT * FROM Estado');
    return res.status(200).json({
      message: 'Estados obtenidos correctamente',
      estados: estados[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  const idEstado = req.params.id;

  try {
    const [estado] = await db.execute('SELECT * FROM Estado WHERE idEstado = ?', [idEstado]);

    if (estado.length === 0) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    return res.status(200).json({
      message: 'Estado obtenido correctamente',
      estado: estado[0],
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
    const { idBovino, estado } = req.body;

    // Verificar si ya existe un evento para la vaca con el mismo estado
    const existingEvent = await db.execute('SELECT idEstado FROM Estado WHERE idBovino = ? AND estado = ?', [idBovino, estado]);

    if (existingEvent && existingEvent.length > 0) {
      return res.status(400).json({
        message: 'Ya existe un evento para esta vaca con el mismo estado',
      });
    }

    // Si no existe, crear el nuevo evento
    await db.execute('INSERT INTO Estado (idBovino, estado) VALUES (?, ?)', [idBovino, estado]);

    return res.status(201).json({
      message: 'Estado creado exitosamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const idEstado = req.params.id;
  const datosActualizados = req.body;

  try {

    const { idBovino, estado } = datosActualizados;

    await db.execute('UPDATE Estado SET idBovino = ?, estado = ? WHERE idEstado = ?', [idBovino, estado, idEstado]);

    return res.status(200).json({
      message: 'Estado actualizado correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const deleteLogico = async (req, res) => {
  const idEstado = req.params.id;

  try {
    await db.execute('UPDATE Estado SET deleted = true WHERE idEstado = ?', [idEstado]);

    return res.status(200).json({
      message: 'Estado eliminado correctamente (lógicamente)',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  const idEstado = req.params.id;

  try {
    await db.execute('DELETE FROM Estado WHERE idEstado = ?', [idEstado]);

    return res.status(200).json({
      message: 'Estado eliminado correctamente (físicamente)',
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
  deleteLogico,
  deleteFisico,
};
