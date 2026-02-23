const express = require('express');
const router = express.Router();
const {pingServer} = require('../controllers/pingController');

router.get('/', pingServer);

module.exports = router;