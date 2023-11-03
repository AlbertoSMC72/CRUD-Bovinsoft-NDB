const zod = require('zod');

const administradorSchema = zod.object({
    idAdministrador: zod.number().int(),
    password: zod.string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required"
    }),
    usuario: zod.string({
        invalid_type_error: "User name must be a string",
        required_error: "User name is required"
    }),
});

const validarAdministrador = (object) => {
    return administradorSchema.safeParse(object);
};

module.exports = {
    validarAdministrador
};
