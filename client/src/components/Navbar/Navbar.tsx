import { Link } from "react-router";
import "./navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar-all">
      <header className="navbar-section">
        <Link to="/">
          <img src="images/logo.png" alt="logo Eating NamNam" />
        </Link>
        <button type="button" className="menu" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </header>

      {open && (
        <nav className="burger-menu">
          <ul>
            <li>Accueil</li>
            <li>Les recettes</li>
            <li>A propos</li>
            <li>Connexion</li>
          </ul>
        </nav>
      )}
      <div className="navbar-text">
        <h1> Eating NAM NAM</h1>
        <p>
          Eating Nam Nam est un site où chacun peut partager ses recettes et
          explorer celles de la communauté.Tu peux aussi créer ton planning de
          la semaine et générer ta liste de courses.
        </p>
        <p>
          <strong>
            Simple, pratique et gourmand Eating Nam Nam, la cuisine partagée à
            portée de clic !
          </strong>
        </p>
        <div className="sign-banniere">
          <Link to="/inscription" className="sign-btn">
            Inscris-toi !
          </Link>
        </div>
      </div>
      <div>
        <nav className="desktop-menu">
          <ul>
            <Link className="link-desktop" to="/">
              Accueil
            </Link>
            <Link className="link-desktop" to="/">
              Les recettes
            </Link>
            <Link className="link-desktop" to="/">
              A propos
            </Link>
            <Link className="link-desktop" to="/">
              Connexion
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
