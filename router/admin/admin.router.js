const express = require("express");
const router = express.Router();
const Product = require("../../module/product-module");
const searchHelper = require("../../helper/search");

router.get("/", async (req, res) => {
  res.render("admin/dashboard");
});

router.get("/product", async (req, res) => {
  let find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }
  const searchProduct = searchHelper(req.query);

  if (searchProduct.regex) {
    find.name_product = searchProduct.regex;
  }
  const objPagination = {
    currentPage: 1,
    limtItem: 3,
  };

  if (isNaN(req.query.page)) {
    objPagination.currentPage = 1;
  } else {
    objPagination.currentPage = parseInt(req.query.page);
  }
  objPagination.skip = (objPagination.currentPage - 1) * objPagination.limtItem;

  const products = await Product.find(find)
    .limit(objPagination.limtItem)
    .skip(objPagination.skip);
    const countProduct = await Product.countDocuments(find);
  
  const totalPage = Math.ceil(countProduct / objPagination.limtItem);
  if(totalPage < req.query.page){
    console.log("totalPage < req.query.page")
  }
  res.render("admin/product/dashboard-admin", {
    products: products,
    keyword: searchProduct.keyword,
    totalPage: totalPage,
    currentPage: objPagination.currentPage,
    
  });
});

module.exports = router;
