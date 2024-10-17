// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import Product from '@/lib/models/product.models'; // Ensure the model path is correct
import { connectDB } from '@/mongoose'; // Import your database connection logic
import Category from '@/lib/models/category.models';
import User from '@/lib/models/user.models';

export async function GET() {
  // Connect to the database
  
  try {
    await connectDB();
    // Count the number of documents in each collection
    const numberOfProducts = await Product.countDocuments();
    const numberOfCategories = await Category.countDocuments(); // Make sure you import and define this model
    const numberOfUsers = await User.countDocuments(); 
    const users = await User.find().limit(7);
    const products = await Product.find().limit(4);
    const categories = await Category.find().limit(6);
    // Return the counts as JSON
    return NextResponse.json({
      categories,
      users,
      products,
      numberOfProducts,
      numberOfCategories,
      numberOfUsers,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
