var express         = require('express');
var passport        = require('passport');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var router          = express.Router();
var Link            = require('../models/link');
var shortId         = require('../utils/generate/index');

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

router.get('/byUserId', /*passport.authenticate('bearer', { session: false }),*/ function(req, res) {
    return Link.find({ 'userId': req.query.userId }, function (err, links) {
        if (!err) {
            return res.json(links)
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});

router.post('/byShortValue', /*passport.authenticate('bearer', { session: false }),*/ function(req, res) {
    Link.findOne({'shortValue': req.body.shortValue}, function (err, link) {
        if(!link) {
            res.statusCode = 404;
            logger.error('Not found.');
            return res.json({
                error: 'Not found'
            });
        }
        if (!err) {
            logger.info('The method byShortValue completed successfully.');
            return res.json({
                status: 'OK',
                link: link
            });
        } else {
            res.statusCode = 500;
            logger.error('Internal error(%d): %s',res.statusCode,err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});

router.post('/post', /*passport.authenticate('bearer', { session: false }),*/ function(req, res) {

    var link = new Link({
        fullValue: req.body.fullValue,
        shortValue: 'local.host/' + shortId.generate(),
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