const db = require('../configs/db')


const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        let vacas;

        if (page && limit) {
            vacas = await db.execute(
                `SELECT * FROM Bovino WHERE deleted = 0 OR deleted IS NULL LIMIT ${skip},${limit} ` /* agregar order by */
            );
        } else {
            vacas = await db.execute('SELECT * FROM Bovino WHERE deleted = 0 OR deleted IS NULL');
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

const indexBorrados = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        let vacas;

        if (page && limit) {
            vacas = await db.execute(
                `SELECT * FROM Bovino WHERE deleted = 1 LIMIT ${skip},${limit} ` 
            );
        } else {
            vacas = await db.execute('SELECT * FROM Bovino WHERE deleted = 1 ');
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
        const [vaca] = await db.execute('SELECT * FROM Bovino WHERE idBovino = ?', [idBovino]);

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
        const { siniiga, areteBovino, areteToro, areteVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, lugarMarca, creadaAdministrador, deleted } = req.body;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;

        await db.execute(
            'INSERT INTO bovino (siniiga, areteBovino, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, lugarMarca, creadaAdministrador, deleted ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [siniiga || null, areteBovino || null, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil || null, pedigri || null, lugarMarca, creadaAdministrador, deleted]
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
        const { siniiga, fotoPerfil, lugarMarca, deleted, areteBovino, areteToro, areteVaca, pedigri } = datosActualizados;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;

        await db.execute(
            'UPDATE bovino SET siniiga = ?, fotoPerfil = ?, lugarMarca = ?, deleted = ?, areteBovino = ?, idToro = ?, idVaca = ?, pedigri = ? WHERE idBovino = ?',
            [siniiga || null, fotoPerfil || null, lugarMarca || null, deleted, areteBovino || null, idToro, idVaca, pedigri || null, idBovino]
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

const deleteLogicoInverso = async (req, res) => {
    const idBovino = req.params.id;

    try {
        const fechaBorrado = new Date();

        await db.execute('UPDATE bovino SET deleted = 0, deleted_at = ? WHERE idBovino = ?', [fechaBorrado, idBovino]);

        return res.status(200).json({
            message: 'bovino restaurado correctamente ',
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
        await db.execute('DELETE FROM Bovino WHERE idBovino = ?', [idBovino]);

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

const buscarHijos = async (req, res) => {
    try {
        await date.execute('SELECT idBovino,areteBovino,nombre FROM Bovino WHERE idToro = ? OR idVaca = ?', [idBovino, idBovino]);
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
}

module.exports = {
    index,
    indexBorrados,
    buscarHijos,
    getById,
    create,
    update,
    deleteLogico,
    deleteLogicoInverso,
    deleteFisico,
};
