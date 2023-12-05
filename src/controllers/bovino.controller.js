const db = require('../configs/db')


const index = async (req, res) => {
    try {
        const { page, limit } = req.query;
        const skip = (page - 1) * limit;
        let vacas;

        if (page && limit) {
            vacas = await db.execute(
                `SELECT * FROM bovino WHERE deleted = 0 OR deleted IS NULL LIMIT ${skip},${limit} `
            );
        } else {
            vacas = await db.execute('SELECT * FROM bovino WHERE deleted = 0 OR deleted IS NULL');
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
                `SELECT * FROM bovino WHERE deleted = 1 LIMIT ${skip},${limit} `
            );
        } else {
            vacas = await db.execute('SELECT * FROM bovino WHERE deleted = 1 ');
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
        const [vaca] = await db.execute('SELECT * FROM bovino WHERE id_bovino = ?', [idBovino]);

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
    await db.beginTransaction();
    try {
        const { siniiga, areteBovino, areteToro, areteVaca, nombre, raza, genero, fechaNacimiento, fotoBovino, pedigri, tipoNacimiento, adminCorreo } = req.body;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT id_bovino FROM bovino WHERE arete_bovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT id_bovino FROM bovino WHERE arete_bovino = ?', [areteVaca]);
        const [created_byResult] = await db.execute('SELECT id_administrador FROM administradores WHERE correo = ? limit 1', [adminCorreo]);

        // Manejar posibles valores nulos
        const idToro = idToroResult && idToroResult[0] ? idToroResult[0].id_bovino : null;
        const idVaca = idVacaResult && idVacaResult[0] ? idVacaResult[0].id_bovino : null;
        const created_by = created_byResult && created_byResult[0] ? created_byResult[0].id_administrador : null;

        await db.execute(
            'INSERT INTO bovino (siniiga, arete_bovino, id_toro, id_vaca, nombre, raza, genero, fecha_nacimiento, foto_perfil, pedigri, tipo_nacimiento, created_by ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [siniiga || null, areteBovino || "No definido", idToro, idVaca, nombre, raza, genero, fechaNacimiento, fotoBovino || null, pedigri || null, tipoNacimiento, created_by]
        );
        await db.commit();

        return res.status(201).json({
            message: 'bovino creada exitosamente',
        });
    } catch (error) {
        await db.rollback();
        console.error("Error al crear bovino:", error.message);
        return res.status(500).json({
            message: 'bovino un error en el servidor',
            error: error.message,
        });
    }
};



const update = async (req, res) => {
    const idBovino = req.params.id;
    const datosActualizados = req.body;
    await db.beginTransaction();
    try {
        const { siniiga, fotoPerfil, areteBovino, areteToro, areteVaca, pedigri } = datosActualizados;

        // Obtener los idBovino correspondientes a los aretes de los padres
        const [idToroResult] = await db.execute('SELECT id_bovino FROM bovino WHERE arete_bovino = ?', [areteToro]);
        const [idVacaResult] = await db.execute('SELECT id_bovino FROM bovino WHERE arete_bovino = ?', [areteVaca]);

        const idToro = idToroResult[0] ? idToroResult[0].idBovino : null;
        const idVaca = idVacaResult[0] ? idVacaResult[0].idBovino : null;

        const updated_at = new Date();

        const updateQuery = 'UPDATE bovino SET ' +
            (siniiga ? 'siniiga = ?, ' : '') +
            (fotoPerfil ? 'foto_perfil = ?, ' : '') +
            (areteBovino ? 'arete_bovino = ?, ' : '') +
            (idToro ? 'id_toro = ?, ' : '') +
            (idVaca ? 'id_vaca = ?, ' : '') +
            (pedigri ? 'pedigri = ?, ' : '') +
            'updated_at = ? WHERE id_bovino = ?';

        const updateParams = [
            ...(siniiga ? [siniiga] : []),
            ...(fotoPerfil ? [fotoPerfil] : []),
            ...(areteBovino ? [areteBovino] : []),
            ...(idToro ? [idToro] : []),
            ...(idVaca ? [idVaca] : []),
            ...(pedigri ? [pedigri] : []),
            updated_at,
            idBovino
        ];

        await db.execute(updateQuery, updateParams);
        await db.commit();
        return res.status(200).json({
            message: 'bovino actualizado correctamente',
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
    const idBovino = req.params.id;
    await db.beginTransaction();
    try {
        const fechaBorrado = new Date();

        await db.execute('UPDATE bhovino SET deleted = 1, deleted_at = ? WHERE id_bovino = ?', [fechaBorrado, idBovino]);
        await db.commit();
        return res.status(200).json({
            message: 'bovino eliminada correctamente (lógicamente)',
        });
    } catch (error) {
        await db.rollback();
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
};

const deleteLogicoInverso = async (req, res) => {
    const idBovino = req.params.id;
    await db.beginTransaction();
    try {
        const fechaBorrado = new Date();

        await db.execute('UPDATE bovino SET deleted = 0, deleted_at = ? WHERE id_bovino = ?', [fechaBorrado, idBovino]);
        await db.commit();
        return res.status(200).json({
            message: 'bovino restaurado correctamente ',
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
    const idBovino = req.params.id;
    await db.beginTransaction();
    try {
        await db.execute('DELETE FROM bovino WHERE id_bovino = ?', [idBovino]);
        await db.commit();
        return res.status(200).json({
            message: 'bovino eliminada correctamente (físicamente)',
        });
    } catch (error) {
        await db.rollback();
        return res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message,
        });
    }
};

const buscarPadres = async (req, res) => {
    try {
        const idBovino = req.params.id;

        const [result] = await db.execute(
            'SELECT b.id_bovino, b.arete_bovino, b.nombre, b.genero, b.foto_perfil ' +
            'FROM bovino AS bov ' +
            'JOIN bovino AS b ON bov.id_toro = b.id_bovino OR bov.id_vaca = b.id_bovino ' +
            'WHERE bov.id_bovino = ? AND (b.deleted = 0 OR b.deleted IS NULL)',
            [idBovino]
        );

        const padres = {
            padre: {},
            madre: {}
        };

        result.forEach((row) => {
            if (row.genero === 'Macho') {
                padres.padre = {
                    idBovino: row.idBovino,
                    areteBovino: row.areteBovino,
                    nombre: row.nombre,
                    genero: row.genero,
                    foto: row.fotoPerfil
                };
            } else if (row.genero === 'Hembra') {
                padres.madre = {
                    idBovino: row.idBovino,
                    areteBovino: row.areteBovino,
                    nombre: row.nombre,
                    genero: row.genero,
                    foto: row.fotoPerfil
                };
            }
        });

        return res.status(200).json({
            message: 'Padres obtenidos correctamente',
            padres: padres,
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
        const idBovino = req.params.id;
        const Hijos = await db.execute('SELECT id_bovino, arete_bovino,nombre,foto_perfil,genero FROM bovino WHERE id_toro = ? OR id_vaca = ? AND (deleted = 0 OR deleted IS NULL)', [idBovino, idBovino]);
        return res.status(200).json({
            message: 'Hijos obtenidas correctamente',
            Hijos: Hijos[0],
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
        const [Bovinos] = await db.execute("SELECT id_bovino, arete_bovino, nombre FROM bovino WHERE deleted = 0");

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
            SELECT id_bovino, arete_bovino, nombre,foto_perfil
            FROM bovino
            WHERE genero = 'Macho' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fecha_nacimiento) > 730
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
            SELECT id_bovino, arete_bovino, nombre,foto_perfil
            FROM bovino
            WHERE genero = 'Hembra' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fecha_nacimiento) > 730
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
            SELECT id_bovino, arete_bovino, nombre, foto_perfil
            FROM bovino
            WHERE genero = 'Macho' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fecha_nacimiento) < 730
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
            SELECT id_bovino, arete_bovino, nombre,foto_perfil
            FROM bovino
            WHERE genero = 'Hembra' 
            AND deleted = 0 
            AND DATEDIFF(CURDATE(), fecha_nacimiento) < 730
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
    buscarPadres,
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
