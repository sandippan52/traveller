import Follow from "@/models/Follow";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req){

await connectDB()

const {followingId} = await req.json()

const session = await getServerSession(authOptions)
if(!session){
return NextResponse.json({message : "To follow someone, you need to login first."})
}

const userId = session.user.id;

const alreadyFollows = await Follow.findOne({follower : userId, following : followingId})

if(alreadyFollows){
    await Follow.findByIdAndDelete(alreadyFollows._id)
    return NextResponse.json({following : false})
}

const newFollowData = await Follow.create({follower: userId, following:followingId})

  return NextResponse.json({following : true})

}

export async function GET(req){

  await connectDB()
  const {searchParams}= new URL(req.url)
  const creatorId = searchParams.get("creatorId")

  const session = await getServerSession(authOptions);
  
  if(!session){
    return NextResponse.json({message : "User unauthorized"})
  }

  const userId = session.user.id;
  

  const exists = await Follow.findOne({follower : userId, following : creatorId})

  if(exists){
    return NextResponse.json({following : true})
  } else {
    return NextResponse.json({following : false})
  }

  

}