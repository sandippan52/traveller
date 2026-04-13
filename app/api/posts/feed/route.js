import Follow from "@/models/Follow";
import Post from "@/models/Post";
import connectDB from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function GET(){

    await connectDB()

    const session = await getServerSession(authOptions)

    if(!session){
        return Response.json({message : "User unauthorized"},{status : 401})
    }

    const userId = session.user.id;

    

    const followingPost = await Follow.find({follower: userId})
    const followerPost = await Follow.find({following : userId})

    const followingId = followingPost.map(f => f.following)
    const followerId = followerPost.map(f => f.follower)

    const someRecentDate = new Date()
    someRecentDate.setDate(someRecentDate.getDate() - 7)

    let feedPosts


    if(followingId.length === 0){

         feedPosts = await Post.find({ 
                $or:[
                    {category : "group"},
                    {createdAt : {$gte : someRecentDate}},
                    {creator:userId }
                ]

        }).populate("creator", "name username profilepic")
          .sort({createdAt : -1})
          .limit(20)    

           

    }
    else{
       feedPosts = await Post.find({
        $or : [
            {creator : {$in : followingId}},
            {creator : {$in : followerId}, category : "group"},
            {creator : userId},
            {category : "group"}
        ]
    }).populate("creator", "name username profilepic")
      .sort({createdAt : -1})

       
}

     return Response.json({feedPosts})



}