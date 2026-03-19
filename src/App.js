import { useEffect, useState } from 'react';
import './App.css';

const specials = [
  {
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'Crisp lettuce, cherry tomatoes, feta, and olives with a bright lemon-herb dressing.',
    accent: 'from-olive',
  },
  {
    title: 'Bruschetta',
    price: '$10.50',
    description:
      'Toasted artisan bread layered with tomato confit, basil, and whipped ricotta.',
    accent: 'from-gold',
  },
  {
    title: 'Lemon Dessert',
    price: '$8.25',
    description:
      'Silky citrus cream with shortbread crumble, candied peel, and vanilla bean.',
    accent: 'from-coral',
  },
];

const testimonials = [
  {
    name: 'Aiko S.',
    rating: '★★★★★',
    review:
      'The booking flow was quick and dinner felt special from the moment we arrived.',
  },
  {
    name: 'Marcus T.',
    rating: '★★★★★',
    review:
      'Beautiful atmosphere, thoughtful service, and one of the best tasting menus in Tokyo.',
  },
  {
    name: 'Elena R.',
    rating: '★★★★☆',
    review:
      'Loved the seasonal dishes and how easy it was to reserve a table for the same evening.',
  },
];

const homeNavLinks = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reservations', href: '#/reservations' },
  { label: 'Order Online', href: '#order-online' },
  { label: 'Login', href: '#login' },
];

