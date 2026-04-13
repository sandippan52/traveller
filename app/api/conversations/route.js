
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Conversation from "@/models/Conversation";


export async function POST(req){

    const body = await req.json()
    const recieverId = await body.profileId
    

    await connectDB()

    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({message : "Login first to send dm"})
    }

    const senderId = session.user.id

    const convo = await Conversation.findOne({members : {$all : [senderId,recieverId ]},
    type : "dm"
    })

    if(!convo){
        const convo = await Conversation.create({type : "dm",
          members : [recieverId,senderId]
        })

        return NextResponse.json(convo)
    }

    return NextResponse.json(convo)

}