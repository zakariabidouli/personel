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

function DeveloperIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <svg
        viewBox="0 0 800 600"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Desk */}
        <rect x="200" y="400" width="400" height="15" fill="currentColor" className="text-accent/40" />
        
        {/* Monitor */}
        <rect x="280" y="250" width="240" height="160" rx="8" fill="currentColor" className="text-primary/30" />
        <rect x="290" y="260" width="220" height="130" fill="currentColor" className="text-background" />
        
        {/* Code lines on screen - animated */}
        <g className="animate-pulse">
          <rect x="300" y="275" width="80" height="4" fill="currentColor" className="text-accent" />
          <rect x="300" y="290" width="120" height="4" fill="currentColor" className="text-primary" />
          <rect x="310" y="305" width="100" height="4" fill="currentColor" className="text-accent" />
          <rect x="310" y="320" width="90" height="4" fill="currentColor" className="text-primary" />
          <rect x="300" y="335" width="110" height="4" fill="currentColor" className="text-accent" />
          <rect x="310" y="350" width="85" height="4" fill="currentColor" className="text-primary" />
          <rect x="300" y="365" width="95" height="4" fill="currentColor" className="text-accent" />
        </g>
        
        {/* Monitor stand */}
        <rect x="385" y="410" width="30" height="30" fill="currentColor" className="text-primary/30" />
        <rect x="370" y="435" width="60" height="8" rx="4" fill="currentColor" className="text-accent/40" />
        
        {/* Coffee cup */}
        <ellipse cx="550" cy="395" rx="20" ry="8" fill="currentColor" className="text-primary/30" />
        <path d="M 530 395 L 535 355 L 565 355 L 570 395 Z" fill="currentColor" className="text-accent/40" />
        <path d="M 570 365 Q 590 365 590 380 Q 590 395 570 395" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/30" />
        
        {/* Steam from coffee - animated */}
        <g className="animate-pulse">
          <path d="M 540 345 Q 538 335 540 325" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/40" opacity="0.6" />
          <path d="M 550 345 Q 552 335 550 325" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/40" opacity="0.6" />
          <path d="M 560 345 Q 558 335 560 325" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/40" opacity="0.6" />
        </g>
        
        {/* Plant */}
        <ellipse cx="650" cy="395" rx="25" ry="10" fill="currentColor" className="text-primary/30" />
        <rect x="640" y="360" width="20" height="35" fill="currentColor" className="text-accent/40" />
        <ellipse cx="650" cy="355" rx="30" ry="25" fill="currentColor" className="text-green-500/40" />
        <path d="M 650 355 Q 670 345 675 330" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-500/50" />
        <path d="M 650 355 Q 630 345 625 330" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-500/50" />
        
        {/* Keyboard */}
        <rect x="320" y="420" width="160" height="50" rx="4" fill="currentColor" className="text-primary/30" />
        <g fill="currentColor" className="text-accent/40">
          <rect x="330" y="430" width="10" height="8" rx="1" />
          <rect x="345" y="430" width="10" height="8" rx="1" />
          <rect x="360" y="430" width="10" height="8" rx="1" />
          <rect x="375" y="430" width="10" height="8" rx="1" />
          <rect x="390" y="430" width="10" height="8" rx="1" />
          <rect x="405" y="430" width="10" height="8" rx="1" />
          <rect x="420" y="430" width="10" height="8" rx="1" />
          <rect x="435" y="430" width="10" height="8" rx="1" />
          <rect x="450" y="430" width="10" height="8" rx="1" />
          <rect x="465" y="430" width="10" height="8" rx="1" />
          
          <rect x="335" y="445" width="10" height="8" rx="1" />
          <rect x="350" y="445" width="10" height="8" rx="1" />
          <rect x="365" y="445" width="10" height="8" rx="1" />
          <rect x="380" y="445" width="10" height="8" rx="1" />
          <rect x="395" y="445" width="10" height="8" rx="1" />
          <rect x="410" y="445" width="10" height="8" rx="1" />
          <rect x="425" y="445" width="10" height="8" rx="1" />
          <rect x="440" y="445" width="10" height="8" rx="1" />
          <rect x="455" y="445" width="10" height="8" rx="1" />
          
          <rect x="340" y="460" width="130" height="8" rx="1" />
        </g>
        
        {/* Floating code symbols */}
        <g className="animate-pulse" opacity="0.3">
          <text x="150" y="150" fontSize="40" fill="currentColor" className="text-accent">&lt;/&gt;</text>
          <text x="650" y="200" fontSize="35" fill="currentColor" className="text-primary">{'{}'}</text>
          <text x="700" y="450" fontSize="30" fill="currentColor" className="text-accent">( )</text>
          <text x="100" y="400" fontSize="38" fill="currentColor" className="text-primary">[ ]</text>
        </g>
        
        {/* Cursor blink on screen */}
        <rect x="395" y="365" width="3" height="6" fill="currentColor" className="text-accent animate-pulse" />
      </svg>
      
      {/* Gradient orbs for depth - positioned on left */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}

export function Hero() {
  const { links } = useSocialLinks()

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* <SectionBackground variant="grid" /> */}
      <DeveloperIllustration />
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
