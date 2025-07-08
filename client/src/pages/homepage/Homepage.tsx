import "./home.css";

import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel.tsx";

import type { RecipesType } from "../../types/definitions.ts";

export default function Home() {
  const [recipes, setRecipes] = useState<RecipesType[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/latestrecipes`)
      .then((response) => setRecipes(response.data))
      .catch((err) => console.error("Erreur :", err));
  }, []);
  return (
    <>
      <h2 className="h2Home">Les recettes fraîchement ajoutées</h2>
      <div className="carousel">
        <Carousel recipes={recipes} />
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
