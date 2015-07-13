var express         = require('express');
var passport        = require('passport');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var router          = express.Router();
var User            = require('../models/user');

router.get('/', /*passport.authenticate('bearer', { session: false }),*/ function(req, res) {
    User.find(function (err, users) {
        if (!err) {
            return res.send(users);
        } else {
            res.statusCode = 500;
            logger.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.json({
                error: 'Server error'
            });
        }
    });
});

/*
 *  �������������� �� �����,
 *  ����� ������������ ��� ����������� ����� �������������
*/
router.post('/post', function(req, res) {

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (!err) {
            logger.info("New user created with name: %s", user.username);
            return res.json({
                status: 'OK',
                user: user
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