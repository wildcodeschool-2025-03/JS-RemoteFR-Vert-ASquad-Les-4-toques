import { Link } from "react-router";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <Link to="/" className="contact-link">
            <p>Contact</p>
          </Link>
          <p>A propos du site</p>
        </div>
        <div className="logos">
          <img src="/images/instagram.png" alt="logo instagram" />
          <img src="/images/twitter.png" alt="logo twitter" />
          <img src="/images/facebook.png" alt="logo facebook" />
        </div>
        <div className="footer-section">
          <p>Politique de confidentialité</p>
          <p>Mentions légales</p>
          <p>Copyright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
