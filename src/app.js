const express = require("express");
const app = express();
// this handle only get call to /user
app.get("/user",(req, res)=>{
   res.send({firstName:"Rohani",lastName :"Sharma"})
  });
  app.post("/user",(req, res)=>{
    console.log(req.body);
    // saving the data to database.
    res.send("database test");
 });

  app.delete("/user",(req,res) =>{
    res.send("deleted a successfully");
});
//this will match all the  HTTP method API calls to test

app.use("/",(req, res)=>{
    res.send("hi from me!")
})


app.listen(7777,() =>{
    console.log("server is successfully listening on port7777");

});