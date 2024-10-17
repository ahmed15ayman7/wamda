import Category from '@/lib/models/category.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';


// GET /api/categories - Get all categories
export async function GET() {
  try {
    await connectDB(); // Ensure database connection
    const categories = await Category.find(); // Fetch all categories
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST /api/categories - Create a new category
export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure database connection
    const { name, description } = await req.json();

    // Create new category
    const newCategory = await Category.create({ name, description });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
