const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const estadosController = require('../controllers/estados.controller'); 


router.get('/', authMiddleware.verificarJWT, estadosController.index);
router.get('/:id', authMiddleware.verificarJWT, estadosController.getById);
router.post('/', authMiddleware.verificarJWT, estadosController.create);
router.put('/:id', authMiddleware.verificarJWT, estadosController.update);
router.patch('/borradoLogico/:id', authMiddleware.verificarJWT, estadosController.deleteLogico);
router.delete('/borrar/:id', authMiddleware.verificarJWT, estadosController.deleteFisico);

module.exports = router;
