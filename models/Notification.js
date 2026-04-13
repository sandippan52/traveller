import { Types } from "@prisma/client/runtime/client";
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

receiver : {
type : mongoose.Schema.Types.ObjectId,
ref : "User",
required : true
},

sender : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
},
type : {
    type : String,
    enum : ["like", "comment", "follow", "group_request", "message"],
    required : true
},
post : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Post",
    default : null
},
request : {
type : mongoose.Schema.Types.ObjectId,
ref : "Grouprequest",
default : null
},
isRead : {
    type : Boolean,
    default : false
},
createdAt : {
    type : Date,
    default : Date.now
}

})

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema)