import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from './message.model';
import { getServerSession } from 'next-auth';

export async function GET(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    await connectToDatabase();
    const messages = await Message.find({ channelId: params.channelId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, attachments } = await request.json();
    await connectToDatabase();
    
    const message = await Message.create({
      content,
      channelId: params.channelId,
      createdBy: session.user?.email || null
    });

    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}