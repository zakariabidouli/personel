"use client"

import { useAbout } from "@/lib/hooks"
import { SectionBackground } from "@/components/section-background"

export function About() {
  const { about, stats, loading, error } = useAbout()

  if (loading) {
    return (
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <SectionBackground variant="grid" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-6 text-lg">Loading about content...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <SectionBackground variant="grid"/>
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
          </div>
          <div className="text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            Error: {error}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <SectionBackground variant="dots" />
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg">Get to know me better</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {about && about.length > 0 ? (
              about.map((section, idx) => (
                <div
                  key={section.id}
                  className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-6 bg-card border border-border rounded-xl">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate software engineer with a strong foundation in both frontend and backend technologies.
                </p>
              </div>
            )}
          </div>

          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="group p-6 bg-card border border-border rounded-xl text-center hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
