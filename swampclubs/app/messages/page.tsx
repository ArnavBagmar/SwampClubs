"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function DiscussionBoardPage({ clubId }: { clubId: string }) {
  const [channels, setChannels] = useState([])
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [newChannelName, setNewChannelName] = useState("")
  const [newChannelDescription, setNewChannelDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  // Fetch channels when the clubId is available
  useEffect(() => {
    fetch(`/api/channels/${clubId}`)
      .then(res => res.json())
      .then(data => setChannels(data))
      .catch(() => toast("Failed to fetch channels"))
  }, [clubId])

  // Fetch messages when a channel is selected
  useEffect(() => {
    if (selectedChannelId) {
      fetch(`/api/channels/${clubId}/message/${selectedChannelId}`)
        .then(res => res.json())
        .then(data => setMessages(data.reverse()))
        .catch(() => toast("Failed to fetch messages"))
    }
  }, [selectedChannelId, clubId])

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChannelId) return

    const res = await fetch(`/api/channels/${clubId}/message/${selectedChannelId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newMessage }),
    })

    if (res.ok) {
      const newMsg = await res.json()
      setMessages(prev => [...prev, newMsg])
      setNewMessage("")
    } else {
      toast("Failed to send message")
    }
  }

  // Handle creating a new channel
  const handleCreateChannel = async () => {
    if (!newChannelName.trim()) {
      toast("Channel name is required")
      return
    }

    const res = await fetch(`/api/channels/${clubId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newChannelName,
        description: newChannelDescription,
        isPrivate,
      }),
    })

    if (res.ok) {
      const newChannel = await res.json()
      setChannels(prev => [...prev, newChannel])
      setNewChannelName("")
      setNewChannelDescription("")
      setIsPrivate(false)
      toast("Channel created successfully")
    } else {
      toast("Failed to create channel")
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Discussion Board</h1>

      {/* Channel creation form */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Create New Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="Channel Name"
            className="mb-2"
          />
          <Input
            value={newChannelDescription}
            onChange={(e) => setNewChannelDescription(e.target.value)}
            placeholder="Channel Description"
            className="mb-2"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
              id="isPrivate"
              className="mr-2"
            />
            <label htmlFor="isPrivate">Private Channel</label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCreateChannel}>Create Channel</Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="channels" className="flex flex-col md:flex-row gap-4">
        <TabsList className="md:flex-col w-full md:w-1/4">
          {channels.map(channel => (
            <TabsTrigger
              key={channel._id}
              value={channel._id}
              onClick={() => setSelectedChannelId(channel._id)}
              className="text-left whitespace-normal"
            >
              <div>
                <p className="font-semibold">{channel.name}</p>
                <p className="text-xs text-muted-foreground">{channel.description}</p>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="w-full md:w-3/4">
          {selectedChannelId ? (
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {messages.map(msg => (
                      <div key={msg._id} className="p-2 border rounded-md">
                        <p className="text-sm text-muted-foreground">{msg.author?.name || "Unknown"}</p>
                        <p>{msg.content}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow"
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </CardFooter>
            </Card>
          ) : (
            <p className="text-muted-foreground">Select a channel to view messages.</p>
          )}
        </div>
      </Tabs>
    </div>
  )
}
