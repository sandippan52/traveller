import Comment from "@/models/Comment";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST (req){

    const {postId, text} = await req.json()

    await connectDB()

    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({message : "To comment you need to login first."})
    }

    const userId = session.user.id

    const newComment = Comment.create({post : postId, user : userId, text : text})

    return NextResponse.json(newComment)


}

export async function GET(req){
    await connectDB();
    const {searchParams}= new URL(req.url)
    const postId = searchParams.get("postId")

    const comments = await Comment.find({$and: [{post : postId}, {parentComment : null}]}).populate("user", "name").sort({createdAt : -1})

    return NextResponse.json(comments)
}