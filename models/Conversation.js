import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
type: {
    type : String,
    enum : ["dm", "group"]
},
members : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
    }],

post : {
type : mongoose.Schema.Types.ObjectId,
ref : "Post",
default : null
}

})
export default mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema)