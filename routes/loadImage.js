var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res) {
    var width = req.body.browserClient.width;
    var hight = req.body.browserClient.hight;
    console.log(width);    
    console.log(hight);    
    res.render('loadImage', {
        title: 'My Face',
        clientWidth : width,
        clientHight : hight
    });
});

module.exports = router;
