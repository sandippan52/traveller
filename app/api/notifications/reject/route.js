import Grouprequest from "@/models/Grouprequest";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Notification from "@/models/Notification";

export async function POST(req){

    await connectDB()
    const {searchParams}= new URL(req.url)
    const requestId = searchParams.get("requestId")

    const groupRequest = await Grouprequest.findByIdAndUpdate(requestId, {status : "rejected"})

     const deleteRequest = await Notification.deleteOne({request : requestId})

     return NextResponse.json({message : "Invitation rejected by you!!"})


}