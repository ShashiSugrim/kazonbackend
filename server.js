const express = require("express");
const app = express();
const productRoutes = require("./src/routes");

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/products", productRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
