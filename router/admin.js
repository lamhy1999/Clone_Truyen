var express = require("express");
var route = express.Router();

route.get("/",  async (req, res, next) => {
    res.render("admin", { title: "Quản Trị PhimTop", active: "clone" });
  });

module.exports = route;