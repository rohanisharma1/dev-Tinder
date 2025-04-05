const mongoose = require('mongoose');

const connectionRequestSchmea = new mongoose.Schema(
    {
        fromUserId :{
            type : mongoose.Schema.Types.ObjectId,
            required : true,
         },
         toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
         },
         status : {
            type : String,
            requird : true,
            enum : {
                values : ["ignored", "interested", "accepeted" ,"rejected"],
                message : '{Value} is incorrect status type',

            },
         },
    },
    {timestamps : true}
);
//index

connectionRequestSchmea.index({ fromUserId: 1, toUserId: 1});

//connectionRequestSchmea.pre("save", function (next){
    //const  connectionRequest  = this;
    //check if the fromuserid and touserid is 
   //if(connectionRequest.fromUserId.equals(connection.toUserId)){
     ///   throw new Error("Cannot send connection request to yourself !");
        
    //}
    //next();

//});
const ConnectionRequest = new mongoose.model(
    "ConnectRequest",
    connectionRequestSchmea
);
module.exports = ConnectionRequest;
