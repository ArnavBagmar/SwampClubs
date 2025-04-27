// /api/channel/channel.route.ts

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Channel from './channel.model';
import { getServerSession } from 'next-auth';

// Fetch the single channel by clubId (one channel per club)
export async function GET(
  request: Request,
  { params }: { params: { clubId: string } }
) {
  try {
    await connectToDatabase();
    const channel = await Channel.findOne({ clubId: params.clubId });

    if (!channel) {
      return NextResponse.json({ error: 'Channel not found for this club' }, { status: 404 });
    }

    return NextResponse.json(channel);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch channel' }, { status: 500 });
  }
}

// Create a new channel for a club (although this will be done only once per club)
export async function POST(
  request: Request,
  { params }: { params: { clubId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, isPrivate } = await request.json();
    await connectToDatabase();
    
    const existingChannel = await Channel.findOne({ clubId: params.clubId });

    if (existingChannel) {
      return NextResponse.json({ error: 'Channel already exists for this club' }, { status: 400 });
    }

    const channel = await Channel.create({
      name,
      description,
      isPrivate,
      clubId: params.clubId,
      createdBy: session.user?.email || null
    });

    return NextResponse.json(channel);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create channel' }, { status: 500 });
  }
}
