"use client"

import { useState, FormEvent } from "react"
import { useAdmin } from "@/contexts/AdminContext"
import { Lock, X, LogOut, Shield } from "lucide-react"

export function AdminLogin() {
  const { isAdmin, login, logout, isAuthenticated } = useAdmin()
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    const success = login(password)
    if (success) {
      setShowModal(false)
      setPassword("")
    } else {
      setError("Incorrect password. Please try again.")
    }
    setLoading(false)
  }

  const handleLogout = () => {
    logout()
    setShowModal(false)
  }

  return (
    <>
      {/* Admin Button */}
      <button
        onClick={() => (isAdmin ? handleLogout() : setShowModal(true))}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isAdmin
            ? "bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        }`}
        aria-label={isAdmin ? "Logout" : "Admin Login"}
      >
        {isAdmin ? (
          <>
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
            <LogOut className="w-4 h-4" />
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </>
        )}
      </button>

      {/* Login Modal */}
      {showModal && !isAdmin && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in"
          onClick={() => {
            setShowModal(false)
            setError("")
            setPassword("")
          }}
        >
          <div
            className="bg-card border border-border rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold">Admin Login</h2>
              </div>
              <button
                onClick={() => {
                  setShowModal(false)
                  setError("")
                  setPassword("")
                }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  autoFocus
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setError("")
                    setPassword("")
                  }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !password.trim()}
                  className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              Enter the admin password to access edit controls
            </p>
          </div>
        </div>
      )}
    </>
  )
}

