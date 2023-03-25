const multer = require('multer');
const path = require('path');

/**
 * ===== Upload File for the Directory with multiple name and directory =====
 * @param {String} directory 
 * @param {String} field 
 * @returns 
 */
const uploadImage = (directory, field, multiple = false) => {
    console.log("Field == ", field);
    console.log("Multiple == ", multiple);

    const storage = multer.diskStorage({
        destination: path.join(__dirname, '../images', directory),
        filename: function (_req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

  if (!multiple) {
    return multer({ 
        storage: storage, 
        fileFilter: function (_req, file, cb) {
            const ext = path.extname(file.originalname);

            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return cb(new Error('Only Images are Allowed'));
            }
            cb(null, true);
        }}).single(field);
  }

  if (multiple) {
    return multer({
        storage: storage,
        fileFilter: function (_req, file, cb) {
          const ext = path.extname(file.originalname);
      
          if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only Images are Allowed'));
          }
          cb(null, true);
        }
      }).array(field, 3);
  }
};

module.exports = uploadImage;