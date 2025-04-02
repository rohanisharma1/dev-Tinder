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

app.post("/signup",async(req,res)=>{
    try{

    //validate of data

    validateSignUpData(req);
    const{firstName , lastName,emailId,password} = req.body;

    //Encrpyt the password
    const passwordHash = await bcrypt.hash(password,7);
    console.log("passs",passwordHash);


    // creating a new instance of the User model
    const user = new User({
        firstName,
        lastName,
        emailId,
        password : passwordHash,
    });

    

       await user.save();

        res.send("user add suceesffully");
    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
   
});
app.post("/login",async(req,res) => {
    try{
        const{emailId ,password } = req.body;
        //instance
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
             }
    const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

         //create a jwt token
         const token = await user.getJWT();
         
         //Add the token to cookie and send the respone back to user
            res.cookie("token", token , {
                expires :new Date(Date.now() + 8*3600000)
            });
           res.send("Login Successfully!!!");
        }else{
            throw new Error("Password id not correct");
        }
            }catch (err){
                res.status(400).send("ERRROR :" + err.message)

            }

});
app.get("/profile", userAuth, async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch (err){
        res.status(400).send("ERROR ER: " + err.message);
    }
});
app.post("/sendConnectionRequest", userAuth, async( req,res) => {
    const user = req.user;
    //sending a connection request
    console.log("Sending a connection request");
    res.send( user.firstName + "Connection Request sent!");

});



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

