"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Club {
  _id: string;
  name: string;
  category: string;
  description?: string;
  members?: number;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/clubs${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        
        const data = await response.json();
        setClubs(data.clubs);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClubs();
  }, [selectedCategory]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/dashboard">
              <div className="size-8 rounded-lg bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center text-primary-foreground">
                SC
              </div>
            </Link>
            <Link href="/dashboard">
              <span>SwampClubs</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="hover:text-orange-500">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Explore All UF Clubs</h1>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Discover organizations and clubs that match your interests and passions
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="all" className="w-full" onValueChange={handleCategoryChange}>
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="all" className="rounded-full px-6">
                  All
                </TabsTrigger>
                <TabsTrigger value="Academic" className="rounded-full px-6">
                  Academic
                </TabsTrigger>
                <TabsTrigger value="Cultural" className="rounded-full px-6">
                  Cultural
                </TabsTrigger>
                <TabsTrigger value="Social" className="rounded-full px-6">
                  Social
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              {renderClubGrid(clubs, isLoading)}
            </TabsContent>
            <TabsContent value="Academic">
              {renderClubGrid(clubs, isLoading)}
            </TabsContent>
            <TabsContent value="Cultural">
              {renderClubGrid(clubs, isLoading)}
            </TabsContent>
            <TabsContent value="Social">
              {renderClubGrid(clubs, isLoading)}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function renderClubGrid(clubs: Club[], isLoading: boolean) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading clubs...</p>
        </div>
      </div>
    );
  }
  
  if (clubs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No clubs found in this category.</p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club) => (
        <Card key={club._id} className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{club.name}</h3>
              <Badge variant="outline" className="text-xs">
                {club.category}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-4 flex-grow">{club.description}</p>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/40">
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="size-4 mr-1" />
                <span>{club.members} members</span>
              </div>
              <Link href={`/clubs/discussion`}>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
              >
                Join Chat
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}