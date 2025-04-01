const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");
const{ validateSignUpData } = require("./utilis/validation .js");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jsonwebtoken = require("jsonwebtoken");

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
        const{emailId , password } = req.body;
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid credentials");
             }
             const isPasswordValid = await bcrypt.compare(password,user.password);
        if(isPasswordValid){

         //create a jwt token
         const token = await jsonwebtoken.sign({_id : user._id} ,"DEV@STUDENT$768");
         console.log(token);

            //Add the token to cookie and send the respone back to user
            res.cookie("token", token);
           res.send("Login Successfully!!!");
        }else{
            throw new Error("Password id not correct");
            
        }
            }catch (err){
                res.status(400).send("ERRROR :" + err.message)

            }

})
app.get("/profile",async(req,res) => {
   try{
    const cookies = req.cookies;
    const{token} = cookies;
    if(!token){
        throw new Error("INVALID TOKEN");
        
    }


    const decodedmessage = await jsonwebtoken.verify(token,"DEV@STUDENT$768");
    
    const {_id} = decodedmessage;
    

    const user = await User.findById(_id);
    if(!User){
        throw new Error("User does not exist");
        
    }
    res.send(user);
    
    
}catch (err){
    res.status(400).send("ERROR :" +err.message);

}
})

//get user by email
app.get("/user",async(req,res) => {
    
    const userEmail = req.body.emailId;
     
    try{
        const users = await User.find({emailId:userEmail});
        console.log("uuuuu",users);
        
        if(!users){
            
            res.status(404).send("user not found")
        }else{
        res.send(users);
    }
    }catch(err){
        res.status(400).send("something went wrong.")
    }
});
//Feed API-GET/feed- get allthe users from database
app.get("/feed",async(req,res) => {
    try{
        const user = await User.find({});
        res.send(user);
 }
 catch (err){
    res.status(404).send("something went wrong");
 }
});
//delete a user from the database
app.delete("/user",async(req,res) => {
    const userId = req.body.userId;
    try{
    const user = await User.findByIdAndDelete(userId);
    res.send("user Deleted successfully")
}catch (err) {
    res.status(400).send("something went wrong");
}

});


//update data from the database
app.patch("/user/userId",async (req,res)=> {
    const userId  = req.body.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES =["photoUrl","about","gender","age","skills"];
        const isUpdateAllowed = Object.keys(data).every((k)=> 
            ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
        throw new Error("Upate not allowed");
    }
    if (data?.skills.length >10){
        throw new Error("Skills cannot be more than 10");

    }
         const user = await User.findByIdAndUpdate({_id : userId},data,{
            returnDocument :"after",
            runValidators : true,
         });
        res.send("User updated successfully");
    }catch (err){
        res.status(400).send("UPDATE FAILED:" +err.message);

    }
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

