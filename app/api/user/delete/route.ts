import { NextResponse } from "next/server";
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

export async function DELETE(req: Request) {
  await connectDB();
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: "User ID is required." }, { status: 400 });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }
  return NextResponse.json({ message: "User deleted successfully." }, { status: 200 });
}