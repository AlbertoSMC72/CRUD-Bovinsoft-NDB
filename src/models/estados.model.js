const zod = require('zod');

const estadoSchema = zod.object({
    idVaca: zod.number().int(),
    estado: zod.string({
        invalid_type_error: "State must be a string",
        required_error: "State is required"
    }),
    idEstado: zod.number().int(),
});

const validarEstado = (object) => {
    return estadoSchema.safeParse(object);
};

module.exports = {
    validarEstado
};
