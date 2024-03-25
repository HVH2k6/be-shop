const express = require("express");
const app = express();
const path = require("path");
const port = 3000 || process.env.PORT;
const route = require("./controller/app-controller");
const connect = require("./config/conect_db");
const expressLayouts = require('express-ejs-layouts');

connect.connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
route(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})