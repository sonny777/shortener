var express             = require('express');
var oauth2              = require('../utils/auth/oauth2');
var AccessToken         = require('../models/accessToken');
var RefreshToken        = require('../models/refreshToken');
var log4js              = require('log4js');
var logger              = log4js.getLogger();
var	router              = express.Router();

router.post('/token', oauth2.token);

router.post('/byUserId', function(req, res) {
    AccessToken.findOne({ 'userId': req.body.userId }, function (err, accessToken) {
        if(!accessToken) {
            res.statusCode = 404;
            logger.error('Access token not found.');
            return res.json({
                error: 'Access token not found'
            });
        }
        if (!err) {
            logger.info('Access token found.');
            return res.json({
                status: 'OK',
                accessToken: accessToken
            });
        } else {
            res.statusCode = 500;
            logger.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});

router.post('/refreshTokenByUserId', function(req, res) {
    RefreshToken.findOne({ 'userId': req.body.userId }, function (err, refreshToken) {
        if(!refreshToken) {
            res.statusCode = 404;
            logger.error('Refresh token not found.');
            return res.json({
                error: 'Refresh token not found'
            });
        }
        if (!err) {
            logger.info('Refresh token found.');
            return res.json({
                status: 'OK',
                refreshToken: refreshToken
            });
        } else {
            res.statusCode = 500;
            logger.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});

module.exports = router;