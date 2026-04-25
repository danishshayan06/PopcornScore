import { useState } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0f;
    --surface: #17171b;
    --border: rgba(255,255,255,0.08);
    --accent: #c8f53c;
    --accent2: #f5c842;
    --text: #f0f0f0;
    --muted: #777;
    --card-radius: 10px;
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  /* HEADER */
  .header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,10,12,0.92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 32px; height: 60px;
    gap: 20px;
  }
  .header-logo {
    font-family: var(--font-display);
    font-size: 26px; letter-spacing: 1px;
    cursor: pointer; white-space: nowrap;
  }
  .header-logo span { color: var(--accent2); }
  .header-search {
    flex: 1; max-width: 480px;
    height: 36px; border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text); padding: 0 18px;
    font-family: var(--font-body); font-size: 14px;
    outline: none; transition: border 0.2s;
  }
  .header-search:focus { border-color: var(--accent); }
  .header-btns { display: flex; gap: 8px; }
  .nav-btn {
    height: 34px; padding: 0 16px;
    background: var(--accent); color: #000;
    border: none; border-radius: 20px;
    font-family: var(--font-body); font-size: 13px;
    font-weight: 600; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .nav-btn:hover { background: #a8d430; transform: scale(1.04); }

  /* HOME PAGE */
  .hero {
    position: relative; width: 100%; height: calc(100vh - 60px);
    overflow: hidden; cursor: pointer;
  }
  .hero-img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.55);
    transition: transform 6s ease;
  }
  .hero:hover .hero-img { transform: scale(1.03); }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.85) 35%, transparent 80%),
                linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  }
  .hero-content {
    position: absolute; bottom: 60px; left: 56px;
    max-width: 420px;
  }
  .hero-badge {
    display: inline-block;
    background: var(--accent2); color: #000;
    font-size: 11px; font-weight: 700;
    letter-spacing: 2px; padding: 4px 12px;
    border-radius: 3px; margin-bottom: 16px; text-transform: uppercase;
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: 68px; line-height: 1;
    letter-spacing: 1px; margin-bottom: 18px;
  }
  .hero-meta { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 18px; }
  .hero-tag {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 4px 12px; border-radius: 20px;
    font-size: 13px;
  }
  .hero-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: #000;
    font-weight: 700; font-size: 14px;
    padding: 12px 28px; border-radius: 8px;
    border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .hero-btn:hover { background: #a8d430; transform: scale(1.03); }

  /* GENRE SECTIONS */
  .section { padding: 10px 0 30px; }
  .section-label {
    font-family: var(--font-display);
    font-size: 28px; letter-spacing: 1px;
    padding: 0 32px 12px;
    border-left: 4px solid var(--accent);
    margin: 0 32px 0;
  }
  .movies-row {
    display: flex; gap: 14px;
    padding: 12px 32px;
    overflow-x: auto;
  }
  .movies-row::-webkit-scrollbar { height: 4px; }
  .movies-row::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 4px; }

  /* MOVIE CARD */
  .movie-card {
    flex-shrink: 0; width: 160px; cursor: pointer;
    transition: transform 0.2s ease;
  }
  .movie-card:hover { transform: translateY(-6px); }
  .movie-card-img-wrap {
    width: 160px; height: 220px;
    border-radius: var(--card-radius);
    overflow: hidden; position: relative;
    background: var(--surface);
  }
  .movie-card-img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
  }
  .movie-card-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #1e1e24, #2a2a33);
    display: flex; align-items: center; justify-content: center;
    font-size: 40px;
  }
  .movie-card-title {
    font-size: 13px; font-weight: 600;
    margin-top: 8px; line-height: 1.3;
  }
  .movie-card-rating {
    font-size: 12px; color: var(--accent2);
    font-weight: 500; margin-top: 3px;
  }

  /* BANNER (movie/actor/director pages) */
  .banner {
    position: relative; width: 100%; height: 55vh;
    overflow: hidden;
  }
  .banner-img {
    width: 100%; height: 100%;
    object-fit: cover; filter: brightness(0.45);
  }
  .banner-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #1a1a22, #2a2a38);
    display: flex; align-items: center; justify-content: center;
    font-size: 80px;
  }
  .banner-grad {
    position: absolute; inset: 0;
    background: linear-gradient(to top, var(--bg) 0%, transparent 60%);
  }
  .banner-info {
    position: absolute; bottom: 30px; left: 48px;
  }
  .banner-info h1 {
    font-family: var(--font-display);
    font-size: 56px; letter-spacing: 1px;
    line-height: 1; margin-bottom: 6px;
  }
  .banner-info p {
    color: var(--accent); font-weight: 500;
    font-size: 15px; letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* DETAILS */
  .details-wrap { padding: 40px 48px; max-width: 860px; }
  .info-line {
    font-size: 15px; margin-bottom: 10px;
    line-height: 1.5; color: #ccc;
  }
  .info-line strong { color: var(--text); }
  .biography { margin-top: 24px; line-height: 1.7; font-size: 15px; color: #bbb; }
  .biography strong { color: var(--text); font-size: 16px; display: block; margin-bottom: 8px; }

  /* CAST ROW */
  .person-card {
    flex-shrink: 0; width: 160px; cursor: pointer;
    transition: transform 0.2s;
  }
  .person-card:hover { transform: translateY(-5px); }
  .person-card-img {
    width: 160px; height: 200px;
    border-radius: var(--card-radius);
    overflow: hidden; position: relative;
    background: var(--surface);
  }
  .person-card-img img { width: 100%; height: 100%; object-fit: cover; }
  .person-card-img .placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #1e1e24, #2a2a33);
    display: flex; align-items: center; justify-content: center;
    font-size: 36px;
  }
  .name-overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.88), transparent);
    padding: 20px 8px 8px;
    text-align: center; font-size: 13px; font-weight: 600;
  }

  /* LOGIN PAGE */
  .login-page {
    display: flex; height: calc(100vh - 60px);
  }
  .login-left {
    width: 50%;
    background: radial-gradient(ellipse at 30% 50%, #1a1a2e, #0d0d0f);
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    position: relative; overflow: hidden;
    border-right: 1px solid var(--border);
  }
  .login-left::before {
    content: ''; position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(200,245,60,0.08), transparent 70%);
    border-radius: 50%; top: 30%; left: 50%;
    transform: translate(-50%, -50%);
  }
  .login-brand-title {
    font-family: var(--font-display);
    font-size: 48px; letter-spacing: 2px;
    text-align: center; margin-bottom: 8px;
  }
  .login-brand-title span { color: var(--accent2); }
  .login-tagline {
    font-size: 11px; letter-spacing: 3px;
    color: var(--muted); text-transform: uppercase;
    margin-bottom: 40px;
  }
  .login-film-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    padding: 18px 22px; border-radius: 12px;
    width: 260px;
  }
  .login-film-card h4 {
    font-size: 16px; margin-bottom: 6px;
  }
  .login-film-card p {
    font-size: 12px; color: var(--muted);
  }
  .login-right {
    width: 50%;
    background: #f3f3f0;
    display: flex; align-items: center; justify-content: center;
  }
  .login-box {
    width: 340px;
    background: white;
    border-radius: 20px;
    padding: 34px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  }
  .login-tabs {
    display: flex;
    background: #eee; border-radius: 10px;
    overflow: hidden; margin-bottom: 24px;
  }
  .login-tab {
    flex: 1; text-align: center; padding: 10px;
    font-size: 14px; cursor: pointer;
    transition: background 0.2s, font-weight 0.1s;
    color: #444;
  }
  .login-tab.active {
    background: white; font-weight: 700; color: #111;
  }
  .login-box h2 { font-size: 22px; color: #111; margin-bottom: 4px; }
  .login-box .sub { font-size: 13px; color: #999; margin-bottom: 16px; }
  .login-input {
    width: 100%; padding: 11px 14px;
    margin-top: 10px; border: 1.5px solid #e0e0e0;
    border-radius: 10px; font-size: 14px;
    font-family: var(--font-body); outline: none;
    transition: border 0.2s;
  }
  .login-input:focus { border-color: #c8f53c; }
  .login-submit {
    width: 100%; padding: 13px;
    background: var(--accent2); color: #000;
    border: none; margin-top: 18px;
    border-radius: 10px; font-weight: 700;
    font-size: 15px; cursor: pointer;
    font-family: var(--font-body);
    transition: background 0.2s;
  }
  .login-submit:hover { background: #e0b030; }
  .login-footer {
    text-align: center; font-size: 13px;
    margin-top: 14px; color: #999;
  }
  .login-footer b { color: #111; cursor: pointer; }

  /* MISC */
  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    margin: 20px 48px 0;
    font-size: 13px; color: var(--muted);
    cursor: pointer; transition: color 0.2s;
  }
  .back-btn:hover { color: var(--accent); }

  @media (max-width: 700px) {
    .hero-title { font-size: 42px; }
    .hero-content { left: 24px; bottom: 40px; }
    .login-page { flex-direction: column; }
    .login-left, .login-right { width: 100%; height: auto; padding: 40px 20px; }
    .details-wrap { padding: 24px 20px; }
    .banner-info { left: 20px; }
    .banner-info h1 { font-size: 36px; }
  }
`;

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function Header({ navigate }) {
  return (
    <header className="header">
      <div className="header-logo" onClick={() => navigate("home")}>
        Popcorn <span>Score</span>
      </div>
      <input className="header-search" type="text" placeholder="Search a movie…" />
      <div className="header-btns">
        <button className="nav-btn">Genre</button>
        <button className="nav-btn">Country</button>
        <button className="nav-btn">Movies</button>
      </div>
    </header>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const GENRES = [
  { label: "Action", emoji: "💥", movies: [
    { title: "Mad Max: Fury Road", rating: "8.1" },
    { title: "John Wick", rating: "7.4" },
    { title: "Top Gun: Maverick", rating: "8.3" },
    { title: "Mission Impossible", rating: "7.6" },
  ]},
  { label: "Horror", emoji: "👁️", movies: [
    { title: "Hereditary", rating: "7.3" },
    { title: "The Shining", rating: "8.4" },
    { title: "Get Out", rating: "7.7" },
    { title: "A Quiet Place", rating: "7.5" },
  ]},
  { label: "Comedy", emoji: "😂", movies: [
    { title: "The Grand Budapest Hotel", rating: "8.1" },
    { title: "Superbad", rating: "7.6" },
    { title: "Knives Out", rating: "7.9" },
    { title: "Game Night", rating: "7.0" },
  ]},
  { label: "Drama", emoji: "🎭", movies: [
    { title: "The Godfather", rating: "9.2" },
    { title: "Schindler's List", rating: "9.0" },
    { title: "There Will Be Blood", rating: "8.2" },
    { title: "Moonlight", rating: "7.4" },
  ]},
  { label: "Sci-Fi", emoji: "🚀", movies: [
    { title: "Dune (2021)", rating: "8.0" },
    { title: "Interstellar", rating: "8.7" },
    { title: "Blade Runner 2049", rating: "8.0" },
    { title: "Arrival", rating: "7.9" },
  ]},
  { label: "Romance", emoji: "💗", movies: [
    { title: "Call Me by Your Name", rating: "7.9" },
    { title: "La La Land", rating: "8.0" },
    { title: "Before Sunrise", rating: "8.1" },
    { title: "Portrait of a Lady", rating: "8.1" },
  ]},
];

function HomePage({ navigate }) {
  return (
    <div>
      {/* Hero */}
      <div className="hero" onClick={() => navigate("movie")}>
        <div className="hero-overlay" />
        <div className="banner-placeholder" style={{ position: "absolute", inset: 0, fontSize: 120 }}>🎬</div>
        <div className="hero-content">
          <span className="hero-badge">⭐ Top Rated</span>
          <h1 className="hero-title">Dune<br/>(2021)</h1>
          <div className="hero-meta">
            <span className="hero-tag">Sci-Fi</span>
            <span className="hero-tag">Adventure</span>
            <span className="hero-tag">PG-13</span>
            <span className="hero-tag">2h 35m</span>
          </div>
          <button className="hero-btn" onClick={() => navigate("movie")}>
            ▶ View Details
          </button>
        </div>
      </div>

      {/* Genre sections */}
      {GENRES.map((genre) => (
        <section className="section" key={genre.label}>
          <div style={{ padding: "0 32px 12px", display: "flex", alignItems: "center", gap: 12 }}>
            <h2 className="section-label">{genre.label}</h2>
          </div>
          <div className="movies-row">
            {genre.movies.map((m) => (
              <div className="movie-card" key={m.title} onClick={() => navigate("movie")}>
                <div className="movie-card-img-wrap">
                  <div className="movie-card-placeholder">{genre.emoji}</div>
                </div>
                <div className="movie-card-title">{m.title}</div>
                <div className="movie-card-rating">★ {m.rating}/10</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ─── MOVIE DETAILS PAGE ───────────────────────────────────────────────────────
function MoviePage({ navigate }) {
  return (
    <div>
      <div className="back-btn" onClick={() => navigate("home")}>← Back to Home</div>
      <div className="banner" style={{ marginTop: 12 }}>
        <div className="banner-placeholder">🎬</div>
        <div className="banner-grad" />
        <div className="banner-info">
          <h1>Dune (2021)</h1>
          <p>★ IMDb Rating: 8.0 / 10</p>
        </div>
      </div>

      <div className="details-wrap">
        <div className="info-line"><strong>Genre:</strong> Sci-Fi, Adventure</div>
        <div className="info-line"><strong>Director:</strong> Denis Villeneuve</div>
        <div className="info-line"><strong>Runtime:</strong> 2h 35m</div>
        <div className="info-line"><strong>Language:</strong> English</div>
        <div className="info-line"><strong>Country:</strong> USA</div>
        <div className="biography">
          <strong>Description</strong>
          <p>A young nobleman travels to a dangerous desert planet to secure the future of his people. As rival forces fight for control of the universe's most valuable resource, he must rise to become a leader — and face a destiny greater than he ever imagined.</p>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, padding: "0 48px 12px", borderLeft: "4px solid var(--accent)", margin: "0 48px 0" }}>Cast</h2>
      <div className="movies-row" style={{ padding: "12px 48px" }}>
        {["Timothée Chalamet", "Zendaya", "Oscar Isaac", "Rebecca Ferguson"].map(name => (
          <div className="person-card" key={name} onClick={() => navigate("actor")}>
            <div className="person-card-img">
              <div className="placeholder">🎭</div>
              <div className="name-overlay">{name}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, padding: "24px 48px 12px", borderLeft: "4px solid var(--accent)", margin: "0 48px 0" }}>Directors</h2>
      <div className="movies-row" style={{ padding: "12px 48px" }}>
        <div className="person-card" onClick={() => navigate("director")}>
          <div className="person-card-img">
            <div className="placeholder">🎥</div>
            <div className="name-overlay">Denis Villeneuve</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ACTOR DETAILS PAGE ───────────────────────────────────────────────────────
function ActorPage({ navigate }) {
  return (
    <div>
      <div className="back-btn" onClick={() => navigate("movie")}>← Back to Movie</div>
      <div className="banner" style={{ marginTop: 12 }}>
        <div className="banner-placeholder">🎭</div>
        <div className="banner-grad" />
        <div className="banner-info">
          <h1>Timothée Chalamet</h1>
          <p>Actor</p>
        </div>
      </div>

      <div className="details-wrap">
        <div className="info-line"><strong>Full Name:</strong> Timothée Hal Chalamet</div>
        <div className="info-line"><strong>Age:</strong> 29 Years</div>
        <div className="info-line"><strong>Date of Birth:</strong> 27 December 1995</div>
        <div className="info-line"><strong>Nationality:</strong> American-French</div>
        <div className="info-line"><strong>Years Active:</strong> 2008–Present</div>
        <div className="biography">
          <strong>Biography</strong>
          <p>Timothée Chalamet is an American-French actor who rose to international acclaim with his role in Call Me by Your Name (2017), earning an Academy Award nomination at just 22, making him the third-youngest Best Actor nominee in history. He has since starred in major productions including Little Women, Dune, and Wonka, establishing himself as one of Hollywood's most sought-after young talents.</p>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, padding: "0 48px 12px", borderLeft: "4px solid var(--accent)", margin: "0 48px 0" }}>Other Movies</h2>
      <div className="movies-row" style={{ padding: "12px 48px" }}>
        {[
          { title: "Call Me by Your Name", rating: "7.9" },
          { title: "Little Women", rating: "7.8" },
          { title: "Wonka", rating: "7.0" },
          { title: "The French Dispatch", rating: "6.9" },
        ].map(m => (
          <div className="movie-card" key={m.title} onClick={() => navigate("movie")}>
            <div className="movie-card-img-wrap">
              <div className="movie-card-placeholder">🎬</div>
            </div>
            <div className="movie-card-title">{m.title}</div>
            <div className="movie-card-rating">★ {m.rating}/10</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DIRECTOR DETAILS PAGE ────────────────────────────────────────────────────
function DirectorPage({ navigate }) {
  return (
    <div>
      <div className="back-btn" onClick={() => navigate("movie")}>← Back to Movie</div>
      <div className="banner" style={{ marginTop: 12 }}>
        <div className="banner-placeholder">🎥</div>
        <div className="banner-grad" />
        <div className="banner-info">
          <h1>Denis Villeneuve</h1>
          <p>Director</p>
        </div>
      </div>

      <div className="details-wrap">
        <div className="info-line"><strong>Full Name:</strong> Denis Villeneuve</div>
        <div className="info-line"><strong>Age:</strong> 56 Years</div>
        <div className="info-line"><strong>Date of Birth:</strong> 3 October 1967</div>
        <div className="info-line"><strong>Nationality:</strong> Canadian</div>
        <div className="info-line"><strong>Years Active:</strong> 1994–Present</div>
        <div className="info-line"><strong>Known For:</strong> Sci-Fi, Psychological Thriller</div>
        <div className="biography">
          <strong>Biography</strong>
          <p>Denis Villeneuve is a Canadian filmmaker celebrated for his visually stunning and psychologically complex films. He gained international attention with Incendies (2010), and went on to direct acclaimed works including Prisoners, Enemy, Sicario, Arrival, and Blade Runner 2049. His two-part adaptation of Frank Herbert's Dune is widely regarded as one of the greatest sci-fi epics ever made.</p>
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, padding: "0 48px 12px", borderLeft: "4px solid var(--accent)", margin: "0 48px 0" }}>Directed Movies</h2>
      <div className="movies-row" style={{ padding: "12px 48px" }}>
        {[
          { title: "Arrival", rating: "7.9" },
          { title: "Blade Runner 2049", rating: "8.0" },
          { title: "Sicario", rating: "7.6" },
          { title: "Prisoners", rating: "8.1" },
        ].map(m => (
          <div className="movie-card" key={m.title} onClick={() => navigate("movie")}>
            <div className="movie-card-img-wrap">
              <div className="movie-card-placeholder">🎬</div>
            </div>
            <div className="movie-card-title">{m.title}</div>
            <div className="movie-card-rating">★ {m.rating}/10</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ navigate }) {
  const [tab, setTab] = useState("signin");
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand-title">Popcorn <span>Score</span></div>
        <p className="login-tagline">Rate · Discover · Obsess</p>
        <div className="login-film-card">
          <h4>Dune: Part Two</h4>
          <p>Sci-Fi · Adventure · ★ 8.4/10</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <div className="login-tabs">
            <div className={`login-tab ${tab === "signin" ? "active" : ""}`} onClick={() => setTab("signin")}>Sign In</div>
            <div className={`login-tab ${tab === "register" ? "active" : ""}`} onClick={() => setTab("register")}>Create Account</div>
          </div>
          {tab === "signin" ? (
            <>
              <h2>Welcome back</h2>
              <p className="sub">Sign in to your watchlist & scores</p>
              <input className="login-input" type="email" placeholder="Email" />
              <input className="login-input" type="password" placeholder="Password" />
              <button className="login-submit" onClick={() => navigate("home")}>Sign In →</button>
              <div className="login-footer">No account? <b onClick={() => setTab("register")}>Join for free</b></div>
            </>
          ) : (
            <>
              <h2>Join for free</h2>
              <p className="sub">Create your account in seconds</p>
              <input className="login-input" type="text" placeholder="Full Name" />
              <input className="login-input" type="email" placeholder="Email" />
              <input className="login-input" type="password" placeholder="Password" />
              <button className="login-submit" onClick={() => navigate("home")}>Create Account →</button>
              <div className="login-footer">Already have an account? <b onClick={() => setTab("signin")}>Sign In</b></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
export default function Home() {
  const [page, setPage] = useState("login");

  const navigate = (p) => setPage(p);

  const showHeader = page !== "login";

  return (
    <>
      <style>{css}</style>
      {showHeader && <Header navigate={navigate} />}
      {page === "login"    && <LoginPage    navigate={navigate} />}
      {page === "home"     && <HomePage     navigate={navigate} />}
      {page === "movie"    && <MoviePage    navigate={navigate} />}
      {page === "actor"    && <ActorPage    navigate={navigate} />}
      {page === "director" && <DirectorPage navigate={navigate} />}
    </>
  );
}
