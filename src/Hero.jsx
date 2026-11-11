import { useEffect, useRef, useState } from 'react'
import { hero } from './site.config.js'
import { Link } from './ui.jsx'

// The video hero: autoplaying muted loop, a dark tone over it, a headline whose last word changes, pause control.
// With "reduce motion" the video does not play and the poster image stays.
export default function Hero() {
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [word, setWord] = useState(0) // index in the rotating list; the first word is repeated at the end so the loop never runs backwards
  const [snap, setSnap] = useState(false)
  const still = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const v = video.current
    if (!v) return undefined
    const sync = () => setPlaying(!v.paused)
    v.addEventListener('play', sync)
    v.addEventListener('pause', sync)
    if (still) v.pause()
    else v.play().catch(() => {})
    return () => { v.removeEventListener('play', sync); v.removeEventListener('pause', sync) }
  }, [still])

  useEffect(() => {
    if (still) return undefined
    const t = setInterval(() => { setSnap(false); setWord((w) => w + 1) }, 2600)
    return () => clearInterval(t)
  }, [still])

  // after sliding onto the repeated first word, jump back to the real first word without animation
  useEffect(() => {
    if (word < hero.words.length) return undefined
    const t = setTimeout(() => { setSnap(true); setWord(0) }, 850)
    return () => clearTimeout(t)
  }, [word])

  const toggle = () => { const v = video.current; if (v.paused) v.play(); else v.pause() }

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__media">
        <video ref={video} src={hero.video} poster={hero.poster} muted loop playsInline preload="auto" />
      </div>
      <div className="hero__shade" />
      <div className="hero__copy">
        <h1>
          {hero.lead}{' '}
          <span className="words" aria-live="off">
            <span className={`words__in${snap ? ' is-snap' : ''}`} style={{ transform: `translateY(calc(${word} * -1.24em))` }}>
              {[...hero.words, hero.words[0]].map((w, i) => <span key={i}>{w}</span>)}
            </span>
          </span>
        </h1>
        <p className="hero__sub">{hero.sub}</p>
        <div className="hero__btns">
          <Link to={hero.primary.to} className="glass">{hero.primary.label}</Link>
          <Link to={hero.secondary.to} className="glass">{hero.secondary.label}</Link>
        </div>
      </div>
      <button type="button" className="hero__pause" onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}>
        {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg>}
      </button>
    </section>
  )
}
