const db = require('../configs/db')
const usuarioModel = require('../models/usuario.model')

const index = async (req, res) => {
    try {
        const { page, limit } = req.query
        const skip = (page - 1) * limit
        let usuarios

        if (page && limit) {
            usuarios = await db.execute(`Select * from usuarios where deleted = 0 or deleted is null limit ${skip},${limit} `)
        } else {
            usuarios = await db.execute('Select * from usuarios where deleted = 0 or deleted is null')
        }

        return res.status(200).json({
            message: "se obtuvieron los usuarios correctamente",
            usuarios: usuarios[0],
        })

    } catch (error) {
        return res.status(500).json({
            message: 'hubo un error en el servidor',
            error: error.message
        })
    }

}

const getByEmail = async (req, res) => {

}

const create = async (req, res) => {
    try {
        const validacion = usuarioModel.validarUsuario(req.body)

        if (!validacion.success) {
            return res.status(422).json({
                message: 'datos invalidos',
                error: JSON.parse(validacion.error.message)
            })
        }
        const { nombre, apellido, email } = req.body
        const { updated, deleted } = validacion.data
        const hoy = new Date()
        try {
            //await db.execute(`Insert into usuarios (nombre, apellido, email) values ('${nombre}', '${apellido}', '${email}')`)
            await db.execute(`Insert into usuarios (nombre, apellido, email, updated, deleted, created_at values (?, ?, ?, ?, ?, ?)`, [nombre, apellido, email, updated, deleted, hoy])

            return res.status(201).json({
                message: 'usuario creado exitosamente',
            })

        } catch (error) {
            return res.status(406).json({
                message: "hubo un error al crear el usuario",
                error: error.message
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "hubo un error con el servidor",
            error: error.message
        })
    }
}

const updateParcial = async (req, res) => {

    try {
        const usuarioId = req.params.id
        const { nombre, apellido, email } = req.body
        const hoy = new Date()
        if (nombre) {
            db.execute(`update usuarios set nombre= ?, updated = true, updated_at = ? where id = ?`, [nombre, hoy, usuarioId])
        }
        if (apellido) {
            db.execute(`update usuarios set apellido= ? updated = true, updated_at = ? where id = ?`, [apellido, hoy, usuarioId])
        }
        if (email) {
            db.execute("update usuarios set email= ?, updated = true, updated_at = ? where id = ?", [email, hoy, usuarioId])
        }

        return res.status(200).json({
            message: 'usuario actualizado correctamente'
        })

    } catch (error) {
        return res.status(406).json({
            message: "hubo un error al intentar actualizar al usuarios",
            error: error.message
        })
    }

}

const updateCompleto = async (req, res) => {

    try {
        const usuarioId = req.params.id
        const { nombre, apellido, email } = req.body
        const hoy = new Date()
        await db.execute(`update usuarios set nombre= ?, apellido= ?, email= ?, updated = true, updated_at = ? where id = ?`,
            [nombre || null, apellido || null, email || null, hoy, usuarioId])
        return res.status(200).json({
            message: 'usuario actualizado correctamente'
        })
    } catch (error) {
        return res.status(406).json({
            message: "hubo un error al intentar actualizar al usuarios",
            error: error.message
        })
    }
}

const deleteLogico = async (req, res) => {

    try {
        const usuarioId = req.params.id
        const hoy = new Date()

        await db.execute(`update usuarios set deleted= true, deleted_at= ? where id = ?`, [hoy, usuarioId])

        return res.status(200).json({
            message: 'usuario eliminado correctamente'
        })

    } catch (error) {
        return res.status(406).json({
            message: "hubo un error al intentar eliminar al usuarios",
            error: error.message
        })
    }
}

const deleteFisico = async (req, res) => {

    try {
        const usuarioId = req.params.id

        await db.execute(`delete from usuarios where id = ? `, [usuarioId])

        return res.status(200).json({
            message: 'usuario eliminado correctamente'
        })

    } catch (error) {
        return res.status(406).json({
            message: "hubo un error al intentar eliminar al usuarios",
            error: error.message
        })
    }

}


module.exports = {
    index,
    getByEmail,
    create,
    delete: deleteLogico,
    updateParcial,
    updateCompleto,
}
