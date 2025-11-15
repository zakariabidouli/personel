"use client"

import { Github, Linkedin, Twitter, Mail, Icon } from "lucide-react"
import { useSocialLinks } from "@/lib/hooks"
import { SectionBackground } from "@/components/section-background" 

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { links } = useSocialLinks()

  return (
    <footer className="relative border-t border-border bg-card/50">
      <SectionBackground variant="grid" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Zakaria</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Full-stack engineer crafting elegant digital solutions with clean code and innovative design.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["About", "Projects", "Experience", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {links && links.length > 0 && (
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                {links.map((link) => (
                  <a key={link.id} href={link.url} className="text-muted-foreground hover:text-accent transition-colors">
                    {link.icon_name}       
                  </a>
                ))}
              </div>
            </div>
          )}
          </div>
          {/* <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Mail, href: "#", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div> */}

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Zakaria. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
