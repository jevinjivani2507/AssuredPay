const express = require("express");
const router = express.Router();
const products = require("../static/products");

router.route("/").get((req, res) => {
  res.send(products);
});

module.exports = router;
