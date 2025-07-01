import { Link, NavLink } from "react-router";
import "./navbar.css";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import userAuth, { AuthStatus } from "../../Auth/userAuth";

const Navbar = () => {
  const { status, authenticate } = userAuth();

  const [open, setOpen] = useState(false);
  console.log("status", status);
  useEffect(() => {
    authenticate();
  }, [authenticate]);

  if (status === AuthStatus.Guest) {
    return (
      <div className="navbar-all">
        <header className="navbar-section">
          <NavLink to="/">
            <img src="images/logo.png" alt="logo Eating NamNam" />
          </NavLink>
          <button type="button" className="menu" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </header>

        {open && (
          <nav className="burger-menu">
            <ul>
              <li>
                <NavLink to="/">Accueil</NavLink>
              </li>
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
            <NavLink to={"/inscription"}>
              <motion.button
                type="button"
                className="sign-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inscris-toi !
              </motion.button>
            </NavLink>
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
  }

  if (status === AuthStatus.Authenticated) {
    return (
      <div className="navbar-all">
        <header className="navbar-section">
          <NavLink to="/">
            <img src="images/logo.png" alt="logo Eating NamNam" />
          </NavLink>
          <button type="button" className="menu" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </header>

        {open && (
          <nav className="burger-menu">
            <ul>
              <li>
                <NavLink to="/">Accueil</NavLink>
              </li>
              <li>Les recettes</li>
              <li>A propos</li>
              <li>Déconnexion</li>
            </ul>
          </nav>
        )}
        <div className="navbar-text">
          <h1> Eating NAM NAM</h1>

          <div className="sign-banniere">
            <NavLink to={"/inscription"}>
              <motion.button
                type="button"
                className="search-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rechercher une recette
              </motion.button>
            </NavLink>
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
                Déconnexion
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

export default Navbar;
