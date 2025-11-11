"use client"

export function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      ></div>
      
      {/* Geometric shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-accent/5 rounded-full"></div>
      <div className="absolute bottom-40 left-20 w-32 h-32 border border-primary/5 rotate-45"></div>
    </div>
  )
}

