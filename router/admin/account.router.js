const express = require("express");
const router = express.Router();
const controller = require("../../controller/account.controller");
router.get("/account", controller.index);
module.exports = router;
