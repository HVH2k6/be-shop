
const homeRouter = require("../router/index.router");
const adminRouter = require("../router/admin/admin.router");
module.exports = (app) => {
  app.use("/", homeRouter);
  app.use("/admin", adminRouter);
  
};
