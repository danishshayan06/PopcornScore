import { useState } from "react";

/* ─── Google Font loader ─────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
  `}</style>
);

/* ─── Inline styles ──────────────────────────────────────────── */
const S = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "100vh",
    background: "#0D0B12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
  },
  card: {
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    minHeight: "600px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
  },
  /* LEFT PANEL */
  left: {
    width: "42%",
    flexShrink: 0,
    background: "#0D0B12",
    padding: "44px 36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  filmCell: (top, left, right, bottom, w, h, rot) => ({
    position: "absolute",
    width: w,
    height: h,
    top,
    left,
    right,
    bottom,
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "5px",
    background: "rgba(255,255,255,0.025)",
    transform: `rotate(${rot}deg)`,
    pointerEvents: "none",
  }),
  brandWrap: { position: "relative", zIndex: 2 },
  logoBox: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    background: "#F5C518",
    borderRadius: 10,
    marginBottom: 14,
  },
  brandName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 30,
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.1,
    margin: "0 0 6px",
  },
  accent: { color: "#F5C518" },
  tagline: {
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.08em",
    fontWeight: 300,
    margin: 0,
    textTransform: "uppercase",
  },
  featuredWrap: { position: "relative", zIndex: 2 },
  trendingLabel: {
    fontSize: 10,
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.28)",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  movieCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "14px 16px",
    display: "flex",
    gap: 14,
    alignItems: "center",
  },
  poster: {
    width: 50,
    height: 70,
    borderRadius: 7,
    background: "linear-gradient(140deg,#1e1640,#3c2a78)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },
  movieTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 15,
    color: "#fff",
    fontWeight: 700,
    margin: "0 0 3px",
  },
  movieMeta: {
    fontSize: 11,
    color: "rgba(255,255,255,0.38)",
    margin: "0 0 9px",
    fontWeight: 300,
  },
  starsRow: { display: "flex", gap: 3, marginBottom: 9 },
  scoreBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "rgba(245,197,24,0.13)",
    border: "1px solid rgba(245,197,24,0.28)",
    borderRadius: 20,
    padding: "3px 9px",
  },
  scoreNum: { fontSize: 12, fontWeight: 500, color: "#F5C518" },
  scoreLabel: { fontSize: 10, color: "rgba(245,197,24,0.65)" },
  /* RIGHT PANEL */
  right: {
    flex: 1,
    background: "#F9F8F5",
    padding: "40px 36px",
    display: "flex",
    flexDirection: "column",
  },
  tabsWrap: {
    display: "flex",
    background: "rgba(0,0,0,0.07)",
    borderRadius: 11,
    padding: 4,
    marginBottom: 28,
  },
  tab: (active) => ({
    flex: 1,
    padding: "9px 0",
    border: "none",
    background: active ? "#fff" : "transparent",
    borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    color: active ? "#0D0B12" : "#888",
    cursor: "pointer",
    boxShadow: active ? "0 1px 5px rgba(0,0,0,0.1)" : "none",
    transition: "all 0.2s",
  }),
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "#0D0B12",
    margin: "0 0 5px",
  },
  formSub: {
    fontSize: 13,
    color: "#888",
    margin: "0 0 24px",
    fontWeight: 300,
  },
  field: { marginBottom: 14 },
  label: {
    display: "block",
    fontSize: 10,
    fontWeight: 500,
    color: "#555",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 42,
    border: "1.5px solid #E5E3DF",
    borderRadius: 9,
    background: "#fff",
    padding: "0 14px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#0D0B12",
    outline: "none",
    boxSizing: "border-box",
  },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  btn: {
    width: "100%",
    height: 44,
    background: "#F5C518",
    border: "none",
    borderRadius: 9,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: "#0D0B12",
    cursor: "pointer",
    marginTop: 6,
    letterSpacing: "0.01em",
    transition: "background 0.18s",
  },
  dividerWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: "16px 0",
  },
  dividerLine: { flex: 1, height: 1, background: "#E5E3DF" },
  dividerText: { fontSize: 11, color: "#BBB", fontWeight: 300 },
  socialRow: { display: "flex", gap: 10 },
  socialBtn: {
    flex: 1,
    height: 40,
    border: "1.5px solid #E5E3DF",
    borderRadius: 9,
    background: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: "#444",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    transition: "background 0.18s, border-color 0.18s",
  },
  footerText: {
    fontSize: 12,
    color: "#AAA",
    textAlign: "center",
    marginTop: 18,
    fontWeight: 300,
  },
  footerLink: {
    color: "#0D0B12",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    padding: 0,
  },
  genreWrap: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 },
  chip: (sel) => ({
    padding: "4px 11px",
    borderRadius: 20,
    border: `1.5px solid ${sel ? "#F5C518" : "#E5E3DF"}`,
    background: sel ? "#F5C518" : "#fff",
    fontSize: 11,
    color: sel ? "#0D0B12" : "#666",
    fontWeight: sel ? 500 : 400,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.18s",
  }),
  forgot: {
    fontSize: 11,
    color: "#999",
    textAlign: "right",
    marginTop: -8,
    marginBottom: 14,
    cursor: "pointer",
    textDecoration: "underline",
    textDecorationColor: "transparent",
  },
  passHint: {
    fontSize: 11,
    color: "#AAA",
    marginTop: 4,
    fontWeight: 300,
  },
  terms: {
    fontSize: 11,
    color: "#AAA",
    marginTop: 10,
    fontWeight: 300,
    textAlign: "center",
    lineHeight: 1.6,
  },
};

