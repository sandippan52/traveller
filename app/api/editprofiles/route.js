import connectDB from "@/lib/mongodb"
import User from "@/models/User"
// import cloudinary from "@/lib/cloudinary"
import { getServerSession } from "next-auth"
// import { authOptions } from "../../auth/[...nextauth]/route"
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server"

export async function PATCH(req) {

  await connectDB()

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()

  // let imageUrl = null

  
  // if (body.image) {
  //   const uploaded = await cloudinary.uploader.upload(body.image)
  //   imageUrl = uploaded.secure_url
  // }

  
  const updatedUser = await User.findByIdAndUpdate(
    session.user.id,
    {
      name: body.name,
      username: body.username,
      bio: body.bio,
      ...(body.image && { profilepic: body.image })
    },
    { new: true }
  )

  return NextResponse.json({
    message: "Profile updated successfully",
    user: updatedUser
  })
}

