var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var fireworkPointSchema = new Schema({
    x:Number,
    y:Number,
    angle:Number,
    velocity:Number,
    color:String,
    radius:Number,
    timeMax:Number,
    delay:Number,
    acceler:Number,
    invisibleTime:Number,
    friction:Number
});

var firework1Schema = new Schema({
    x:Number,
    y:Number,
    type:Number,
    rocketOrNot:Boolean,
    time:Number,
    startTime:Number
});
var firework2Schema = new Schema({
    x:Number,
    y:Number,
    type:Number,
    startTime:Number,
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
