const products = require("../static/products");

module.exports = (cartproducts) => {
  let total = 0;

  cartproducts.forEach((cartproduct) => {
    total +=
      products.filter((product) => product.id === cartproduct.id)[0].mrp *
      cartproducts.length;
  });

  return isNaN(total) ? 0 : total;
};
