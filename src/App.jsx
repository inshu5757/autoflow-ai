import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <Pricing />
        <SocialProof />
      </main>
      <footer className="footer" role="contentinfo">
        <div className="container footer__inner">
          <span className="footer__copy">© 2026 AutoFlow AI. All rights reserved.</span>
          <nav className="footer__links" aria-label="Footer navigation">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Status</a>
          </nav>
        </div>
      </footer>
    </>
  );
}