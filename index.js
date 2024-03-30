const express = require("express");
const app = express();
const path = require("path");
const port = 3456
const route = require("./router/index.router");
const connect = require("./config/conect_db");
const methodOverride = require('method-override')



connect.connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
route(app);



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})