const express = require('express');
const router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'upload/'});
var fs = require('fs');

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('image');



router.post('/',type, (req, res) => {
  var tmp_path = req.file.path;
  var target_path = './uploads/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
});
module.exports = router;