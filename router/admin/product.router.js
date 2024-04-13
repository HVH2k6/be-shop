const express = require("express");
const router = express.Router();
const controller = require("../../controller/product.controller");


const uploadCloud = require("../../middleware/cloud.middleware");
const multer = require("multer");
const fileUpload = multer();
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
    uploadCloud.cloud,

  controller.createPost
);

router.get("/product/edit/:id", controller.edit);
router.post("/product/edit/:id", 
fileUpload.single("image_product"),
uploadCloud.cloud,


controller.editPost)
router.get("/product/:id", controller.detail);
router.delete("/product/delete-infinite/:id", controller.deleteProductInfinite);
router.delete("/product/delete-img/:slug", controller.deleteImgProduct);



module.exports = router;
