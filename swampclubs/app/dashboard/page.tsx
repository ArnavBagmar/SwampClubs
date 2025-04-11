"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token')
    
    if (!token) {
      // If no token is found, redirect to login
      toast("Authentication required", {
        description: "Please log in to access the dashboard.",
        style: { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" },
      })
      router.push('/login')
      return
    }
    
    // If authenticated, show welcome message
    setIsLoading(false)
    
    // You might want to fetch user data here in a real app
    // For now we'll just show a welcome toast
    toast("Welcome to your dashboard!", {
      description: "You've successfully accessed the SwampClubs dashboard.",
    })
    
    // You could get user info from the token or fetch it from an API
    try {
      // This is a placeholder - in a real app, you'd decode the token or fetch user data
      setUserName("Gator")
    } catch (error) {
      console.error("Error getting user data")
    }
  }, [router])

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token')
    
    toast("Logged out", {
      description: "You have been successfully logged out.",
    })
    
    // Redirect to home page
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
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
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Welcome, {userName}
            </span>
            <Button variant="ghost" onClick={handleLogout} className="hover:text-orange-500">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">Welcome to SwampClubs</h2>
            <p className="text-muted-foreground mb-4">
              This is a placeholder dashboard. In a real application, you would see your club activities, events, and connections with other Gators here.
            </p>
            <Link href="/">
              <Button variant="outline" className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950">
                Return to Home
              </Button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground mb-4">
              You have no upcoming events. Join some club chats to stay updated on campus activities!
            </p>
            <Link href="/clubs">
              <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950">
                Explore Clubs
              </Button>
            </Link>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">My Clubs</h2>
            <p className="text-muted-foreground mb-4">
              You haven't joined any clubs yet. Discover and connect with UF organizations that match your interests.
            </p>
            <Link href="/clubs/discover">
              <Button variant="outline" className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950">
                Find Clubs
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}