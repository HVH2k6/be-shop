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

  if (searchProduct.regex) {
    find.name_product = searchProduct.regex;
  }
  const products = await Product.find(find)
    .limit(objPagination.limtItem)
    .skip(objPagination.skip);
    
    const countProduct = await Product.countDocuments(find);
  const totalPage = Math.ceil(countProduct / objPagination.limtItem);
  if (totalPage < req.query.page) {
    res.status(404).send("Page not found");
  }
  res.render("admin/product/dashboard-admin", {
    products: products,
    keyword: searchProduct.keyword,
    totalPage: totalPage,
    currentPage: objPagination.currentPage,
  });
});
router.patch("/product/:status/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne({ _id: id }, { status: status });
  res.redirect("back");
});
router.patch("/product/change-multiple", async (req, res) => {
 
  const ids = req.body.ids.split(",");
  const status = req.body.type;
  switch (status) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    default:
      break;
  }
  res.redirect("back");
 
})

module.exports = router;
