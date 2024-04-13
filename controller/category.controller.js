const Category = require("../module/category-module");
const searchHelper = require("../helper/search");
const createTree = require("../helper/createTree");
const limtPage = 5;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpciotkix",
  api_key: "211352744843712",
  api_secret: "if0bDGXhrqwwRITSRPagguTX27A",
});
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const searchCategory = searchHelper(req.query);

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

  if (searchCategory.regex) {
    find.name_category = searchCategory.regex;
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
  const categorys = await Category.find(find)
    .sort(sort)
    .limit(objPagination.limtItem)
    .skip(objPagination.skip);

  const countcategory = await Category.countDocuments(find);
  const totalPage = Math.ceil(countcategory / objPagination.limtItem);
  if (totalPage < req.query.page) {
    res.status(404).send("Page not found");
  }

  res.render("admin/category/index", {
    categories: await Category.find(find),
    keyword: searchCategory.keyword,
    totalPage: totalPage,
    currentPage: objPagination.currentPage,
  });
};
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categories = await Category.find(find);
  const newCategories = createTree.tree(categories);
  console.log("module.exports.create= ~ newCategories:", newCategories)

  res.render("admin/category/create", { categories: newCategories });
};
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countPosition = await Category.find().count();
    req.body.position = countPosition + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  await Category.create(req.body);
  res.redirect("/admin/category");
};
module.exports.changeStatusSingle = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  try {
    await Category.updateOne({ _id: id }, { status: status });
    //   message.success = "Thay đổi trạng thái của sản phẩm thành công";
    res.redirect("back");
  } catch (err) {
    //   message = "Có lỗi trong quá trình thực hiện";
  }
};
module.exports.changeStatusMultiple = async (req, res) => {
  const ids = req.body.ids.split(",");
  const status = req.body.type;
  switch (status) {
    case "active":
      await Category.updateMany({ _id: { $in: ids } }, { status: "active" });

      break;
    case "inactive":
      await Category.updateMany({ _id: { $in: ids } }, { status: "inactive" });

      break;
    case "delete-infinite":
      for (const item of ids) {
        let [id, position] = item.split("-");

        position = position;
        await Category.deleteOne({ _id: id });
      }
      
      break;

    case "delete":
      await Category.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deleted_at: Date.now() }
      );
      // message.success = "Xóa  sản phẩm thành công";
      break;
    case "restore":
      await Category.updateMany({ _id: { $in: ids } }, { deleted: false });
      

      break;
    case "position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        console.log("router.patch ~ id:", id);
        position = position;
        await Category.updateOne({ _id: id }, { position: position });
      }

      break;
    default:
      // message.error = "Có lỗi";
      break;
  }
  res.redirect("back");
};
module.exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  await Category.updateOne({ _id: id }, { deleted: true });

  res.redirect("back");
};
module.exports.restoreCategory = async (req, res) => {
  const id = req.params.id;
  await Category.updateOne({ _id: id }, { deleted: false });
  res.redirect("back");
  // message.success = "Khôi phục  sản phẩm thành công";
};

module.exports.trash = async (req, res) => {
  let find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }
  const searchCategory = searchHelper(req.query);

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

  if (searchCategory.regex) {
    find.name_category = searchCategory.regex;
  }
  const categoties = await Category.find(find)
    .limit(objPagination.limtItem)
    .skip(objPagination.skip);

  const countcategory = await Category.countDocuments(find);
  const totalPage = Math.ceil(countcategory / objPagination.limtItem);
  if (totalPage < req.query.page) {
    res.status(404).send("Page not found");
  }
  res.render("admin/category/trash", {
    categoties: await Category.find({ deleted: true }),
    keyword: searchCategory.keyword,
    currentPage: objPagination.currentPage,
    totalPage: totalPage,
  });
};
module.exports.deleteCategoryInfinite = async (req, res) => {
  const id = req.params.id;
  if (id) {
    await Category.deleteOne({ _id: id });
    res.redirect("back");
  }
};
module.exports.edit = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categories = await Category.find(find);
  const newCategories = createTree.tree(categories);
  console.log("module.exports.edit= ~ newCategories:", newCategories)
  res.render("admin/category/edit", {
    data: await Category.findOne({ _id: req.params.id }),
    categories: newCategories,
  });
};
module.exports.editCategory = async (req, res) => {
  const id = req.params.id;
  if (!req.file) {
    image_category = image_category;
    if(image_category==""){
      image_category = "";
    }
  }
  if (req.body.position === "") {
    const countPosition = await Category.find().count();
    req.body.position = countPosition + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  await Category.updateOne({ _id: id }, req.body);
  res.redirect("back");
};
module.exports.deleteImgCategory = async (req, res) => {
  const id = req.params.slug;

  if (id) {
    try {
      const { image_category } = await Category.findOne({ _id: id });
      if (image_category) {
        const url_img = image_category.split("/").pop().split(".")[0];
        if (url_img) {
          await cloudinary.uploader.destroy(url_img);
          console.log("Deleted image:", url_img);
          await Category.updateOne({ _id: id }, { image_category: "" });
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
