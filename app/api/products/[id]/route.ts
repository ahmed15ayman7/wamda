import { NextResponse } from 'next/server';
import Product from '@/lib/models/product.models'; // Ensure the model path is correct
import { connectDB } from '@/mongoose'; // Ensure the DB connection path is correct

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    // Connect to the database
    await connectDB();
    const { id } = params;

    if (id) {
      // Search for the product by id
      const product = await Product.findById(id); // Using `findById` for _id

      if (!product) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }

      // Return the product data
      return NextResponse.json(product, { status: 200 });
    } else {
      return NextResponse.json({ message: "id not found" }, { status: 404 });
    }
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ message: 'Error fetching product: ' + error.message }, { status: 500 });
  }
};

// Adding the PUT handler
export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    // Connect to the database
    await connectDB();
    const { id } = params;

    if (id) {
      // Parse the request body
      const updatedData = await req.json();

      // Update the product by id
      const updatedProduct = await Product.findByIdAndUpdate(
        id, // Query to find the product by _id
        updatedData, // New data
        { new: true } // Options to return the updated document
      );

      if (!updatedProduct) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
      }

      // Return the updated product data
      return NextResponse.json(updatedProduct, { status: 200 });
    } else {
      return NextResponse.json({ message: "id not found" }, { status: 404 });
    }
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ message: 'Error updating product: ' + error.message }, { status: 500 });
  }
};
