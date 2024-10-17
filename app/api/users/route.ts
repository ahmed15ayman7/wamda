import { NextResponse } from 'next/server';
import User from '@/lib/models/user.models';
import { connectDB } from '@/mongoose';

export const GET = async (req: Request) => {
  try {
    // Connect to the database
    await connectDB();

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1'; // Default to page 1 if not provided
    const limit = searchParams.get('limit') || '10'; // Default to limit 10 if not provided
    const search = searchParams.get('search') || ''; // Default to empty string if no search query is provided
    const role = searchParams.get('role'); // Get the role from the query, if provided

    // Convert page and limit to numbers
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Create search filter (search by name or email using case-insensitive regex)
    let searchFilter: any = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    // Add role filter if role parameter is provided
    if (role) {
      searchFilter = { ...searchFilter, role };
    }

    const users = await User.find(searchFilter)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    
    const totalUsers = await User.countDocuments(searchFilter);

    return NextResponse.json({
      users,
      totalUsers,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalUsers / limitNumber),
    });
  } catch (error) {
    
    return NextResponse.json({ message: 'Error fetching users: ' + error }, { status: 500 });
  }
};
