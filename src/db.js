const Pool = require("pg").Pool;
const credentials = require("./credentials.json");

console.log("Credentials is " + JSON.stringify(credentials));
const pool = new Pool(credentials);

module.exports = pool;
