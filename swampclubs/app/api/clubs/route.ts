import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Club from '@/models/Club';

export async function GET(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();
    
    // Get search params (for filtering)
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'all') {
      query = { category };
    }
    
    // Fetch clubs
    const clubs = await Club.find(query).sort({ name: 1 });
    
    // Return the clubs data
    return NextResponse.json({ clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clubs' },
      { status: 500 }
    );
  }
}