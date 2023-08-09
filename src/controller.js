const pool = require("./db");
const queries = require("./queries");
const bcrypt = require('bcrypt');


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
  } else
  {
    password = userExists.rows[0].password;

  }

  console.log('password is ' + password);
  console.log("req body password: " + req.body.password);

  if (await bcrypt.compare(req.body.password, password))
    {
      console.log("bcrypt says this is a good password");
      res.send("success");
    } else {
      console.log("bcrypt says this is NOT a good password");

      res.send("not allowed");
    }
  res.status(201).send();
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



module.exports = {
  getProducts,
  getProductById,
  loginUser,
  createAccount
};
