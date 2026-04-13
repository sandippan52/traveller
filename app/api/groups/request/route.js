import Grouprequest from "@/models/Grouprequest";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";

export async function POST(req){

await connectDB();

const session = await getServerSession(authOptions);

if (!session){
    return NextResponse.json({message : "User unauthorized"})
}

const userId = session.user.id

const res = await req.json()


const existing = await Grouprequest.findOne({post : res.postId, user : userId})

if(existing){
    return NextResponse.json({message : "Request sent already"})
}

const newRequest = await Grouprequest.create({post : res.postId, user : userId })


const newNotification = await Notification.create({receiver : res.postCreator, sender : userId, type : "group_request", post : res.postId, request : newRequest._id})

return NextResponse.json({message : "Request sent successfully"})



}