const express = require("express");
const router = express.Router();
const uploadCloud = require("../../middleware/cloud.middleware");
const multer = require("multer");
const fileUpload = multer();
const controller = require("../../controller/category.controller");
router.get("/category", controller.index);
router.get("/category/create", controller.create);
router.post(
  "/category/create",
  fileUpload.single("image_category"),
  uploadCloud.cloud,
  controller.createPost
);
router.patch("/category/:status/:id", controller.changeStatusSingle);
router.patch("/category/change-multiple", controller.changeStatusMultiple);
router.delete("/category/delete/:id", controller.deleteCategory);
router.get("/category/trash", controller.trash);
router.delete("/category/restore/:id", controller.restoreCategory);
router.delete("/category/delete-infinite/:id", controller.deleteCategoryInfinite);
router.get("/category/edit/:id", controller.edit);
router.post(
  "/category/edit/:id",
  fileUpload.single("image_category"),
  uploadCloud.cloud,
  controller.editCategory
)
router.delete("/category/delete-img/:slug", controller.deleteImgCategory);
module.exports = router;
