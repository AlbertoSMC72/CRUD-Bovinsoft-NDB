const zod = require('zod')

const usuarioSchema = zod.object({
    nombre: zod.string({
        invalid_type_error: "Task name must be a string",
        required_error: "Task name is required"
    }),
    apellido: zod.string({
        invalid_type_error: "Task name must be a string",
        required_error: "Task name is required"
    }),
    email: zod.string({
        invalid_type_error: "Task name must be a string",
        required_error: "Task name is required"
    }),
    updated: zod.boolean({
        invalid_type_error: "Task must be a boolean"
    })
    .default(false),
    updated_at: zod.coerce.date().nullable().default(null),
    deleted: zod.boolean({
        invalid_type_error: 'Task must be a boolean'
    })
    .default(false),
    deleted_at: zod.coerce.date().nullable().default(null),
})

const validarUsuario = (object) =>{
    return usuarioSchema.safeParse(object)
}

const validarUsuarioParcial = (object) => {
    return productoSchema.partial().safeParse(object);
};

module.exports = {
    validarUsuario,
    validarUsuarioParcial
}