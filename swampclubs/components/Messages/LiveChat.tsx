"use client"

import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:5000")

export default function LiveChat() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    socket.on("receive-message", (msg: string) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      socket.off("receive-message")
    }
  }, [])

  const sendMessage = () => {
    if (input.trim() !== "") {
      socket.emit("send-message", input)
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-96 border rounded-lg p-4 bg-card">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-gray-100 rounded">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-1 rounded">
          Send
        </button>
      </div>
    </div>
  )
}
