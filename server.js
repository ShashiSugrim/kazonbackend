const express = require("express");
const app = express();
const productRoutes = require("./src/routes");
const cors = require("cors");
const controller = require("./src/controller");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[0];
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>
  {
      if(err) return res.sendStatus(403);
      req.user = user;
      next();
  });
}

app.use("/products", productRoutes);
app.post("/login", controller.loginUser);
app.post("/createAccount", controller.createAccount);
app.get("/search/:searchQ", controller.getProductSearch);
app.get("/cart", authenticateToken, controller.getCart);
app.post("/report", authenticateToken, controller.createReport);
app.post('/addToCart/:id', authenticateToken, controller.addToCart);
app.delete('/deleteFromCart/:id', authenticateToken, controller.deleteFromCart);


app.listen(port, () => console.log(`app listening on port ${port}`));
