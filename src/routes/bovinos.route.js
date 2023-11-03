const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const bovinosController = require('../controllers/bovino.controller');

router.get('/', /* authMiddleware.verificarJWT, */ bovinosController.index);
router.get('/:id', /* authMiddleware.verificarJWT, */ bovinosController.getById);
router.post('/', /* authMiddleware.verificarJWT, */ bovinosController.create);
router.put('/:id', /* authMiddleware.verificarJWT, */ bovinosController.update);
router.patch('/borradoLogico/:id', /* authMiddleware.verificarJWT, */ bovinosController.deleteLogico);
router.delete('/borrado/:id', /* authMiddleware.verificarJWT, */ bovinosController.deleteFisico);

module.exports = router;
