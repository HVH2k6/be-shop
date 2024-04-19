const express = require("express");
const router = express.Router();
const uploadCloud = require("../../middleware/cloud.middleware");
const multer = require("multer");
const fileUpload = multer();
const controller = require("../../controller/account.controller");
router.get("/account", controller.index);
router.get("/account/create", controller.create);
router.post(
  "/account/create",
  fileUpload.single("avatar_account"),
  uploadCloud.cloud,
  controller.createAccount
);
module.exports = router;
