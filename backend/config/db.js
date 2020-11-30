var mysql = require('mysql');

const connectDB = async () => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "newuser2",
        password: "mySQL123",
        database: "schools"
    });


    con.connect(function (err) {
        if (err) {
            throw err;
        }
        else {
            con.query("SELECT * FROM schools.`school-data`;", function (err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                var data = result;
                console.log(data)
            });
        }

    });
}
module.exports = connectDB;