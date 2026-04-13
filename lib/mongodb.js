import mongoose from "mongoose";

let MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    // throw new Error("Please define mongodb uri");
    MONGODB_URI = "mongodb://localhost:27017/traveller";
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn : null, promise : null }
}

async function connectDB(){
if(cached.conn) return cached.conn

if(!cached.promise){
    cached.promise = mongoose.connect(MONGODB_URI,{
        dbName : "traveller"
    })
}
cached.conn = await cached.promise
return cached.conn


}

export default connectDB;