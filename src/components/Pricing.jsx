import { useRef, useCallback } from "react";
import { pricingMatrix, getPrice } from "../data/pricingMatrix";

const { tiers, tierFeatures, currencyConfig } = pricingMatrix;

// Updates ONLY the price text nodes — zero React re-render
function updatePriceDOMNodes(billing, currency) {
  document.querySelectorAll("[data-price]").forEach(el => {
    const tier = el.dataset.price;
    el.textContent = getPrice(tier, billing, currency);
  });
}

export default function Pricing() {
  const billingRef = useRef("monthly");
  const currencyRef = useRef("USD");
  const monthlyBtnRef = useRef(null);
  const annualBtnRef = useRef(null);
  const saveBadgeRef = useRef(null);

  const handleBillingChange = useCallback((val) => {
    billingRef.current = val;
    updatePriceDOMNodes(val, currencyRef.current);

    // Toggle active state on billing buttons — direct DOM
    [monthlyBtnRef, annualBtnRef].forEach(ref => {
      if (ref.current) ref.current.classList.remove("pricing-toggle__btn--active");
    });
    const target = val === "monthly" ? monthlyBtnRef : annualBtnRef;
    target.current?.classList.add("pricing-toggle__btn--active");

    // Show/hide annual savings badge
    if (saveBadgeRef.current) {
      saveBadgeRef.current.style.opacity = val === "annual" ? "1" : "0";
    }
  }, []);

  const handleCurrencyChange = useCallback((e) => {
    currencyRef.current = e.target.value;
    updatePriceDOMNodes(billingRef.current, e.target.value);
  }, []);

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
      <div className="container">
        <header className="section-header">
          <span className="section-eyebrow">Pricing</span>
          <h2 id="pricing-heading" className="section-title">
            Simple, transparent pricing
          </h2>
          <p className="section-sub">No hidden fees. Cancel anytime.</p>
        </header>

        {/* Controls — billing toggle + currency */}
        <div className="pricing-controls" role="group" aria-label="Pricing options">
          <div className="pricing-toggle" role="group" aria-label="Billing cycle">
            <button
              ref={monthlyBtnRef}
              type="button"
              className="pricing-toggle__btn pricing-toggle__btn--active"
              onClick={() => handleBillingChange("monthly")}
              aria-pressed="true"
            >
              Monthly
            </button>
            <button
              ref={annualBtnRef}
              type="button"
              className="pricing-toggle__btn"
              onClick={() => handleBillingChange("annual")}
              aria-pressed="false"
            >
              Annual
              <span
                ref={saveBadgeRef}
                className="pricing-toggle__save"
                aria-label="Save 20%"
                style={{ opacity: 0 }}
              >
                −20%
              </span>
            </button>
          </div>

          <label className="pricing-currency" aria-label="Select currency">
            <select
              className="pricing-currency__select"
              onChange={handleCurrencyChange}
              defaultValue="USD"
            >
              {Object.entries(currencyConfig).map(([code, { symbol }]) => (
                <option key={code} value={code}>{symbol} {code}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Tier cards */}
        <div className="pricing-grid" role="list">
          {tiers.map((tier, i) => {
            const isPro = tier === "Pro";
            return (
              <article
                key={tier}
                className={`pricing-card ${isPro ? "pricing-card--featured" : ""}`}
                role="listitem"
                aria-label={`${tier} plan`}
              >
                {isPro && <div className="pricing-card__badge">Most Popular</div>}
                <header className="pricing-card__header">
                  <h3 className="pricing-card__tier">{tier}</h3>
                  <div className="pricing-card__price-wrap">
                    <span
                      className="pricing-card__price"
                      data-price={tier}
                      aria-live="polite"
                      aria-label={`${tier} plan price`}
                    >
                      {getPrice(tier, "monthly", "USD")}
                    </span>
                    <span className="pricing-card__period">/mo</span>
                  </div>
                </header>

                <ul className="pricing-card__features" aria-label={`${tier} features`}>
                  {tierFeatures[tier].map(feat => (
                    <li key={feat} className="pricing-card__feature">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke={isPro ? "var(--accent)" : "var(--text-muted)"} strokeWidth="1.2"/>
                        <path d="M5 8l2 2 4-4" stroke={isPro ? "var(--accent)" : "var(--text-muted)"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${isPro ? "btn--primary" : "btn--outline"} pricing-card__cta`}
                >
                  {tier === "Enterprise" ? "Talk to sales" : "Get started"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}