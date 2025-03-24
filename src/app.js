const express = require("express");
const app = express();
app.use("/hello", (req,res) =>{
    res.send("Hello from the server!");
});
app.use("/test",(req ,res) =>{
    res.send("hello helloo");
});
app.use("/",(req, res)=>{
    res.send("hi from me!")
})


app.listen(7777,() =>{
    console.log("server is successfully listening on port7777");

});