const getProducts = "SELECT * FROM products;";
const getProductById = "SELECT * FROM products where id=$1";
const checkUserExists = "SELECT * FROM users WHERE email=$1";
const addUser = "INSERT INTO USERS(email, password) VALUES ($1, $2)";
const searchQuery = "SELECT * from PRODUCTS where $1 = ANY(topics);";
const getCartQuery = "SELECT * FROM CART WHERE email =$1";
const createReportQuery = "INSERT INTO REPORT(email, description) VALUES ($1, $2)";
const checkCart = 'SELECT * FROM (SELECT * FROM CART WHERE email =$1) topics WHERE topics.product_id = $2;'
const addCart = 'INSERT INTO CART(email, product_id) VALUES ($1, $2)';
const deleteFromCart = 'DELETE FROM CART WHERE email=$1 AND product_id = $2;'
const getUserReportCount = "SELECT * FROM REPORT WHERE email=$1"

module.exports = {
  getProducts,
  getProductById,
  checkUserExists,
  addUser,
  searchQuery,
  getCartQuery,
  createReportQuery,
  checkCart,
  addCart,
  deleteFromCart,
  getUserReportCount
};
