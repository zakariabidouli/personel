"use client"

import { useAbout } from "@/lib/hooks"
import { SectionBackground } from "@/components/section-background"
import { useAdmin } from "@/contexts/AdminContext"
import { api } from "@/lib/api"
import { Plus, Trash, Edit } from "lucide-react"
import { useState } from "react"

export function About() {
  const { about, stats, loading, error, refresh } = useAbout()
  const { isAdmin } = useAdmin()
  const [editingAboutId, setEditingAboutId] = useState<number | null>(null)
  const [editingStatId, setEditingStatId] = useState<number | null>(null)
  const [showAboutForm, setShowAboutForm] = useState(false)
  const [showStatForm, setShowStatForm] = useState(false)
  const [aboutForm, setAboutForm] = useState({ section: "", content: "" })
  const [statForm, setStatForm] = useState({ number: "", label: "" })

  const startEditAbout = (item: typeof about[0]) => {
    setAboutForm({ section: item.section, content: item.content })
    setEditingAboutId(item.id)
    setShowAboutForm(true)
  }

  const startEditStat = (item: typeof stats[0]) => {
    setStatForm({ number: item.number, label: item.label })
    setEditingStatId(item.id)
    setShowStatForm(true)
  }

  async function handleAboutSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingAboutId) {
        await api.updateAbout(editingAboutId, aboutForm)
      } else {
        await api.createAbout({ ...aboutForm, order_index: about?.length || 0 })
      }
      setShowAboutForm(false)
      setAboutForm({ section: "", content: "" })
      setEditingAboutId(null)
      await refresh()
    } catch (err) {
      console.error(`Failed to ${editingAboutId ? "update" : "create"} about:`, err)
    }
  }

  async function handleStatSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingStatId) {
        await api.updateStat(editingStatId, statForm)
      } else {
        await api.createStat({ ...statForm, order_index: stats?.length || 0 })
      }
      setShowStatForm(false)
      setStatForm({ number: "", label: "" })
      setEditingStatId(null)
      await refresh()
    } catch (err) {
      console.error(`Failed to ${editingStatId ? "update" : "create"} stat:`, err)
    }
  }

  async function handleDeleteAbout(id: number) {
    if (!confirm("Delete this about section?")) return
    try {
      await api.deleteAbout(id)
      await refresh()
    } catch (err) {
      console.error("Failed to delete about:", err)
    }
  }

  async function handleDeleteStat(id: number) {
    if (!confirm("Delete this stat?")) return
    try {
      await api.deleteStat(id)
      await refresh()
    } catch (err) {
      console.error("Failed to delete stat:", err)
    }
  }

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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">About Content</h3>
              {isAdmin && (
                <button
                  onClick={() => {
                    setShowAboutForm(true)
                    setAboutForm({ section: "", content: "" })
                    setEditingAboutId(null)
                  }}
                  className="p-2 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors"
                  title="Add About Section"
                >
                  <Plus className="w-4 h-4 text-accent" />
                </button>
              )}
            </div>
            {isAdmin && showAboutForm && (
              <form onSubmit={handleAboutSubmit} className="p-6 bg-card border border-border rounded-xl space-y-4">
                <input
                  placeholder="Section name"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  value={aboutForm.section}
                  onChange={(e) => setAboutForm({ ...aboutForm, section: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Content"
                  rows={4}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  value={aboutForm.content}
                  onChange={(e) => setAboutForm({ ...aboutForm, content: e.target.value })}
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAboutForm(false)
                      setAboutForm({ section: "", content: "" })
                      setEditingAboutId(null)
                    }}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium"
                  >
                    {editingAboutId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            )}
            {about && about.length > 0 ? (
              about.map((section, idx) => (
                <div
                  key={section.id}
                  className="group relative p-8 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {isAdmin && (
                    <div className="absolute inset-y-1 right-1 gap-1 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditAbout(section)}
                        className="p-2 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-accent" />
                      </button>
                      <button
                        onClick={() => handleDeleteAbout(section.id)}
                        className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20"
                        title="Delete"
                      >
                        <Trash className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  )}
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

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Statistics</h3>
              {isAdmin && (
                <button
                  onClick={() => {
                    setShowStatForm(true)
                    setStatForm({ number: "", label: "" })
                    setEditingStatId(null)
                  }}
                  className="p-2 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors"
                  title="Add Stat"
                >
                  <Plus className="w-4 h-4 text-accent" />
                </button>
              )}
            </div>
            {isAdmin && showStatForm && (
              <form onSubmit={handleStatSubmit} className="mb-4 p-6 bg-card border border-border rounded-xl space-y-4">
                <input
                  required
                  placeholder="Number"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  value={statForm.number}
                  onChange={(e) => setStatForm({ ...statForm, number: e.target.value })}
                />
                <input
                  required
                  placeholder="Label"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  value={statForm.label}
                  onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                />
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowStatForm(false)
                      setStatForm({ number: "", label: "" })
                      setEditingStatId(null)
                    }}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium"
                  >
                    {editingStatId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            )}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={stat.id}
                    className="group relative p-6 bg-card border border-border rounded-xl text-center hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {isAdmin && (
                      <div className="absolute inset-y-1 right-1 gap-1 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditStat(stat)}
                          className="p-1.5 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20"
                          title="Edit"
                        >
                          <Edit className="w-3 h-3 text-accent" />
                        </button>
                        <button
                          onClick={() => handleDeleteStat(stat.id)}
                          className="p-1.5 bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20"
                          title="Delete"
                        >
                          <Trash className="w-3 h-3 text-destructive" />
                        </button>
                      </div>
                    )}
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
      </div>
    </section>
  )
}
