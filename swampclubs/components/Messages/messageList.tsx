"use client";

import { useEffect, useState } from "react";

type Message = {
  _id: string;
  user: string;
  text: string;
  timestamp: string;
};

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 2000); // polling every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-72 overflow-y-auto bg-white border rounded p-4 mb-4">
      {messages.map((msg) => (
        <div key={msg._id} className="mb-2">
          <div className="font-semibold text-sm text-gray-700">{msg.user}</div>
          <div className="bg-gray-100 rounded-md p-2 text-sm">{msg.text}</div>
        </div>
      ))}
    </div>
  );
}
