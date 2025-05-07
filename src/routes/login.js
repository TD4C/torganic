const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/loginController');

// Trang form login/register
router.get('/login', loginController.login);
router.post('/login', loginController.handleLogin);

router.get('/register', loginController.register);
router.post('/register', loginController.handleRegister);

module.exports = router;
