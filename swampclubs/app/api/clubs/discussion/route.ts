import { NextApiRequest, NextApiResponse } from "next"

// This will be the same board for all clubs
let discussionBoard = {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json({ board: discussionBoard, messages })
  }

  if (req.method === "POST") {
    const { content } = req.body
    const newMessage = {
      _id: `msg${messages.length + 1}`,
      content,
      author: { name: "User", email: "user@example.com" },
      createdAt: new Date().toISOString(),
    }
    messages = [newMessage, ...messages]
    return res.status(201).json(newMessage)
  }

  res.status(405).json({ message: "Method not allowed" })
}
