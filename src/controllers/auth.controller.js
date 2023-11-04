const bcrypt = require('bcrypt')
const jwtToken = process.env.JWTSECRET
const db = require('../configs/db')
const jwt = require('jsonwebtoken')


const login = async (req, res) =>{
    try {
        const {usuario, password} = req.body;

        const usuarioEncontrado = await db.execute('select * from administradores where usuario = ?', [usuario]);
        if (usuarioEncontrado[0].length == 0) {
            return res.status(400).json({
                message: "usuario o password incorrecto"
            });
        }

        const passwordCorrecto = bcrypt.compareSync(password, usuarioEncontrado[0][0].password);
        
        if (!passwordCorrecto) {
            return res.status(400).json({
                message: "usuario o password incorrecto"
            });
        }

        const payload = {
            usuario: {
                id: usuarioEncontrado[0][0].id
            }
        }

        const token = jwt.sign(payload, jwtToken, {expiresIn: '1h'});

        return res.status(200).json({
            message: "acceso correcto",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al validar credenciales",
            error: error.message
        });
    }
}

module.exports = {
    login
}