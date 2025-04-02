
const mongoose = require('mongoose');
const validator = require("validator");
const jsonWebToken  = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
    type : String,
    required :true,
},

lastName: {
    type : String,
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
        if(!validator.isStrongPassword(value)) {
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
userSchema.methods.getJWT = async function () {
    const user = this;

   const token = await jsonWebToken.sign({_id : user._id} ,"DEV@STUDENT$768", {
                expiresIn: "7d",
});
return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
    

}

 const User= mongoose.model("User",userSchema);
 module.exports= User;