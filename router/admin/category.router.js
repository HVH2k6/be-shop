const express = require("express");
const router = express.Router();

const controller = require("../../controller/category.controller");
router.get("/category", controller.index);
module.exports = router