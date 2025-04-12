require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database.js");
const  app = express();
const User = require("./models/user.js");
const{ validateSignUpData } = require("./utilis/validation .js");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jsonWebToken = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");
const cors = require("cors");

app.use(
    cors({
    origin: "http://localhost:5173",
    credentials: true,
})
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authR.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/userR.js");

app.use("/" ,authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


connectDB()
.then(()=>{
    console.log("Database conection  established");
    app.listen(process.env.PORT || 3000,() =>{
        console.log(`Server is successfully listening on port ${process.env.PORT || 3000}`);

    
    });
})
.catch((err) =>{

    console.log("Database cannot be connected ..");

});

