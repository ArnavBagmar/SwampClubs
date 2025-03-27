"use client"

import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { CollegesSection } from "@/components/landing/colleges-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { PopularClubsSection } from "@/components/landing/popular-clubs-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CollegesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PopularClubsSection />
        <CtaSection />
      </main>
    </div>
  )
}

