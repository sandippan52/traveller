import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({

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

text : {
    type : String,
    required : true
},

parentComment : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comment",
    default : null
}, 

likes : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
}],

createdAt : {
    type : Date, 
    default : Date.now
}

})

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema)