import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();

    await connectDB();

    
    const hashedPassword = await bcrypt.hash(body.password, 10);

  
    const existingUser = await User.findOne({
      $or: [
        { email: body.email },
        { username: body.username }
      ]
    });

    if (existingUser) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    
    const newUser = await User.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: hashedPassword
    });

    return Response.json({ message: "User Created" });

  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Signup failed" },
      { status: 500 }
    );
  }
}