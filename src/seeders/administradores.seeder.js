const db = require('./configs/db');

const administradores = [
  {
    usuario: "admin",
    password: "password",
  },
  {
    usuario: "Pepe",
    password: "123",
  },
  {
    usuario: "Angel",
    password: "345",
  },
  {
    usuario: "Norm",
    password: "789",
  },
];

const insertarAdministradores = () => {
  const query = 'insert into administradores (usuario, password) values (?,?)';

  administradores.forEach((administrador) => {
    db.execute(query, [administrador.usuario, administrador.password]);
  });
};

insertarAdministradores();