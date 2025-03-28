const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/loginController');

router.get('/login', loginController.login);
router.get('/register', loginController.register);

module.exports = router;
