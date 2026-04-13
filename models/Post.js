import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({

    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    category : {
        type : String,
        enum : ["group", "individual"],
        required : true
    },
    content : {
        type : String
    },
    media : [{
        type : String,
    }],

    destination : {
        from : String,
        to : String
    },

    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],

    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }], 

    createdAt : {
        type : Date,
        default : Date.now
    }


})

export default mongoose.models.Post || mongoose.model("Post", PostSchema)