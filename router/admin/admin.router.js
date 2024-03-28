const express = require("express");
const router = express.Router();
const Product = require("../../module/product-module");
const searchHelper = require("../../helper/search");
const controler = require("../../controller/create.controller");
router.get("/", async (req, res) => {
  res.render("admin/dashboard");
});
const limtPage = 5;
let message = {
  success: "",
  error: "",
};

router.get("/product", async (req, res) => {
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const searchProduct = searchHelper(req.query);

  const objPagination = {
    currentPage: 1,
    limtItem: limtPage,
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
    .sort({ position: "desc" })
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
    successMessage: message.success ? message.success : null,
    errorMessage: message.error ? message.error : null
  });
});
router.patch("/product/:status/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  try {
    await Product.updateOne({ _id: id }, { status: status });
    message.success = "Thay đổi trạng thái của sản phẩm thành công";
    res.redirect("back");
  } catch (err) {
    message = "Có lỗi trong quá trình thực hiện";
  }
});
router.patch("/product/change-multiple", async (req, res) => {
  const ids = req.body.ids.split(",");
  const status = req.body.type;
  switch (status) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      message.success = "Thay đổi trạng thái của  sản phẩm thành công";

      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      message.success = "Thay đổi trạng thái của  sản phẩm thành công";

      break;
    case "delete":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deleted_at: Date.now() }
      );
      message.success = "Xóa  sản phẩm thành công";
      break;
    case "restore":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: false });
      message.success = "Khôi phục  sản phẩm thành công";

      break;
    case "position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        console.log("router.patch ~ id:", id);
        position = position;
        await Product.updateOne({ _id: id }, { position: position });
      }
      message.success = "Thay đổi vị trí của  sản phẩm thành công";
      break;
    default:
      message.error = "Có lỗi";
      break;
  }
  res.redirect("back");
});
router.delete("/product/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true });

  res.redirect("back");
});
router.get("/product/trash", async (req, res) => {
  let find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }
  const searchProduct = searchHelper(req.query);

  const objPagination = {
    currentPage: 1,
    limtItem: limtPage,
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
  res.render("admin/product/dashboard-trash", {
    products: await Product.find({ deleted: true }),
    keyword: searchProduct.keyword,
    currentPage: objPagination.currentPage,
    totalPage: totalPage,
  });
});
router.delete("/product/restore/:id", async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: false });
  res.redirect("back");
  message.success = "Khôi phục  sản phẩm thành công";
});
// crete
router.get("/product/create",controler.create) 
module.exports = router;
