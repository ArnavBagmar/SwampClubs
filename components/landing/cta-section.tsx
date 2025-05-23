"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-orange-500 to-blue-600 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Ready to Connect with UF Clubs?</h2>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
            Join thousands of Gators who are discovering clubs, making friends, and getting more involved on campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
                Join with Email
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

