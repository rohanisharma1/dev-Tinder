const express = require("express");
const app = express();
//app.use ("/route ,rh,rh2,rh3...")
app.get(
  "/user",
  (req, res,next)=>{
  console.log("handleing the route user!!");
  next();
     },
     (req,res,next)=>{
      console.log("handleing the route user2!!");
      next();

     },
     (req,res,next)=>{
      console.log("handleing the route user3!!");
      next();

     }, 
     (req,res,next)=>{
      console.log("handleing the route user4!!");
      next();

     },
     (req,res,next)=>{
      console.log("handleing the route user5!!");
      res.send("5th respone");

     },

);

 
app.listen(7777,() =>{
    console.log("server is successfully listening on port7777");

});