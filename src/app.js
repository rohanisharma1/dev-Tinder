const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup",async(req,res)=>{

    // creating a new instance of the User model
    const user = new User(req.body);

    try{ 

       await user.save();
        res.send("user add suceesffully");
    }catch( err){
        res.status(400).send("error saving the user" + err.message);
    }
   
});

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
app.patch("/user",async (req,res)=> {
    const userId  = req.body.userId;
    const data = req.body;
    try{
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

