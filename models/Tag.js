/*jshint strict:false */
var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var tagSchema = new mongoose.Schema({
    name: String,
    color: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, schemaOptions);

var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;