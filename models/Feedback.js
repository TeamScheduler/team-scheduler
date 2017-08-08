/*jshint strict:false */
var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var feedbackSchema = new mongoose.Schema({
    feedback: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, schemaOptions);

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;