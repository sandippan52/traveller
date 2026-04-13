import Conversation from "@/models/Conversation";
import Message from "@/models/Message";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function GET(req){

// const ConversationId = await req.json()

const {searchParams}= new URL(req.url)
const conversationId  = searchParams.get("conversationId")

const allMessages = await Message.find({conversation : conversationId  }).populate("sender","username")

return NextResponse.json(allMessages)



}
export async function POST(req) {
  const body = await req.json()
  const { conversationId, text } = body

  await connectDB()

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" })
  }

  const message = await Message.create({
    conversation: conversationId,
    sender: session.user.id,
    text
  })

  const populatedMessage = await message.populate(
    "sender",
    "username profilepic"
  );

  pusherServer.trigger(
    `chat-${conversationId}`, 
    "new-message",                 
    populatedMessage              
  );

  return NextResponse.json(populatedMessage)
}

