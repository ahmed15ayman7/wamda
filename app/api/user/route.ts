// app/api/users/route.ts
import { NextResponse } from "next/server";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

export async function GET() {
  try{

    await connectDB();
    
    const users = await User.find({ isApproved: false });
    return NextResponse.json(users);
  }catch(e:any){
      return NextResponse.json({ message: "User not found.::"+e }, { status: 404 });
  }
}


// export async function POST(request: Request) {
//   try {
//     await connectDB();

//     return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create user', details: error.message }, { status: 400 });
//   }
// }
