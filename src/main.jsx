import { StrictMode, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { usePath, match } from './router.js'
import { Header, Footer } from './Header.jsx'
import { ToastHost } from './ui.jsx'
import { Home, Gyms, Classes, Membership, News, Shop, About, Contact, NotFound } from './pages.jsx'
import { brand } from './site.config.js'
import './styles.css'

const PAGES = { '': Home, gyms: Gyms, classes: Classes, membership: Membership, news: News, shop: Shop, about: About, contact: Contact }

function App() {
  const path = usePath()
  const { page } = match(path)
  const Page = PAGES[page] ?? NotFound
  // every page starts at the top, and the tab title follows
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.title = page ? `${page[0].toUpperCase()}${page.slice(1)} · ${brand.name}` : `${brand.name}: ${brand.slogan}`
  }, [page])
  return (
    <ToastHost>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Page key={page} />
      </main>
      <Footer />
    </ToastHost>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
