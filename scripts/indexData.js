import dotenv from "dotenv";
import path from "path";
// dotenv.config({ path: ".env.local" });
// dotenv.config({ path: "../.env.local" });

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});
console.log("ENV:", process.env.MONGODB_URI);


import connectDB from "../lib/mongodb.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { client } from "../lib/meilisearch.js";

const run = async () => {
  await connectDB();

  const posts = await Post.find().lean();
  const users = await User.find().lean();

  const postIndex = client.index("posts");
  const userIndex = client.index("users");

  const formattedPosts = posts.map(p => ({
    id: p._id.toString(),
    content: p.content,
    destination: p.destination?.to || "",
    category: p.category
  }));

  const formattedUsers = users.map(u => ({
    id: u._id.toString(),
    username: u.username,
    name: u.name
  }));

  await postIndex.addDocuments(formattedPosts);
  await userIndex.addDocuments(formattedUsers);

  console.log("✅ Indexed successfully");
};

run();