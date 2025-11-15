"use client"

import { useSkills } from "@/lib/hooks"
import { api } from "@/lib/api"
import { Plus, Trash, Code } from "lucide-react"
import { useMemo, useState } from "react"
import { SectionBackground } from "@/components/section-background"

export function Skills() {
  const { categories, loading, error, refresh } = useSkills()
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newSkill, setNewSkill] = useState<{ [key: number]: string }>({})

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCategory.trim()) return
    try {
      await api.createSkillCategory({ name: newCategory.trim(), order_index: categories?.length || 0 })
      setNewCategory("")
      setShowCategoryForm(false)
      await refresh()
    } catch (err) {
      console.error("Failed to create category:", err)
    }
  }

  const sectionHeader = (
    <div className="text-center mb-16 w-full">
      <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
        Skills & Technologies
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
      {/* <p className="text-muted-foreground mt-6 text-lg">Technologies and tools I work with</p> */}
    </div>
  )

  if (loading) {
    return (
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto">
          {sectionHeader}
          <div className="text-center text-muted-foreground">Loading skills...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <SectionBackground variant="hexagons" />
        <div className="relative max-w-5xl mx-auto">
          {sectionHeader}
          <div className="text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            Error: {error}
          </div>
        </div>
      </section>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            {sectionHeader}
            {isAdmin && (
              <button
                onClick={() => setShowCategoryForm((v) => !v)}
                title="Add Category"
                className="ml-4 p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
                aria-label="Add new skill category"
              >
                <Plus className="w-5 h-5 text-accent" />
              </button>
            )}
          </div>
          {isAdmin && showCategoryForm && (
            <form onSubmit={handleCreateCategory} className="mb-10 grid gap-4 p-6 border border-border rounded-xl bg-card shadow-lg max-w-xl mx-auto">
              <input
                placeholder="New category name"
                className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCategoryForm(false)}
                  className="px-6 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all"
                >
                  Create Category
                </button>
              </div>
            </form>
          )}
          <div className="text-center text-muted-foreground py-12 bg-card border border-border rounded-xl">
            No skills found.
          </div>
        </div>
      </section>
    )
  }

  return ( 
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <SectionBackground variant="dots" />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justif  y-between mb-12">
          {sectionHeader}
          {isAdmin && (
            <button
              onClick={() => setShowCategoryForm((v) => !v)}
              title="Add Category"
              className="ml-4 p-3 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 hover:border-accent/40 transition-all duration-200"
              aria-label="Add new skill category"
            >
              <Plus className="w-5 h-5 text-accent" />
            </button>
          )}
        </div>

        {isAdmin && showCategoryForm && (
          <form
            onSubmit={handleCreateCategory}
            className="mb-12 grid gap-4 p-6 border border-border rounded-xl bg-card shadow-lg max-w-xl mx-auto"
          >
            <input
              placeholder="New category name"
              className="px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowCategoryForm(false)}
                className="px-6 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all"
              >
                Create Category
              </button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg">
                    <Code className="w-4 h-4 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>
                </div>
                {isAdmin && (
                  <button
                    onClick={async () => {
                      if (!confirm("Delete this category and all its skills?")) return
                      try {
                        await api.deleteSkillCategory(cat.id)
                        await refresh()
                      } catch (err) {
                        console.error("Failed to delete category:", err)
                      }
                    }}
                    title="Delete Category"
                    className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors"
                    aria-label={`Delete ${cat.name} category`}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </button>
                )}
              </div>
              {cat.skills && cat.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-lg border border-accent/20 hover:bg-accent/20 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {isAdmin && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    const name = (newSkill[cat.id] || "").trim()
                    if (!name) return
                    try {
                      await api.createSkill({ name, category_id: cat.id, order_index: (cat.skills?.length || 0) })
                      setNewSkill({ ...newSkill, [cat.id]: "" })
                      await refresh()
                    } catch (err) {
                      console.error("Failed to add skill:", err)
                    }
                  }}
                  className="mt-4 flex gap-2"
                >
                  <input
                    placeholder="Add skill"
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm"
                    value={newSkill[cat.id] || ""}
                    onChange={(e) => setNewSkill({ ...newSkill, [cat.id]: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all text-sm"
                  >
                    Add
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
