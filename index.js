const express = require('express');
const cors = require('cors');

const bovinosRouter = require('./src/routes/bovinos.route');
const estadosRouter = require ("./src/routes/estados.route");
const eventosRouter = require('./src/routes/evetos.route');
const administradoresRouter = require('./src/routes/administradores.route');

const app = express();

app.use(express.json());

// Configura CORS
app.use(cors());

app.use('/bovinos', bovinosRouter);
app.use("/estados",estadosRouter);
app.use('/eventos', eventosRouter);
app.use('/administradores', administradoresRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log('API escuchando en el puerto ' + PORT);
});