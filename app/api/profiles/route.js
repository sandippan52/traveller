import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Follow from "@/models/Follow";
import Post from "@/models/Post";

export async function GET(req){
  
    const {searchParams}= new URL(req.url)
    const profileId = searchParams.get("profileId")

    await connectDB()
   
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({message : "Login to see the profile details"})
    }

    const followerDetails = await Follow.find({following : profileId})
    const followingDetails = await Follow.find({follower : profileId})
    const postDetails = await Post.find({creator : profileId}).populate("creator","name username profilepic")
                                                              .sort({createdAt : -1})

    const profile = await User.findById(profileId)

    return NextResponse.json({profile, followerDetails, followingDetails, postDetails})



}