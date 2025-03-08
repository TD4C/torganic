const express = require('express');
const router = express.Router();
const cartControllers = require('../app/controllers/cartController');

router.use('/shoppingCart', cartControllers.Cart);

module.exports = router;
