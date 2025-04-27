"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PopularClubsSection() {
  const [clubs, setClubs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/clubs${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch clubs')
        }
        
        const data = await response.json()
        setClubs(data.clubs || [])
      } catch (error) {
        console.error('Error fetching clubs:', error)
        setClubs([])
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchClubs()
  }, [selectedCategory])

  const getClubsByCategory = (category) => {
    if (category === "all") {
      return clubs.slice(0, 6)
    }
    
    return clubs
      .filter(club => club.category.toLowerCase() === category.toLowerCase())
      .slice(0, 6)
  }
  
  const renderClubGrid = (category) => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse">Loading clubs...</div>
        </div>
      )
    }
    
    const clubsToShow = getClubsByCategory(category)
    
    if (clubsToShow.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clubs found in this category.</p>
        </div>
      )
    }
    
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubsToShow.map((club, i) => (
          <motion.div
            key={club.id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                  >
                    Join Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section id="popular-clubs" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Popular Clubs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trending UF Organizations</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Discover some of the most active clubs and organizations on campus right now.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
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
            <TabsContent value="all">{renderClubGrid("all")}</TabsContent>
            <TabsContent value="Academic">{renderClubGrid("Academic")}</TabsContent>
            <TabsContent value="Cultural">{renderClubGrid("Cultural")}</TabsContent>
            <TabsContent value="Social">{renderClubGrid("Social")}</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}