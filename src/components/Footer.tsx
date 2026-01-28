import profile from "../content/profile";

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <p>© {new Date().getFullYear()} {profile.fullName}. Built with React + Vite.</p>
      <div className="footer-links">
        {profile.social.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
