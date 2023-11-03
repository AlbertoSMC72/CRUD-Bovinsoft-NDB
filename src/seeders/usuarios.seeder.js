const db = require('../configs/db')

const usuarios = [
    {
        nombre: "rodrigo",
        apellido: "flores",
        email: "rodrigFlores@gmail.com",
    },
    {
        nombre: "fernando",
        apellido: "flores",
        email: "fercho@gmail.com",
    },
    {
        nombre: "Diego",
        apellido: "Bejar",
        email: "debz@gmail.com",
    },
    {
        nombre: "Roxana",
        apellido: "Flores",
        email: "rox@gmail.com",
    },
    {
        nombre: "carlos",
        apellido: "ruiz",
        email: "cato@gmail.com",
    },
    {
        nombre: "Edgar",
        apellido: "Flores",
        email: "edgar@gmail.com",
    },
    {
        nombre: "Cinthya",
        apellido: "Lopez",
        email: "cLopez@gmail.com",
    },
    {
        nombre: "Jessica",
        apellido: "Morales",
        email: "Jess@gmail.com",
    },
    {
        nombre: "Shiny",
        apellido: "Crochet",
        email: "ShinyCrochet@gmail.com",
    },
    {
        nombre: "Fernanda",
        apellido: "Quezada",
        email: "FerQuezada@gmail.com",
    },
    {
        nombre: "Ary",
        apellido: "Coronado",
        email: "Ary@gmail.com",
    },
    {
        nombre: "Iskander",
        apellido: "Donet",
        email: "IskanderD@gmail.com",
    }
]

const insertarUsarios = () =>{

    const query = 'insert into usuarios (nombre, apellido, email) values (?,?,?)'

    usuarios.map(usuario =>{
        db.execute(query, [usuario.nombre, usuario.apellido, usuario.email])
    })
}

insertarUsarios()