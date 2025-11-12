"use client"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { BackgroundDecor } from "@/components/background-decor"
import { ScrollProgress } from "@/components/scroll-progress"
import { ThemeProvider } from "@/app/theme-provider"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BackgroundDecor />
        <ScrollProgress />
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </ThemeProvider>
    </main>
  )
}
