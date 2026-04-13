import cloudinary from "@/lib/cloudinary";
import Post from "@/models/Post";
import connectDB from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { client } from "@/lib/meilisearch";




export async function POST(req){
   const body = await req.json()
   
   await connectDB()

   const session = await getServerSession(authOptions)

   if(!session){
    return Response.json({message : "User unauthorized"}, {status : 401})
   }
   
   
   let imageUrl = null
   if(body.image){
   const uploadedImage = await cloudinary.uploader.upload(body.image)
   imageUrl = uploadedImage.secure_url
   }
   const newPost = await Post.create({
        creator : session.user.id,
        category : body.category,
        content : body.content,
        media : imageUrl?[imageUrl]:[],
        destination : body.destination,
        members : [session.user.id]

   })
   await client.index("posts").addDocuments([{
  id: newPost._id.toString(),
  content: newPost.content,
  destination: newPost.destination?.to || "",
  category: newPost.category
}])

   return Response.json({newPost})


}