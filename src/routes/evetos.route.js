const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const eventosController = require('../controllers/eventos.controller');

router.get('/', authMiddleware.verificarJWT, eventosController.index);
router.get('/:id', authMiddleware.verificarJWT, eventosController.getById);
router.post('/', authMiddleware.verificarJWT, eventosController.create);
router.put('/:id', authMiddleware.verificarJWT, eventosController.update);
router.patch('/eventoTerminado/:id', authMiddleware.verificarJWT, eventosController.eventoTerminado);
router.patch('/logicalDelete/:id', authMiddleware.verificarJWT, eventosController.deleteLogico);
router.delete('/Delete/:id', authMiddleware.verificarJWT, eventosController.deleteFisico);

module.exports = router;
