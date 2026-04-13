import Conversation from "@/models/Conversation";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req){

await connectDB()

const session = await getServerSession(authOptions)

if(!session){
    return NextResponse.json({message : "User authorized"})
}

const userId = session.user.id

const allChats = await Conversation.find({members :userId}).populate("members","username profilepic")
                                                           .populate("post", "content, destination")
                                                           .sort({createdAt : -1})

return NextResponse.json({allChats, currUser : userId})

}