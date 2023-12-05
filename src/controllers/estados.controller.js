const db = require('../configs/db');


const index = async (req, res) => {
  try {
    const estados = await db.execute('SELECT * FROM estado');
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
    const [estado] = await db.execute('SELECT * FROM estado WHERE id_estado = ?', [idEstado]);

    if (estado.length === 0) {
      return res.status(404).json({ message: 'estado no encontrado' });
    }

    return res.status(200).json({
      message: 'estado obtenido correctamente',
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
  await db.beginTransaction();
  try {
    const { idBovino, estado } = req.body;

    // Verificar si ya existe un evento para la vaca con el mismo estado
    const existingEvent = await db.execute('SELECT id_estado FROM estado WHERE id_bovino = ? AND estado = ?', [idBovino, estado]);

    if (existingEvent && existingEvent.length > 0) {
      return res.status(400).json({
        message: 'Ya existe un evento para esta vaca con el mismo estado',
      });
    }

    // Si no existe, crear el nuevo evento
    await db.execute('INSERT INTO estado (id_bovino, estado) VALUES (?, ?)', [idBovino, estado]);
    await db.commit();
    return res.status(201).json({
      message: 'estado creado exitosamente',
    });
  } catch (error) {
    await db.rollback();
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  const idEstado = req.params.id;
  const datosActualizados = req.body;
  await db.beginTransaction();
  try {

    const { idBovino, estado } = datosActualizados;

    await db.execute('UPDATE estado SET id_bovino = ?, estado = ? WHERE id_estado = ?', [idBovino, estado, idEstado]);
    await db.commit();
    return res.status(200).json({
      message: 'estado actualizado correctamente',
    });
  } catch (error) {
    await db.rollback();
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const deleteLogico = async (req, res) => {
  const idEstado = req.params.id;
  await db.beginTransaction();
  try {
    await db.execute('UPDATE estado SET deleted = true WHERE id_estado = ?', [idEstado]);
    await db.commit();
    return res.status(200).json({
      message: 'estado eliminado correctamente (lógicamente)',
    });
  } catch (error) {
    await db.rollback();
    return res.status(500).json({
      message: 'Hubo un error en el servidor',
      error: error.message,
    });
  }
};

const deleteFisico = async (req, res) => {
  const idEstado = req.params.id;
  await db.beginTransaction();
  try {
    await db.execute('DELETE FROM estado WHERE id_estado = ?', [idEstado]);
    await db.commit();
    return res.status(200).json({
      message: 'estado eliminado correctamente (físicamente)',
    });
  } catch (error) {
    await db.rollback();
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
