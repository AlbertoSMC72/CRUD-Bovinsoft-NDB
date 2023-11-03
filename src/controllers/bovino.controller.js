const db = require('../configs/db')
const vacaModel = require('../models/bovino.model');


const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        let vacas;

        if (page && limit) {
            vacas = await db.execute(
                `SELECT * FROM bovino WHERE borrado = 0 OR borrado IS NULL LIMIT ${skip},${limit}`
            );
        } else {
            vacas = await db.execute('SELECT * FROM bovino WHERE borrado = 0 OR borrado IS NULL');
        }

        return res.status(200).json({
            message: 'Vacas obtenidas correctamente',
            vacas: vacas[0],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
};

const getById = async (req, res) => {
    const idBovino = req.params.id;

    try {
        const [vaca] = await db.execute('SELECT * FROM bovino WHERE idBovino = ? AND (borrado = 0 OR borrado IS NULL)', [idBovino]);

        if (vaca.length === 0) {
            return res.status(404).json({ message: 'bovino no encontrada' });
        }

        return res.status(200).json({
            message: 'Vaca obtenida correctamente',
            vaca: vaca[0],
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
        const validacion = vacaModel.validarVaca(req.body);

        if (!validacion.success) {
            return res.status(422).json({
                message: 'Datos inválidos',
                error: JSON.parse(validacion.error.message),
            });
        }

        const hoy = new Date();
        const { siniiga, nombre, raza, genero, fechaNacimiento, fotoPerfil, lugarMarca, creadaAdministrador, borrado } = req.body;

        await db.execute(
            'INSERT INTO bovino (siniiga, nombre, raza, genero, fechaNacimiento, fotoPerfil, lugarMarca, creadaAdministrador, borrado, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [siniiga || null, nombre, raza, genero, fechaNacimiento, fotoPerfil || null, lugarMarca || null, creadaAdministrador, borrado, hoy]
        );

        return res.status(201).json({
            message: 'bovino creada exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'bovino un error en el servidor',
            error: error.message,
        });
    }
};

const update = async (req, res) => {
    const idBovino = req.params.id;
    const datosActualizados = req.body;

    try {
        const validacion = vacaModel.validarVaca(datosActualizados);

        if (!validacion.success) {
            return res.status(422).json({
                message: 'Datos inválidos',
                error: JSON.parse(validacion.error.message),
            });
        }

        const hoy = new Date();
        const { siniiga, nombre, raza, genero, fechaNacimiento, fotoPerfil, lugarMarca, creadaAdministrador, borrado } = datosActualizados;

        await db.execute(
            'UPDATE bovino SET siniiga = ?, nombre = ?, raza = ?, genero = ?, fechaNacimiento = ?, fotoPerfil = ?, lugarMarca = ?, creadaAdministrador = ?, borrado = ?, updated = true, updated_at = ? WHERE idBovino = ?',
            [siniiga || null, nombre, raza, genero, fechaNacimiento, fotoPerfil || null, lugarMarca || null, creadaAdministrador, borrado, hoy, idBovino]
        );

        return res.status(200).json({
            message: 'bovino actualizada correctamente',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
};

const deleteLogico = async (req, res) => {
    const idBovino = req.params.id;
    const hoy = new Date();

    try {
        await db.execute('UPDATE bovino SET borrado = true, deleted_at = ? WHERE idBovino = ?', [hoy, idBovino]);

        return res.status(200).json({
            message: 'bovino eliminada correctamente (lógicamente)',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
};

const deleteFisico = async (req, res) => {
    const idBovino = req.params.id;

    try {
        await db.execute('DELETE FROM bovino WHERE idBovino = ?', [idBovino]);

        return res.status(200).json({
            message: 'bovino eliminada correctamente (físicamente)',
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
