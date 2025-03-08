const express = require('express');
const router = express.Router();
const siteControllers = require('../app/controllers/siteController');

router.use('/', siteControllers.index);

module.exports = router;
