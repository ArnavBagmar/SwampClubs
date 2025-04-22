"use client"

import { useState, useEffect } from "react"
import MessageList from "./messageList"
import MessageForm from "./messageForm"

interface Message {
  _id: string
  content: string
  sender: string
  timestamp: string
}

export default function MessageBoard() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(data => setMessages(data))
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
