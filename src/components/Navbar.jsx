import { useEffect, useRef } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Customers" },
];

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("navbar--scrolled", window.scrollY > 40);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header ref={navRef} className="navbar" role="banner">
      <nav className="container navbar__inner" aria-label="Main navigation">
        <a href="/" className="navbar__logo" aria-label="AutoFlow AI home">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="var(--accent)"/>
            <path d="M14 6L8 14h6l-2 8 8-10h-6l2-6z" fill="white"/>
          </svg>
          <span>AutoFlow <strong>AI</strong></span>
        </a>

        <ul className="navbar__links" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="navbar__link">{label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="btn btn--ghost btn--sm" aria-label="Search" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/icons/search.svg" width="16" height="16" alt="" style={{ filter: "invert(0.6)" }} />
          </button>
          <a href="#pricing" className="btn btn--ghost btn--sm">Log in</a>
          <a href="#pricing" className="btn btn--primary btn--sm">Get started</a>
        </div>
      </nav>
    </header>
  );
}