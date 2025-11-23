"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AdminContextType {
  isAdmin: boolean
  login: (password: string) => boolean
  logout: () => void
  isAuthenticated: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

const ADMIN_STORAGE_KEY = "portfolio_admin_authenticated"
const ADMIN_PASSWORD_KEY = "portfolio_admin_password"

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (stored === "true") {
      setIsAdmin(true)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (password: string): boolean => {
    // Get password from environment variable or use default
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
    
    if (password === adminPassword) {
      setIsAdmin(true)
      setIsAuthenticated(true)
      localStorage.setItem(ADMIN_STORAGE_KEY, "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    setIsAuthenticated(false)
    localStorage.removeItem(ADMIN_STORAGE_KEY)
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, isAuthenticated }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}

