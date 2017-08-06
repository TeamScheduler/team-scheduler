/*jshint strict:false */
var Tag = require('../models/Tag');

/**
 *
 */
exports.createTag = function (tag, callback) {
    var newTag = new Tag(tag);

    newTag.save(function(err){
        callback(err, newTag);
    });
};

/**
 *
 * @param tagId
 * @param callback
 */
exports.deleteTag = function(tagId, callback) {
    Tag.remove({_id:tagId}, function(err) {
        callback(err);
    });
}

