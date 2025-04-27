"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Calendar, 
  MessageSquare, 
  Search, 
  Users,
  Bell, 
  LogOut, 
  ChevronRight,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("Gator")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for clubs and events
  const myClubs = [
    {
      id: 1,
      name: "UF SASE",
      category: "Social",
      unreadMessages: 5,
      members: 1000,
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "Engineers Without Borders",
      category: "Academic",
      unreadMessages: 0,
      members: 587,
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Running Club",
      category: "Social",
      unreadMessages: 12,
      members: 437,
      lastActive: "5 min ago",
    },
  ]

  const popularClubs = [
    {
      id: 4,
      name: "Gator Gaming",
      category: "Social",
      members: 842,
      description: "For all gamers at UF. We host tournaments, game nights, and discussions.",
    },
    {
      id: 5,
      name: "Environmental Action Group",
      category: "Social",
      members: 548,
      description: "Advocating for sustainability initiatives on campus and beyond.",
    },
    {
      id: 6,
      name: "Business Leadership Association",
      category: "Academic",
      members: 723,
      description: "Networking and professional development for business students.",
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "SASE General Body Meeting",
      club: "UF SASE",
      date: "April 17, 2025",
      time: "6:30 PM - 8:00 PM",
      location: "Reitz Union, Room 2355",
      attending: true,
    },
    {
      id: 2,
      title: "Weekly Run Session",
      club: "Running Club",
      date: "April 18, 2025",
      time: "5:00 PM - 6:00 PM",
      location: "Plaza of the Americas",
      attending: false,
    },
    {
      id: 3,
      title: "Project Planning Meeting",
      club: "Engineers Without Borders",
      date: "April 20, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Herbert Wertheim Lab, Room 230",
      attending: true,
    },
  ]

  useEffect(() => {
    // Simulate fetching user data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Use setUserName 
      setUserName("Gator User"); 
      
      // Show welcome toast
      toast("Welcome to your dashboard!", {
        description: "You've successfully accessed the SwampClubs dashboard.",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token')
    
    toast("Logged out", {
      description: "You have been successfully logged out.",
    })
    
    // Redirect to home page
    window.location.href = "/"
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleToggleAttending = (eventId) => {
    // This would be an API call in a real app
    console.log(`Toggle attending for event ${eventId}`)
  }

  const filteredClubs = popularClubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="size-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white">
              SC
            </div>
            <span>SwampClubs</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-6">
              <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
              <Link href="/clubs" className="text-sm font-medium text-muted-foreground hover:text-foreground">Explore</Link>
              <Link href="/calendar" className="text-sm font-medium text-muted-foreground hover:text-foreground">Calendar</Link>
              <Link href="/messages" className="text-sm font-medium text-muted-foreground hover:text-foreground">Messages</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute top-0 right-0 size-2 bg-orange-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">
                {userName.charAt(0)}
              </div>
              <span className="text-sm font-medium hidden md:inline-block">
                {userName}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="size-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
      

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-500/90 to-orange-600 text-white rounded-xl p-6">
            <div className="font-bold text-xl mb-1">Welcome back, {userName}!</div>
            <p className="text-white/90 mb-4">Track your clubs, events, and connect with fellow Gators.</p>
            <div className="flex gap-2">
              <div className="rounded-lg bg-white/10 p-3 text-center flex-1">
                <div className="font-bold text-2xl">{myClubs.length}</div>
                <div className="text-xs text-white/80">My Clubs</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center flex-1">
                <div className="font-bold text-2xl">{upcomingEvents.filter(e => e.attending).length}</div>
                <div className="text-xs text-white/80">Events</div>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-center flex-1">
                <div className="font-bold text-2xl">17</div>
                <div className="text-xs text-white/80">New Messages</div>
              </div>
            </div>
          </div>

          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/clubs">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted text-center">
                  <div className="size-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Search className="size-5" />
                  </div>
                  <div className="text-sm font-medium">Find Clubs</div>
                </div>
              </Link>
              <Link href="/messages">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted text-center">
                  <div className="size-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <MessageSquare className="size-5" />
                  </div>
                  <div className="text-sm font-medium">Club Chats</div>
                </div>
              </Link>
              <Link href="/calendar">
                <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-muted text-center">
                  <div className="size-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                    <Calendar className="size-5" />
                  </div>
                  <div className="text-sm font-medium">Calendar</div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-6">
            <Tabs defaultValue="my-clubs">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="rounded-full">
                  <TabsTrigger value="my-clubs" className="rounded-full">My Clubs</TabsTrigger>
                  <TabsTrigger value="find-clubs" className="rounded-full">Find Clubs</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="my-clubs" className="space-y-4 animate-in">
                {myClubs.length === 0 ? (
                  <div className="text-center p-8 border rounded-xl bg-muted/30">
                    <Users className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">You haven&apos;t joined any clubs yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Find and join clubs to connect with fellow Gators
                    </p>
                    <Button className="rounded-full bg-orange-500 hover:bg-orange-600">
                      Find Clubs
                    </Button>
                  </div>
                ) : (
                  myClubs.map(club => (
                    <Link href={`/clubs/${club.id}`} key={club.id}>
                      <Card className="hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="size-12 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-white font-medium">
                              {club.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium flex items-center gap-2">
                                {club.name}
                                {club.unreadMessages > 0 && (
                                  <Badge className="rounded-full bg-orange-500 text-white text-xs">
                                    {club.unreadMessages} new
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <Users className="size-3" /> {club.members} members • {club.lastActive}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="find-clubs" className="space-y-4 animate-in">
                <div className="mb-4">
                  <Input
                    placeholder="Search clubs by name, category, or description..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="rounded-full"
                  />
                </div>
                
                {filteredClubs.length === 0 ? (
                  <div className="text-center p-8 border rounded-xl bg-muted/30">
                    <Search className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">No clubs found</h3>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : (
                  filteredClubs.map(club => (
                    <Card key={club.id} className="hover:shadow-md transition-all">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-lg">{club.name}</div>
                          <Badge variant="outline" className="text-xs">
                            {club.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {club.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Users className="size-4 mr-1" /> {club.members} members
                          </div>
                          <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white">
                            Join Club
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
                
                <div className="text-center mt-6">
                  <Link href="/clubs/explore">
                  <Link href="/clubs">
                    <Button variant="outline" className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950">
                      Find Clubs
                    </Button>
                  </Link>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-5">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Upcoming Events
                  <Link href="/calendar">
                    <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600 hover:bg-orange-500/10">
                      View Calendar
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>Events from clubs you&apos;ve joined</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center p-6 bg-muted/30 rounded-lg">
                    <Calendar className="size-8 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">No upcoming events</h3>
                    <p className="text-sm text-muted-foreground">
                      Join clubs to see their upcoming events
                    </p>
                  </div>
                ) : (
                  upcomingEvents.map(event => (
                    <div key={event.id} className="flex gap-4 p-4 rounded-lg hover:bg-muted/50">
                      <div className="flex-shrink-0 flex flex-col items-center justify-center rounded-lg bg-muted p-2 w-14 text-center">
                        <div className="text-xs text-muted-foreground">
                          {event.date.split(", ")[0].split(" ")[0]}
                        </div>
                        <div className="font-bold text-lg">
                          {event.date.split(", ")[0].split(" ")[1]}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{event.title}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {event.club} • {event.time} • {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={event.attending ? "default" : "outline"} 
                            size="sm" 
                            className={`rounded-full text-xs px-3 ${event.attending ? 'bg-green-500 hover:bg-green-600' : ''}`}
                            onClick={() => handleToggleAttending(event.id)}
                          >
                            {event.attending ? (
                              <>
                                <CheckCircle2 className="mr-1 size-3" />
                                Attending
                              </>
                            ) : "RSVP"}
                          </Button>
                          <Link href={`/events/${event.id}`}>
                            <Button variant="ghost" size="sm" className="rounded-full text-xs px-3">
                              Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full" variant="outline">
                  Add to Calendar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}