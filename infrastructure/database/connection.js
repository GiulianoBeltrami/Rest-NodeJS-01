const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    port: 3307,
    user:'root',
    password:'admin',
    database:'petshop_schedule'
});

module.exports = connection;