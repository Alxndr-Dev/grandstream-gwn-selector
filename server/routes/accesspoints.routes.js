const express = require('express');
const router = express.Router();
const accessPointsController = require('../controllers/accessPointsController');

// Definir que en el GET de esta ruta se ejecute getAPs
router.get('/', accessPointsController.getAPs);

module.exports = router;