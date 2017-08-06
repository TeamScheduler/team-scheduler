/*jshint strict:false */
var Team = require('../models/Team');
var userController = require('./user');
var tagController = require('./tag');
var User = require('../models/User');
var mongoose = require('mongoose');

/**
 * POST /team
 */
exports.teamPost = function (req, res, next) {
    req.assert('name', 'Team name cannot be blank').notEmpty();
    req.assert('admin', 'The team most have an admin.').notEmpty();
    req.assert('admin.email', 'Admin email is not valid').isEmail();
    req.assert('admin.password', 'Admin password must be at least 6 characters long').len(6);
    req.sanitize('admin.email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    Team.findOne({name: req.body.name}, function (err, team) {
        if (team) {
            return res.status(400).send({msg: 'The team name ' + req.body.name + 'is already in use, please choose another one.'});
        }

        team = new Team({
            name: req.body.name
        });

        team.save(function (err) {
            if (err) {
                return res.status(400).send({error: err});
            }

            var teamId = team._id;
            var admin = req.body.admin;
            admin.team = teamId;
            admin.isAdmin = true;

            userController.createUser(admin, function (err, user) {
                if (err) {
                    Team.remove({_id: teamId}, function (err2) {
                        return res.status(400).send({error: err});
                    });
                }

                team.members.push(user._id);

                team.admin = user._id;
                team.save(function (err) {
                    if (err) {
                        return res.status(400).send({error: err});
                    }

                    Team.findOne({_id: team._id})
                        .populate('members')
                        .exec(function (err, team) {
                            if (err) {
                                return res.status(400).send({error: err});
                            }

                            res.status(200).send({team: team});
                        });
                });
            });
        });
    });
};


/**
 * GET team/:id
 */
exports.getTeamById = function (req, res, next) {
    var teamId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send({error: "Team id is not valid."});
    }

    Team.findOne({_id: teamId}).exec(function (err, team) {

        if (err) {
            return res.status(400).send({error: err});
        }

        if (team) {
            return res.status(200).send(team);
        } else {
            res.status(404).send({msg: "Team not found."})
        }

    });
};

/**
 * GET team/members
 *
 * must be authenticated.
 */
exports.getTeamMembers = function (req, res, next) {
    var teamId = req.user.team;

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send({error: "Team id is not valid."});
    }

    Team.findOne({_id: teamId}).populate('members').exec(function (err, team) {

        if (err) {
            return res.status(400).send({error: err});
        }

        if (! team) {
            return res.status(404).send({msg: "Team not found."})
        }

        if(! team.isTeamMember(req.user._id)){
            return res.status(403).send({ msg: 'You have to be an team member to perform this action.' });
        }

        return res.status(200).send(team.members);

    });
};

/**
 * GET team/pending-members
 *
 * must be authenticated.
 */
exports.getTeamPendingMembers = function (req, res, next) {
    var teamId = req.user.team;

    if(! req.user.isAdmin) {
        return res.status(403).send({ msg: 'You have to be the team admin to perform this action.' });
    }

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send({error: "Team id is not valid."});
    }

    Team.findOne({_id: teamId}).populate('pending_members').exec(function (err, team) {

        if (err) {
            return res.status(400).send({error: err});
        }

        if (! team) {
            return res.status(404).send({msg: "Team not found."});
        }

        if(! team.isTeamMember(req.user._id)){
            return res.status(403).send({ msg: 'You have to be an team member to perform this action.' });
        }

        return res.status(200).send(team.pending_members);

    });
};

/**
 * PATCH team/pending_members
 *
 * must be authenticated.
 */
exports.patchTeamPendingMembers = function (req, res, next) {
    var teamId = req.user.team;
    var userId = req.body.userId;

    if(! req.user.isAdmin) {
        return res.status(403).send({ msg: 'You have to be the team admin to perform this action.' });
    }

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send({error: "Team id is not valid."});
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({error: "User id is not valid."});
    }

    Team.findOne({_id: teamId}).exec(function (err, team) {

        if(! team.isTeamMember(req.user._id)){
            return res.status(403).send({ msg: 'You have to be an team member to perform this action.' });
        }

        if (err) {
            return res.status(400).send({error: err});
        }

        if (! team) {
            return res.status(404).send({msg: "Team not found."});
        }

        var isPendingMember = false;

        team.pending_members.forEach(function(pendingMemberId){
            if(''+userId === ''+pendingMemberId){
                isPendingMember = true;
            }
        });

        if(! isPendingMember){
            return res.status(404).send({msg: "Pending member not found."});
        }

        var action = req.body.action;

        if(action === 'accept') {
            Team.findOneAndUpdate({_id:teamId}, {$pull:{pending_members : userId}, $addToSet:{members : userId}}, {safe: true, new:true}, function(err, team){
                if (err) {
                    return res.status(400).send({error: err});
                }
                return res.status(200).send(team);
            });
        }else{

            User.findByIdAndRemove({_id: userId}, function(err, user){
                if (err) {
                    return res.status(400).send({error: err});
                }

                if (! user) {
                    return res.status(404).send({msg: "User not found."});
                }

                if(action === 'reject') {
                    Team.findOneAndUpdate({_id:teamId}, {$pull:{pending_members : userId}}, {safe: true, new:true}, function(err, team){
                        if (err) {
                            return res.status(400).send({error: err});
                        }

                        return res.status(200).send(team);
                    });
                }else if(action === 'block') {
                    Team.findOneAndUpdate({_id:teamId}, {$pull:{pending_members : userId}, $addToSet:{blocked_users : user.email}}, {safe: true, new:true}, function(err, team){
                        if (err) {
                            return res.status(400).send({error: err});
                        }

                        return res.status(200).send(team);
                    });
                }else{
                    return res.status(400).send({msg: "Action not valid"});
                }

            });

        }

    });
};

/**
 * POST team/tag
 */
exports.postTeamTag = function (req, res, next) {
    var teamId = req.user.team;

    req.checkBody('color', 'Invalid tag color').isHexColor();

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    if(! req.user.isAdmin) {
        return res.status(403).send({ msg: 'You have to be the team admin to perform this action.' });
    }

    if (!mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send({error: "Team id is not valid."});
    }

    tagController.createTag(req.body, function(err, tag){

        if (err) {
            return res.status(400).send({error: err});
        }

        Team.findOneAndUpdate({_id:teamId}, {$push:{tags : tag._id}}, {new:true, safe: true}).populate('tags').exec(function(err, team){
            if (err) {
                tagController.deleteTag(tag._id, function() {});
                return res.status(400).send({error: err});
            }

            if (! team) {
                tagController.deleteTag(tag._id, function() {});
                return res.status(404).send({msg: "Team not found."});
            }

            return res.status(200).send(team);
        });
    });
};

exports.getTeamTags = function(req, res, next) {
    var teamId = req.user.team;

    Team.findOne({_id:teamId}).populate('tags').exec(function(err, team){
        if (err) {
            return res.status(400).send({error: err});
        }

        if (! team) {
            return res.status(404).send({msg: "Team not found."});
        }

        return res.status(200).send(team.tags);
    });


}
