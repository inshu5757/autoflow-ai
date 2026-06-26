const testimonials = [
  {
    quote: "We replaced a 3-engineer data team's worth of pipeline maintenance. AutoFlow just handles it.",
    name: "Priya Mehta",
    role: "CTO, Finvera",
    initials: "PM",
    color: "var(--accent)",
  },
  {
    quote: "The schema detection alone saved us weeks of onboarding. Every new source just works.",
    name: "Marcus Lee",
    role: "Head of Data, Orbis",
    initials: "ML",
    color: "var(--accent-2)",
  },
  {
    quote: "Version-controlled pipelines means our team can ship fast without breaking production. Game changer.",
    name: "Sara Novak",
    role: "Data Engineer, Crestline",
    initials: "SN",
    color: "#a78bfa",
  },
];

const logos = ["Stripe", "Linear", "Vercel", "Notion", "Figma", "Loom", "Retool", "Segment"];

export default function SocialProof() {
  return (
    <section className="social-proof" id="testimonials" aria-labelledby="social-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-eyebrow">Social Proof</span>
          <h2 id="social-heading" className="section-title">
            Loved by data teams<br />at every scale
          </h2>
        </header>

        {/* Scrolling logo strip */}
        <div className="logo-strip" aria-label="Companies using AutoFlow">
          <div className="logo-strip__track" aria-hidden="true">
            {[...logos, ...logos].map((name, i) => (
              <span key={i} className="logo-strip__item">{name}</span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials" role="list">
          {testimonials.map(({ quote, name, role, initials, color }) => (
            <figure
              key={name}
              className="testimonial"
              role="listitem"
            >
              <blockquote className="testimonial__quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="testimonial__mark">
                  <path d="M3 21V12C3 7.029 6.582 3 11 3v3c-2.761 0-5 2.686-5 6v1h5v8H3zm13 0V12c0-4.971 3.582-9 8-9v3c-2.761 0-5 2.686-5 6v1h5v8h-8z" fill="var(--accent)" fillOpacity="0.4"/>
                </svg>
                <p>{quote}</p>
              </blockquote>
              <figcaption className="testimonial__author">
                <span className="testimonial__avatar" style={{ background: color }} aria-hidden="true">
                  {initials}
                </span>
                <span>
                  <strong className="testimonial__name">{name}</strong>
                  <span className="testimonial__role">{role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="cta-banner" aria-labelledby="cta-heading">
          <div className="cta-banner__glow" aria-hidden="true" />
          <h2 id="cta-heading" className="cta-banner__title">
            Ready to automate your data?
          </h2>
          <p className="cta-banner__sub">
            Join 3,000+ teams shipping faster with AutoFlow AI.
          </p>
          <div className="cta-banner__actions">
            <button type="button" className="btn btn--primary">
              Start for free
            </button>
            <button type="button" className="btn btn--ghost">
              Book a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}