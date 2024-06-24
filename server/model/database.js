// const mysql_promise = require('mysql2/promise');
const mysql = require('mysql2')

// const connection = mysql.createConnection({
//   host: 'localhost',       // Replace with your database host
//   user: 'booktracked',    // Replace with your database username
//   password: 'mp8CUT3I.aky]Wu4',// Replace with your database password
//   database: 'booktracked' // Replace with your database name
// });


const pool = mysql.createPool({
  host: 'localhost',       // Replace with your database host
  user: 'booktracked',    // Replace with your database username
  password: 'mp8CUT3I.aky]Wu4',// Replace with your database password
  database: 'booktracked' // Replace with your database name
});

module.exports = pool;