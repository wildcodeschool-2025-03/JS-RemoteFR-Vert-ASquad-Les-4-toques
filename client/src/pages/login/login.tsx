import "../login/login.css";
import { Link } from "react-router";

export default function Login() {
  return (
    <>
      <h2 className="titre">Connexion</h2>
      <form className="formulaire">
        <label htmlFor="email">Email</label>
        <input type="text" />
        <label htmlFor="password">Mot de passe</label>
        <input type="text" />
      </form>
      <p className="para">
        Pas encore de compte?
        <Link to="/inscription">S'inscrire</Link>
      </p>
      <div className="container_btn">
        <button className="btn" type="submit">
          Se connecter
        </button>
      </div>
    </>
  );
}
