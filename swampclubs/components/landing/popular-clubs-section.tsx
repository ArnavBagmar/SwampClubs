"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PopularClubsSection() {
  const clubsByCategory = {
    all: [
      {
        name: "UF SASE",
        members: 1000,
        category: "Social",
        description: "Empowers APIDA scientists and engineers through professional development, networking, service.",
      },
      {
        name: "Business Leadership Association",
        members: 723,
        category: "Academic",
        description: "Networking and professional development for business students.",
      },
      {
        name: "Caribbean Student Association",
        members: 615,
        category: "Cultural",
        description: "Celebrating Caribbean culture through events, food, and community.",
      },
      {
        name: "Engineers Without Borders",
        members: 587,
        category: "Academic",
        description: "Designing sustainable solutions for communities in need.",
      },
      {
        name: "Gator Salsa Club",
        members: 563,
        category: "Social",
        description: "Learn Latin dances including salsa, bachata, and merengue.",
      },
      {
        name: "Environmental Action Group",
        members: 548,
        category: "Social",
        description: "Advocating for sustainability initiatives on campus and beyond.",
      },
    ],
    academic: [
      {
        name: "Dream Team Engineering",
        members: 250,
        category: "Academic",
        description: "Designs and implements engineering innovations improving healthcare experiences for patients.",
      },
      {
        name: "Engineers Without Borders",
        members: 587,
        category: "Academic",
        description: "Designing sustainable solutions for communities in need.",
      },
      {
        name: "Pre-Medical AMSA",
        members: 512,
        category: "Academic",
        description: "Resources and support for pre-med students at UF.",
      },
      {
        name: "Psychology Student Association",
        members: 478,
        category: "Academic",
        description: "Academic and career resources for psychology majors.",
      },
      {
        name: "Computer Science Club",
        members: 463,
        category: "Academic",
        description: "Coding workshops, hackathons, and tech industry networking.",
      },
      {
        name: "Future Educators of America",
        members: 389,
        category: "Academic",
        description: "Supporting students pursuing careers in education.",
      },
    ],
    cultural: [
      {
        name: "Caribbean Student Association",
        members: 615,
        category: "Cultural",
        description: "Celebrating Caribbean culture through events, food, and community.",
      },
      {
        name: "Hispanic Student Association",
        members: 528,
        category: "Cultural",
        description: "Promoting Hispanic and Latino culture at UF.",
      },
      {
        name: "Asian American Student Union",
        members: 497,
        category: "Cultural",
        description: "Cultural events and community for Asian American students.",
      },
      {
        name: "African Student Union",
        members: 425,
        category: "Cultural",
        description: "Celebrating the diverse cultures of the African continent.",
      },
      {
        name: "Indian Student Association",
        members: 418,
        category: "Cultural",
        description: "Promoting Indian culture through festivals, food, and performances.",
      },
      {
        name: "French Club",
        members: 312,
        category: "Cultural",
        description: "Practicing French language and exploring French culture.",
      },
    ],
    social: [
      {
        name: "Gator Gaming",
        members: 842,
        category: "Social",
        description: "For all gamers at UF. We host tournaments, game nights, and discussions.",
      },
      {
        name: "Gator Salsa Club",
        members: 563,
        category: "Social",
        description: "Learn Latin dances including salsa, bachata, and merengue.",
      },
      {
        name: "Environmental Action Group",
        members: 548,
        category: "Social",
        description: "Advocating for sustainability initiatives on campus and beyond.",
      },
      {
        name: "Running Club",
        members: 437,
        category: "Social",
        description: "Weekly group runs for all experience levels around campus.",
      },
      {
        name: "Photography Club",
        members: 386,
        category: "Social",
        description: "Improving photography skills through workshops and photo walks.",
      },
      {
        name: "Cooking Club",
        members: 348,
        category: "Social",
        description: "Cooking workshops, recipe exchanges, and food-related events.",
      },
    ],
  }

  const renderClubGrid = (category: "all" | "academic" | "cultural" | "social") => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clubsByCategory[category].map((club, i) => (
        <motion.div
          key={i}
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
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="all" className="rounded-full px-6">
                  All
                </TabsTrigger>
                <TabsTrigger value="academic" className="rounded-full px-6">
                  Academic
                </TabsTrigger>
                <TabsTrigger value="cultural" className="rounded-full px-6">
                  Cultural
                </TabsTrigger>
                <TabsTrigger value="social" className="rounded-full px-6">
                  Social
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">{renderClubGrid("all")}</TabsContent>
            <TabsContent value="academic">{renderClubGrid("academic")}</TabsContent>
            <TabsContent value="cultural">{renderClubGrid("cultural")}</TabsContent>
            <TabsContent value="social">{renderClubGrid("social")}</TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

