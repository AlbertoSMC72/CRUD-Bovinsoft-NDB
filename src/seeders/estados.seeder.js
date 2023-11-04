const db = require('../configs/db')

const estados = [
    {
        idEstado: 1,
        idBovino: 1,
        estado: "Enferma",
    },
    {
        idEstado: 2,
        idBovino: 2,
        estado: "Desaparecida",
    },
    {
        idEstado: 3,
        idBovino: 3,
        estado: "Vendido",
    }
]

const insertarEstados = async () => {
    const query = 'INSERT INTO Estado (idEstado, idBovino, estado) VALUES (?, ?, ?)'

    for (const estado of estados) {
        await db.execute(query, [estado.idEstado, estado.idBovino, estado.estado])
    }

    console.log('Datos insertados correctamente')
}

insertarEstados();
