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

export async function POST(req: Request) {
  try {
    await connectDB(); // Ensure database connection
    const body = await req.json();

    // Create new category
    const newCategory = await Category.create(body);
    
    if (body.products) {
      // Find all categories that currently contain the products
      const oldCategories = await Category.find({
        products: { $in: body.products },
      });

      // Remove the products from the old categories
      await Promise.all(
        oldCategories.map(async (category) => {
          await Category.updateOne(
            { _id: category._id },
            { $pull: { products: { $in: body.products } } }
          );
        })
      );

      // Update the products to the new category
      await Product.updateMany(
        { _id: { $in: body.products } },
        { category: newCategory._id, categoryName: body.name }
      );
    }

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

