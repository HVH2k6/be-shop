const Product = require("../module/product-module");
const searchHelper = require("../helper/search");
const limtPage = 5;
let message = {
  success: "",
  error: "",
};
const cloudinary = require("cloudinary").v2;
const Category = require("../module/category-module");
cloudinary.config({
  cloud_name: "dpciotkix",
  api_key: "211352744843712",
  api_secret: "if0bDGXhrqwwRITSRPagguTX27A",
});
module.exports.index = async (req, res) => {
  res.render("admin/dashboard");
};
module.exports.product = async (req, res) => {
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
  // sort
  let sort = {};
  if (req.query.sort && req.query.sortKey) {
    sort[req.query.sort] = req.query.sortKey;
    console.log(sort);
  } else {
    sort.position = "desc";
  }
  // end-sort
  const products = await Product.find(find)
    .sort(sort)
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
};
module.exports.changeStatusSingle = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  try {
    await Product.updateOne({ _id: id }, { status: status });
    message.success = "Thay đổi trạng thái của sản phẩm thành công";
    res.redirect("back");
  } catch (err) {
    message = "Có lỗi trong quá trình thực hiện";
  }
};
module.exports.changeStatusMultiple = async (req, res) => {
  const ids = req.body.ids.split(",");
  const status = req.body.type;
  switch (status) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      // message.success = "Thay đổi trạng thái của  sản phẩm thành công";

      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      // message.success = "Thay đổi trạng thá/i của  sản phẩm thành công";

      break;
    case "delete":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deleted_at: Date.now() }
      );
      // message.success = "Xóa  sản phẩm thành công";
      break;
    case "restore":
      await Product.updateMany({ _id: { $in: ids } }, { deleted: false });
      // message.success = "Khôi phục  sản phẩm thành công";

      break;
    case "position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        console.log("router.patch ~ id:", id);
        position = position;
        await Product.updateOne({ _id: id }, { position: position });
      }
      // message.success = "Thay đổi vị trí của  sản phẩm thành công";
      break;
    case "delete-infinite":
      for (const item of ids) {
        let [id, position] = item.split("-");
        console.log("router.patch ~ id:", id);
        position = position;
        await Product.deleteOne({ _id: id });
      }
      // message.success = "Thay đổi vị trí của  sản phẩm thành công";
      break;
    default:
      // message.error = "Có lỗi";
      break;
  }
  res.redirect("back");
};
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true });

  res.redirect("back");
};
module.exports.restoreProduct = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: false });
  res.redirect("back");
  // message.success = "Khôi phục  sản phẩm thành công";
};

module.exports.trash = async (req, res) => {
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
};
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  }
  function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  }
  const categories = await Category.find(find);
  const newCategories = createTree(categories);
  console.log("module.exports.create= ~ newCategories:", newCategories)
  res.render("admin/product/create", { categories: newCategories });
};
module.exports.createPost = async (req, res) => {
  let {
    name_product,
    price_product,
    image_product,
    status,
    position,
    sale,
    quantity,
    description,
    product_category
  } = req.body;

  price_product = parseInt(price_product);
  sale = parseInt(sale);
  quantity = parseInt(quantity);

  // Validate position
  if (position === "") {
    const countPosition = await Product.find().count();
    position = countPosition + 1;
  } else {
    position = parseInt(position); // Parse position only if it's not empty
  }

  try {
    const product = new Product({
      name_product,
      price_product,

      image_product,
      status,
      position,
      product_category,
      sale,
      quantity,
      description,
    });

    await product.save();

    res.redirect("back");
  } catch (err) {
    console.log(err);
    
  }
};
module.exports.edit = async (req, res) => {
  try {
    if (!req.params.id) {
      res.redirect("back");
    }
    const find = {
      _id: req.params.id,
      deleted: false,
    };
    const product = await Product.findOne(find);
    

    res.render("admin/product/edit", { product: product });
  } catch (err) {
    console.log(err);
  }
};
module.exports.editPost = async (req, res) => {
  let {
    name_product,
    price_product,
    image_product,
    status,
    position,
    sale,
    quantity,
    description,
  } = req.body;
  price_product = parseInt(price_product);
  sale = parseInt(sale);
  quantity = parseInt(quantity);
  if (!req.file) {
    image_product = image_product;
  }
  if (position === "") {
    const countPosition = await Product.find().count();
    position = countPosition + 1;
  } else {
    position = parseInt(position);
  }
  const product = {
    name_product,
    price_product,
    image_product,
    status,
    position,
    sale,
    quantity,
    description,
  };
  await Product.updateOne({ _id: req.params.id }, product);
  res.redirect("back");
};
module.exports.detail = async (req, res) => {
  if (!req.params.id) {
    res.redirect("back");
  }
  const idProduct = req.params.id;
  const product = await Product.findOne({ _id: idProduct });

  res.render("admin/product/detail", { product: product });
};
module.exports.deleteProductInfinite = async (req, res) => {
  const id = req.params.id;
  if (id) {
    await Product.deleteOne({ _id: id });
    res.redirect("back");
  }
};
module.exports.deleteImgProduct = async (req, res) => {
  const id = req.params.slug;

  if (id) {
    try {
      const { image_product } = await Product.findOne({ _id: id });
      if (image_product) {
        const url_img = image_product.split("/").pop().split(".")[0];
        if (url_img) {
          await cloudinary.uploader.destroy(url_img);
          console.log("Deleted image:", url_img);
        await Product.updateOne({ _id: id }, { image_product: "" });
        }
      }
      res.redirect("back");
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).send("Error deleting image");
    }
  } else {
    res.status(400).send("Invalid product ID");
  }
};

