"use client"

import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import { useSocialLinks } from "@/lib/hooks"
import { SectionBackground } from "@/components/section-background"

// Icon mapping
const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  mail: Mail,
}

export function Hero() {
  const { links } = useSocialLinks()

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionBackground variant="grid" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        <div className="mb-8 inline-block animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="px-6 py-2.5 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20 backdrop-blur-sm">
            <p className="text-sm font-medium bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              who am I ?
            </p>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Software Engineer &{" "}
          <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Creative Developer
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          I craft elegant, performant digital experiences. Specializing in full-stack development with a passion for
          intuitive interfaces, and scalable solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-accent to-primary text-accent-foreground rounded-lg font-semibold hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            className="group px-8 py-3.5 border-2 border-border text-foreground rounded-lg font-semibold hover:bg-secondary hover:border-accent/50 transition-all duration-300 flex items-center justify-center gap-2"
            aria-label="Download CV"
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            Download CV
          </button>
        </div>

        {/* Social Links */}
        {links && links.length > 0 && (
          <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            {links.map((link) => {
              const Icon = iconMap[link.platform.toLowerCase()] || Github
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3.5 bg-card border border-border rounded-full text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                  aria-label={`Visit my ${link.platform} profile`}
                >
                  <Icon className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 rounded-full bg-accent/10 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </a>
              )
            })}
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="mt-20 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            aria-label="Scroll to about section"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground group-hover:border-accent rounded-full flex items-start justify-center p-2 transition-colors">
              <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce"></div>
            </div>
            <span className="text-xs font-medium">Scroll</span>
          </a>
        </div>
      </div>
    </section>
  )
}
