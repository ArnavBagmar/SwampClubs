import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Channel from './channel.model';
import { getServerSession } from 'next-auth';

export async function GET(
  request: Request,
  { params }: { params: { clubId: string } }
) {
  try {
    await connectToDatabase();
    const channels = await Channel.find({ clubId: params.clubId });
    return NextResponse.json(channels);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
  }
}

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