var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Image Viewer',
    photo: fs.readdirSync('./public/photo/')
  });
});

module.exports = router;
