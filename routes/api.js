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

/* GET home page. */
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!'});
});

router.route('/record')
    .post(function(req, res) {
        //var record = new FireworkDB({name:req.body.name});      // create a new instance of the Bear model
        var record = new FireworkDB({   // create a new instance of the Bear model
            cardname:req.body.cardname,
            password:req.body.password,
            endTime:req.body.endTime,
            saveTime:req.body.saveTime,
            atmosphereType:req.body.atmosphereType});
        //saveRecord1
        req.body.saveRecord1.forEach(function(element){
            record.saveRecord1.push({
                type:element.type,
                time:element.time,
                color:element.color,
                rocketOrNot:element.rocketOrNot,
                startTime:element.startTime,
                startPos:{x:element.startPos.x,y:element.startPos.y},
                endPos:{x:element.endPos.x,y:element.endPos.y},
                velocity:{x:element.velocity.x,y:element.velocity.y}
            });
        });
        req.body.saveRecord2.forEach(function(element){
            var tmp=[];
            element.fireworkPoints.forEach(function(element1){
                tmp.push({
                    startPos:{x:element1.startPos.x,y:element1.startPos.y},
                    startSpeed:{x:element1.startSpeed.x,y:element1.startSpeed.y},
                    time:element1.time,
                    delay:element1.delay,
                    invisibleTime:element1.invisibleTime,
                    color:element1.color
                });
            });
            record.saveRecord2.push({
                startTime:element.startTime,
                type:element.type,
                startPos:{x:element.startPos.x,y:element.startPos.y},
                fireworkPoints:tmp
            });
        });
        record.save(function(err) {// save the record and check for errors
            if (err)
                res.send(err);
            else
                res.json({message: 'Bear created!'});
        });
        
    });


module.exports = router;
