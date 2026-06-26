export const pricingMatrix = {
  tiers: ["Starter", "Pro", "Enterprise"],
  baseRates: {
    Starter: 19,
    Pro: 49,
    Enterprise: 129,
  },
  annualDiscount: 0.20,
  currencyConfig: {
    USD: { symbol: "$", tariff: 1, locale: "en-US" },
    INR: { symbol: "₹", tariff: 83, locale: "en-IN" },
    EUR: { symbol: "€", tariff: 0.92, locale: "de-DE" },
  },
  tierFeatures: {
    Starter: ["5 Automations", "10K API calls/mo", "Basic Analytics", "Email Support", "2 Team Members"],
    Pro: ["Unlimited Automations", "500K API calls/mo", "Advanced Analytics", "Priority Support", "10 Team Members"],
    Enterprise: ["Custom Automations", "Unlimited API calls", "Real-time Analytics", "24/7 Dedicated Support", "Unlimited Members"],
  },
};

export function getPrice(tier, billing, currency) {
  const base = pricingMatrix.baseRates[tier];
  const { symbol, tariff } = pricingMatrix.currencyConfig[currency];
  const monthly = base * tariff;
  const final = billing === "annual" ? monthly * (1 - pricingMatrix.annualDiscount) : monthly;
  return `${symbol}${Math.round(final)}`;
}