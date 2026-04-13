import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({


conversation : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Conversation"
},


sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
},
text : {
    type : String
},
createdAt : {
    type : Date,
    default : Date.now
}

})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)