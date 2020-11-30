const express = require('express')
const app = express()
const connectDB = require('./config/db');
// connect to DB
connectDB();


app.listen(3000, () => {
    console.log('Server started!')
})

