const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");


dotenv.config(); 

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongoDB connected")
}).catch(err=>console.error());


app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(8800,()=>{
    console.log("backend running")
})
