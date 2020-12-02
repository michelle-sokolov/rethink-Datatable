const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var cors = require('cors')

app.use(cors(), bodyParser.json())
// parse application/json
// app.use();

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'newuser2',
    password: 'mySQL123',
    database: 'schools'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//show all products
app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM schools.`school-data`;";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ results }));
    });
});





//Server listening
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});