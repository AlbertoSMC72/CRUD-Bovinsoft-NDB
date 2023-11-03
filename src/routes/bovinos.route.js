const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')

const bovinosController = require('../controllers/bovino.controller')


router.get('/', authMiddleware.verificarJWT, bovinosController.index)
router.get('/:id', authMiddleware.verificarJWT, bovinosController.getById)
router.post('/', authMiddleware.verificarJWT, bovinosController.create)
router.patch('/:id', authMiddleware.verificarJWT, bovinosController.updateParcial)
router.put('/:id', authMiddleware.verificarJWT, bovinosController.updateCompleto)
router.delete('/:id', authMiddleware.verificarJWT, bovinosController.delete)

module.exports = router