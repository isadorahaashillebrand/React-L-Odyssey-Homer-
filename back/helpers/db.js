const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Isadora123+',
  database : 'my_db'
});
module.exports  =  connection;