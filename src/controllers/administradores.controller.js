const db = require('../configs/db');
const administradorModel = require('../models/administradores.model')

const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        let administradores;

        if (page && limit) {
            administradores = await db.execute(`SELECT * FROM Administradores WHERE deleted = 0 OR deleted IS NULL LIMIT ${skip},${limit}`);
        } else {
            administradores = await db.execute('SELECT * FROM Administradores WHERE deleted = 0 OR deleted IS NULL');
        }

        return res.status(200).json({
            message: 'Administradores obtenidos correctamente',
            administradores: administradores[0],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
}

const getbyID = async (req, res) => {
    try {
        const adminId = req.params.id;
        const [administrador] = await db.execute('SELECT * FROM Administradores WHERE idAdministrador = ?', [adminId]);

        if (administrador.length === 0) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        return res.status(200).json({
            message: 'Administrador obtenido correctamente',
            administrador: administrador[0],
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
}

const create = async (req, res) => {
    try {
        const validacion = administradorModel.validarAdministrador(req.body);

        if (!validacion.success) {
            return res.status(422).json({
                message: 'Datos inválidos',
                error: validacion.error.issues,
            });
        }

        const { usuario, password } = req.body;
        const hoy = new Date();

        try {
            await db.execute('INSERT INTO Administradores (usuario, password, created_at) VALUES (?, ?, ?)',
                [usuario, password, hoy]);

            return res.status(201).json({
                message: 'Administrador creado exitosamente',
            });
        } catch (error) {
            return res.status(406).json({
                message: 'Hubo un error al crear el administrador',
                error: error.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
}

const update = async (req, res) => {
    try {
        const adminId = req.params.id;
        const { usuario, password } = req.body;
        const hoy = new Date();

        try {
            await db.execute('UPDATE Administradores SET usuario = ?, password = ?, updated_at = ? WHERE idAdministrador = ?',
                [usuario, password, hoy, adminId]);

            return res.status(200).json({
                message: 'Administrador actualizado correctamente',
            });
        } catch (error) {
            return res.status(406).json({
                message: 'Hubo un error al intentar actualizar al administrador',
                error: error.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
}


const deleteFisico = async (req, res) => {
    try {
        const adminId = req.params.id;

        try {
            await db.execute('DELETE FROM Administradores WHERE idAdministrador = ?', [adminId]);

            return res.status(200).json({
                message: 'Administrador eliminado (físicamente) correctamente',
            });
        } catch (error) {
            return res.status(406).json({
                message: 'Hubo un error al intentar eliminar al administrador',
                error: error.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
}

module.exports = {
    index,
    create,
    update,
    deleteFisico,
    getbyID
};
