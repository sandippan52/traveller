import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({

    follower :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    following :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    createdAt : {
        type : Date,
        default : Date.now
    }


})

export default mongoose.models.Follow || mongoose.model("Follow", FollowSchema)