const express = require("express");
const app = express();
const productRoutes = require("./src/routes");
const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/products", productRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
