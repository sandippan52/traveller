import mongoose from "mongoose";

const GrouprequestSchema = new mongoose.Schema({

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : String,
        enum : ["pending", "accepted", "rejected"],
        default : "pending"
    },
    createdAt :{
        type : Date,
        default : Date.now
    }

})

export default mongoose.models.Grouprequest || mongoose.model("Grouprequest", GrouprequestSchema)