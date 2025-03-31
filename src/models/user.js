const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
    type : String,
    required :true,
},

lastName: {
    type : String
},
emailId : {
    type : String,
    lowercase :true,
    required :true,
    unique : true,
    trim : true,
    validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error("Invaild email address" +value );
        }
    },
},
password :{
    type : String,
    requried :true,
    validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error("Enter new password" +value );
        }
    },

},
age :{
    type: Number,
    min:16,
},
gender :{
    type : String,
    validate(value){
        if(!["male", "female", "others"].includes(value)) {
            throw new Error("Gender data is not valid")
        }
    },
},
photoUrl :{
    type: String,
    default:"https://rapidapi.com/vikashkhati007/api/random-user-datat",
    validate(value) {
        if(!validator.isURL(value)) {
            throw new Error("Invaild Photo url " +value );
        }
    },

},
about :{
    type :String,
    default : "This is a about of the user",
},
skills : {
    type : [String],
},
},
{
    timestamps :true,
}
);

 const User= mongoose.model("User",userSchema);
 module.exports= User;