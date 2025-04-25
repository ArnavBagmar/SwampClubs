import { useState } from "react";
import { Message } from "@/app/types/messages";

interface MessageFormProps {
  onNewMessage: (message: Message) => void;
}

export default function MessageForm({ onNewMessage }: MessageFormProps) {
  const [text, setText] = useState("");
  const [user, setUser] = useState("Anonymous");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        text,
        timestamp: new Date().toISOString(),
      }),
    });

    const savedMessage = await res.json(); // Get Mongo-inserted message
    onNewMessage(savedMessage);            // Add it to local state
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Your name"
        className="border px-2 py-1 rounded w-1/4"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type your message"
        className="border px-2 py-1 rounded w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  );
}
