// A tiny hash router (no dependency): "#/classes", "#/gyms/dock-9".
// Navigation goes through the View Transitions API where the browser has it, so pages cross-fade.
import { useSyncExternalStore } from 'react'

const subscribe = (cb) => {
  addEventListener('hashchange', cb)
  return () => removeEventListener('hashchange', cb)
}
const read = () => location.hash.replace(/^#/, '') || '/'

export const usePath = () => useSyncExternalStore(subscribe, read)

export function go(to) {
  if (read() === to) {
    scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || still) {
    location.hash = to
    return
  }
  document.startViewTransition(
    () =>
      new Promise((resolve) => {
        addEventListener('hashchange', () => requestAnimationFrame(() => requestAnimationFrame(resolve)), { once: true })
        location.hash = to
      }),
  )
}

export function match(path) {
  const [, first = '', second = ''] = path.split('/')
  return { page: first, id: second }
}
