import { useParams } from "react-router";
import Carousel from "../../components/Carousel/Carousel";

export default function UserHomepage() {
  const { id } = useParams();

  return (
    <>
      <div className="carousel">
        <Carousel />
      </div>
      <h2>Crée ta recette en 3 étapes</h2>
      <div className="steps">
        <div className="step-item">
          <img src="/images/profil.svg" alt="logo profil" />
          <p>Inscris-toi</p>
        </div>
        <div className="step-item">
          <img src="/images/plus.svg" alt="logo plus" />
          <p>Ajoute ta recette</p>
        </div>
        <div className="step-item">
          <img src="/images/mail.svg" alt="logo mail" />
          <p>Publie-la</p>
        </div>
      </div>
    </>
  );
}
