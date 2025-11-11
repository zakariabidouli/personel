"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Mail, MessageSquare, Send, Trash } from "lucide-react"
import { api } from "@/lib/api"
import { useContacts } from "@/lib/hooks"
import { SectionBackground } from "@/components/section-background"

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isAdmin = useMemo(() => process.env.NEXT_PUBLIC_ADMIN === "true", [])
  const { contacts, refresh: refreshContacts } = useContacts()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await api.createContact({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      })
      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      await refreshContacts() // Refresh messages list
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <SectionBackground variant="grid" />
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent via-primary to-accent mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-6 text-lg">Have a project in mind? Let's collaborate!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg w-fit mb-4 group-hover:bg-accent/20 transition-colors">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Email</h3>
            <a
              href="mailto:bidouliwork@gmail.com"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Send email to bidouliwork@gmail.com"
            >
              bidouliwork@gmail.com
            </a>
          </div>
          <div className="group p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg w-fit mb-4 group-hover:bg-accent/20 transition-colors">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground">Direct Message</h3>
            <p className="text-muted-foreground">Connect with me on LinkedIn</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
            required
          ></textarea>
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || submitted}
            className="group w-full px-6 py-3.5 bg-gradient-to-r from-accent to-primary text-accent-foreground rounded-lg font-semibold hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitted ? "Message Sent!" : loading ? "Sending..." : "Send Message"}
            {!submitted && !loading && <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
          </button>
        </form>

        {/* Admin Messages Table */}
        {isAdmin && (
          <div className="mt-20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Messages {contacts && `(${contacts.length})`}
            </h3>
            {contacts && contacts.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full border-collapse bg-card rounded-lg">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Message</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium">{contact.name}</td>
                        <td className="px-4 py-3 text-sm">
                          <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground max-w-md">
                          <div className="truncate" title={contact.message}>
                            {contact.message}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              contact.status === "new"
                                ? "bg-blue-500/20 text-blue-400"
                                : contact.status === "read"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {contact.status || "new"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {contact.created_at
                            ? new Date(contact.created_at).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={async () => {
                              if (!confirm("Delete this message?")) return
                              try {
                                await api.deleteContact(contact.id)
                                await refreshContacts()
                              } catch (err) {
                                console.error("Failed to delete contact:", err)
                              }
                            }}
                            title="Delete Message"
                            className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors"
                            aria-label={`Delete message from ${contact.name}`}
                          >
                            <Trash className="w-4 h-4 text-destructive" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8 bg-card border border-border rounded-lg">
                No messages yet.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
