import Category from '@/lib/models/category.models';
import Product from '@/lib/models/product.models';
import { connectDB } from '@/mongoose';
import { NextResponse } from 'next/server';

import { URL } from 'url';

export async function GET(request: Request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    const page = searchParams.get('page') || '1';
    const pageSize = searchParams.get('pageSize') || '10';
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const unit = searchParams.get('unit') || '';
    const unitCost = searchParams.get('unitCost') || '';
    const salePrice = searchParams.get('salePrice') || '';
    const wholesale1 = searchParams.get('wholesale1') || '';
    const wholesale2 = searchParams.get('wholesale2') || '';
    const exhibitSalePrice = searchParams.get('exhibitSalePrice') || '';
    const websiteSalePrice = searchParams.get('websiteSalePrice') || '';
    const purchasePrice = searchParams.get('purchasePrice') || '';
    const rating = searchParams.get('rating') || '';
    const barcode = searchParams.get('barcode') || ''; // New barcode filter

    // Creating filter object for MongoDB query
    const filters: Record<string, any> = {};

    if (category) filters.category = category;
    if (unit) filters.unit = unit;
    if (barcode) filters.barcode = barcode; // Add barcode filter
    if (unitCost) filters.unitCost = { $gte: parseFloat(unitCost) };
    if (salePrice) filters.salePrice = { $gte: parseFloat(salePrice) };
    if (wholesale1) filters.wholesale1 = { $gte: parseFloat(wholesale1) };
    if (wholesale2) filters.wholesale2 = { $gte: parseFloat(wholesale2) };
    if (exhibitSalePrice) filters.exhibitSalePrice = { $gte: parseFloat(exhibitSalePrice) };
    if (websiteSalePrice) filters.websiteSalePrice = { $gte: parseFloat(websiteSalePrice) };
    if (purchasePrice) filters.purchasePrice = { $gte: parseFloat(purchasePrice) };
    if (rating) filters.rating = { $gte: parseFloat(rating) };

    // If search term is provided, add it to filter
    if (search) {
      filters.$or = [
        { itemName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const limit = parseInt(pageSize);
    const skip = (parseInt(page) - 1) * limit;
    console.log("kjhjklkjhjkl😀",limit,skip,filters)
    // Fetching products with filters, pagination
    const products = await Product.find(filters).skip(skip).limit(1).lean();
    console.log("kjhjklkjhjkl😀",products)
    // Counting total products for pagination
    const totalProducts = await Product.countDocuments(filters);

    return NextResponse.json({
      products,
      totalProducts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    const newProduct = new Product(body);
    const savedProduct = await newProduct.save();
    
    
    if (body.category) {
      
      const categoryId = body.category; // التأكد من أنك ترسل categoryId مع البيانات
      const category = await Category.findById(categoryId);
      
      if (!category) {
        return NextResponse.json({ message: 'Category not found' }, { status: 404 });
      }
      
      // إضافة معرف المنتج إلى قائمة المنتجات في الفئة
      category.products.push(savedProduct._id);
      await category.save();
    }

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product', error }, { status: 500 });
  }
}
