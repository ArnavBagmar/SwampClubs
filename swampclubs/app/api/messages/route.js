import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("swampclubs");
  const messages = await db.collection("messages").find().sort({ timestamp: 1 }).toArray();
  return NextResponse.json(messages);
}

export async function POST(req) {
  const { user, text } = await req.json();

  if (!user || !text) {
    return NextResponse.json({ message: "Missing user or text" }, { status: 400 });
  }

  const newMessage = {
    user,
    text,
    timestamp: new Date(),
  };

  const client = await clientPromise;
  const db = client.db("swampclubs");
  const result = await db.collection("messages").insertOne(newMessage);

  return NextResponse.json(result);
}
