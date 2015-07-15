var oauth2orize     = require('oauth2orize');
var passport        = require('passport');
var crypto          = require('crypto');
var config          = require('../../configs/index');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var db              = require('../db/mongoose');
var User            = require('../../models/user');
var AccessToken     = require('../../models/accessToken');
var RefreshToken    = require('../../models/refreshToken');

var aserver         = oauth2orize.createServer();

// Generic error handler
var errFn = function (cb, err) {
    if (err) {
        logger.error(err);
        return cb(err);
    }
};

// Destroys any old tokens and generates a new access and refresh token
var generateTokens = function (data, done) {
    // curries in `done` callback so we don't need to pass it
    var errorHandler = errFn.bind(undefined, done),
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    RefreshToken.remove(data, errorHandler);
    AccessToken.remove(data, errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);
    logger.info("New token was created successfully. " + token.token);
    refreshToken.save(errorHandler);

    token.save(function(err) {
        if (err) {
            logger.error(err);
            return done(err);
        }
        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife')
        });
    });
};

// Exchange username & password for access token.
aserver.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
        User.findOne({ username: username }, function(err, user) {
        if (err) {
            logger.error(err);
            return done(err);
        }
        if (!user || !user.checkPassword(password)) {
            logger.error("Incorrect username or password.");
            return done(null, false);
        }
        var model = {
            userId: user.userId,
            clientId: user.username // должно быть clientId: client.clientId
        };

        generateTokens(model, done);
    });

}));

// Exchange refreshToken for access token.
aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function(err, token) {
        if (err) {
            logger.error(err);
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function(err, user) {
            if (err) {
                logger.error(err);
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            var model = {
                userId: user.userId,
                clientId: client.clientId
            };

            generateTokens(model, done);
        });
    });
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    aserver.token(),
    aserver.errorHandler()
];