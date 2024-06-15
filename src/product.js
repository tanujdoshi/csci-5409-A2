const connectToDatabase = require("./db");

const db = connectToDatabase();

const storeProducts = async (req, res) => {
  const products = req.body.products;

  console.log("Productss ", products, req.body);
  const query =
    "INSERT INTO products (name, price, availability) VALUES (?, ?, ?)";

  for (const product of products) {
    await db.execute(query, [
      product.name,
      product.price,
      product.availability,
    ]);
  }

  const resp = {
    message: "Success.",
  };
  res.status(200).send(resp);
};

const getProducts = async (req, res) => {
  const query = "SELECT * FROM products";
  db.execute(query, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      return res.status(500).send("Error fetching products");
    }

    const transformedResults = results.map((product) => ({
      ...product,
      availability: product.availability === 1,
    }));

    res.json({ products: transformedResults });
  });

  // res.json({ products: response });
};

module.exports = {
  storeProducts,
  getProducts,
};
