

const homeRouter = require("../controller/home.controller");
const productRouter = require("./admin/product.router");
const categoryRouter = require("./admin/category.router");
const pageNotFound = require("./pagenotfound.router")
const roleRouter = require("./admin/role.router")


module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/admin", productRouter);
  app.use("/admin", categoryRouter);
  app.use("/admin", roleRouter);

  app.use("/*",pageNotFound)
  
};
