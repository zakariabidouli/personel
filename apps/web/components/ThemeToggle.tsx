"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="px-4 py-2 rounded-lg bg-muted text-muted-foreground transition-colors duration-200">
        Loading...
      </button>
    )
  }

  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-xl bg-transparent text-muted-foreground hover:text-xl transition-all duration-200 font-medium"
      aria-label="Toggle theme"
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  )
}