// confirmationRoutes.js

const express = require('express');
const router = express.Router();
const confirmationController = require('./confirmationController');

// Endpoint to save confirmation data
router.post('/confirmations', confirmationController.saveConfirmation);

module.exports = router;
