'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'kinderhouse-recently-viewed-v1'
const MAX = 8

function read(): string[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []
  } catch {
    return []
  }
}

/** Slugs of products this visitor actually opened, most recent first. */
export function useRecentlyViewed() {
  const [slugs, setSlugs] = useState<string[]>([])
  useEffect(() => setSlugs(read()), [])

  const track = useCallback((slug: string) => {
    const next = [slug, ...read().filter((s) => s !== slug)].slice(0, MAX)
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
    setSlugs(next)
  }, [])

  return { slugs, track }
}
