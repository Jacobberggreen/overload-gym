import { useMemo, useState } from 'react'
import { brand, stats, gyms, levels, schedule, plans, compare, faq, news, events, products, about, contact } from './site.config.js'
import { Link, Reveal, Counter, Photo, MapPlaceholder, Arrow, useToast, fmtDate } from './ui.jsx'
import Hero from './Hero.jsx'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_NAMES = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' }
const todayKey = () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()]
const gymName = (id) => gyms.find((g) => g.id === id)?.name ?? id
const pins = gyms.map((g) => ({ id: g.id, name: g.name, ...g.pin }))

function PageHead({ kicker, title, lead }) {
  return (
    <header className="pagehead">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">{kicker}</Reveal>
        <Reveal as="h1" d={1}>{title}</Reveal>
        {lead && <Reveal as="p" d={2} className="pagehead__lead">{lead}</Reveal>}
      </div>
    </header>
  )
}

function SectionTitle({ title, lead, to, cta }) {
  return (
    <div className="sec-title">
      <div>
        <Reveal as="h2">{title}</Reveal>
        {lead && <Reveal as="p" d={1} className="sec-lead">{lead}</Reveal>}
      </div>
      {to && <Reveal d={2}><Link to={to} className="more">{cta} <Arrow /></Link></Reveal>}
    </div>
  )
}

function Ticker() {
  const items = [brand.name, brand.slogan, ...gyms.map((g) => g.name)]
  const row = items.flatMap((t) => [<span key={`${t}a`}>{t}</span>, <i key={`${t}b`} aria-hidden="true">●</i>])
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__in">{row}{row}{row}{row}</div>
    </div>
  )
}

