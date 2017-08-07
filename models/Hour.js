/*jshint strict:false */
var mongoose = require('mongoose');

var schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

var hoursEnum = [
     "00:00", "01:00", "02:00", "03:00",
     "04:00", "05:00", "06:00", "07:00",
     "08:00", "09:00", "10:00", "11:00",
     "12:00", "13:00", "14:00", "15:00",
     "16:00", "17:00", "18:00", "19:00",
     "20:00", "21:00", "22:00", "23:00",

     "00:30", "01:30", "02:30", "03:30",
     "04:30", "05:30", "06:30", "07:30",
     "08:30", "09:30", "10:30", "11:30",
     "12:30", "13:30", "14:30", "15:30",
     "16:30", "17:30", "18:30", "19:30",
     "20:30", "21:30", "22:30", "23:30"];

var hourSchema = new mongoose.Schema({
    hour: {
        type: String,
        enum: hoursEnum
    },
    day:{
        type: String,
        enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    },
    member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, schemaOptions);

//Forces every instance of the model to be unique
hourSchema.index({hour:1, day:1, member: 1},  {unique: true});

var Hour = mongoose.model('Hour', hourSchema);

module.exports = Hour;