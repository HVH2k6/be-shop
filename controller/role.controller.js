const Role = require("../module/role-module");
const searchHelper = require("../helper/search");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const roleList = await Role.find(find);
  res.render("admin/role/index", { relust: roleList });
};
module.exports.create = async (req, res) => {
  res.render("admin/role/create");
};
module.exports.createRole = async (req, res) => {
  const RoleData = new Role(req.body);
  await RoleData.save();
  res.redirect("/admin/role");
};
module.exports.changeStatusSingle = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  try {
    await Role.updateOne({ _id: id }, { status: status });

    res.redirect("back");
  } catch (err) {
    //message = "Có lỗi trong quá trình thực hiện";
    console.log(err);
  }
};
module.exports.changeStatusMultiple = async (req, res) => {
  const ids = req.body.ids.split(",");
  const status = req.body.type;
  switch (status) {
    case "active":
      await Role.updateMany({ _id: { $in: ids } }, { status: "active" });
      // message.success = "Thay đổi trạng thái của  sản phẩm thành công";

      break;
    case "inactive":
      await Role.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      // message.success = "Thay đổi trạng thá/i của  sản phẩm thành công";

      break;
    case "delete":
      await Role.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deleted_at: Date.now() }
      );
      // message.success = "Xóa  sản phẩm thành công";
      break;
    case "restore":
      await Role.updateMany({ _id: { $in: ids } }, { deleted: false });
      // message.success = "Khôi phục  sản phẩm thành công";

      break;
    case "position":
      for (const item of ids) {
        let [id, position] = item.split("-");

        position = position;
        await Role.updateOne({ _id: id }, { position: position });
      }
      // message.success = "Thay đổi vị trí của  sản phẩm thành công";
      break;
    case "delete-infinite":
      for (const item of ids) {
        let [id, position] = item.split("-");

        position = position;
        await Role.deleteOne({ _id: id });
      }
      // message.success = "Thay đổi vị trí của  sản phẩm thành công";
      break;
    default:
      // message.error = "Có lỗi";
      break;
  }
  res.redirect("back");
};
module.exports.deleteRole = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, { deleted: true });

  res.redirect("back");
};
module.exports.restoreRole = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, { deleted: false });
  res.redirect("back");
  // message.success = "Khôi phục  sản phẩm thành công";
};

module.exports.trash = async (req, res) => {
  let find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }
  const searchRole = searchHelper(req.query);

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

  if (searchRole.regex) {
    find.name_role = searchRole.regex;
  }
  const role = await Role.find(find)
    .limit(objPagination.limtItem)
    .skip(objPagination.skip);

  const countRole = await Role.countDocuments(find);
  const totalPage = Math.ceil(countRole / objPagination.limtItem);
  if (totalPage < req.query.page) {
    res.status(404).send("Page not found");
  }
  res.render("admin/role/dashboard-trash", {
    role: await Role.find({ deleted: true }),
    keyword: searchRole.keyword,
    currentPage: objPagination.currentPage,
    totalPage: totalPage,
  });
};
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const find = { deleted: false, _id: id };
  const role = await Role.findOne(find);
  res.render("admin/role/edit",
  {data: role}
  );
}
module.exports.update = async (req, res) => {
const id = req.params.id;
await Role.updateOne({ _id: id }, req.body);
res.redirect('/admin/role');

}
module.exports.permission = async (req, res) => {
  const find = { deleted: false };
  const roleList = await Role.find(find);
  res.render("admin/role/permission", { relust: roleList });
}
module.exports.createPermission = async (req, res) => {
  const permission = JSON.parse(req.body.permission);
  
  for (const item of permission) {
    await Role.updateOne(
      { _id: item.id },
      {  permission: item.permissions } 
    );
  }
  res.redirect("/admin/role");
}