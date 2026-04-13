import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { client } from "@/lib/meilisearch";


export async function POST(request) {

const body = await request.json();

await connectDB();

const hashedPassword = await bcrypt.hash(body.password, 10)

const newUser = await User.create ({
    name : body.name,
    username : body.username,
    email : body.email,
    password : hashedPassword

})

await client.index("users").addDocuments([{
  id: newUser._id.toString(),
  username: newUser.username,
  name: newUser.name
}])

return Response.json({message : "User Created"})


}