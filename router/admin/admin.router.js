const express = require("express");
const router = express.Router();
const controller = require("../../controller/product.controller");

const multer = require("multer");
const fileUpload = multer();

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "dqbgt1tey",
  api_key: "143171153172384",
  api_secret: "uXRzPndb0HXAt8pV_mu0e_G8bWI",
});
router.get("/", controller.index);
router.get("/product", controller.product);
router.patch("/product/:status/:id", controller.changeStatusSingle);
router.patch("/product/change-multiple", controller.changeStatusMultiple);
router.delete("/product/delete/:id", controller.deleteProduct);
router.get("/product/trash", controller.trash);
router.delete("/product/restore/:id", controller.restoreProduct);
router.get("/product/create", controller.create);
router.post(
  "/product/create",
  fileUpload.single("image_product"),
  function (req, res, next) {
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
  },
  controller.createPost
);

router.get("/product/edit/:id", controller.edit);
// router.post("/product/edit/:id", upload.single("image_product"),controller.editPost)
router.get("/product/:id", controller.detail);

module.exports = router;
