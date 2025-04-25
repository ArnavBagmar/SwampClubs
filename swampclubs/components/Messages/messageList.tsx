import { Message } from "@/app/types/messages"

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={message._id || index} className="p-3 border rounded-lg bg-gray-50">
          <div className="text-sm font-semibold">{message.user}</div>
          <div className="text-base">{message.text}</div>
          <div className="text-xs text-gray-500">{message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : "Invalid date"}</div>
        </div>
      ))}
    </div>
  );
}
