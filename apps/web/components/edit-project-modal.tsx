"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { Project } from "@/lib/api"

interface EditProjectModalProps {
  project: Project | null
  onClose: () => void
  onSave: (id: number, data: Partial<Project>) => Promise<void>
}

export function EditProjectModal({ project, onClose, onSave }: EditProjectModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    live_url: "",
    github_url: "",
    tags: "",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        image: project.image || "",
        live_url: project.live_url || "",
        github_url: project.github_url || "",
        tags: project.tags?.join(", ") || "",
      })
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return

    try {
      setSaving(true)
      await onSave(project.id, {
        title: form.title,
        description: form.description,
        image: form.image || undefined,
        live_url: form.live_url || undefined,
        github_url: form.github_url || undefined,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      })
      onClose()
    } catch (err) {
      console.error("Failed to update project:", err)
    } finally {
      setSaving(false)
    }
  }

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Edit Project</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Title"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="Image URL"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
          <textarea
            required
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Live URL"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={form.live_url}
              onChange={(e) => setForm({ ...form, live_url: e.target.value })}
            />
            <input
              placeholder="GitHub URL"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={form.github_url}
              onChange={(e) => setForm({ ...form, github_url: e.target.value })}
            />
            <input
              placeholder="Tags (comma-separated)"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

