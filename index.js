const express = require('express')  
const bovinosRouter = require('./src/routes/bovinos.route')
const estadosRouter = require ("./src/routes/estados.route")
const eventosRouter = require('./src/routes/evetos.route')
const administradoresRouter = require('./src/routes/administradores.route')


const app = express()

app.use(express.json())
app.use('/bovinos', bovinosRouter)
app.use("/estados",estadosRouter)
app.use('/eventos', eventosRouter)
app.use('/administradores', administradoresRouter)



const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log('API escuchando en el puerto ' + PORT)
})