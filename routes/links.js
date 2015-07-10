var express         = require('express');
var passport        = require('passport');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var router          = express.Router();
var Link            = require('../models/link');

router.get('/', /*passport.authenticate('bearer', { session: false }),*/ function(req, res) {
        Link.find(function (err, links) {
            if (!err) {
                return res.json(links);
            } else {
                res.statusCode = 500;
                logger.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.json({
                    error: 'Server error'
                });
            }
        });
    });

router.post('/post', passport.authenticate('bearer', { session: false }), function(req, res) {

    var link = new Link({
        fullValue: req.body.fullValue,
        shortValue: req.body.shortValue,
        description: req.body.description,
        tags: req.body.tags,
        hopCount: req.body.hopCount,
        userId: req.body.userId
    });

    link.save(function (err) {
        if (!err) {
            logger.info("New link created with short value: %s", link.shortValue);
            return res.json({
                status: 'OK',
                link: link
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