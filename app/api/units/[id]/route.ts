import Unit from '@/lib/models/unit.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';




// GET: الحصول على فئة معينة حسب المعرف
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectDB()
    const unit = await Unit.findById(id)
    if (!unit) {
        return NextResponse.json({ message: 'Unit not found' }, { status: 404 });
    }
    return NextResponse.json(unit);
} catch (error) {
    return NextResponse.json({ message: 'Error fetching unit', error }, { status: 500 });
}
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  try {
      await connectDB();
      const unit = await Unit.findByIdAndUpdate(id, body, { new: true });
      if (!unit) {
          return NextResponse.json({ message: 'Unit not found' }, { status: 404 });
      }
      return NextResponse.json(unit);
  } catch (error) {
      return NextResponse.json({ message: 'Error updating unit', error }, { status: 500 });
  }
}


// DELETE: حذف فئة معينة حسب المعرف
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        await connectDB()
        const unit = await Unit.findByIdAndDelete(id);
    if (!unit) {
      return NextResponse.json({ message: 'Unit not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Unit deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting unit', error }, { status: 500 });
  }
}
