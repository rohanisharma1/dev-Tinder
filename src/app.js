const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");
const{ validateSignUpData } = require("./utilis/validation .js");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jsonWebToken = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authR");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
app.use("/" ,authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


connectDB()
.then(()=>{
    console.log("Database conection  established");
    app.listen(3000,() =>{
        console.log("server is successfully listening on port7777");
    
    });
})
.catch((err) =>{

    console.log("Database cannot be connected ..");

});

