import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
      const { name, email, password } = await request.json();
      console.log(`Attempting to create user with email: ${email}`);
      
      // Connect to the database
      await connectToDatabase();
      console.log('Connected to database');
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log(`User with email ${email} already exists`);
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }
      
      // Create new user
      const user = await User.create({
        name,
        email,
        password,
      });
      console.log(`User created successfully with ID: ${user._id}`);
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '7d' }
      );
      
      // Return success response with token and user info
      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }
  }