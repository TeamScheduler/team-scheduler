var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var teamSchema = new mongoose.Schema({
    name: String,
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    blocked_users: [{type: String}],
    tags: [{type: String}]
}, schemaOptions);


var User = mongoose.model('Team', teamSchema);

module.exports = User;
