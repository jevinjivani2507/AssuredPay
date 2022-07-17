const { response } = require("express");
const express = require("express");
const createContract = require("../controller/contractCreator");
const calculateTotal = require("../controller/calculateTotal");
require("dotenv").config();
const router = express.Router();

router.route("/").post(async (req, res) => {
  const customerAddress = req.body.customerAddress.toString();
  const products = req.body.products;
  const vendorAddress = req.body.vendorAddress.toString();

  let amount = calculateTotal(products);
  console.log(amount);
  try {
    let { customer, contractAddress } = await createContract(
      customerAddress,
      vendorAddress,
      amount
    );

    res
      .status(200)
      .send({ customer: customer, contractAddress: contractAddress });
  } catch (e) {
    console.log(e.message);
    res.status(404).send("Error : " + e.message);
  }
});

module.exports = router;
