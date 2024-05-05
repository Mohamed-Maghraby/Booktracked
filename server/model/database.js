const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',       // Replace with your database host
  user: 'booktracked',    // Replace with your database username
  password: 'mp8CUT3I.aky]Wu4',// Replace with your database password
  database: 'booktracked' // Replace with your database name
});

module.exports = connection;