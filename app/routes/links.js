var express         = require('express');
var passport        = require('passport');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var router          = express.Router();
var Link            = require('../models/link');
var shortId         = require('../utils/generate/index');

router.post('/', function(req, res) {
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

router.post('/byUserId', passport.authenticate('bearer', { session: false }), function(req, res) {
    return Link.find({ 'userId': req.body.userId }, function (err, links) {
        if (!err) {
            return res.json(links);
        } else {
            res.statusCode = 500;
            logger.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});

router.post('/byId', function(req, res) {
    Link.findById({ '_id': req.body.urlId }, function (err, link) {
        if(!link) {
            res.statusCode = 404;
            logger.error('Not found.');
            return res.json({
                error: 'Not found'
            });
        }
        if (!err) {
            logger.info('Url with id ' + req.body.urlId + ' was found.');
            return res.json({
                status: 'OK',
                link: link
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

router.post('/byShortValue', function(req, res) {
    Link.findOne({ 'shortValue': req.body.shortValue }, function (err, link) {
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

router.post('/byTag', function(req, res) {
    Link.find({ 'tags': req.body.tag }, function (err, link) {
        if(!link) {
            res.statusCode = 404;
            logger.error('Not found.');
            return res.json({
                error: 'Not found'
            });
        }
        if (!err) {
            logger.info('The method byTag completed successfully.');
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

router.post('/create', passport.authenticate('bearer', { session: false }), function(req, res) {
    var link = new Link({
        fullValue: req.body.fullValue,
        shortValue: req.headers.host + "/" + shortId.generate(),
        description: req.body.description,
        tags: JSON.parse(req.body.tags),
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

router.put('/update', passport.authenticate('bearer', { session: false }), function (req, res){
    return Link.findById( req.query.linkId , function (err, link) {
        if(!link) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        link.fullValue = req.body.fullValue;
        link.shortValue = link.shortValue;
        link.description = req.body.description;
        link.tags = JSON.parse(req.body.tags);
        link.hopCount = req.body.hopCount;
        link.userId = req.body.userId;
        return link.save(function (err) {
            if (!err) {
                logger.info("Link was updated successfully.");
                return res.send({ status: 'OK', link: link });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                logger.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

router.put('/updateHopCount', function (req, res) {
    return Link.findById( req.query.linkId , function (err, link) {
        if(!link) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        var currentCount = link.hopCount;
        link.fullValue = link.fullValue;
        link.shortValue = link.shortValue;
        link.description = link.description;
        link.tags = link.tags;
        link.hopCount = currentCount + 1;
        link.userId = link.userId;
        return link.save(function (err) {
            if (!err) {
                logger.info("Link hop count was updated successfully.");
                return res.send({ status: 'OK', link: link });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                logger.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

router.delete('/delete', passport.authenticate('bearer', { session: false }), function (req, res){
    return Link.findById( req.query.linkId , function (err, link) {
        if(!link) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return link.remove(function (err) {
            if (!err) {
                logger.info("Link was removed successfully.");
                return res.send({ status: 'OK' });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                logger.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

module.exports = router;