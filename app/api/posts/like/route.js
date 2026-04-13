

import Post from "@/models/Post";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function POST(req){

const {postId} = await req.json();

await connectDB()

const session = await getServerSession(authOptions)

if(!session){
return NextResponse.json({message : "To like any post you need to login first."})
}

const userId = session.user.id

const post = await Post.findById(postId)

const alreadyLiked = post.likes.includes(userId)

if(alreadyLiked){
    post.likes.pull(userId)
}else{
    post.likes.push(userId)
}

await post.save()

return NextResponse.json({likes : post.likes})





}





