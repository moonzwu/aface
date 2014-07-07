var express = require('express');
var router = express.Router();


/* Deal with upload post*/
router.post('/', function(req, res) {
    console.log("Receive the submit image request");
    console.log(req.body);
    console.log(req.files);
});

router.get('/', function(req, res) {
    res.render('upload', {title: 'Aface'});    
});

module.exports = router;
