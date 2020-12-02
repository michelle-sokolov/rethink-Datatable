const express = require('express')
const app = express()
const connectDB = require('./config/db');
const bodyParser = require("body-parser");
const cors = require("cors");
const query = require('./helpers/query');
const dbConfig = require('./config/db2');
const connection = require('./helpers/connection');

// connect to DB
connectDB();
// define routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
app.get('/list', async (req, res) => {
    const conn = await connection(dbConfig).catch(e => { })
    const results = await query(conn, 'SELECT * FROM school-data').catch(console.log);
    console.log('res ', results)

    res.json({ results });
})
app.listen(3000, () => {
    console.log('Server started!')
})

