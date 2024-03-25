const express = require("express");
const router = express.Router();
const Product = require("../../module/product-module");

router.get("/", async (req, res) => {
    res.render("admin/dashboard")
})

router.get("/product", async (req, res) => {
    let find = {};
    
    console.log(req);
    if (req.query.status) {
        // Assuming status is a string type in the schema
        find.status = req.query.status;
    }
    if(req.query.keyword){
        find.name_product = new RegExp(req.query.keyword, "i");
    }else{
        console.log("no keyword")
    }
    try {
        const products = await Product.find(find);
        res.render("admin/product/dashboard-admin", { products: products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
