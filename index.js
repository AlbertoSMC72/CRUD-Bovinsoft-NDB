const express = require('express')
const usuariosRouter = require('./src/routes/usuarios.route')
const bovinosRouter = require('./src/routes/bovinos.route')

const app = express()

app.use(express.json())
app.use('/usuarios', usuariosRouter)
app.use('/bovinos', bovinosRouter)

const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log('API escuchando en el puerto ' + PORT)
})