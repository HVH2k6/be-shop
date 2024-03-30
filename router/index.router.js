

const homeRouter = require("../controller/home.controller");
const adminRouter = require("./admin/admin.router");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/admin", adminRouter);
  
};
