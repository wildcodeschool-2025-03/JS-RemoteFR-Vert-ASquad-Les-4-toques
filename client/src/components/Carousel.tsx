import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/carousel.css";

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

export default function Carousel() {
  const images = [
    { id: "lasagne1", src: "./images/Lasagne.jpg" },
    { id: "lasagne2", src: "./images/Lasagne.jpg" },
    { id: "carbonade1", src: "./images/carbonade.jpg" },
    { id: "lasagne4", src: "./images/Lasagne.jpg" },
    { id: "carbonade2", src: "./images/carbonade.jpg" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.src} alt={image.id} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
