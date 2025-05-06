const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/accountController');

router.get('/account', loginController.account);

module.exports = router;
