var express             = require('express');
var log4js              = require('log4js');
var logger              = log4js.getLogger();
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var passport            = require('passport');
var methodOverride      = require('method-override');
var http                = require('http');
require('./utils/auth/oauth'); // Важно!
var config              = require('./configs/index');
var oauth2              = require('./utils/auth/oauth2');
var usersR              = require('./routes/users');
var links               = require('./routes/links');
var clients             = require('./routes/clients');
var mongoose            = require('./utils/db/mongoose');
var session             = require('express-session');
var MongoStore          = require('connect-mongo')(session);
var router              = express.Router();
var app                 = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: config.get('session:secret'),
    saveUninitialized: true,
    resave: false,
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


app.use(router);

app.use('/api/links', links);
app.use('/api/users', usersR);
app.use('/api/clients', clients);
app.use('/api/oauth/token', oauth2.token);

var server = http.createServer(app);
server.listen(config.get('port'), function(){
    logger.info('Express server listening on port ' + config.get('port'));
});

app.use(function(req, res, next){
    res.status(404);
    logger.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    logger.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});