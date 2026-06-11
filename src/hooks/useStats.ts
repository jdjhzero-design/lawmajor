import { useCallback, useSyncExternalStore } from 'react'
import { getStats, type Stats } from '../lib/storage'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function useStats(): Stats {
  const getSnapshot = useCallback(() => getStats(), [])
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
