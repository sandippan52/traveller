import { client } from "@/lib/meilisearch";
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

  
  const postResults = await client.index("posts").search(q);
  const userResults = await client.index("users").search(q);

  
  const postIds = postResults.hits.map(p => p.id);

  const fullPosts = await Post.find({
    _id: { $in: postIds }
  })
    .populate("creator", "username profilepic")
    .lean();

  
  const userIds = userResults.hits.map(u => u.id);

  const fullUsers = await User.find({
    _id: { $in: userIds }
  }).lean();

  return NextResponse.json({
    posts: fullPosts,
    users: fullUsers
  });
}