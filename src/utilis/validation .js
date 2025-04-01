const validator = require("validator");
const validateSignUpData = (req)=> {

    console.log("Enter valid")
    const {firstName, lastName, emailId,password} = req.body;
    console.log("Enter ", req.body,"enter")
    console.log("name valid",firstName.length )

    if(!firstName || !lastName){
        throw new Error("Name is not valid");

        
    }
    else if(firstName.length<3){
        throw new Error("Firstname should be 4-50 charaters");
         }
         else if(!validator.isStrongPassword(password)){
            throw new Error("Please enter a strong password");
            

         }
         else if(!validator.isEmail(emailId)){
            throw new Error("Email not valid");
            
             }

             console.log("name??????")

};
module.exports = {
    validateSignUpData,
};