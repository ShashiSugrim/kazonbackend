const pool = require("./db");
const queries = require("./queries");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()



const getProducts = (req, res) => {
  pool.query(queries.getProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getProductById = (req, res) => {
  let id = parseInt(req.params.id);
  pool.query(queries.getProductById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const loginUser = async (req, res) =>
{
  let email = req.body.email;
  let password = '';
  console.log("email is " + email);
  const userExists = await pool.query(queries.checkUserExists, [email]);
  if(userExists.rowCount == 0)
  {
    console.log("This user does not exist");
    return res.send("this user does not exist");
  } else
  {
    password = userExists.rows[0].password;

  }

  console.log('password is ' + password);
  console.log("req body password: " + req.body.password);

  if (await bcrypt.compare(req.body.password, password))
    {
      console.log("bcrypt says this is a good password");

      const user = {email: email};
      const accessToken = generateAccessToken(user);
      return res.json({accessToken:accessToken});
      

      // return res.send("success");
    } else {
      console.log("bcrypt says this is NOT a good password");

      return res.send("not allowed");
    }
}

function generateAccessToken(user)
{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}

const createAccount = async (req, res) =>
{
  let email = req.body.email;
  let password = req.body.password;
  const userExists =  await pool.query(queries.checkUserExists, [email]);
  if(userExists.rowCount > 0)
  {
    console.log("email exists");
    res.status(404).send("email exists");
  } else
  {
    const salt =  await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await pool.query(queries.addUser, [`${email}`, `${hashedPassword}`]);
      console.log("encrypted password and added to db");
      res.status(201).send("encrypted password and added to db");
  }
}

const getProductSearch = async (req, res) =>
{
  let searchQuery = req.params.searchQ;
  const results = await pool.query(queries.searchQuery, [`${searchQuery}`]);

  console.log("results are " + JSON.stringify(results.rows));
  // res.status(201).send("successfully searched for " + searchQuery);
  res.status(201).send(results.rows);
}

const getCart = async (req, res) =>
{
  let email = req.user.email;
  const results = await pool.query(queries.getCartQuery, [email]);
  let productArr = [];
  for(let productID = 0;productID<results.rowCount;productID++)
  {
    let result = await pool.query(queries.getProductById, [results.rows[productID].product_id]);
    productArr.push(result.rows[0])
  }
  console.log("productArr" + JSON.stringify(productArr));
  res.json(productArr);

}

const createReport = (req, res) =>
{
  let email = req.user.email;
  let reportText = req.body.text;
  console.log("this is report text: " + reportText);
  res.send("this is your report: " + reportText)
}

const addToCart = async (req, res) =>
{
  let email = req.user.email;
  let productID = req.body.id;

  const userCart = await pool.query(queries.checkCart, [email, productID]);
  if(userCart.rowCount > 0)
  {
    return res.status(408).send('already have item in cart');
  }
  pool.query(queries.addCart, [`${email}`, `${productID}`], (err, results)=>
  {
    if(err) throw err;
    res.status(201).send("successfully added item to cart");
  });
}

const deleteFromCart = async (req, res) =>
{
  let email = req.user.email;
  let productID = req.body.id;

  const userCart = await pool.query(queries.checkCart, [email, productID]);
  if(userCart.rowCount == 0)
  {
    return res.status(403).send('item does not exist in cart');
  }
  pool.query(queries.deleteFromCart, [`${email}`, `${productID}`], (err, results)=>{
    if(err) throw err;
    res.status(201).send("successfully removed item to cart");
  })
}

module.exports = {
  getProducts,
  getProductById,
  loginUser,
  createAccount,
  getProductSearch,
  getCart,
  createReport,
  addToCart,
  deleteFromCart
};
