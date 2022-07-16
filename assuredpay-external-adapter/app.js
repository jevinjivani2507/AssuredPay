const createRequest = require("./index").createRequest;
const fs = require("fs");
const console = require("console");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.EA_PORT || 3000;

const output = fs.createWriteStream("./stdout.log");
const errorOutput = fs.createWriteStream("./stderr.log");

const logger = new console.Console({ stdout: output, stderr: errorOutput });
app.use(bodyParser.json());

app.post("/", (req, res) => {
  logger.log(
    "POST Data: ",
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    req.body
  );
  console.log("POST Data: ", req.body);
  createRequest(req.body, (status, result) => {
    console.log("Result: ", result);
    logger.log(
      "Result: ",
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      result,
      "\n----------------------------------------------------------------------------------------------------------------------------"
    );
    res.status(status).json(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
