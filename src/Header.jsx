import { useEffect, useMemo, useRef, useState } from 'react'
import { brand, nav, gyms, schedule, news, products, contact } from './site.config.js'
import { Link, useToast } from './ui.jsx'
import { usePath, go } from './router.js'

// The mark: an angular, forward-leaning "O" with a real hole through it (the hole shows whatever is behind)
export const Logo = () => (
  <span className="logo">
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path fillRule="evenodd" className="logo__o" d="M18 10H56L46 54H8ZM24.2 18H46.2L39.8 46H17.8Z" />
    </svg>
    <b>{brand.name}</b>
  </span>
)

export function Header() {
  const path = usePath()
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [login, setLogin] = useState(false)
  useEffect(() => setMenu(false), [path])
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(e.target.tagName)
      if (e.key === '/' && !typing) { e.preventDefault(); setSearch(true) }
      if (e.key === 'Escape') setMenu(false)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])
  const here = (to) => path === to || path.startsWith(`${to}/`)

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className="site-header">
        <Link to="/" aria-label={`${brand.name}, home`}><Logo /></Link>
        <nav aria-label="Main" className={menu ? 'is-open' : ''}>
          <ul>
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to} aria-current={here(n.to) ? 'page' : undefined}>{n.label}</Link></li>
            ))}
            <li className="nav-only-mobile"><button type="button" onClick={() => { setMenu(false); setLogin(true) }}>Member login</button></li>
          </ul>
        </nav>
        <div className="site-header__tools">
          <button type="button" className="icon-btn" onClick={() => setSearch(true)} aria-label="Search (press /)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
          </button>
          <button type="button" className="btn btn--amber login-btn" onClick={() => setLogin(true)}>Member login</button>
          <button type="button" className="icon-btn burger" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Menu">
            <svg viewBox="0 0 24 24" aria-hidden="true">{menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}</svg>
          </button>
        </div>
      </header>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
      <LoginDialog open={login} onClose={() => setLogin(false)} />
    </>
  )
}

// Native <dialog>: focus handling, Esc and the backdrop come for free
function useDialog(open, onClose) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  useEffect(() => {
    const d = ref.current
    const close = () => onClose()
    const outside = (e) => { if (e.target === d) d.close() }
    d.addEventListener('close', close)
    d.addEventListener('click', outside)
    return () => { d.removeEventListener('close', close); d.removeEventListener('click', outside) }
  }, [onClose])
  return ref
}

function SearchDialog({ open, onClose }) {
  const ref = useDialog(open, onClose)
  const [q, setQ] = useState('')
  const index = useMemo(() => {
    const items = [
      ...nav.map((n) => ({ to: n.to, title: n.label, kind: 'Page', text: '' })),
      ...gyms.map((g) => ({ to: `/gyms#${g.id}`, title: g.name, kind: 'Gym', text: `${g.short} ${g.address}` })),
      ...news.map((n) => ({ to: '/news', title: n.title, kind: 'News', text: n.text })),
      ...products.map((p) => ({ to: '/shop', title: p.name, kind: 'Shop', text: p.tag })),
    ]
    const seen = new Set()
    Object.values(schedule).flat().forEach(([, name]) => { if (!seen.has(name)) { seen.add(name); items.push({ to: '/classes', title: name, kind: 'Class', text: '' }) } })
    return items
  }, [])
  const hits = q.trim() ? index.filter((i) => `${i.title} ${i.text} ${i.kind}`.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 8) : []
  return (
    <dialog ref={ref} className="dlg dlg--search" aria-label="Search">
      <form method="dialog" onSubmit={(e) => e.preventDefault()}>
        <input autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search classes, gyms, news, shop…" aria-label="Search the site" />
      </form>
      <ul className="dlg__hits">
        {hits.map((h, i) => (
          <li key={i}>
            <a href={`#${h.to.split('#')[0]}`} onClick={(e) => { e.preventDefault(); ref.current.close(); go(h.to.split('#')[0]) }}>
              <b>{h.title}</b><span>{h.kind}</span>
            </a>
          </li>
        ))}
        {q.trim() && !hits.length && <li className="dlg__none">Nothing found for “{q}”.</li>}
        {!q.trim() && <li className="dlg__none">Type to search. Press Esc to close.</li>}
      </ul>
    </dialog>
  )
}

function LoginDialog({ open, onClose }) {
  const ref = useDialog(open, onClose)
  const toast = useToast()
  return (
    <dialog ref={ref} className="dlg dlg--login" aria-label="Member login">
      <form
        onSubmit={(e) => { e.preventDefault(); ref.current.close(); toast('Demo only: there is no member area behind this form.') }}
      >
        <h2>Member login</h2>
        <p className="dlg__sub">This is a demo form. Connect it to your member system.</p>
        <label>Email<input type="email" required autoComplete="email" placeholder="you@example.com" /></label>
        <label>Password<input type="password" required autoComplete="current-password" /></label>
        <div className="dlg__actions">
          <button type="button" className="btn" onClick={() => ref.current.close()}>Cancel</button>
          <button type="submit" className="btn btn--amber">Log in</button>
        </div>
      </form>
    </dialog>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__top">
        <div>
          <p className="site-footer__big">{brand.name}<i>.</i></p>
          <p className="site-footer__sub">{brand.slogan}</p>
        </div>
        <nav aria-label="Footer">
          <ul>{nav.map((n) => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}</ul>
        </nav>
        <div className="site-footer__contact">
          <p>{contact.hours}</p>
          <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p>{contact.phone}</p>
          <p><Link to="/contact">Contact us</Link></p>
        </div>
      </div>
      <div className="wrap site-footer__bottom">
        <span>© {brand.year} {brand.name}. A website template: every name, price and time is placeholder content.</span>
      </div>
    </footer>
  )
}
