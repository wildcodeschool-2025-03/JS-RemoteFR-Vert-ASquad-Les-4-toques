import styles from "../recettes_list/recettes_list.module.css";

import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel.tsx";

import type { RecipesType } from "../../types/definitions.ts";

export default function Recettes() {
  const [starters, setStarters] = useState<RecipesType[]>([]);
  const [mainCourses, setMainCourses] = useState<RecipesType[]>([]);
  const [desserts, setDesserts] = useState<RecipesType[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/entrees`)
      .then((response) => setStarters(response.data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/plats`)
      .then((response) => setMainCourses(response.data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/desserts`)
      .then((response) => setDesserts(response.data))
      .catch((err) => console.error("Erreur :", err));
  }, []);

  return (
    <>
      <form className={styles.search_contener}>
        <div className={styles.search_bar}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Rechercher une recette"
          />
          <button className={styles.search_btn} type="button">
            <img
              className={styles.search_icon}
              src="/images/search.svg"
              alt="bouton rechercher"
            />
          </button>
        </div>
        <button className={styles.vegan} type="button">
          <img
            className={styles.label_icon}
            src="/images/vegan_circle_green.jpg"
            alt="bouton rechercher"
          />
        </button>
        <button className={styles.gluten_free} type="button">
          <img
            className={styles.label_icon}
            src="/images/gluten free.png"
            alt="bouton rechercher"
          />
        </button>
        <button className={styles.vegetarian} type="button">
          <img
            className={styles.label_icon}
            src="/images/logo veggie.JPG"
            alt="bouton rechercher"
          />
        </button>
      </form>
      <h2 className={styles.category}>Entrées</h2>
      <div className="carousel">
        <Carousel recipes={starters} showMainImage={false} />
      </div>
      <h2 className={styles.category}>Plats</h2>
      <div className="carousel">
        <Carousel recipes={mainCourses} showMainImage={false} />
      </div>
      <h2 className={styles.category}>Desserts</h2>
      <div className="carousel">
        <Carousel recipes={desserts} showMainImage={false} />
      </div>
    </>
  );
}
