const getProducts = "SELECT * FROM products;";
const getProductById = "SELECT * FROM products where id=$1";

module.exports = {
  getProducts,
  getProductById,
};
