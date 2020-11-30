var mysql = require('mysql');

const connectDB = async () => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "newuser2",
        password: "mySQL123",
        database: "schools"
    });


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });
}
module.exports = connectDB;