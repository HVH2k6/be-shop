const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "dpciotkix",
  api_key: "211352744843712",
  api_secret: "if0bDGXhrqwwRITSRPagguTX27A",
});
let loading = 0;
module.exports.cloud = (req, res, next) => {
  let setLoading = 0;
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
          resolve(result);
          } else {
            reject(error);
          }
        });

        let loadedBytes = 0;
        let totalBytes = req.file.buffer.length;

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log("upload ~ result:", result);
      if (result.secure_url) {
        req.body[req.file.fieldname] = result.secure_url;
      }
      next();
    }

    upload(req);
  } else {
    next();
  }
};
module.exports.delete = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (result) {
        console.log("Deleted image result:", result);
        resolve(result);
      } else {
        console.error("Error deleting image:", error);
        reject(error);
      }
    });
  });
};
