import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedbackForm from "../../feedback/FeedBackForm";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("https://clevr-e-com-boew.onrender.com/api/testimonials");
        setTestimonials(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="text-yellow-500 inline" />)}
        {halfStar && <FaStarHalfAlt className="text-yellow-500 inline" />}
        {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="text-yellow-500 inline" />)}
      </>
    );
  };

  if (loading) return <p className="text-center py-8">Loading testimonials...</p>;
  if (!testimonials.length) return <p className="text-center py-8">No testimonials found. Be the first to submit!</p>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // hide default arrows
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Add new testimonial to state
  const handleNewTestimonial = (newTestimonial) => {
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  return (
    <section className="bg-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Customer Feedback</h2>

        {/* Feedback Form */}
       

        {/* Testimonials Slider */}
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white p-6 rounded-xl shadow-md gap-5 flex flex-col justify-between h-full mx-3"
            >
              <p className="feedback italic">"{t.feedback}"</p>
              <p className="author font-semibold mt-2">- {t.author}</p>
              <div className="rating mt-1">{renderStars(t.rating)}</div>
            </div>
          ))}
        </Slider>

        {/* Custom arrows */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="w-12 h-12 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-lg hover:bg-purple-500 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="w-12 h-12 rounded-full bg-white text-gray-600 flex items-center justify-center shadow-lg hover:bg-purple-500 hover:text-white transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;










