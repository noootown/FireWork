var express = require('express'),
    router = express.Router(),
    config = require('../config'),
    FireworkDB = require('../src/models/fireworkdb'),
    mongoose = require('mongoose');

mongoose.connect(config.mongodburl);
//----------mongoose debug----------
//mongoose.connect(config.mongodburl,function(err){
    //if(err){
        //console.error('mongodb connect to %s error: ', config.mongodburl, err.message); 
        //process.exit(1);
    //}
    //else{
        //console.log('mongodb connect successfully');
    //}
//});
mongoose.set('debug', true);
//----------mongoose debug----------




router.use(function(req, res, next) {
    next();
});

router.route('/record')
    .post(function(req, res) {
        var record = new FireworkDB({   // create a new instance of the Firework model
            cardname:req.body.cardname,
            password:req.body.password,
            endTime:req.body.endTime,
            saveTime:req.body.saveTime,
            atmosphereType:req.body.atmosphereType});
        //saveRecord1
        req.body.saveRecord1.forEach(function(element){
            record.saveRecord1.push({
                x:element.x,
                y:element.y,
                type:element.type,
                rocketOrNot:element.rocketOrNot,
                time:element.time,
                startTime:element.startTime
            });
        });
        req.body.saveRecord2.forEach(function(element){
            var tmp=[];
            element.fireworkPoints.forEach(function(element){
                tmp.push({
                    x:element.x,
                    y:element.y,
                    angle:element.angle,
                    velocity:element.velocity,
                    color:element.color,
                    radius:element.radius,
                    timeMax:element.timeMax,
                    delay:element.delay,
                    acceler:element.acceler,
                    invisibleTime:element.invisibleTime,
                    friction:element.friction
                });
            });
            record.saveRecord2.push({
                x:element.x,
                y:element.y,
                startTime:element.startTime,
                type:element.type,
                fireworkPoints:tmp
            });
        });
        record.save(function(err) {// save the record and check for errors
            if (err)
                res.send(err);
            else
                res.json({message: 'Firework created!'});
        });
        
    });
router.route('/load')
    .post(function(req, res) {
        var query = FireworkDB.where({
            cardname:req.body.cardname,
            password:req.body.password
        });
        query.findOne(function(err,firework){
            if (err) 
                res.send(err);
            else if (firework){
                res.json(firework);
            }
        });
    });


module.exports = router;
