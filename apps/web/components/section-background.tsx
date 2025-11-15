"use client"

type PatternVariant = "hero" | "hexagons" | "grid" | "circles" | "waves" | "dots"

interface SectionBackgroundProps {
  variant?: PatternVariant
  opacity?: string
}

export function SectionBackground({ variant = "hexagons", opacity = "0.03" }: SectionBackgroundProps) {
  const opacityStyle = { opacity: parseFloat(opacity) }

  // Hero Pattern - Dynamic flowing shapes
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={opacityStyle}>
        {/* Flowing Wave Pattern */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.05" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
            fill="url(#waveGradient)"
            className="animate-pulse"
          />
          <path
            d="M0,300 Q400,200 800,300 T1200,300 L1200,400 L0,400 Z"
            fill="url(#waveGradient)"
            className="animate-pulse delay-1000"
          />
        </svg>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-40 h-40 border-2 border-foreground/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-foreground/10 rotate-45 animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-foreground/10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 border-2 border-foreground/10 rounded-full animate-pulse delay-1500"></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/6 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
    )
  }

  // Hexagons Pattern (default)
  if (variant === "hexagons") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={opacityStyle}>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hexagons"
              x="0"
              y="0"
              width="40"
              height="34.64"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="20,0 35,8.66 35,25.98 20,34.64 5,25.98 5,8.66"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    )
  }

  // Grid Pattern
  if (variant === "grid") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={opacityStyle}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
        <div className="absolute top-10 left-10 w-32 h-32 border border-foreground/10 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-foreground/10 rounded-full"></div>
      </div>
    )
  }

  // Circles Pattern
  if (variant === "circles") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={opacityStyle}>
        <div className="absolute top-10 left-10 w-32 h-32 border border-foreground/10 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-foreground/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-foreground/10 rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 border border-foreground/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-foreground/10 rounded-full"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    )
  }

  // Waves Pattern
  if (variant === "waves") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={opacityStyle}>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 300"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0,150 Q300,50 600,150 T1200,150 L1200,300 L0,300 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
          />
          <path
            d="M0,200 Q400,100 800,200 T1200,200 L1200,300 L0,300 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
          />
        </svg>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    )
  }


  // cyber punk
  
  // Dots Pattern
  if (variant === "dots") {
    const dots = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.8,
      color: Math.random() > 0.7 ? '#22c55e' : '#a855f7'
    }));
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          {dots.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dot.size} fill={dot.color} opacity="0.6" />
          ))}
        </svg>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>        
      </div>
    );
  
    // return (
    //   <div className="absolute inset-0 overflow-hidden pointer-events-none" style={opacityStyle}>
    //     <svg
    //       className="absolute inset-0 w-full h-full"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 100 100"
    //       preserveAspectRatio="xMidYMid slice"
    //     >
    //       <defs>
    //         <pattern
    //           id="dots"
    //           x="0"
    //           y="0"
    //           width="20"
    //           height="20"
    //           patternUnits="userSpaceOnUse"
    //         >
    //           <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    //         </pattern>
    //       </defs>
    //       <rect width="100%" height="100%" fill="url(#dots)" />
    //     </svg>
    //     <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>        
    //   </div>
    // )
  }

  // Default fallback
  return null
}
