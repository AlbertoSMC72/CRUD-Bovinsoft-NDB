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
            return res.status(404).json({ message: 'Bovino no encontrada' });
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
        const { siniiga, areteBovino, areteToro, areteVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, tipoNacimiento, idAdminResult } = req.body;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);
        const [created_byResult] = await db.execute('SELECT idAdministrador FROM Administradores WHERE correo = ? limit 1', [idAdminResult]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;
        const created_by = created_byResult[0] ? created_byResult[0].idAdministrador : null;


        await db.execute(
            'INSERT INTO Bovino (siniiga, areteBovino, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil, pedigri, tipoNacimiento, created_by ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [siniiga || null, areteBovino || null, idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoPerfil || null, pedigri || null, tipoNacimiento, created_by]
        );

        return res.status(201).json({
            message: 'Bovino creada exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Bovino un error en el servidor',
            error: error.message,
        });
    }
};


const update = async (req, res) => {
    const idBovino = req.params.id;
    const datosActualizados = req.body;

    try {
        const { siniiga, fotoPerfil, tipoNacimiento, deleted, areteBovino, areteToro, areteVaca, pedigri } = datosActualizados;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT idBovino FROM Bovino WHERE areteBovino = ?', [areteVaca]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;

        await db.execute(
            'UPDATE Bovino SET siniiga = ?, fotoPerfil = ?, tipoNacimiento = ?, deleted = ?, areteBovino = ?, idToro = ?, idVaca = ?, pedigri = ? WHERE idBovino = ?',
            [siniiga || null, fotoPerfil || null, tipoNacimiento || null, deleted, areteBovino || null, idToro, idVaca, pedigri || null, idBovino]
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

        await db.execute('UPDATE Bovino SET deleted = 1, deleted_at = ? WHERE idBovino = ?', [fechaBorrado, idBovino]);

        return res.status(200).json({
            message: 'Bovino eliminada correctamente (lógicamente)',
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

        await db.execute('UPDATE Bovino SET deleted = 0, deleted_at = ? WHERE idBovino = ?', [fechaBorrado, idBovino]);

        return res.status(200).json({
            message: 'Bovino restaurado correctamente ',
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
            message: 'Bovino eliminada correctamente (físicamente)',
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
        await date.execute('SELECT idBovino,areteBovino,nombre FROM Bovino WHERE idToro = ? OR idVaca = ? and deleted = 0 OR deleted IS NULL', [idBovino, idBovino]);
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

const buscador = async (req, res) => {
    try {
        const [Bovinos] = await db.execute("SELECT idBovino, areteBovino, nombre FROM Bovino WHERE deleted = 0");

        if (Bovinos.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron Bovinos',
                Bovinos: Bovinos,
            });
        }

        return res.status(200).json({
            message: 'Vacas obtenidas correctamente',
            Bovinos: Bovinos,
        });
    } catch (error) {   
        return res.status(500).json({
            message: 'Hubo un error en el servidor al buscar Bovinos',
            error: error.message,
        });
    }
};

const toros = async (req, res) => {
    try {
        const [toros] = await db.execute(`
            SELECT idBovino, areteBovino, nombre
            FROM Bovino
            WHERE genero = 'Macho' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fechaNacimiento) > 730
        `);

        if (toros.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron toros',
                toros: toros,
            });
        }

        return res.status(200).json({
            message: 'Toros obtenidos correctamente',
            toros: toros,
        });
    } catch (error) {   
        return res.status(500).json({
            message: 'Hubo un error en el servidor al buscar toros',
            error: error.message,
        });
    }
};


const vacas = async (req, res) => {
    try {
        const [vacas] = await db.execute(`
            SELECT idBovino, areteBovino, nombre
            FROM Bovino
            WHERE genero = 'Hembra' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fechaNacimiento) > 730
        `);

        if (vacas.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron vacas',
                vacas: vacas,
            });
        }

        return res.status(200).json({
            message: 'Vacas obtenidas correctamente',
            vacas: vacas,
        });
    } catch (error) {   
        return res.status(500).json({
            message: 'Hubo un error en el servidor al buscar vacas',
            error: error.message,
        });
    }
};


const novillos = async (req, res) => {
    try {
        const [novillos] = await db.execute(`
            SELECT idBovino, areteBovino, nombre
            FROM Bovino
            WHERE genero = 'Macho' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fechaNacimiento) < 730
        `);

        if (novillos.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron novillos',
                novillos: novillos,
            });
        }

        return res.status(200).json({
            message: 'Novillos obtenidos correctamente',
            novillos: novillos,
        });
    } catch (error) {   
        return res.status(500).json({
            message: 'Hubo un error en el servidor al buscar novillos',
            error: error.message,
        });
    }
};


const novillas = async (req, res) => {
    try {
        const [novillas] = await db.execute(`
            SELECT idBovino, areteBovino, nombre
            FROM Bovino
            WHERE genero = 'Hembra' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fechaNacimiento) < 730
        `);

        if (novillas.length === 0) {
            return res.status(200).json({
                message: 'No se encontraron novillas',
                novillas: novillas,
            });
        }

        return res.status(200).json({
            message: 'Novillas obtenidos correctamente',
            novillas: novillas,
        });
    } catch (error) {   
        return res.status(500).json({
            message: 'Hubo un error en el servidor al buscar novillas',
            error: error.message,
        });
    }
};


module.exports = {
    index,
    indexBorrados,
    buscarHijos,
    buscador,
    getById,
    toros,
    vacas,
    novillos,
    novillas,
    create,
    update,
    deleteLogico,
    deleteLogicoInverso,
    deleteFisico,
};
