const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuarios.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.get('/',authMiddleware.verificarJWT, usuariosController.index)
router.get('/:id',authMiddleware.verificarJWT, usuariosController.getByEmail)
router.post('/',authMiddleware.verificarJWT, usuariosController.create)
router.patch('/:id',authMiddleware.verificarJWT, usuariosController.updateParcial)
router.put('/:id',authMiddleware.verificarJWT, usuariosController.updateCompleto)
router.delete('/:id',authMiddleware.verificarJWT, usuariosController.delete)

module.exports = router