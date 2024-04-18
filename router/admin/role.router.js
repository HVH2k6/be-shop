const express = require("express");
const router = express.Router();
const controller = require("../../controller/role.controller");
router.get("/role", controller.index);
router.get("/role/create", controller.create);
router.get("/role/edit/:id", controller.edit);
router.post("/role/create", controller.createRole);
router.patch("/role/:status/:id", controller.changeStatusSingle);
router.patch("/role/change-multiple", controller.changeStatusMultiple);
router.delete("/role/delete/:id", controller.deleteRole);
router.post("/role/edit/:id", controller.update);
router.get("/role/permission", controller.permission);
router.post("/role/permission", controller.createPermission);
module.exports = router