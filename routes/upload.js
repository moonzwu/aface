var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb');

var mongoServer = new mongodb.Server('localhost', 27017, {
	auto_reconnect: true
});
var imageDb = mongodb.Db('imagedb', mongoServer, {
	safe: true
});

/* Deal with upload post*/
router.post('/', function(req, res) {
	console.log("Receive the submit image request");
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var imageAttr = {};

		var tmpPath = files.imageFile.path,
		fileSize = files.imageFile.size,
		fileExt = files.imageFile.name.split('.').pop(),
		index = tmpPath.lastIndexOf('/') + 1,
		fileName = tmpPath.substr(index),
		originalFileName = files.imageFile.name,
		newPath = path.join(process.env.PWD, '/uploads/' + fileName);

		console.log('original file name = ' + originalFileName);
		console.log('file path = ' + tmpPath + ', size=' + fileSize);
		console.log('file name = ' + fileName);
		console.log('new file path = ' + newPath);

		imageAttr.size = fileSize;
		imageAttr.ext = fileExt;
		imageAttr.name = fileName;
		imageAttr.readableName = originalFileName;
		imageAttr.path = newPath;

		fs.readFile(tmpPath, function(err, data) {
			if (err) {
				res.send(err);
				return;
			}

			fs.writeFile(newPath, data, function(err) {
				if (!err) {
					// save image info to database
					imageDb.open(function(err, imageDb) {
						if (err) {
							console.log(err);
						} else {
							imageDb.collection('imageAttrTbl', {
								safe: true
							},
							function(err, coll) {
								coll.insert(imageAttr, {
									safe: true
								},
								function(err, result) {
									console.log(result);
								});
							});
						}
					});

					res.send("upload succeed!");
				} else {
					res.send(err);
				}
			});

		});
	});
});

router.get('/', function(req, res) {
	res.render('upload', {
		title: 'Aface'
	});
});

module.exports = router;

