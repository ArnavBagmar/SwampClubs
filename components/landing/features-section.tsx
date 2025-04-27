"use client"

import { motion } from "framer-motion"
import { MessageSquare, Search, Calendar, Bell, Users, Compass } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Club Groupchats",
      description: "Join dedicated chat spaces for all UF clubs and organizations.",
      icon: <MessageSquare className="size-5" />,
    },
    {
      title: "Event Discovery",
      description: "Find and RSVP to upcoming club events, meetings, and activities.",
      icon: <Calendar className="size-5" />,
    },
    {
      title: "Club Directory",
      description: "Browse a comprehensive list of all official UF clubs and organizations.",
      icon: <Compass className="size-5" />,
    },
    {
      title: "Notifications",
      description: "Receive updates about club announcements and upcoming events.",
      icon: <Bell className="size-5" />,
    },
    {
      title: "Club Search",
      description: "Find clubs that match your interests with our powerful search feature.",
      icon: <Search className="size-5" />,
    },
    {
      title: "Student Networking",
      description: "Connect with like-minded Gators who share your interests and passions.",
      icon: <Users className="size-5" />,
    },
  ]

  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need to Get Involved</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            SwampClubs provides all the tools Gators need to discover, connect with, and participate in UF clubs and
            organizations.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center text-orange-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

