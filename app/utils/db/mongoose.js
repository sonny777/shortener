var mongoose        = require('mongoose');
var path            = require('path');
var log4js          = require('log4js');
var logger          = log4js.getLogger();
var config          = require('../../configs/index');

mongoose.connect(config.get('mongoose:uri'), function(err) {
    //mongoose.connection.db.dropDatabase();
    if(err) {
        logger.error('Connection error.', err.message);
    } else {
        logger.info('Connection successful.');
    }
});

module.exports = mongoose;