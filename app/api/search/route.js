import Post from "@/models/Post";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ posts: [], users: [] });
  }

  try {
    
    const users = await User.find({
      username: { $regex: q, $options: "i" }
    })
      .select("_id username profilepic")
      .lean();

  
    const posts = await Post.find({
      content: { $regex: q, $options: "i" }
    })
      .populate("creator", "username profilepic")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      posts,
      users
    });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { posts: [], users: [] },
      { status: 500 }
    );
  }
}