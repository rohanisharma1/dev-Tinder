const express = require("express");
const authRouter = express.Router();

const{ validateSignUpData } = require("../utilis/validation .js");

const User = require("../models/user");
const bcrypt = require('bcrypt');


authRouter.post("/signup",async(req,res)=>{
    try{

    //validate of data

    validateSignUpData(req);
    const{firstName, lastName, emailId, password} = req.body;

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
        console.error(err);
        res.status(400).send("ERROR:" + err.message);
    }
   
});
authRouter.post("/login",async(req,res) => {
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
           res.send(user);
        }else{
            throw new Error("Password id not correct");
        }
            }catch (err){
                res.status(400).send("ERRROR :" + err.message)

            }

});

authRouter.post("/logout",async(req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("logout successfull !!1");
});

module.exports = authRouter;