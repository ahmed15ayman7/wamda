import Category from '@/lib/models/category.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';



// GET: الحصول على فئة معينة حسب المعرف
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectDB()
    const category = await Category.findById(id).populate('products').lean();
    if (!category) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
} catch (error) {
    return NextResponse.json({ message: 'Error fetching category', error }, { status: 500 });
}
}

// PUT: تعديل فئة معينة حسب المعرف
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    
    try {
      await connectDB()
      const category = await Category.findByIdAndUpdate(id, body, { new: true });
      if (!category) {
          return NextResponse.json({ message: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating category', error }, { status: 500 });
    }
}

// DELETE: حذف فئة معينة حسب المعرف
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        await connectDB()
        const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting category', error }, { status: 500 });
  }
}