const reservationNavLinks = [
  { label: 'Home', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Menu', href: '#/menu' },
  { label: 'Reservations', href: '#/reservations' },
  { label: 'Order Online', href: '#/order-online' },
  { label: 'Login', href: '#/login' },
];

function Header({ navLinks }) {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <a className="brand" href="#/" aria-label="Little Lemon home">
          <span className="brand-mark">LL</span>
          <span className="brand-copy">
            <strong>Little Lemon</strong>
            <span>Tokyo</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer({ navLinks }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#/">
            <span className="brand-mark">LL</span>
            <span className="brand-copy">
              <strong>Little Lemon</strong>
              <span>Tokyo</span>
            </span>
          </a>
        </div>

        <div>
          <h3>Navigation</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>1-8-4 Shibuya, Tokyo</li>
            <li>03-5555-0112</li>
            <li>hello@littlelemon.jp</li>
          </ul>
        </div>

        <div>
          <h3>Social Media</h3>
          <ul>
            <li>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                X
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Header navLinks={homeNavLinks} />

      <main>
        <section className="hero-section" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Mediterranean dining, reimagined</p>
              <h1>Little Lemon</h1>
              <p className="hero-city">Tokyo</p>
              <p className="hero-description">
                A warm neighborhood restaurant for seasonal plates, intimate
                dinners, and effortless table reservations.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#/reservations">
                  Reserve a Table
                </a>
              </div>

              <ul className="hero-highlights" aria-label="Key details">
                <li>Open daily from 11:30 to 22:00</li>
                <li>Signature lemon desserts and tasting menu</li>
                <li>Walk-ins welcome, reservations recommended</li>
              </ul>
            </div>

            <div className="hero-visuals">
              <div className="hero-photo-card" aria-hidden="true">
                <div className="photo-overlay">
                  <span>Chef&apos;s Table</span>
                  <strong>Seasonal tasting experience</strong>
                </div>
              </div>
              <div className="hero-feature-strip" aria-label="Dining features">
                <article className="hero-feature-card">
                  <p className="hero-feature-label">Signature</p>
                  <h2>Seasonal menu</h2>
                  <p>
                    Fresh Mediterranean plates with citrus-led flavors and a
                    refined Tokyo presentation.
                  </p>
                </article>
                <article className="hero-feature-card">
                  <p className="hero-feature-label">Experience</p>
                  <h2>Warm hospitality</h2>
                  <p>
                    Designed for date nights, group dinners, and memorable
                    celebrations with smooth service.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="specials-section" id="menu">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Highlights</p>
                <h2>This week&apos;s specials</h2>
              </div>
              <a
                className="button button-dark"
                href="#order-online"
                id="order-online"
              >
                Online Menu
              </a>
            </div>

            <div className="specials-grid">
              {specials.map((item) => (
                <article className="special-card" key={item.title}>
                  <div className={`dish-photo ${item.accent}`} aria-hidden="true" />
                  <div className="special-card-body">
                    <div className="special-meta">
                      <h3>{item.title}</h3>
                      <span>{item.price}</span>
                    </div>
                    <p>{item.description}</p>
                    <a href="#/reservations">Reserve this experience</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="section-heading centered">
              <div>
                <p className="eyebrow">Testimonials</p>
                <h2>Guests love the atmosphere</h2>
              </div>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((item) => (
                <article className="testimonial-card" key={item.name}>
                  <p className="rating">{item.rating}</p>
                  <div className="guest-row">
                    <div className="guest-avatar" aria-hidden="true">
                      {item.name[0]}
                    </div>
                    <div>
                      <h3>{item.name}</h3>
                      <p className="guest-role">Verified diner</p>
                    </div>
                  </div>
                  <p className="review-copy">{item.review}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-grid">
            <div className="about-copy">
              <p className="eyebrow">About</p>
              <h2>Little Lemon</h2>
              <p className="hero-city">Tokyo</p>
              <p>
                Little Lemon pairs relaxed hospitality with elegant Mediterranean
                flavors. The space is designed for lunch catch-ups, date nights,
                and celebration dinners that feel polished without being formal.
              </p>
              <p>
                Every reservation unlocks a tailored experience, from preferred
                seating to seasonal recommendations prepared by our kitchen team.
              </p>
            </div>

            <div className="about-gallery" aria-hidden="true">
              <div className="gallery-tall"></div>
              <div className="gallery-square"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer navLinks={homeNavLinks} />
    </>
  );
}

function ReservationsPage() {
  return (
    <>
      <Header navLinks={reservationNavLinks} />

      <main className="reservations-page">
        <section className="reservation-hero">
          <div className="container reservation-hero-grid">
            <div className="reservation-copy">
              <p className="eyebrow">Reservations</p>
              <h1>Reserve your table</h1>
              <p className="hero-city">Little Lemon Tokyo</p>
              <p className="hero-description">
                Plan your visit with a dedicated booking flow for dinner dates,
                family meals, and celebratory evenings.
              </p>
              <div className="reservation-tags" aria-label="Reservation details">
                <span>Same-day slots available</span>
                <span>Indoor and terrace seating</span>
                <span>Special occasion notes welcome</span>
              </div>
            </div>

            <div className="reservation-summary-card">
              <p className="booking-label">Dining hours</p>
              <h2>Service schedule</h2>
              <ul className="summary-list">
                <li>Lunch: 11:30 - 14:30</li>
                <li>Dinner: 17:30 - 22:00</li>
                <li>Peak reservation window: 19:00 - 20:00</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="reservation-form-section">
          <div className="container reservation-layout">
            <div className="reservation-form-card">
              <p className="booking-label">Booking form</p>
              <h2>Complete your reservation</h2>
              <form className="reservation-form">
                <label>
                  Full name
                  <input type="text" placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="name@example.com" />
                </label>
                <label>
                  Phone number
                  <input type="tel" placeholder="+81 90 1234 5678" />
                </label>
                <label>
                  Guests
                  <select defaultValue="2 guests">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>4 guests</option>
                    <option>6 guests</option>
                    <option>8 guests</option>
                  </select>
                </label>
                <label>
                  Date
                  <input type="date" defaultValue="2026-03-21" />
                </label>
                <label>
                  Time
                  <select defaultValue="19:00">
                    <option>11:30</option>
                    <option>13:00</option>
                    <option>17:30</option>
                    <option>19:00</option>
                    <option>20:30</option>
                  </select>
                </label>
                <label className="reservation-field-wide">
                  Seating preference
                  <select defaultValue="Indoor dining room">
                    <option>Indoor dining room</option>
                    <option>Terrace seating</option>
                    <option>Chef&apos;s counter</option>
                  </select>
                </label>
                <label className="reservation-field-wide">
                  Special requests
                  <textarea
                    rows="5"
                    placeholder="Birthday message, allergies, accessibility needs..."
                  />
                </label>
                <button className="button button-primary" type="submit">
                  Confirm reservation
                </button>
              </form>
            </div>

            <aside className="reservation-side-panel">
              <div className="reservation-info-card">
                <p className="booking-label">What to expect</p>
                <h2>Reservation notes</h2>
                <ul className="summary-list">
                  <li>Tables are held for 15 minutes after booking time.</li>
                  <li>Large parties may be contacted to confirm details.</li>
                  <li>Dietary requests are accommodated whenever possible.</li>
                </ul>
              </div>

              <div className="reservation-image-card" aria-hidden="true">
                <div className="photo-overlay">
                  <span>Little Lemon</span>
                  <strong>Evenings shaped around your table</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer navLinks={reservationNavLinks} />
    </>
  );
}

function getRouteState() {
  const hash = window.location.hash || '#/';

  if (hash === '#/reservations') {
    return { route: 'reservations', section: null };
  }

  if (hash.startsWith('#/')) {
    return { route: 'home', section: hash.replace('#/', '') || 'home' };
  }

  if (hash.startsWith('#')) {
    return { route: 'home', section: hash.replace('#', '') || 'home' };
  }

  return { route: 'home', section: 'home' };
}

function scrollToTop() {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    window.scrollTo(0, 0);
  }
}

function App() {
  const [routeState, setRouteState] = useState(getRouteState);

  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(getRouteState());
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (routeState.route === 'reservations') {
      scrollToTop();
      return;
    }

    const targetId = routeState.section || 'home';
    const target = document.getElementById(targetId);

    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    scrollToTop();
  }, [routeState]);

  return (
    <div className="app-shell">
      {routeState.route === 'reservations' ? <ReservationsPage /> : <HomePage />}
    </div>
  );
}

export default App;
