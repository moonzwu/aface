var express = require('express');
var imageops = require('./imageOps.js');
var router = express.Router();

/* post home page. */
router.post('/', function(req, res) {
    var width = req.body.browserClient.width;
    var hight = req.body.browserClient.hight;
    console.log(width);    
    console.log(hight);

    var renderPage = function(imgInfo) {
        console.log(imgInfo);
        res.render('loadImage', {
            title: 'My Face',
            imageName: imgInfo.imageName,
            clientWidth : imgInfo.clientWidth,
            clientHight : imgInfo.clientHight
        });}

    imageops.loadImage({'width': width, 'hight': hight}, '/root/nodejs_project/aface/public/images/flower.jpg', renderPage);
});

module.exports = router;
