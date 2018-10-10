var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    formidable = require('formidable'),
    img_compress = require('../utils/img_compress.js');

var photos = fs.readdirSync('public/photo/compressed/');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Image Viewer',
    photo: photos
  });
});

/* UPLOAD file. */
router.post('/upload', (req, res, next) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_path = 'public/photo/' + files.file.name;
    // save img
    fs.readFile(old_path, (err, data) => {
      fs.writeFile(new_path, data, (err) => {
        fs.unlink(old_path, (err) => {
          if (err) {
            res.status(500);
            res.json({'status': 'Error'});
          } else {
            // compress img
            img_compress([files.file.name], 500, () => console.log(files.file.name + " compressed"));
            res.json({'status': 'Uploaded!'});
          }
        });
      });
    });
  });
});

module.exports = router;
