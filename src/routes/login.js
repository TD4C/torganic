const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/loginController');

router.use('/login', loginController.login);
router.use('/register', loginController.register);

module.exports = router;
