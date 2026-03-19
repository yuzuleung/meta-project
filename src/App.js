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

const homepageHeroImage =
  'https://images.unsplash.com/photo-1745818016691-14c4020a73ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM3ODg4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const defaultReservationForm = {
  fullName: '',
  email: '',
  phone: '',
  guests: '',
  date: '',
  time: '',
  seating: '',
  requests: '',
};

function validateReservationForm(values) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s()-]{8,20}$/;

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Name should be at least 2 characters.';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.';
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!values.guests) {
    errors.guests = 'Please select the number of guests.';
  }

  if (!values.date) {
    errors.date = 'Please choose a reservation date.';
  }

  if (!values.time) {
    errors.time = 'Please choose a reservation time.';
  }

  if (!values.seating) {
    errors.seating = 'Please choose a seating preference.';
  }

  if (!values.requests.trim()) {
    errors.requests = 'Please add your special requests or write "None".';
  }

  return errors;
}

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
              <h1>Little Lemon</h1>
              <p className="hero-city">Tokyo</p>
              <p className="hero-description">
                A brief description of what type of food it offers.
              </p>
              <p className="hero-description">
                Experience authentic Mediterranean cuisine with a modern twist in
                the heart of Tokyo.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#/reservations">
                  Booking
                </a>
              </div>
            </div>

            <div className="hero-visuals">
              <div className="hero-photo-card">
                <img
                  className="hero-photo-image"
                  src={homepageHeroImage}
                  alt="Little Lemon restaurant interior"
                />
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
  const [formValues, setFormValues] = useState(defaultReservationForm);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormComplete = Object.values(formValues).every(
    (value) => value.trim() !== ''
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = {
      ...formValues,
      [name]: value,
    };

    setFormValues(nextValues);

    if (isSubmitted || touchedFields[name]) {
      setErrors(validateReservationForm(nextValues));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const nextTouched = {
      ...touchedFields,
      [name]: true,
    };

    setTouchedFields(nextTouched);
    setErrors(validateReservationForm(formValues));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateReservationForm(formValues);

    setIsSubmitted(true);
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      guests: true,
      date: true,
      time: true,
      seating: true,
      requests: true,
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  };

  const getFieldError = (fieldName) =>
    touchedFields[fieldName] || isSubmitted ? errors[fieldName] : '';

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
              <form className="reservation-form" noValidate onSubmit={handleSubmit}>
                <label className={getFieldError('fullName') ? 'field-error' : ''}>
                  Full name
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your name"
                    value={formValues.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('fullName'))}
                  />
                  {getFieldError('fullName') && (
                    <span className="error-message">{getFieldError('fullName')}</span>
                  )}
                </label>
                <label className={getFieldError('email') ? 'field-error' : ''}>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('email'))}
                  />
                  {getFieldError('email') && (
                    <span className="error-message">{getFieldError('email')}</span>
                  )}
                </label>
                <label className={getFieldError('phone') ? 'field-error' : ''}>
                  Phone number
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+81 90 1234 5678"
                    value={formValues.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('phone'))}
                  />
                  {getFieldError('phone') && (
                    <span className="error-message">{getFieldError('phone')}</span>
                  )}
                </label>
                <label className={getFieldError('guests') ? 'field-error' : ''}>
                  Guests
                  <select
                    name="guests"
                    value={formValues.guests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('guests'))}
                  >
                    <option value="">Select guests</option>
                    <option value="1 guest">1 guest</option>
                    <option value="2 guests">2 guests</option>
                    <option value="4 guests">4 guests</option>
                    <option value="6 guests">6 guests</option>
                    <option value="8 guests">8 guests</option>
                  </select>
                  {getFieldError('guests') && (
                    <span className="error-message">{getFieldError('guests')}</span>
                  )}
                </label>
                <label className={getFieldError('date') ? 'field-error' : ''}>
                  Date
                  <input
                    type="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('date'))}
                  />
                  {getFieldError('date') && (
                    <span className="error-message">{getFieldError('date')}</span>
                  )}
                </label>
                <label className={getFieldError('time') ? 'field-error' : ''}>
                  Time
                  <select
                    name="time"
                    value={formValues.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('time'))}
                  >
                    <option value="">Select time</option>
                    <option value="11:30">11:30</option>
                    <option value="13:00">13:00</option>
                    <option value="17:30">17:30</option>
                    <option value="19:00">19:00</option>
                    <option value="20:30">20:30</option>
                  </select>
                  {getFieldError('time') && (
                    <span className="error-message">{getFieldError('time')}</span>
                  )}
                </label>
                <label
                  className={`reservation-field-wide ${
                    getFieldError('seating') ? 'field-error' : ''
                  }`}
                >
                  Seating preference
                  <select
                    name="seating"
                    value={formValues.seating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('seating'))}
                  >
                    <option value="">Select seating</option>
                    <option value="Indoor dining room">Indoor dining room</option>
                    <option value="Terrace seating">Terrace seating</option>
                    <option value="Chef's counter">Chef&apos;s counter</option>
                  </select>
                  {getFieldError('seating') && (
                    <span className="error-message">{getFieldError('seating')}</span>
                  )}
                </label>
                <label
                  className={`reservation-field-wide ${
                    getFieldError('requests') ? 'field-error' : ''
                  }`}
                >
                  Special requests
                  <textarea
                    name="requests"
                    rows="5"
                    placeholder="Birthday message, allergies, accessibility needs..."
                    value={formValues.requests}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('requests'))}
                  />
                  {getFieldError('requests') && (
                    <span className="error-message">{getFieldError('requests')}</span>
                  )}
                </label>
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={!isFormComplete}
                >
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
