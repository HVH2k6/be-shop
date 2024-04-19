const Account = require("../module/account-module");
const Role = require("../module/role-module");
const md5 = require("md5");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  const accounts = await Account.find(find);
  for (const account of accounts) {
    const role = await Role.findOne({ _id: account.role_id, deleted: false });
    account.role = role;
  }

  res.render("admin/account/index", { account: accounts });
};
module.exports.create = async (req, res) => {
  const find = {
    deleted: false,
  };
  const role = await Role.find(find);
  res.render("admin/account/create", { role: role });
};
module.exports.createAccount = async (req, res) => {
  req.body.password_account = md5(req.body.password_account);
  const account = new Account(req.body);
  await account.save();
  res.redirect("/admin/account");
};
