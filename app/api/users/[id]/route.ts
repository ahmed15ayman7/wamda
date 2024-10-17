import { NextResponse } from 'next/server';
import User from '@/lib/models/user.models';
import { connectDB } from '@/mongoose';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching user: ' + error }, { status: 500 });
  }
};

export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const { id } = params;
    const updatedData = await req.json();
    
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated user after update
      runValidators: true, // Ensure validation is run
    });

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error updating user: ' + error }, { status: 500 });
  }
};
