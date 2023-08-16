const Pool = require("pg").Pool;
const credentials = require("./credentials.json");

const pool = new Pool(credentials);

module.exports = pool;
