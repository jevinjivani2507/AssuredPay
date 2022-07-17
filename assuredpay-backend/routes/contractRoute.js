const { response } = require("express");
const express = require("express");
const createContract = require("../controller/contractCreator");
const calculateTotal = require("../controller/calculateTotal");
require("dotenv").config();
const router = express.Router();

router.route("/").post(async (req, res) => {
  const customerAddress = req.body.customer;
  const product = req.body.products;
  let amount = calculateTotal(product);

  try {
    let { customer, contractAddress } = await createContract(
      customerAddress,
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
