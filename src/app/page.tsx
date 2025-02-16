'use client'

import { NavBar } from "@/components/NavBar"
import { HeroSection } from "@/components/HeroSection"
import { ContentSection } from "@/components/ContentSection"
import { ProcessSection } from "@/components/ProcessSection"
import { WhyChooseSection } from "@/components/WhyChooseSection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <ContentSection />
      <div className="bg-black">
        <ProcessSection />
        <WhyChooseSection />
      </div>
      <Footer />
    </main>
  )
}
