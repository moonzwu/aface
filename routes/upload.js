var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

/* Deal with upload post*/
router.post('/', function(req, res) {
    console.log("Receive the submit image request");
    
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldPath = files.imageFile.path,
            fileSize = files.imageFile.size,
            fileExt = files.imageFile.name.split('.').pop(),
            index = oldPath.lastIndexOf('/') + 1,
            fileName = oldPath.substr(index),
            originalFileName = files.imageFile.name,
            newPath = path.join(process.env.PWD, '/uploads/' + fileName);
    
        console.log('original file name = ' + originalFileName);
        console.log('file path = ' + oldPath + ', size=' + fileSize);
        console.log('file name = ' + fileName);
        console.log('new file path = ' + newPath);
    });

});

router.get('/', function(req, res) {
    res.render('upload', {title: 'Aface'});    
});

module.exports = router;
