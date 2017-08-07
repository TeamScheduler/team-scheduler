/*jshint strict:false */
var Hour = require('../models/Hour');

/**
 *
 */
exports.createHour = function (hour, callback) {
    var newHour = new Hour(hour);
    newHour.save(function(err){
        callback(err, newHour);
    });
}

/**
 *
 */
exports.deleteHour = function(hourId, callback) {
    Hour.remove({_id:hourId}, function(err) {
        callback(err);
    });
}
