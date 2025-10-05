// src/components/BookSlider.jsx
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../ui/SliderArrow";
import BookCard from "./BookCard";
import { FaArrowRight } from "react-icons/fa";

const BookSlider = ({ title, books, variant = "default", slidesToShow = 4 }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        <a href="#" className="text-purple-600 flex items-center font-semibold">
          View more <FaArrowRight className="ml-2" />
        </a>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={index} className="p-2">
            <BookCard book={book} variant={variant} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BookSlider;