/* ─── Star SVG ───────────────────────────────────────────────── */
const Star = ({ filled }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill={filled ? "#F5C518" : "rgba(245,197,24,0.22)"}
  >
    <polygon points="7,1 8.8,5.2 13.3,5.5 10,8.4 11,12.9 7,10.5 3,12.9 4,8.4 0.7,5.5 5.2,5.2" />
  </svg>
);

/* ─── Google Icon ────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

/* ─── Facebook Icon ──────────────────────────────────────────── */
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

/* ─── Logo Icon ──────────────────────────────────────────────── */
const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#0D0B12" strokeWidth="2" />
    <path d="M8.5 8L15 11L8.5 14V8Z" fill="#0D0B12" />
    <circle cx="11" cy="3" r="1.4" fill="#0D0B12" />
    <circle cx="11" cy="19" r="1.4" fill="#0D0B12" />
    <circle cx="3" cy="11" r="1.4" fill="#0D0B12" />
    <circle cx="19" cy="11" r="1.4" fill="#0D0B12" />
  </svg>
);

/* ─── Left Panel ─────────────────────────────────────────────── */
const LeftPanel = () => (
  <div style={S.left}>
    {/* decorative film cells */}
    <div style={S.filmCell(55, -18, undefined, undefined, 78, 108, -7)} />
    <div style={S.filmCell(190, 8, undefined, undefined, 58, 82, 5)} />
    <div style={S.filmCell(undefined, -12, undefined, 130, 68, 94, -4)} />
    <div style={S.filmCell(undefined, 28, undefined, 44, 46, 64, 9)} />
    <div style={S.filmCell(145, undefined, 18, undefined, 28, 28, 0)} style2={{ borderRadius: "50%" }} />

    <div style={S.brandWrap}>
      <div style={S.logoBox}>
        <LogoIcon />
      </div>
      <h1 style={S.brandName}>
        Popcorn<br />
        <span style={S.accent}>Score</span>
      </h1>
      <p style={S.tagline}>Rate · Discover · Obsess</p>
    </div>

    <div style={S.featuredWrap}>
      <p style={S.trendingLabel}>Now Trending</p>
      <div style={S.movieCard}>
        <div style={S.poster}>🎬</div>
        <div>
          <p style={S.movieTitle}>Dune: Part Two</p>
          <p style={S.movieMeta}>2024 · Sci-Fi / Adventure</p>
          <div style={S.starsRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} filled={i <= 4} />
            ))}
          </div>
          <div style={S.scoreBadge}>
            <span style={S.scoreNum}>8.4</span>
            <span style={S.scoreLabel}>/ 10 · 48k scores</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Input with focus highlight ─────────────────────────────── */
