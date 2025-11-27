'use client'

import { useEffect, useState, useCallback } from 'react'
import { api, Project, Experience, SkillCategory, About, Stat, SocialLink, Contact, Resume } from './api'

// Custom hook for fetching projects
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getProjects()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function fetchInitial() {
      try {
        setLoading(true)
        const data = await api.getProjects()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects')
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitial()
  }, [])

  return { projects, loading, error, refresh, setProjects }
}

// Custom hook for fetching experiences
export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getExperiences()
      setExperiences(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch experiences')
      console.error('Error fetching experiences:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function fetchInitial() {
      try {
        setLoading(true)
        const data = await api.getExperiences()
        setExperiences(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch experiences')
        console.error('Error fetching experiences:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInitial()
  }, [])

  return { experiences, loading, error, refresh, setExperiences }
}

// Custom hook for fetching skills
export function useSkills() {
  const [categories, setCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true)
        const data = await api.getSkillCategories()
        setCategories(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skills')
        console.error('Error fetching skills:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getSkillCategories()
      setCategories(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch skills')
      console.error('Error fetching skills:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { categories, loading, error, refresh, setCategories }
}

// Custom hook for fetching about content
export function useAbout() {
  const [about, setAbout] = useState<About[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const [aboutData, statsData] = await Promise.all([
        api.getAboutContent(),
        api.getStats(),
      ])
      setAbout(aboutData)
      setStats(statsData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch about content')
      console.error('Error fetching about:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { about, stats, loading, error, refresh }
}

// Custom hook for fetching social links
export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true)
        const data = await api.getSocialLinks()
        setLinks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch social links')
        console.error('Error fetching social links:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [])

  return { links, loading, error }
}

// Custom hook for fetching contacts
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getContacts()
      setContacts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts')
      console.error('Error fetching contacts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { contacts, loading, error, refresh, setContacts }
}

// Custom hook for fetching resume
export function useResume() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      const data = await api.getLatestResume()
      setResume(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resume')
      console.error('Error fetching resume:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { resume, loading, error, refresh, setResume }
}

