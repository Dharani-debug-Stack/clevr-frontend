import { useState, useEffect, useRef } from "react";
import BookCard from "./BookCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BookSlider = ({ title, books, variant = "default", slidesToShow = 3 }) => {
  const sliderRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.firstChild.offsetWidth + 16; // gap
      sliderRef.current.scrollBy({
        left: direction === "left" ? -slideWidth : slideWidth,
        behavior: "smooth",
      });
    }
  };

  const getSlideWidth = () => {
    if (windowWidth < 768) return "100%"; // Mobile: 1 product
    if (slidesToShow === 2.5) return "40%"; // FeatureBooks
    if (slidesToShow === 3) return "33.333%"; 
    if (slidesToShow === 4) return "25%"; // BestSellers
    if (slidesToShow === 5) return "20%"; // Collections
    return "33.333%";
  };

  return (
    <div className="relative container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {/* Slider wrapper */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <FaArrowRight />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {books.map((book, idx) => (
            <div
              key={idx}
              className="snap-start flex-shrink-0"
              style={{ width: getSlideWidth() }}
            >
              <BookCard book={book} variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookSlider;
