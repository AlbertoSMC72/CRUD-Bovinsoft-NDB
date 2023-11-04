const db = require('../configs/db');
const estadosModel = require('../models/estados.model');

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
    const validacion = estadosModel.validarEstado(req.body);

    if (!validacion.success) {
      return res.status(422).json({
        message: 'Datos inválidos',
        error: JSON.parse(validacion.error.message),
      });
    }

    const { idBovino, estado } = req.body;

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
    const validacion = estadosModel.validarEstado(datosActualizados);

    if (!validacion.success) {
      return res.status(422).json({
        message: 'Datos inválidos',
        error: JSON.parse(validacion.error.message),
      });
    }

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
