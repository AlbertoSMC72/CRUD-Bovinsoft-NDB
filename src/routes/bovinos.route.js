const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const bovinosController = require('../controllers/bovino.controller');

/* vista 4  */
router.get('/toros', authMiddleware.verificarJWT, bovinosController.toros);
router.get('/vacas', authMiddleware.verificarJWT, bovinosController.vacas);
router.get('/novillos', authMiddleware.verificarJWT, bovinosController.novillos);
router.get('/novillas', authMiddleware.verificarJWT, bovinosController.novillas);


router.get('/', authMiddleware.verificarJWT,  bovinosController.index);
router.get('/borrados', authMiddleware.verificarJWT,  bovinosController.indexBorrados);
router.get('/buscador', authMiddleware.verificarJWT,  bovinosController.buscador);
router.get('/hijos' , authMiddleware.verificarJWT, bovinosController.buscarHijos);
router.get('/:id', authMiddleware.verificarJWT,  bovinosController.getById);
router.post('/',  authMiddleware.verificarJWT, bovinosController.create);
router.put('/:id', authMiddleware.verificarJWT, bovinosController.update);
router.patch('/borradoLogico/:id',  authMiddleware.verificarJWT, bovinosController.deleteLogico);
router.patch('/restaurarLogico/:id', authMiddleware.verificarJWT, bovinosController.deleteLogicoInverso);
router.delete('/borrado/:id', authMiddleware.verificarJWT, bovinosController.deleteFisico);


module.exports = router;
