import { useEffect, useRef } from "react";

const stats = [
  { value: "10×", label: "Faster pipelines" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "500M+", label: "Records processed" },
];

export default function Hero() {
  const orbRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!orbRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero__bg">
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__orb" ref={orbRef} aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />
      </div>

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          AI-Native Automation · Now in General Availability
        </div>

        <h1 className="hero__title">
          Data flows that<br />
          <span className="hero__title-accent">think ahead</span>
        </h1>

        <p className="hero__sub">
          AutoFlow AI connects your entire data stack and automates every pipeline —
          without writing infrastructure code. Ship in hours, not sprints.
        </p>

        <div className="hero__actions">
          <button className="btn btn--primary" type="button">
            Start building free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn--ghost" type="button"  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
            Watch demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <ul className="hero__stats" aria-label="Key statistics">
          {stats.map(({ value, label }) => (
            <li key={label} className="hero__stat">
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </li>
          ))}
        </ul>

        <div className="hero__logos" aria-label="Trusted by">
          <span className="hero__logos-label">Trusted by teams at</span>
          <div className="hero__logos-row">
            {["Stripe", "Linear", "Vercel", "Notion", "Figma"].map(name => (
              <span key={name} className="hero__logo-pill">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Animated pipeline visual */}
      <div className="hero__pipeline" aria-hidden="true">
        <svg viewBox="0 0 900 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="pipeline-svg">
          <defs>
            <linearGradient id="pipe-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0"/>
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="1"/>
              <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {[40, 80, 120, 160].map((y, i) => (
            <g key={y}>
              <line x1="0" y1={y} x2="900" y2={y} stroke="var(--border)" strokeWidth="1"/>
              <rect className={`pipeline-dot pipeline-dot--${i}`} y={y - 4} width="8" height="8" rx="4" fill="url(#pipe-grad)"/>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
