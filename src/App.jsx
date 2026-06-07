import useWindowSize from './hooks/useWindowSize';
import './App.css';

// Breakpoint that separates mobile from desktop/laptop
const MOBILE_BREAKPOINT = 768;

// --- Fake streaming data shown in the UI ---
const FEATURED = {
  title: 'Galactic Drift',
  genre: 'Sci-Fi · Action',
  rating: '98% Match',
  description:
    'A rogue pilot and a rebel AI must navigate a collapsing galaxy to deliver humanity\'s last hope before the stars go dark.',
};

const TRENDING = [
  { id: 1, title: 'Neon Requiem', genre: 'Thriller' },
  { id: 2, title: 'The Quiet Shore', genre: 'Drama' },
  { id: 3, title: 'Iron Bloom', genre: 'Action' },
  { id: 4, title: 'Velvet Storm', genre: 'Romance' },
  { id: 5, title: 'Deep Signal', genre: 'Mystery' },
  { id: 6, title: 'Frost Protocol', genre: 'Sci-Fi' },
];

// Placeholder thumbnail colors for the cards
const CARD_COLORS = ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#2b2d42', '#3d405b'];

export default function App() {
  // Get live window dimensions from our custom hook
  const { width, height } = useWindowSize();

  // Decide which layout to render based on the current width
  const isMobile = width < MOBILE_BREAKPOINT;

  return (
    <div className={`app ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* ── NAV ── */}
      <nav className="navbar">
        <span className="logo">▶ StreamFlow</span>

        {/* Desktop nav shows full links; mobile collapses to a menu icon */}
        {isMobile ? (
          <button className="menu-btn" aria-label="Menu">☰</button>
        ) : (
          <ul className="nav-links">
            <li>Home</li>
            <li>Movies</li>
            <li>Series</li>
            <li>My List</li>
          </ul>
        )}

        {/* Window size badge — always visible */}
        <div className="size-badge" data-testid="size-badge">
          {width} × {height}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">{FEATURED.rating}</p>
          <h1 className="hero-title">{FEATURED.title}</h1>
          <p className="hero-genre">{FEATURED.genre}</p>
          {/* Description is hidden on mobile to save space */}
          {!isMobile && (
            <p className="hero-desc">{FEATURED.description}</p>
          )}
          <div className="hero-buttons">
            <button className="btn-play">▶ Play</button>
            {!isMobile && <button className="btn-more">ℹ More Info</button>}
          </div>
        </div>
      </section>

      {/* ── LAYOUT INFO STRIP ── */}
      <div className="layout-strip" data-testid="layout-strip">
        <span className="layout-label">
          {isMobile ? '📱 Mobile Layout' : '🖥️ Desktop Layout'}
        </span>
        <span className="size-display">
          Width: <strong>{width}px</strong> · Height: <strong>{height}px</strong>
        </span>
        <span className="breakpoint-note">
          (breakpoint: {MOBILE_BREAKPOINT}px)
        </span>
      </div>

      {/* ── TRENDING ROW ── */}
      <section className="trending">
        <h2 className="section-title">Trending Now</h2>

        {/*
          Desktop: horizontal scrolling row of cards
          Mobile: compact 2-column grid
        */}
        <div className={isMobile ? 'cards-grid' : 'cards-row'}>
          {TRENDING.map((show, i) => (
            <div
              key={show.id}
              className="card"
              style={{ background: CARD_COLORS[i % CARD_COLORS.length] }}
            >
              <div className="card-thumb" />
              <div className="card-info">
                <p className="card-title">{show.title}</p>
                {/* Genre tag only shown on desktop */}
                {!isMobile && <p className="card-genre">{show.genre}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <p>StreamFlow © 2025 — useWindowSize Demo</p>
        {!isMobile && (
          <p className="footer-sub">
            Resize the window to switch between mobile and desktop layouts.
          </p>
        )}
      </footer>
    </div>
  );
}
