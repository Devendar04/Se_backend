const dotenv = require('dotenv');
dotenv.config ();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connecToDatabase = require('./db/db');
const userRoutes = require('./routes/user.routes');


connecToDatabase();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('Hello, World!');
})
app.use('/users',userRoutes);

module.exports = app;