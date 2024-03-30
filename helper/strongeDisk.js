const multer = require("multer");
module.exports = ()=>{
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
  })

  return storage
};
