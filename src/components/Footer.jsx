// Navy footer, the same as the ReRest site footer.
// Most links go to the main ReRest website because those pages are not part of the shop.
import { RERESTS_SITE, footerLinks } from '../data/links';

// The year for the copyright line, worked out once when the site loads.
const year = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="footer-logo" href={RERESTS_SITE} aria-label="ReRest home">
          <img src="images/logo-light.svg" alt="ReRest" />
        </a>

        {/* The links come from data/links.js */}
        <ul className="footer-links">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
          {/* This one stays inside the shop */}
          <li>
            <button className="footer-link-button" onClick={() => onNavigate('home')}>
              ReRest Shop
            </button>
          </li>
        </ul>

        <p className="copyright">© {year} ReRest</p>
      </div>
    </footer>
  );
}
