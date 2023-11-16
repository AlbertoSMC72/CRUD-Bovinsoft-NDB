const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradores.controller'); 
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.get('/', administradorController.index);
router.get('/:id', administradorController.getbyID);
router.post('/', administradorController.create);
router.put('/:id', administradorController.update);
router.delete('/:id', administradorController.deleteFisico);


module.exports = router;
