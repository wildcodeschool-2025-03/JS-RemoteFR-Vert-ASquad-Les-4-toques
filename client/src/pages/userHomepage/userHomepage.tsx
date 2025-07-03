import axios from "axios";
import { useEffect, useState } from "react";

import Carousel from "../../components/Carousel/Carousel";
import type { RecipesType } from "../../types/definitions";

export default function UserHomepage() {
  const [recipes, setRecipes] = useState<RecipesType[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/recipes`)
      .then((response) => setRecipes(response.data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  return (
    <>
      <div className="carousel">
        <Carousel recipes={recipes} />
      </div>
      <h2>Crée ta recette en 3 étapes</h2>
      <div className="steps">
        <div className="step-item">
          <img src="/images/idea.svg" alt="logo idea" />
          <p>Une idée de recette</p>
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
