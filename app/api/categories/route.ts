import Category from '@/lib/models/category.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';
import Product from '@/lib/models/product.models';

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
    const body = await req.json();

    // Create new category
    const newCategory = await Category.create(body);
    if(body.products){

      await Product.updateMany(
        { _id: { $in: body.products } }, // Find all products whose _id is in the provided array
        { category: newCategory._id, categoryName:body.name } // Update the category reference and categoryName
      );
    }
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
