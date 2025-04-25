"use client"

import { useState, useEffect } from "react"
import MessageList from "./messageList"
import MessageForm from "./messageForm"
import { Message } from "@/app/types/messages"

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([])

  // Polling every 2 seconds
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages")
      const data = await res.json()
      setMessages(data)
    }

    fetchMessages()
    const interval = setInterval(fetchMessages, 2000) // poll every 2s
    return () => clearInterval(interval)
  }, [])

  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message])
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg p-4 bg-white shadow">
      <div className="overflow-y-auto flex-1 mb-4">
        <MessageList messages={messages} />
      </div>
      <MessageForm onNewMessage={handleNewMessage} />
    </div>
  )
}
