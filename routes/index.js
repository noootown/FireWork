var express = require('express');
var router = express.Router();

require('node-jsx').install({
    harmony: true, 
    extension: '.jsx'
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
