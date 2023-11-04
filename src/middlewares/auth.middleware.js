const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function verificarJWT(req, res, next) {
    let token = req.get('Authorization');
    if (token) {
        // Se saca la palabra "Bearer", se usa como esquema y se deja el puro token
        token = token.substring(7);
        jwt.verify(token, process.env.JWTSECRET, (err, decodeToken) => {
            if (err) {
                return res.status(401).send({
                    message: 'Token inválido',
                    error: err.message,
                });
            }
            req.usuario = decodeToken.usuario;
            next();
        });
    }
    if (!token) {
        return res.status(401).send({ message: 'Token inexistente' });
    }
}

module.exports = { verificarJWT };
