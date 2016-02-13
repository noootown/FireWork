var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vector = new Schema({
    x:Number,
    y:Number
});
var fireworkPointSchema = new Schema({
    startPos:vector,
    startSpeed:vector,
    time:Number,
    delay:Number,
    invisibleTime:Number,
    color:String
});

var firework1Schema = new Schema({
    type:Number,
    time:Number,
    color:String,
    rocketOrNot:Boolean,
    startTime:Number,
    startPos:vector,
    endPos:vector,
    velocity:vector
});
var firework2Schema = new Schema({
    startTime:Number,
    type:Number,
    startPos:vector,
    fireworkPoints:[fireworkPointSchema]
});

var fireworkSchema = new Schema({
    cardname:String,
    password:String,
    saveRecord1:[firework1Schema],
    saveRecord2:[firework2Schema],
    endTime:Number,
    saveTime:String,
    atmosphereType:Number
});

module.exports = mongoose.model('Firework', fireworkSchema);
