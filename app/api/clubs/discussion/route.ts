import { NextResponse } from "next/server"

// This will be the same board for all clubs
const discussionBoard = {
  _id: "12345", // Example static board ID
  name: "General Discussion",
  description: "A discussion board for all clubs",
  createdBy: "Admin",
}

let messages = [
  {
    _id: "msg1",
    content: "Welcome to the General Discussion Board!",
    author: { name: "Admin", email: "admin@example.com" },
    createdAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json({ board: discussionBoard, messages })
}

export async function POST(request: Request) {
  const { content } = await request.json()
  const newMessage = {
    _id: `msg${messages.length + 1}`,
    content,
    author: { name: "User", email: "user@example.com" },
    createdAt: new Date().toISOString(),
  }
  messages = [newMessage, ...messages]
  return NextResponse.json(newMessage, { status: 201 })
}
