const express = require('express');
const router = express.Router();
const socketController = require('../controllers/socket');

router.post('/show', socketController.show);

router.post('/receive',socketController.receive);

router.post('/countNew', socketController.countNew); 




module.exports = router;