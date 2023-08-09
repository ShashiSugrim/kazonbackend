const getProducts = "SELECT * FROM products;";
const getProductById = "SELECT * FROM products where id=$1";
const checkUserExists = "SELECT * FROM users WHERE email=$1";
const addUser = "INSERT INTO USERS(email, password) VALUES ($1, $2)";
const searchQuery = "SELECT * FROM PRODUCTS WHERE ";

module.exports = {
  getProducts,
  getProductById,
  checkUserExists,
  addUser,
  searchQuery
};
