import Notification from "@/models/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Grouprequest from "@/models/Grouprequest";
import Post from "@/models/Post";
import Conversation from "@/models/Conversation";

export async function GET(req){

    await connectDB()

    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({message : "To see notifications login first."})
    }

    const viewerId = session.user.id;
    
    const notification = await Notification.find({receiver : viewerId})
                                           .populate("sender", "username profilepic")
                                           .populate("post")
                                           .populate("request")
                                           .sort({createdAt : -1})

    return NextResponse.json(notification)


}

export async function POST(req){

    await connectDB()

    const {searchParams}= new URL(req.url)
    const requestId = searchParams.get("requestId")

    const session = await getServerSession(authOptions)

    const userId = session.user.id

    const groupRequest = await Grouprequest.findByIdAndUpdate(requestId, {status : "accepted"})

    const postUpdate = await Post.findByIdAndUpdate(groupRequest.post,{
        $addToSet : {members : groupRequest.user}
    })

    const newConversation = await Conversation.create({type : "group", members: [groupRequest.user,userId], post: postUpdate._id})

    const deleteRequest = await Notification.deleteOne({request : requestId})

    return NextResponse.json({message : "member added to the group successfully."})




}