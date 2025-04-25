"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, MessageSquare, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  _id: string
  content: string
  author: {
    name: string
    email: string
  }
  createdAt: string
}

interface Board {
  _id: string
  name: string
  description: string
  createdBy: string
}

export default function DiscussionBoard() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [board, setBoard] = useState<Board | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the same board for all clubs
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`/api/clubs/discussion`)
        if (!response.ok) throw new Error("Failed to fetch board")
        const data = await response.json()
        setBoard(data.board)
        setMessages(data.messages)
      } catch (error) {
        toast.error("Error loading board")
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBoard()
  }, [])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !board) return

    try {
      const response = await fetch(`/api/clubs/discussion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      })

      if (!response.ok) throw new Error("Failed to send message")

      const sentMessage = await response.json()
      setMessages([sentMessage, ...messages])
      setNewMessage("")
    } catch (error) {
      toast.error("Error sending message")
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading discussion board...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="size-5" />
            </Button>
            <div className="flex items-center gap-2 font-bold">
              <span>Discussion Board for {board?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="grid h-[calc(100vh-7rem)]">
          <div className="flex flex-col">
            {board ? (
              <>
                <div className="flex items-center justify-between mb-4 p-2 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">#{board.name}</h2>
                    {board.description && (
                      <span className="text-sm text-muted-foreground">
                        {board.description}
                      </span>
                    )}
                  </div>
                </div>

                <ScrollArea className="flex-1 mb-4 pr-2">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <MessageSquare className="size-8 mb-2" />
                        <p>No messages yet</p>
                        <p className="text-sm">Be the first to send a message!</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message._id} className="flex gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {message.author.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(message.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>

                <div className="mt-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                  >
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Message #${board.name}`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={!newMessage.trim()}>
                        <Send className="size-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="size-8 mb-2" />
                <p>No board available</p>
                <p className="text-sm">
                  There was an error loading the board for this club.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
