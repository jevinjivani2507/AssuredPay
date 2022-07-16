const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
var cors = require('cors')

const app = express();

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", require("./routes/productsRoute"));

app.listen(port, () => console.log(`Server started on port ${port}`));
