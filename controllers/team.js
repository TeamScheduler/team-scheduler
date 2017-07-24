var Team = require('../models/Team');
var userController = require('./user');
var mongoose = require('mongoose');

/**
 * POST /team
 */
exports.teamPost = function(req, res, next) {
    req.assert('name', 'Team name cannot be blank').notEmpty();
    req.assert('admin', 'The team most have an admin.').notEmpty();
    req.assert('admin.email', 'Admin email is not valid').isEmail();
    req.assert('admin.password', 'Admin password must be at least 4 characters long').len(4);
    req.sanitize('admin.email').normalizeEmail({ remove_dots: false });

    var errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    Team.findOne({ name: req.body.name }, function(err, team) {
        if (team) {
            return res.status(400).send({ msg: 'The team name ' + req.body.name + 'is already in use, please choose another one.' });
        }

        team = new Team({
            name: req.body.name
        });

        team.save(function(err) {
            if(err){
                return res.status(400).send({error: err});
            }

            var teamId = team._id;
            var admin = req.body.admin;
            admin.team = teamId;

            userController.createUser(admin, function(err, user){
                if(err){
                    Team.remove({ _id: teamId }, function(err) {
                        return res.status(400).send({error: err});
                    });
                }

                team.admin = user._id;
                team.save(function(err){
                    if(err){
                        return res.status(400).send({error: err});
                    }

                    Team.findOne({_id: team._id})
                        .populate('admin')
                        .exec(function (err, team) {
                            if(err){
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
exports.getTeamById = function(req, res, next) {
    var teamId = req.params.id;

    if(! mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).send({error: "Team id is not valid."});
    }

    Team.findOne({_id: teamId}, function(err, team) {

        if(err) {
            return res.status(400).send({error: err});
        }

        if(team) {
            return res.status(200).send(team);
        }else {
            res.status(404).send({msg: "Team not found."})
        }

    });
}