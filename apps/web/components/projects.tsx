"use client"

import { ExternalLink, Github, Plus, Trash, X, Maximize2, GripVertical, Edit } from "lucide-react"
import { useProjects } from "@/lib/hooks"
import { api } from "@/lib/api"
import { useState, useEffect } from "react"
import { SectionBackground } from "@/components/section-background"
import { useAdmin } from "@/contexts/AdminContext"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Project } from "@/lib/api"
import { EditProjectModal } from "@/components/edit-project-modal"

// Sortable Project Card Component
function SortableProjectCard({
  project,
  isAdmin,
  onDelete,
  onEdit,
  onImageClick,
}: {
  project: Project
  isAdmin: boolean
  onDelete: (id: number) => void
  onEdit: (project: Project) => void
  onImageClick: (image: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1"
    >
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        <button
          {...attributes}
          {...listeners}
          className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-colors cursor-grab active:cursor-grabbing"
          aria-label={`Drag to reorder ${project.title}`}
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(project)}
              title="Edit Project"
              className="p-2 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors backdrop-blur-sm"
              aria-label={`Edit ${project.title}`}
            >
              <Edit className="w-4 h-4 text-accent" />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              title="Delete Project"
              className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors backdrop-blur-sm"
              aria-label={`Delete ${project.title}`}
            >
              <Trash className="w-4 h-4 text-destructive" />
            </button>
          </>
        )}
      </div>
      {project.image && (
        <div className="relative h-56 overflow-hidden bg-secondary group">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <button
            onClick={() => onImageClick(project.image || "")}
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent/10 hover:border-accent/50"
            aria-label={`View full image of ${project.title}`}
          >
            <Maximize2 className="w-4 h-4 text-foreground" />
          </button>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-accent to-primary text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 flex items-center justify-center gap-2 text-sm group/link"
              aria-label={`Visit live site for ${project.title}`}
            >
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
              View Live
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-secondary hover:border-accent/50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              aria-label={`View source code for ${project.title}`}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const { projects, loading, error, refresh } = useProjects()
  const { isAdmin } = useAdmin()
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [items, setItems] = useState<Project[]>([])
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    live_url: "",
    github_url: "",
    tags: "",
  })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (projects) {
      setItems(projects)
    }
  }, [projects])

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    try {
      setCreating(true)
      await api.createProject({
        title: form.title,
        description: form.description,
        image: form.image || undefined,
        live_url: form.live_url || undefined,
        github_url: form.github_url || undefined,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        featured: "true",
        order_index: projects.length,
      })
      setShowForm(false)
      setForm({ title: "", description: "", image: "", live_url: "", github_url: "", tags: "" })
      await refresh()
    } catch (err) {
      console.error("Failed to create project:", err)
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return
    try {
      await api.deleteProject(id)
      await refresh()
    } catch (err) {
      console.error("Failed to delete project:", err)
    }
  }

  async function handleEdit(id: number, data: Partial<Project>) {
    try {
      await api.updateProject(id, data)
      await refresh()
    } catch (err) {
      console.error("Failed to update project:", err)
      throw err
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      const newItems = arrayMove(items, oldIndex, newIndex)
      setItems(newItems)

      // Update order_index for all affected projects
      try {
        const updatePromises = newItems.map((item, index) =>
          api.updateProject(item.id, { order_index: index })
        )
        await Promise.all(updatePromises)
        await refresh() // Refresh to get updated data
      } catch (err) {
        console.error("Failed to update project order:", err)
        // Revert on error
        setItems(items)
      }
    }
  }

  if (loading) {
    return (
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="hexagons" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
            <p className="text-muted-foreground mt-6 text-lg">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="hexagons" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
          </div>
          <div className="text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            Error: {error}
          </div>
        </div>
      </section>
    )
  }

  const sectionHeader = (
    <div className="text-center mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        Featured Projects
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
      <p className="text-muted-foreground mt-6 text-lg">Showcasing my best work and creative solutions</p>
    </div>
  )

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="hexagons" />
        <div className="relative max-w-6xl mx-auto">
          <div className="relative mb-12">
            {sectionHeader}
            {isAdmin && (
              <button
                onClick={() => setShowForm((v) => !v)}
                title="Add Project"
                className="absolute top-0 right-0 p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
                aria-label="Add new project"
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
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
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
                  {creating ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          )}
          <div className="text-center text-muted-foreground py-12 bg-card border border-border rounded-xl">
            No projects found.
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <SectionBackground variant="dots" />
        <div className="relative max-w-6xl mx-auto">
          <div className="relative mb-12">
            {sectionHeader}
            {isAdmin && (
              <button
                onClick={() => setShowForm((v) => !v)}
                title="Add Project"
                className="absolute top-0 right-0 p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
                aria-label="Add new project"
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
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
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
                  {creating ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((project) => (
                  <SortableProjectCard
                    key={project.id}
                    project={project}
                    isAdmin={isAdmin}
                    onDelete={handleDelete}
                    onEdit={setEditingProject}
                    onImageClick={setSelectedImage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
      </div>
    </section>

      {/* Edit Modal */}
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleEdit}
        />
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-card border border-border rounded-lg hover:bg-secondary transition-colors z-10"
            aria-label="Close image preview"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={selectedImage}
            alt="Project preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
