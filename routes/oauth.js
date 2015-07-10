var express             = require('express');
var oauth2              = require('../utils/auth/oauth2');
var	router              = express.Router();

router.post('/token', oauth2.token);

module.exports = router;