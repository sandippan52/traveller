
import mongoose from "mongoose";


const Userschema = new mongoose.Schema({
name :{
    type : String,
    required : true
},
username : {
    type : String,
    required : true,
    unique : true,
    lowercase : true
},
email :{
    type : String,
    required : true,
    unique : true
},
password :{
    type : String,
    required : true,
    unique: true
},

bio : {
    type : String,
    default : ""
},

profilepic : {
    type : String,
    default : ""
},

createdAt :{
    type : Date,
    default : Date.now
}



})

export default mongoose.models.User || mongoose.model("User", Userschema)