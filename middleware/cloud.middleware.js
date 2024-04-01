

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "dqbgt1tey",
  api_key: "143171153172384",
  api_secret: "uXRzPndb0HXAt8pV_mu0e_G8bWI",
});
module.exports.cloud = (req, res, next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
              let stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              });
      
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
          };
      
          async function upload(req) {
            let result = await streamUpload(req);
            console.log("upload ~ result:", result);
            if(result.secure_url){
              req.body.image_product = result.secure_url;
            }
            next();
          }
      
          upload(req);
    }else{
        next();
    }
}