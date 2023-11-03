const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradores.controller'); 

router.get('/administradores', administradorController.index);
router.get('/administradores/:id', administradorController.getbyID);
router.post('/administradores', administradorController.create);
router.put('/administradores/:id', administradorController.update);
router.delete('/administradores/:id', administradorController.deleteFisico);


module.exports = router;
