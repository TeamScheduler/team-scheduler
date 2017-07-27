var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var teamSchema = new mongoose.Schema({
    name: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    pending_members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    blocked_users: [{type: String}],
    tags: [{type: String}]
}, schemaOptions);


teamSchema.methods.isEmailBlocked = function(email) {
    var team = this;
    team.blocked_users.forEach(function(blockedMail){
        if(email === blockedMail){
            return true;
        }
    });
    return false;
};

var User = mongoose.model('Team', teamSchema);



module.exports = User;
