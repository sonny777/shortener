var express         = require('express');
var passport        = require('passport');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var router          = express.Router();
var Client          = require('../models/client');

/*
 *  аутентификация не нужна,
 *  метод используется для регистрации новых пользователей
 */
router.post('/create', function(req, res) {

    var client = new Client({
        name: req.body.name,
        clientId: req.body.clientId,
        clientSecret: req.body.clientSecret
    });

    client.save(function (err) {
        if (!err) {
            logger.info("New client created with name: %s", client.name);
            return res.json({
                status: 'OK',
                client: client
            });
        } else {
            if(err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                res.json({
                    error: 'Server error'
                });
            }
            logger.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});

module.exports = router;