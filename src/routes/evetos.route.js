const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')

const eventosController = require('../controllers/eventos.controller')


router.get('/', authMiddleware.verificarJWT, eventosController.index)
router.get('/:id', authMiddleware.verificarJWT, eventosController.getById)
router.post('/', authMiddleware.verificarJWT, eventosController.create)
router.patch('/:id', authMiddleware.verificarJWT, eventosController.updateParcial)
router.put('/:id', authMiddleware.verificarJWT, eventosController.updateCompleto)
router.delete('/:id', authMiddleware.verificarJWT, eventosController.delete)

module.exports = router