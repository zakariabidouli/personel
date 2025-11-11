// API Configuration
// Uses NEXT_PUBLIC_API_URL from .env.local, falls back to localhost:8000
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Log API URL in development (helps with debugging)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', API_BASE_URL)
}

// Types matching backend schemas
export interface Project {
  id: number
  title: string
  description: string
  image?: string | null
  tags?: string[] | null
  live_url?: string | null
  github_url?: string | null
  featured?: string
  order_index?: number
  created_at?: string | null
  updated_at?: string | null
}

export interface Experience {
  id: number
  role: string
  company: string
  period: string
  start_date?: string | null
  end_date?: string | null
  description: string
  tags?: string[] | null
  order_index?: number
  created_at?: string | null
  updated_at?: string | null
}

export interface Skill {
  id: number
  name: string
  category_id: number
  order_index?: number
  created_at?: string | null
  updated_at?: string | null
}

export interface SkillCategory {
  id: number
  name: string
  order_index?: number
  skills?: Skill[]
  created_at?: string | null
  updated_at?: string | null
}

export interface Contact {
  id: number
  name: string
  email: string
  message: string
  status?: string
  created_at?: string | null
  updated_at?: string | null
}

export interface About {
  id: number
  section: string
  content: string
  order_index?: number
  created_at?: string | null
  updated_at?: string | null
}

export interface Stat {
  id: number
  number: string
  label: string
  order_index?: number
  created_at?: string | null
  updated_at?: string | null
}

export interface SocialLink {
  id: number
  platform: string
  url: string
  icon_name?: string | null
  order_index?: number
  created_at?: string | null
  updated_at?: string | null
}

// API Client
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText)
      throw new Error(`API error: ${errorText || response.statusText}`)
    }

    // Handle 204 No Content (DELETE requests)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return undefined as T
    }

    // Try to parse JSON, but handle empty responses
    const text = await response.text()
    if (!text) {
      return undefined as T
    }

    try {
      return JSON.parse(text)
    } catch {
      return undefined as T
    }
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.fetch<Project[]>('/projects/')
  }

  async createProject(data: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    return this.fetch<Project>('/projects/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateProject(id: number, data: Partial<Project>): Promise<Project> {
    return this.fetch<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteProject(id: number): Promise<void> {
    await this.fetch<void>(`/projects/${id}`, {
      method: 'DELETE',
    })
  }

  // Experiences
  async getExperiences(): Promise<Experience[]> {
    return this.fetch<Experience[]>('/experiences/')
  }

  async createExperience(data: Omit<Experience, 'id' | 'created_at' | 'updated_at'>): Promise<Experience> {
    return this.fetch<Experience>('/experiences/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteExperience(id: number): Promise<void> {
    await this.fetch<void>(`/experiences/${id}`, {
      method: 'DELETE',
    })
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return this.fetch<Skill[]>('/skills/')
  }

  async getSkillCategories(): Promise<SkillCategory[]> {
    return this.fetch<SkillCategory[]>('/skills/categories')
  }

  async createSkillCategory(data: { name: string; order_index?: number }): Promise<SkillCategory> {
    return this.fetch<SkillCategory>('/skills/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async createSkill(data: { name: string; category_id: number; order_index?: number }): Promise<Skill> {
    return this.fetch<Skill>('/skills/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteSkill(id: number): Promise<void> {
    await this.fetch<void>(`/skills/${id}`, {
      method: 'DELETE',
    })
  }

  async deleteSkillCategory(id: number): Promise<void> {
    await this.fetch<void>(`/skills/categories/${id}`, {
      method: 'DELETE',
    })
  }

  // About
  async getAboutContent(): Promise<About[]> {
    return this.fetch<About[]>('/about/content')
  }

  async getStats(): Promise<Stat[]> {
    return this.fetch<Stat[]>('/about/stats')
  }

  // Social Links
  async getSocialLinks(): Promise<SocialLink[]> {
    return this.fetch<SocialLink[]>('/social-links/')
  }

  // Contact
  async getContacts(): Promise<Contact[]> {
    return this.fetch<Contact[]>('/contacts/')
  }

  async createContact(data: { name: string; email: string; message: string }): Promise<Contact> {
    return this.fetch<Contact>('/contacts/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async deleteContact(id: number): Promise<void> {
    await this.fetch<void>(`/contacts/${id}`, {
      method: 'DELETE',
    })
  }
}

export const api = new ApiClient()

