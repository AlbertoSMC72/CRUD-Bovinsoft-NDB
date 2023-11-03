const zod = require('zod');

const eventoSchema = zod.object({
    idEvento: zod.number().int(),
    idVaca: zod.number().int(),
    titulo: zod.string({
        invalid_type_error: "Title must be a string",
        required_error: "Title is required"
    }),
    asunto: zod.string().nullable(),
    fecha_Reporte: zod.date(),
    descripcion: zod.string().nullable(),
    fecha_Reinsidio: zod.date().nullable(),
    eventoTerminado: zod.boolean().default(false),
});

const validarEvento = (object) => {
    return eventoSchema.safeParse(object);
};

module.exports = {
    validarEvento
};
