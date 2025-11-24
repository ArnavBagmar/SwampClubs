// /api/channel/message.route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/models/message.model';
import { getAuthUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  try {
    await connectToDatabase();
    const messages = await Message.find({ channelId: params.channelId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { channelId: string } }
) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content } = await request.json();
    await connectToDatabase();
    
    const message = await Message.create({
      content,
      channelId: params.channelId,
      createdBy: user.userId
    });

    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}