const Input = ({ type = "text", placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...S.input,
        borderColor: focused ? "#F5C518" : "#E5E3DF",
        boxShadow: focused ? "0 0 0 3px rgba(245,197,24,0.14)" : "none",
      }}
    />
  );
};

/* ─── Sign In Form ───────────────────────────────────────────── */
const SignInForm = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2 style={S.formTitle}>Welcome back</h2>
      <p style={S.formSub}>Sign in to your watchlist &amp; scores</p>

      <div style={S.field}>
        <label style={S.label}>Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={S.field}>
        <label style={S.label}>Password</label>
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <p style={S.forgot}>Forgot password?</p>

      <button style={S.btn}>Sign In →</button>

      <div style={S.dividerWrap}>
        <div style={S.dividerLine} />
        <span style={S.dividerText}>or continue with</span>
        <div style={S.dividerLine} />
      </div>

      <div style={S.socialRow}>
        <button style={S.socialBtn}>
          <GoogleIcon /> Google
        </button>
        <button style={S.socialBtn}>
          <FacebookIcon /> Facebook
        </button>
      </div>

      <p style={S.footerText}>
        No account?{" "}
        <button style={S.footerLink} onClick={onSwitch}>
          Join for free
        </button>
      </p>
    </>
  );
};

/* ─── Genre chips ────────────────────────────────────────────── */
const GENRES = ["Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Thriller", "Anime", "Docs", "Romance", "Mystery"];

const GenreChips = ({ selected, onToggle }) => (
  <div style={S.genreWrap}>
    {GENRES.map((g) => (
      <button key={g} style={S.chip(selected.includes(g))} onClick={() => onToggle(g)}>
        {g}
      </button>
    ))}
  </div>
);

/* ─── Sign Up Form ───────────────────────────────────────────── */
const SignUpForm = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [genres, setGenres]       = useState(["Action", "Sci-Fi"]);

  const toggleGenre = (g) =>
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  return (
    <>
      <h2 style={S.formTitle}>Join the critics</h2>
      <p style={S.formSub}>Your taste matters — start scoring</p>

      <div style={S.row}>
        <div style={S.field}>
          <label style={S.label}>First name</label>
          <Input placeholder="Alex" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div style={S.field}>
          <label style={S.label}>Last name</label>
          <Input placeholder="Renn" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>

      <div style={S.field}>
        <label style={S.label}>Email</label>
        <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div style={S.field}>
        <label style={S.label}>Password</label>
        <Input type="password" placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p style={S.passHint}>Use letters, numbers &amp; symbols for a stronger password.</p>
      </div>

      <div style={S.field}>
        <label style={S.label}>Favorite genres</label>
        <GenreChips selected={genres} onToggle={toggleGenre} />
      </div>

      <button style={{ ...S.btn, marginTop: 14 }}>Create Account →</button>

      <p style={S.terms}>
        By creating an account you agree to our{" "}
        <span style={{ color: "#0D0B12", fontWeight: 500, cursor: "pointer" }}>Terms</span>{" "}
        and{" "}
        <span style={{ color: "#0D0B12", fontWeight: 500, cursor: "pointer" }}>Privacy Policy</span>.
      </p>

      <p style={S.footerText}>
        Already a member?{" "}
        <button style={S.footerLink} onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </>
  );
};

/* ─── Root Component ─────────────────────────────────────────── */
export default function PopcornScore() {
  const [tab, setTab] = useState("signin"); // "signin" | "signup"

  return (
    <>
      <FontLoader />
      <div style={S.root}>
        <div style={S.card}>
          <LeftPanel />

          {/* Right panel */}
          <div style={S.right}>
            {/* Tab switcher */}
            <div style={S.tabsWrap}>
              <button style={S.tab(tab === "signin")} onClick={() => setTab("signin")}>
                Sign In
              </button>
              <button style={S.tab(tab === "signup")} onClick={() => setTab("signup")}>
                Create Account
              </button>
            </div>

            {tab === "signin" ? (
              <SignInForm onSwitch={() => setTab("signup")} />
            ) : (
              <SignUpForm onSwitch={() => setTab("signin")} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
