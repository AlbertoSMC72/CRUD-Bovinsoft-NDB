const db = require('../configs/db')


const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        let vacas;

        if (page && limit) {
            vacas = await db.execute(
                `SELECT * FROM bovino WHERE borrado = 0 OR borrado IS NULL LIMIT ${skip},${limit} ` /* agregar order by */
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

/* para buscar */
const buscar = async (req, res) => {
    try {
        const { term } = req.query;

        if (!term) {
            return res.status(400).json({
                message: 'Se requiere un término de búsqueda',
            });
        }

        const resultados = await db.execute(
            'SELECT nombre, areteBovino FROM bovino WHERE (nombre LIKE ? OR areteBovino LIKE ?) AND (borrado = 0 OR borrado IS NULL)',
            [`%${term}%`, `%${term}%`]
        );

        return res.status(200).json({
            message: 'Resultados de búsqueda obtenidos correctamente',
            resultados: resultados[0],
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
        const [vaca] = await db.execute('SELECT * FROM bovino WHERE idBovino = ?', [idBovino]);

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
        const { siniiga, areteBovino, areteToro, areteVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, lugarMarca, creadaAdministrador, borrado } = req.body;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;

        await db.execute(
            'INSERT INTO bovino (siniiga, areteBovino, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, lugarMarca, creadaAdministrador, borrado ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [siniiga || null, areteBovino || null, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil || null, pedigri || null, lugarMarca, creadaAdministrador, borrado]
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
        const { siniiga, fotoPerfil, lugarMarca, borrado, areteBovino, areteToro, areteVaca, pedigri } = datosActualizados;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;

        await db.execute(
            'UPDATE bovino SET siniiga = ?, fotoPerfil = ?, lugarMarca = ?, borrado = ?, areteBovino = ?, idToro = ?, idVaca = ?, pedigri = ? WHERE idBovino = ?',
            [siniiga || null, fotoPerfil || null, lugarMarca || null, borrado, areteBovino || null, idToro, idVaca, pedigri || null, idBovino]
        );

        return res.status(200).json({
            message: 'Bovino actualizado correctamente',
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

    try {
        const fechaBorrado = new Date();

        await db.execute('UPDATE bovino SET deleted = 1, deleted_at = ? WHERE idBovino = ?', [fechaBorrado, idBovino]);

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
    buscar,
    getById,
    create,
    update,
    deleteLogico,
    deleteFisico,
};
