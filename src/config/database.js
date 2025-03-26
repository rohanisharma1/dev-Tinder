const mongoose = require("mongoose");
const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://RohaniSharma_10:santosh10@cluster0.e63o7.mongodb.net/student connect"
         );
};

module.exports = connectDB;
connectDB()
.then(()=>{
    console.log("Database conection  established");
})
.catch((err) =>{
    console.log("Database cannot be connected ..");

});
