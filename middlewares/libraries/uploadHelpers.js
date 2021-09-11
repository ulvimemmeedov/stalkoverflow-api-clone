const multer = require('multer');

const path = require('path');

const CustomError = require('../../helpers/error/CustomError');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads"));

    },
    filename(req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        req.savedFile = "file_" + req.user.id + "." + extension;
        cb(null, req.savedFile);
    }

});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
  
    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb(new CustomError("Please provide a valid file", 400)) // custom this message to fit your needs
    }
  }

class UploadHelpers {
   profilePhotoUpload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })
  
}


module.exports = new UploadHelpers();