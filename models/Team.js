/*jshint strict:false */
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
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
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

teamSchema.methods.isTeamMember = function(userId) {

    var team = this;
    var teamPopulated = !!team.populated('members');
    var isTeamMember = false;

    team.members.forEach(function(member){
        var memberId;

        if(teamPopulated){
            memberId = member._id;
        }else{
            memberId = member;
        }

        if(''+userId === ''+memberId){
            isTeamMember = true;
        }

    });

    return isTeamMember;

};

teamSchema.methods.isTeamTag = function(otherTagId) {

    var team = this;
    var teamPopulated = !!team.populated('tags');
    var isTeamTag = false;

    team.tags.forEach(function(tag){
        var tagId;

        if(teamPopulated){
            tagId = tag._id;
        }else{
            tagId = tag;
        }

        if(''+otherTagId === ''+tagId){
            isTeamTag = true;
        }

    });

    return isTeamTag;

};

var Team = mongoose.model('Team', teamSchema);



module.exports = Team;
