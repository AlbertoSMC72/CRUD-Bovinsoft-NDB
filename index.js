const express = require('express');
const cors = require('cors');

const bovinosRouter = require('./src/routes/bovinos.route');
const estadosRouter = require ("./src/routes/estados.route");
const eventosRouter = require('./src/routes/evetos.route');
const administradoresRouter = require('./src/routes/administradores.route');

const app = express();

const ALLOWED_ORIGIN = 'http://localhost:3000'; // Reemplaza con el dominio de tu aplicación React

app.use(express.json());

// Configura CORS con opciones específicas
app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: 'Authorization', // Reemplaza con los encabezados que necesitas exponer
}));

// Manejo de solicitudes de preflight (OPTIONS)
app.options('*', cors());

app.use('/bovinos', bovinosRouter);
app.use("/estados", estadosRouter);
app.use('/eventos', eventosRouter);
app.use('/administradores', administradoresRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log('API escuchando en el puerto ' + PORT);
});
