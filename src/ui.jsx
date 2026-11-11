import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { go } from './router.js'

// A link that goes through the router (and keeps ctrl/cmd-click, middle click and so on working)
export function Link({ to, className, children, ...rest }) {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }
  return <a href={`#${to}`} className={className} onClick={onClick} {...rest}>{children}</a>
}

// Things come in as they are scrolled to (once). `d` staggers siblings, in steps of 80 ms.
export function Reveal({ as: Tag = 'div', d = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return undefined }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`rv${on ? ' in' : ''} ${className}`} style={{ '--d': `${d * 80}ms` }} {...rest}>{children}</Tag>
}

// Counts up when scrolled into view
export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (still || !('IntersectionObserver' in window)) { setN(value); return undefined }
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1100)
        setN(Math.round(value * (1 - Math.pow(1 - k, 3))))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  return <span ref={ref}>{n}{suffix}</span>
}

// A placeholder where a photo goes: drawn, in one of three tones. With `src` it shows the real picture instead.
export function Photo({ src, tone = 'a', label = 'Photo', className = '', children }) {
  return (
    <div className={`photo photo--${tone} ${className}`}>
      {src ? <img src={src} alt="" loading="lazy" /> : <span className="photo__label">{label}</span>}
      {children}
    </div>
  )
}

// A placeholder where a map goes: a drawn grid with pins. Swap this component for Leaflet, Mapbox or Google Maps.
export function MapPlaceholder({ pins = [], active, className = '' }) {
  return (
    <div className={`map ${className}`} role="img" aria-label="Map placeholder">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 42 C 20 36, 30 48, 52 40 S 85 30, 100 36" className="map__river" />
        <path d="M18 0 L 30 60 M 0 22 L 100 14 M 60 0 L 72 60" className="map__road" />
      </svg>
      {pins.map((p) => (
        <span key={p.id} className={`map__pin${active === p.id ? ' is-on' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <i />
          <b>{p.name}</b>
        </span>
      ))}
      <div className="map__note">Map placeholder · plug in your map service here</div>
    </div>
  )
}

const ToastCtx = createContext(() => {})
export const useToast = () => useContext(ToastCtx)

export function ToastHost({ children }) {
  const [msg, setMsg] = useState('')
  const timer = useRef(0)
  const show = useCallback((m) => {
    setMsg(m)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(''), 2800)
  }, [])
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={`toast${msg ? ' is-on' : ''}`} role="status" aria-live="polite">{msg}</div>
    </ToastCtx.Provider>
  )
}

export const Arrow = () => (
  <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
)

export const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
