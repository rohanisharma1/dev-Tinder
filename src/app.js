const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup",async(req,res)=>{
    // creating a new instance of the User model
    const user = new User({
        firstName : "rohani",
        lastName : "sharma",
        emailId : "rohanisharma@.gmail.com",
        password : "rohani123"
    });
    try{ 
        await user.save();
        res.send("user add suceesffully");
    }catch{
        res.status(400).send("error saving the user" + err.message);
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

