const multer = require('multer');
const uuid = require('uuid');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: function (req, file, cb) {
      cb(null, `${uuid.v4()}-${file.originalname}`);
    },
  }),
});

module.exports = upload;
