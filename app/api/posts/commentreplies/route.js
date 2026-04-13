import Comment from "@/models/Comment";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";






export async function POST(req){

await connectDB()

const {commentId, postId, replyText}= await req.json()

const session = await getServerSession(authOptions)

if(!session){
    return NextResponse.json({message : "To reply login first"})
}

const userId = session.user.id;

const repliedComment = await Comment.create({post : postId, user : userId, text : replyText, parentComment : commentId })

return NextResponse.json(repliedComment)


}

export async function GET(req){
   
    await connectDB()
    const {searchParams}= new URL(req.url)
    const commentId = searchParams.get("commentId")

    const repliedComments = await Comment.find({parentComment : commentId}).populate("user", "name").sort({createdAt : -1})

    return NextResponse.json(repliedComments)



}