function GymPanels() {
  return (
    <div className="panels">
      {gyms.map((g, i) => (
        <Reveal key={g.id} d={i} className="panel-wrap">
          <Link to="/gyms" className={`panel panel--${g.tone}`}>
            <Photo tone={g.tone} label="Gym photo" className="panel__photo" />
            <span className="panel__num">0{i + 1}</span>
            <span className="panel__body">
              <small>Opens {g.opens.split('–')[0]}:00 · {g.area}</small>
              <b>{g.name}</b>
              <span className="panel__more">{g.short}</span>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}

function ClassRow({ c }) {
  const toast = useToast()
  const [time, name, gym, level, min, spots] = c
  const full = spots === 0
  return (
    <li className="crow">
      <b className="crow__time">{time}</b>
      <span className="crow__name">{name}<small>{min} min · {level}</small></span>
      <span className="crow__gym">{gymName(gym)}</span>
      <span className={`crow__spots${spots > 0 && spots <= 3 ? ' is-low' : ''}`}>{full ? 'Full' : `${spots} spot${spots === 1 ? '' : 's'} left`}</span>
      <button type="button" className={`btn ${full ? '' : 'btn--ink'}`} onClick={() => toast(full ? `You are on the waiting list for ${name}.` : `Booked: ${name}, ${time} at ${gymName(gym)}.`)}>
        {full ? 'Wait list' : 'Book'}
      </button>
    </li>
  )
}

function Plans({ compact }) {
  return (
    <div className={`plans${compact ? ' plans--compact' : ''}`}>
      {plans.map((p, i) => (
        <Reveal key={p.id} d={i} className={`plan${p.hot ? ' plan--hot' : ''}`}>
          {p.hot && <span className="plan__flag">Most popular</span>}
          <h3>{p.name}</h3>
          <p className="plan__price">{p.price}<small> {p.per}</small></p>
          <ul>{p.perks.map((k) => <li key={k}>{k}</li>)}</ul>
          <Link to="/membership" className="btn btn--amber">{p.cta}</Link>
        </Reveal>
      ))}
    </div>
  )
}

function NewsCard({ n, big }) {
  return (
    <Reveal as="article" className={`ncard${big ? ' ncard--big' : ''}`}>
      <Photo tone={n.tone} label="Photo" />
      <div className="ncard__body">
        <p className="ncard__meta"><span>{n.tag}</span> {fmtDate(n.date)}</p>
        <h3>{n.title}</h3>
        <p>{n.text}</p>
      </div>
    </Reveal>
  )
}

export function Home() {
  const today = todayKey()
  const next = schedule[today] ?? []
  return (
    <>
      <Hero />
      <Ticker />
      <section className="band band--stats">
        <div className="wrap stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} d={i} className="stat">
              <b><Counter value={s.value} suffix={s.suffix} /></b>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <SectionTitle title="Our gyms" lead="Three gyms, one membership. Hover or tap a gym to see more." to="/gyms" cta="All gyms" />
          <GymPanels />
        </div>
      </section>
      <section className="band band--white">
        <div className="wrap">
          <SectionTitle title={`Today, ${DAY_NAMES[today]}`} lead="Book a spot up to a week ahead." to="/classes" cta="Full timetable" />
          <Reveal>
            <ul className="classes">{next.map((c) => <ClassRow key={c[0] + c[1]} c={c} />)}</ul>
          </Reveal>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <SectionTitle title="Membership" lead="No hidden fees. Cancel anytime on the monthly plan." to="/membership" cta="Compare plans" />
          <Plans compact />
        </div>
      </section>
      <section className="band band--white">
        <div className="wrap">
          <SectionTitle title="News" to="/news" cta="All news" />
          <div className="ngrid">{news.slice(0, 3).map((n) => <NewsCard key={n.id} n={n} />)}</div>
        </div>
      </section>
      <section className="cta">
        <div className="wrap">
          <Reveal as="h2">Try us for a day.</Reveal>
          <Reveal d={1}><Link to="/membership" className="btn btn--ink btn--lg">Get a day pass <Arrow /></Link></Reveal>
        </div>
      </section>
    </>
  )
}

export function Gyms() {
  const [active, setActive] = useState(gyms[0].id)
  return (
    <>
      <PageHead kicker="Gyms" title="Three gyms, one membership" lead="Different in size and feel. Use all of them with the same card." />
      <section className="band">
        <div className="wrap gyms-top">
          <MapPlaceholder pins={pins} active={active} className="map--wide" />
          <ul className="gyms-tabs" role="tablist" aria-label="Choose a gym">
            {gyms.map((g) => (
              <li key={g.id}>
                <button type="button" role="tab" aria-selected={active === g.id} className={active === g.id ? 'is-on' : ''} onClick={() => { setActive(g.id); document.getElementById(g.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
                  <b>{g.name}</b><span>{g.address}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {gyms.map((g, i) => (
        <section key={g.id} id={g.id} className={`band gym ${i % 2 ? '' : 'band--white'}`}>
          <div className="wrap gym__grid">
            <Reveal className="gym__photo"><Photo tone={g.tone} label="Gym photo" /></Reveal>
            <div className="gym__text">
              <Reveal as="p" className="eyebrow eyebrow--dark">{g.area} · Opens {g.opens.split('–')[0]}:00</Reveal>
              <Reveal as="h2" d={1}>{g.name}</Reveal>
              <Reveal as="p" d={2} className="gym__long">{g.long}</Reveal>
              <Reveal as="ul" d={3} className="ticks">{g.features.map((f) => <li key={f}>{f}</li>)}</Reveal>
              <Reveal d={4} className="gym__facts">
                <dl>
                  <div><dt>Opening hours</dt>{g.hours.map(([d, h]) => <dd key={d}>{d}: {h}</dd>)}</div>
                  <div><dt>Find us</dt><dd>{g.address}</dd><dd>{g.phone}</dd><dd>{g.email}</dd></div>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function Classes() {
  const [day, setDay] = useState(todayKey())
  const [gym, setGym] = useState('all')
  const [level, setLevel] = useState('All levels')
  const list = useMemo(() => (schedule[day] ?? []).filter((c) => (gym === 'all' || c[2] === gym) && (level === 'All levels' || c[3] === level)), [day, gym, level])
  return (
    <>
      <PageHead kicker="Classes" title="Timetable" lead="Book a spot up to a week ahead. Cancel until two hours before." />
      <section className="band band--white">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Day">
            {DAYS.map((d) => (
              <button key={d} type="button" role="tab" aria-selected={day === d} className={day === d ? 'is-on' : ''} onClick={() => setDay(d)}>
                <b>{d}</b>{d === todayKey() && <small>Today</small>}
              </button>
            ))}
          </div>
          <div className="filters">
            <label>Gym
              <select value={gym} onChange={(e) => setGym(e.target.value)}>
                <option value="all">All gyms</option>
                {gyms.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </label>
            <label>Level
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                {levels.map((l) => <option key={l}>{l}</option>)}
              </select>
            </label>
            <span className="filters__count">{list.length} class{list.length === 1 ? '' : 'es'} on {DAY_NAMES[day]}</span>
          </div>
          {list.length ? <ul className="classes" key={`${day}${gym}${level}`}>{list.map((c) => <ClassRow key={c[0] + c[1] + c[2]} c={c} />)}</ul> : <p className="empty">No classes match. Try another day or gym.</p>}
        </div>
      </section>
    </>
  )
}

export function Membership() {
  return (
    <>
      <PageHead kicker="Membership" title="Pick your pass" lead="All plans work at all three gyms." />
      <section className="band">
        <div className="wrap"><Plans /></div>
      </section>
      <section className="band band--white">
        <div className="wrap">
          <SectionTitle title="Compare plans" />
          <Reveal className="tablewrap">
            <table className="compare">
              <thead><tr><th scope="col"><span className="sr">Feature</span></th>{plans.map((p) => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead>
              <tbody>
                {compare.map(([label, ...vals]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {vals.map((v, i) => <td key={i}>{v === true ? <span className="yes" aria-label="Included">✓</span> : v === false ? <span className="no" aria-label="Not included">–</span> : v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>
      <section className="band">
        <div className="wrap wrap--narrow">
          <SectionTitle title="Questions" />
          <div className="faq">{faq.map(([q, a]) => <Reveal as="details" key={q}><summary>{q}</summary><p>{a}</p></Reveal>)}</div>
        </div>
      </section>
    </>
  )
}

export function News() {
  const [first, ...rest] = news
  return (
    <>
      <PageHead kicker="News and events" title="What is going on" />
      <section className="band band--white">
        <div className="wrap">
          <NewsCard n={first} big />
          <div className="ngrid ngrid--mt">{rest.map((n) => <NewsCard key={n.id} n={n} />)}</div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <SectionTitle title="Upcoming events" />
          <ul className="events">
            {events.map((e, i) => (
              <Reveal as="li" key={e.id} d={i} className="event">
                <time dateTime={e.date}><b>{new Date(e.date).getDate()}</b><span>{new Date(e.date).toLocaleDateString('en-GB', { month: 'short' })}</span></time>
                <div><h3>{e.title}</h3><p>{e.text}</p></div>
                <span className="event__where">{e.where} · {e.time}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export function Shop() {
  const toast = useToast()
  return (
    <>
      <PageHead kicker="Shop" title="Club gear" lead="Pick up in the gym. A demo shop: nothing is sold here." />
      <section className="band band--white">
        <div className="wrap">
          <div className="pgrid">
            {products.map((p, i) => (
              <Reveal as="article" key={p.id} d={i % 3} className="product">
                <Photo tone={p.tone} label="Product photo" />
                <div className="product__row">
                  <div><small>{p.tag}</small><h3>{p.name}</h3></div>
                  <b>{p.price} €</b>
                </div>
                <button type="button" className="btn btn--ink" onClick={() => toast(`${p.name} reserved for pick-up (demo).`)}>Reserve</button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function About() {
  return (
    <>
      <PageHead kicker="About us" title={about.title} lead={about.intro} />
      <section className="band band--white">
        <div className="wrap wrap--narrow about__story">{about.story.map((t) => <Reveal as="p" key={t}>{t}</Reveal>)}</div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="values">{about.values.map((v, i) => <Reveal key={v.title} d={i} className="value"><b>0{i + 1}</b><h3>{v.title}</h3><p>{v.text}</p></Reveal>)}</div>
        </div>
      </section>
      <section className="band band--stats">
        <div className="wrap stats">{stats.map((s, i) => <Reveal key={s.label} d={i} className="stat"><b><Counter value={s.value} suffix={s.suffix} /></b><span>{s.label}</span></Reveal>)}</div>
      </section>
    </>
  )
}

export function Contact() {
  const toast = useToast()
  return (
    <>
      <PageHead kicker="Contact" title="Say hello" lead={contact.hours} />
      <section className="band band--white">
        <div className="wrap contact">
          <form className="form" onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); toast('Message sent (demo: nothing is delivered).') }}>
            <label>Name<input required autoComplete="name" /></label>
            <label>Email<input type="email" required autoComplete="email" /></label>
            <label>Gym
              <select defaultValue="">
                <option value="">Any gym</option>
                {gyms.map((g) => <option key={g.id}>{g.name}</option>)}
              </select>
            </label>
            <label>Message<textarea rows="5" required /></label>
            <button type="submit" className="btn btn--ink btn--lg">Send message <Arrow /></button>
          </form>
          <div>
            <MapPlaceholder pins={pins} />
            <ul className="addr">
              {gyms.map((g) => <li key={g.id}><b>{g.name}</b><span>{g.address}</span><span>{g.phone}</span></li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <PageHead kicker="404" title="Page not found" lead="That page does not exist. Try the menu, or go back to the start." />
      <section className="band"><div className="wrap"><Link to="/" className="btn btn--amber btn--lg">Back to start <Arrow /></Link></div></section>
    </>
  )
}
