const zod = require('zod');

const vacaSchema = zod.object({
    idBovino: zod.number().int(),
    siniiga: zod.string().nullable(),
    areteBovino: zod.string().nullable(),
    areteToro: zod.string().nullable(),
    areteVaca: zod.string().nullable(),
    nombre: zod.string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required"
    }),
    raza: zod.string({
        invalid_type_error: "Raza must be a string",
        required_error: "Raza is required"
    }),
    genero: zod.string({
        invalid_type_error: "Gender must be a string",
        required_error: "Gender is required"
    }),
    fechaNacimiento: zod.date(),
    fotoPerfil: zod.string().nullable(),
    pedigri: zod.string().nullable(),
    lugarMarca: zod.string().nullable(),
    creadaAdministrador: zod.number().int(),
    borrado: zod.boolean().default(false),
    updated_at: zod.date().nullable().default(new Date()),
});

const validarVaca = (object) => {
    return vacaSchema.safeParse(object);
};

module.exports = {
    validarVaca
};
