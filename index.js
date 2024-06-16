const express = require("express");
const app = express();
const { storeProducts, getProducts } = require("./src/product");
require("dotenv").config();

app.use(express.json());

app.get("/msg", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/list-products", getProducts);

app.post("/store-products", storeProducts);

app.listen(80, () => {
  console.log("Server running on port 3000");
});
