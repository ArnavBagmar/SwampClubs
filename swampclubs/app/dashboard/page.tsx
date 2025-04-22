"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import MessageList from "@/components/Messages/messageList"
import MessageForm from "@/components/Messages/messageForm"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    toast("Welcome to your dashboard!", {
      description: "This is a placeholder dashboard page after successful authentication.",
    })
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white">
              SC
            </div>
            <span>SwampClubs</span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="hover:text-orange-500">
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Cards */}
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">Welcome to SwampClubs</h2>
            <p className="text-muted-foreground mb-4">
              This is a placeholder dashboard. In a real application, you would see your club activities, events, and connections with other Gators here.
            </p>
            <Button variant="outline" onClick={() => router.push("/")} className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950">
              Return to Home
            </Button>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground mb-4">
              You have no upcoming events. Join some club chats to stay updated on campus activities!
            </p>
            <Button variant="outline" onClick={() => router.push("/")} className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950">
              Explore Clubs
            </Button>
          </div>

          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">My Clubs</h2>
            <p className="text-muted-foreground mb-4">
              You haven't joined any clubs yet. Discover and connect with UF organizations that match your interests.
            </p>
            <Button variant="outline" onClick={() => router.push("/")} className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950">
              Find Clubs
            </Button>
          </div>
        </div>

        {/* Discussion Board */}
        <div className="border rounded-lg p-6 mt-12 bg-card col-span-full">
          <h2 className="text-xl font-semibold mb-4">Discussion Board</h2>
          <div className="h-[400px] overflow-y-auto flex flex-col space-y-2 mb-4 p-2 bg-white rounded-md border">
            <MessageList messages={[]} />
          </div>
          <MessageForm onNewMessage={(msg) => console.log("New message:", msg)} />
        </div>
      </main>
    </div>
  )
}
