import Unit from '@/lib/models/unit.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB(); 
    const categories = await Unit.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB(); 
    const body = await req.json();

    const newUnit = await Unit.create(body);
    

    return NextResponse.json(newUnit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create unit' }, { status: 500 });
  }
}

