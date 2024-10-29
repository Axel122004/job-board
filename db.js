var mariadb = require("mariadb");

var pool = mariadb.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "admin",
  password: "motdepasse123",
  database: "job_advertisements"
});

module.exports = Object.freeze({
  pool: pool,
});
