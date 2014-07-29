var express = require('express');
var Thumbnail = require('./thumbnail.js');
var router = express.Router();
var path = require('path');

var appDir = path.normalize(path.dirname(require.main.filename) + '/..');

/* post home page. */
router.post('/', function(req, res) {
    var width = req.body.browserClient.width;
    var hight = req.body.browserClient.hight;
    console.log(width);    
    console.log(hight);

    var renderPage = function(imgInfo) {
        console.log(imgInfo);
        res.render('showFace', {
            title: 'My Face',
            imageName: imgInfo.imageName,
            clientWidth : imgInfo.clientWidth,
            clientHight : imgInfo.clientHight
        });
    }

    var thumbnail = new Thumbnail();

    thumbnail.render(
        {'width': width, 'hight': hight}, 
        appDir + '/public/images/flower.jpg',
        renderPage);
});

module.exports = router;
