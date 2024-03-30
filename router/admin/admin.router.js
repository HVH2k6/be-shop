const express = require("express");
const router = express.Router();
const controller = require("../../controller/product.controller")
router.get("/" , controller.index)
router.get("/product" , controller.product)
router.patch("/product/:status/:id" , controller.changeStatusSingle)
router.patch("/product/change-multiple",controller.changeStatusMultiple)
router.delete("/product/delete/:id",controller.deleteProduct)   
router.get("/product/trash",controller.trash)
router.delete("/product/restore/:id",controller.restoreProduct)
router.get("/product/create",controller.create)
router.post("/product/create",controller.createPost)
module.exports = router