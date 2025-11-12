"use client"

import { useExperiences } from "@/lib/hooks"
import { api } from "@/lib/api"
import { Plus, Trash, Briefcase } from "lucide-react"
import { useMemo, useState } from "react"
import { SectionBackground } from "@/components/section-background"

export function Experience() {
  const { experiences, loading, error, refresh } = useExperiences()
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    role: "",
    company: "",
    period: "",
    start_date: "",
    end_date: "",
    description: "",
    tags: "",
  })

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    try {
      setCreating(true)
      await api.createExperience({
        role: form.role,
        company: form.company,
        period: form.period,
        start_date: form.start_date || undefined,
        end_date: form.end_date || undefined,
        description: form.description,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        order_index: experiences?.length || 0,
      })
      setShowForm(false)
      setForm({ role: "", company: "", period: "", start_date: "", end_date: "", description: "", tags: "" })
      await refresh()
    } catch (err) {
      console.error("Failed to create experience:", err)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this experience?")) return
    try {
      await api.deleteExperience(id)
      await refresh()
    } catch (err) {
      console.error("Failed to delete experience:", err)
    }
  }

  const sectionHeader = (
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        Professional Experience
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
      <p className="text-muted-foreground mt-6 text-lg">My career journey and achievements</p>
    </div>
  )

  if (loading) {
    return (
      <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="grid" />
        <div className="relative max-w-5xl mx-auto">
          {sectionHeader}
          <div className="text-center text-muted-foreground">Loading experience...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="grid" />
        <div className="relative max-w-5xl mx-auto">
          {sectionHeader}
          <div className="text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            Error: {error}
          </div>
        </div>
      </section>
    )
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="grid" />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {sectionHeader}
            {isAdmin && (
              <button
                onClick={() => setShowForm((v) => !v)}
                title="Add Experience"
                className="ml-4 p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
                aria-label="Add new experience"
              >
                <Plus className="w-5 h-5 text-accent" />
              </button>
            )}
          </div>
          {isAdmin && showForm && (
            <form onSubmit={handleCreate} className="mb-10 grid gap-4 p-6 border border-border rounded-xl bg-card shadow-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Role"
                  className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
                <input
                  required
                  placeholder="Company"
                  className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  required
                  placeholder="Period (e.g., 2023 - Present)"
                  className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                />
                <input
                  placeholder="Start Date (YYYY-MM)"
                  className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
                <input
                  placeholder="End Date (YYYY-MM)"
                  className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
              <textarea
                required
                placeholder="Description"
                rows={4}
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                placeholder="Tags (comma-separated)"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Experience"}
                </button>
              </div>
            </form>
          )}
          <div className="text-center text-muted-foreground py-12 bg-card border border-border rounded-xl">
            No experience entries found.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          {sectionHeader}
          {isAdmin && (
            <button
              onClick={() => setShowForm((v) => !v)}
              title="Add Experience"
              className="ml-4 p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
              aria-label="Add new experience"
            >
              <Plus className="w-5 h-5 text-accent" />
            </button>
          )}
        </div>

        {isAdmin && showForm && (
          <form onSubmit={handleCreate} className="mb-12 grid gap-4 p-6 border border-border rounded-xl bg-card shadow-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                placeholder="Role"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <input
                required
                placeholder="Company"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                required
                placeholder="Period (e.g., 2023 - Present)"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
              />
              <input
                placeholder="Start Date (YYYY-MM)"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              />
              <input
                placeholder="End Date (YYYY-MM)"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
            <textarea
              required
              placeholder="Description"
              rows={4}
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
              placeholder="Tags (comma-separated)"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Experience"}
              </button>
            </div>
          </form>
        )}

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="group relative p-8 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-primary rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {isAdmin && (
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleDelete(exp.id)}
                    title="Delete Experience"
                    className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors backdrop-blur-sm"
                    aria-label={`Delete experience at ${exp.company}`}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              )}
              
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-accent font-semibold text-lg mt-1">{exp.company}</p>
                    </div>
                    <span className="text-muted-foreground mt-2 md:mt-0 font-medium bg-secondary/50 px-3 py-1 rounded-lg border border-border">
                      {exp.period}
                    </span>
              </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-base">{exp.description}</p>
                  {exp.tags && exp.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tagIdx) => (
                  <span
                          key={tagIdx}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
