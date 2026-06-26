import { useRef, useEffect } from "react";
import { useBreakpoint } from "../hooks/userBreakpoint";

const Icon = ({ name, size = 32 }) => (
  <img
    src={`/icons/${name}.svg`}
    width={size}
    height={size}
    alt=""
    aria-hidden="true"
    className="svg-icon"
  />
);

const features = [
  {
    id: 0,
    title: "Visual Pipeline Builder",
    tag: "Core",
    desc: "Drag, connect, and deploy data pipelines with a zero-code canvas. Every node is inspectable, testable, and version-controlled.",
    icon: <Icon name="arrow-path" />,
    size: "large",
  },
  {
    id: 1,
    title: "Real-time Schema Detection",
    tag: "Intelligence",
    desc: "AutoFlow reads your data's shape on ingestion and adapts transformations automatically — no manual mapping.",
    icon: <Icon name="chart-pie" />,
    size: "small",
  },
  {
    id: 2,
    title: "Sub-100ms Trigger Latency",
    tag: "Performance",
    desc: "Event-driven pipelines fire in under 100ms. Your data reacts to the world in real time.",
    icon: <Icon name="arrow-trending-up" />,
    size: "small",
  },
  {
    id: 3,
    title: "Semantic Version Control",
    tag: "DevOps",
    desc: "Every pipeline change is tracked, diffable, and rollback-ready. Treat your data workflows like production code.",
    icon: <Icon name="cube-16-solid" />,
    size: "medium",
  },
  {
    id: 4,
    title: "AI Anomaly Detection",
    tag: "AI",
    desc: "A trained model watches every pipeline run and flags statistical outliers before they corrupt downstream systems.",
    icon: <Icon name="cog-8-tooth" />,
    size: "medium",
  },
];

export default function Features() {
  const { isMobile, activeIndex, setActiveIndex } = useBreakpoint(768);
  const bentoRefs = useRef([]);
  const accordionBodyRefs = useRef([]);

  // Accordion open/close animation via WAAPI — no CSS-in-JS
  useEffect(() => {
    if (!isMobile) return;
    accordionBodyRefs.current.forEach((el, i) => {
      if (!el) return;
      const isOpen = i === activeIndex;
      const targetHeight = isOpen ? el.scrollHeight + "px" : "0px";
      el.animate(
        [{ height: el.style.height || "0px" }, { height: targetHeight }],
        { duration: 320, easing: "cubic-bezier(0.4,0,0.2,1)", fill: "forwards" }
      );
    });
  }, [activeIndex, isMobile]);

  return (
    <section className="features" id="features" aria-labelledby="features-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-eyebrow">Features</span>
          <h2 id="features-heading" className="section-title">
            Built for pipelines<br />that can't afford to fail
          </h2>
          <p className="section-sub">
            Every component is engineered for production — not demos.
          </p>
        </header>

        {/* Desktop: Bento Grid */}
        {!isMobile && (
          <div className="bento-grid" role="list">
            {features.map((f, i) => (
              <article
                key={f.id}
                ref={el => bentoRefs.current[i] = el}
                className={`bento-card bento-card--${f.size} ${activeIndex === i ? "bento-card--active" : ""}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                role="listitem"
              >
                <div className="bento-card__tag">{f.tag}</div>
                <div className="bento-card__icon">{f.icon}</div>
                <h3 className="bento-card__title">{f.title}</h3>
                <p className="bento-card__desc">{f.desc}</p>
                <div className="bento-card__glow" aria-hidden="true" />
              </article>
            ))}
          </div>
        )}

        {/* Mobile: Accordion */}
        {isMobile && (
          <div className="accordion" role="list">
            {features.map((f, i) => {
              const isOpen = activeIndex === i;
              return (
                <div key={f.id} className={`accordion-item ${isOpen ? "accordion-item--open" : ""}`} role="listitem">
                  <button
                    className="accordion-trigger"
                    onClick={() => setActiveIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-panel-${i}`}
                    id={`accordion-header-${i}`}
                    type="button"
                  >
                    <span className="accordion-trigger__icon">{f.icon}</span>
                    <span className="accordion-trigger__text">
                      <span className="accordion-trigger__tag">{f.tag}</span>
                      <span className="accordion-trigger__title">{f.title}</span>
                    </span>
                    <span className="accordion-trigger__chevron" aria-hidden="true">
                      <img src="/icons/chevron-down.svg" width="18" height="18" alt=""
                      style={{ filter: "invert(1)", transition: "transform 300ms var(--ease-in-out)" }} />
                    </span>
                  </button>
                  <div
                    id={`accordion-panel-${i}`}
                    role="region"
                    aria-labelledby={`accordion-header-${i}`}
                    ref={el => accordionBodyRefs.current[i] = el}
                    className="accordion-body"
                    style={{ height: 0, overflow: "hidden" }}
                  >
                    <p className="accordion-body__desc">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}