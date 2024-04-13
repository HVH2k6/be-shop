const express = require("express");
const router = express.Router();
const controller = require("../../controller/role.controller");
router.get("/role", controller.index);
module.exports = router