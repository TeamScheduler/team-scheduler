var Team = require('../models/Team');
var userController = require('./user');
var mongoose = require('mongoose');

/**
 * POST /team
 */
exports.teamPost = function (req, res, next) {
    req.assert('name', 'Team name cannot be blank').notEmpty();
    req.assert('admin', 'The team most have an admin.').notEmpty();
    req.assert('admin.email', 'Admin email is not valid').isEmail();
    req.assert('admin.password', 'Admin password must be at least 4 characters long').len(4);
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

            userController.createUser(admin, function (err, user) {
                if (err) {
                    Team.remove({_id: teamId}, function (err) {
                        return res.status(400).send({error: err});
                    });
                }

                team.admin = user._id;
                team.save(function (err) {
                    if (err) {
                        return res.status(400).send({error: err});
                    }

                    Team.findOne({_id: team._id})
                        .populate('admin')
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
 * POST /team/join
 */
exports.joinTeamPost = function (req, res, next) {
    req.assert('user.team', 'TeamId cannot be blank').notEmpty();
    req.assert('user.name', 'User name cannot be blank').notEmpty();
    req.assert('user.email', 'User email is not valid').isEmail();
    req.assert('user.password', 'User password must be at least 4 characters long').len(4);
    req.sanitize('user.email').normalizeEmail({remove_dots: false});

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    var reqUser = req.body.user;
    var teamId = reqUser.team;


    Team.findOne({_id: teamId}).populate('members').populate('admin').exec(function (err, team) {
        if (err) {
            res.status(400).send({error: err});
        } else if (team) {
            //Check if user is Blocked, Member or Admin
            var blocked = false;
            var isMember = false;
            var isAdmin = false;

            team.blocked_users.forEach(function(email){
                blocked = reqUser.email === email;
            });

            team.members.forEach(function(member){
                isMember = reqUser.email === member.email;
            });

            isAdmin = reqUser.email === team.admin.email;


            if(blocked){
                //If Blocked
                res.status(400).send({error: "User Blocked"})
            }else if(isAdmin || isMember){
                //Admin or Member
                res.status(400).send({error: "User is already a member or admin"})
            }else{
                //OK to be created
                userController.createUser(reqUser, function (err, user) {
                    if (err) {
                        res.status(400).send({error: err});
                    }
                    team.members.push(user);
                    team.save(function (err) {
                        if (err) {
                            User.remove({_id: user._id}, function (err) {
                                res.status(400).send({error: err});
                            });
                        }
                        res.status(200).send(team);

                    });

                });
            }
        } else {
            res.status(400).send({error: "Cant find team, verify user.team"});
        }


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

    Team.findOne({_id: teamId}, function (err, team) {

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