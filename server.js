const express = require("express");
const app = express();
const productRoutes = require("./src/routes");
const cors = require("cors");
const controller = require("./src/controller");
const bcrypt = require('bcrypt');


const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/products", productRoutes);
app.post("/login", controller.loginUser);
app.post("/createAccount", controller.createAccount);


app.listen(port, () => console.log(`app listening on port ${port}`));
