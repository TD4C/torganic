const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/checkoutController');

router.get('/checkout', loginController.checkout);

module.exports = router;
