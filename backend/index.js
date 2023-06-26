const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config(); 

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongoDB connected")
}).catch(err=>console.error());



app.listen(8800,()=>{
    console.log("backend running")
})