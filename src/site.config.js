// All content of the site lives in this file. Swap the text, numbers, names and colours below and the whole site follows.
// Everything here is placeholder content for a made-up gym chain, "Overload".
//
// - brand:    name, slogan and the accent colour (also set in styles.css as --amber)
// - hero:     the video (public/media), the words that rotate in the headline, the two buttons
// - gyms:     one entry per location; `image` is optional (a path in public/), without it a placeholder is drawn
// - schedule: the weekly timetable: [time, class, gym id, level, minutes, spots left]
// - plans, news, events, products, about, contact: the matching pages

export const brand = {
  name: 'Overload',
  slogan: 'Your gym in town',
  tagline: 'Three gyms. One membership. Everything built around you.',
  year: 2024,
}

export const nav = [
  { to: '/gyms', label: 'Gyms' },
  { to: '/classes', label: 'Classes' },
  { to: '/membership', label: 'Membership' },
  { to: '/news', label: 'News' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
]

export const hero = {
  video: './media/hero.mp4',
  poster: './media/hero-poster.jpg',
  lead: 'Train for',
  words: ['strength', 'speed', 'life'], // the headline cycles through these
  sub: 'Three gyms. One membership. Everything built around you.',
  primary: { label: 'Membership', to: '/membership' },
  secondary: { label: 'Our gyms', to: '/gyms' },
}

export const stats = [
  { value: 3, label: 'Gyms in town' },
  { value: 86, label: 'Classes a week' },
  { value: 7, label: 'Days a week' },
  { value: 5, label: 'First doors open', suffix: ':00' },
]

export const gyms = [
  {
    id: 'north-hall',
    name: 'North Hall',
    area: '1 900 m²',
    opens: '05–23',
    tone: 'a',
    short: 'Free weights, cardio and three studios.',
    long: 'Our biggest gym: a full floor of free weights and machines, a large cardio area and three studios with a class on almost every hour.',
    features: ['Free weights up to 80 kg', 'Cardio area with 60 machines', 'Three class studios', 'Sauna and showers'],
    hours: [['Mon – Fri', '05:00 – 23:00'], ['Sat – Sun', '07:00 – 21:00']],
    address: 'Placeholder Street 1',
    phone: '+00 000 000 001',
    email: 'north@example.com',
    pin: { x: 38, y: 34 }, // position of the pin on the map placeholder, in percent
  },
  {
    id: 'dock-9',
    name: 'Dock 9',
    area: '1 400 m²',
    opens: '06–22',
    tone: 'b',
    short: 'Strength floor with a view of the pool.',
    long: 'A calm, bright gym on the second floor with a view over the swimming pool. A full strength floor, a conditioning corner and a stretching area.',
    features: ['Strength floor with racks', 'Conditioning corner', 'Stretching and mobility area', 'Pool view'],
    hours: [['Mon – Fri', '06:00 – 22:00'], ['Sat – Sun', '08:00 – 20:00']],
    address: 'Placeholder Avenue 9',
    phone: '+00 000 000 002',
    email: 'dock@example.com',
    pin: { x: 64, y: 58 },
  },
  {
    id: 'station',
    name: 'Station',
    area: '1 200 m²',
    opens: '05–23',
    tone: 'c',
    short: 'Conditioning area and a class studio.',
    long: 'Next to the station and open early. A big conditioning area, a boxing corner and a studio for classes before and after work.',
    features: ['Conditioning area', 'Boxing corner', 'Class studio', 'Lockers and showers'],
    hours: [['Mon – Fri', '05:00 – 23:00'], ['Sat – Sun', '07:00 – 21:00']],
    address: 'Placeholder Road 63',
    phone: '+00 000 000 003',
    email: 'station@example.com',
    pin: { x: 52, y: 76 },
  },
]

export const levels = ['All levels', 'Medium', 'Hard']

// [time, class, gym id, level, minutes, spots left]
export const schedule = {
  Mon: [['06:00', 'Strength base', 'north-hall', 'All levels', 45, 8], ['12:15', 'Conditioning 45', 'dock-9', 'Medium', 45, 3], ['17:30', 'Spin', 'station', 'Hard', 50, 1], ['19:00', 'Mobility flow', 'north-hall', 'All levels', 40, 0]],
  Tue: [['06:30', 'Boxing fit', 'station', 'Medium', 45, 6], ['12:00', 'Strength base', 'dock-9', 'All levels', 45, 9], ['17:15', 'HIIT', 'north-hall', 'Hard', 40, 2], ['18:30', 'Yoga', 'north-hall', 'All levels', 60, 12]],
  Wed: [['06:00', 'Spin', 'station', 'Medium', 50, 7], ['12:15', 'Core 30', 'dock-9', 'All levels', 30, 10], ['17:30', 'Strength heavy', 'north-hall', 'Hard', 60, 4], ['19:00', 'Mobility flow', 'dock-9', 'All levels', 40, 9]],
  Thu: [['06:30', 'Conditioning 45', 'station', 'Medium', 45, 5], ['12:00', 'Boxing fit', 'station', 'Medium', 45, 8], ['17:15', 'HIIT', 'dock-9', 'Hard', 40, 0], ['18:30', 'Pilates', 'north-hall', 'All levels', 55, 11]],
  Fri: [['06:00', 'Strength base', 'north-hall', 'All levels', 45, 10], ['12:15', 'Spin', 'station', 'Hard', 50, 6], ['16:30', 'Friday burner', 'north-hall', 'Hard', 45, 3]],
  Sat: [['09:00', 'Strength heavy', 'north-hall', 'Hard', 60, 8], ['10:30', 'Yoga', 'dock-9', 'All levels', 60, 14], ['12:00', 'Open training', 'station', 'All levels', 90, 20]],
  Sun: [['10:00', 'Mobility flow', 'north-hall', 'All levels', 40, 15], ['11:30', 'Conditioning 45', 'station', 'Medium', 45, 9]],
}

export const plans = [
  { id: 'day', name: 'Day pass', price: 15, per: '€ / day', perks: ['All three gyms', 'No contract', 'Locker included'], cta: 'Get a pass' },
  { id: 'monthly', name: 'Monthly', price: 49, per: '€ / month', hot: true, perks: ['All gyms and all classes', 'Cancel anytime', 'One guest pass a month'], cta: 'Join now' },
  { id: 'year', name: 'Year', price: 39, per: '€ / month', perks: ['All gyms and all classes', 'Two free PT sessions', 'Freeze for up to 30 days'], cta: 'Join now' },
]

export const compare = [
  ['All three gyms', true, true, true],
  ['Group classes', false, true, true],
  ['Guest pass', false, '1 / month', '2 / month'],
  ['Personal trainer sessions', false, false, '2 included'],
  ['Freeze membership', false, false, '30 days'],
  ['Cancel anytime', true, true, false],
]

export const faq = [
  ['Can I use all gyms with one membership?', 'Yes. Every plan works at North Hall, Dock 9 and Station.'],
  ['How do I book a class?', 'Open the timetable, pick a class and press Book. You can book up to a week ahead and cancel until two hours before.'],
  ['Can I freeze my membership?', 'The year plan can be frozen for up to 30 days, for example when you travel or are injured.'],
  ['Do you offer personal training?', 'Yes. Book a session at the desk or in the member area. The year plan includes two.'],
]

export const news = [
  { id: 'n1', date: '2024-11-02', tag: 'News', title: 'A new strength floor at Dock 9', text: 'Six new racks and a full set of plates. The floor opens on Monday and the old one stays open while we finish.', tone: 'b' },
  { id: 'n2', date: '2024-10-21', tag: 'Classes', title: 'Early classes before work', text: 'We are adding 06:00 classes on Monday, Wednesday and Friday. Spots open for booking a week ahead.', tone: 'a' },
  { id: 'n3', date: '2024-10-08', tag: 'Members', title: 'Bring a friend month', text: 'Every member gets two extra guest passes in November. Use them at any of the three gyms.', tone: 'c' },
  { id: 'n4', date: '2024-09-15', tag: 'News', title: 'Lockers get a new system', text: 'Digital locks across all gyms. Use your membership card or your phone, and forget the padlock.', tone: 'a' },
]

export const events = [
  { id: 'e1', date: '2024-11-16', time: '10:00', title: 'Open training day', where: 'North Hall', text: 'Try every class for free. All levels.' },
  { id: 'e2', date: '2024-11-23', time: '12:00', title: 'Deadlift clinic', where: 'Dock 9', text: 'Technique session with our coaches.' },
  { id: 'e3', date: '2024-12-07', time: '09:00', title: 'Winter conditioning challenge', where: 'Station', text: 'Team of three, one hour, one score.' },
]

export const products = [
  { id: 'p1', name: 'Club tee', price: 25, tone: 'a', tag: 'Apparel' },
  { id: 'p2', name: 'Training hoodie', price: 55, tone: 'b', tag: 'Apparel' },
  { id: 'p3', name: 'Shaker 700 ml', price: 9, tone: 'c', tag: 'Gear' },
  { id: 'p4', name: 'Gym towel', price: 12, tone: 'a', tag: 'Gear' },
  { id: 'p5', name: 'Lifting straps', price: 14, tone: 'b', tag: 'Gear' },
  { id: 'p6', name: 'Gift card 50 €', price: 50, tone: 'c', tag: 'Gift' },
]

export const about = {
  title: 'A gym built around the people in it',
  intro: 'Overload is a made-up gym chain, used here to show how a gym can present its gyms, classes and membership on one clear website.',
  story: [
    'We opened our first gym in 2012 with one rule: make it easy to train. That still guides everything: simple memberships, a timetable you can read at a glance and gyms that are open when you need them.',
    'Today we run three gyms in town. They are different in size and feel, but you use them all with the same membership.',
  ],
  values: [
    { title: 'Simple', text: 'One membership. One timetable. No small print.' },
    { title: 'Open', text: 'Early mornings, late evenings and every day of the week.' },
    { title: 'For everyone', text: 'Classes for every level, and staff who say hello.' },
  ],
}

export const contact = {
  email: 'hello@example.com',
  phone: '+00 000 000 000',
  hours: 'Reception: Mon – Fri 09:00 – 18:00',
}
