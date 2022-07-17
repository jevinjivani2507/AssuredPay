const products = require("../static/products");

module.exports = (cartproducts) => {
  let total = 0;

  cartproducts.forEach((cartproduct) => {
    total +=
      products.filter((product) => product.id === cartproduct.id)[0].mrp *
      cartproduct.qty;
  });

  return total;
};
