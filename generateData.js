var log4js          = require('log4js');
var logger          = log4js.getLogger();
var db              = require('./app/utils/db/mongoose');
var config          = require('./app/configs/index');
var Link            = require('./app/models/link');
var User            = require('./app/models/user');
var Client          = require('./app/models/client');
var shortId         = require('./app/utils/generate/index');

//User.remove({}, function(err) {
//    var user = new User({
//        username: config.get("default:user:username"),
//        password: config.get("default:user:password")
//    });
//
//    user.save(function(err, user) {
//        if(!err) {
//            logger.info("New user - %s:%s", user.username, user.password);
//        }else {
//            return logger.error(err);
//        }
//    });
//});
//
//Client.remove({}, function(err) {
//    var client = new Client({
//        name: config.get("default:client:name"),
//        clientId: config.get("default:client:clientId"),
//        clientSecret: config.get("default:client:clientSecret")
//    });
//
//    client.save(function(err, client) {
//
//        if(!err) {
//            logger.info("New client - %s:%s", client.clientId, client.clientSecret);
//        } else {
//            return logger.error(err);
//        }
//
//    });
//});

Link.remove({}, function(err) {
    //var link = new Link({
    //    fullValue: config.get("default:link:fullValue"),
    //    shortValue: 'nik.bat/' + shortId.generate(),
    //    description: config.get("default:link:description"),
    //    tags: config.get("default:link:tags"),
    //    hopCount: config.get("default:link:hopCount"),
    //    userId: config.get("default:link:userId")
    //});
    //
    //link.save(function(err, link) {
    //    if(!err) {
    //        logger.info("New link - %s:%s", link.fullValue, link.shortValue);
    //    }else {
    //        return logger.error(err);
    //    }
    //});
});

setTimeout(function() {
    db.disconnect();
}, 3000);