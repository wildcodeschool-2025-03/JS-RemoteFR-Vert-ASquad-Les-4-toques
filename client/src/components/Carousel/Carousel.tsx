import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { useState } from "react";
import type { RecipesType } from "../../types/definitions";

interface ArrowProps {
  onClick?: () => void;
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <button
      className="custom-arrow next-arrow"
      onClick={onClick}
      aria-label="Next Slide"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Flèche suivante</title>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <button
      className="custom-arrow prev-arrow"
      onClick={onClick}
      aria-label="Previous Slide"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Flèche précédente</title>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}

export default function Carousel({ recipes }: { recipes: RecipesType[] }) {
  const [displayedImgIndex, setIdisplayedImgIndex] = useState<number>(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (current: number) => setIdisplayedImgIndex(current),
    centerMode: true,
    centerPadding: "10%",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15%",
        },
      },
    ],
  };
  console.log("idx", displayedImgIndex, "/", recipes[displayedImgIndex]);

  if (recipes.length === 0) {
    return <h1>Chargement</h1>;
  }

  return (
    <>
      <section className="desktop_displayed_img_container">
        <img
          className="desktop_displayed_img"
          src={recipes[displayedImgIndex].picture}
          alt={recipes[displayedImgIndex].name}
        />
        <article>
          <h3>Nom du plat: {recipes[displayedImgIndex].name}</h3>
          <span>Note: </span>
          <span>Difficulté</span>
          <span>Temps de préparation</span>
        </article>
      </section>
      <div className="slider-container">
        <h1>Les recettes fraîchement ajoutées</h1>
        {
          <Slider {...settings}>
            {recipes.map((r) => (
              <div key={r.id}>
                <img src={r.picture} alt={r.name} />
              </div>
            ))}
          </Slider>
        }
      </div>
    </>
  );
}
