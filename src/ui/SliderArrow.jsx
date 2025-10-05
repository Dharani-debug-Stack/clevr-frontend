import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-0 -translate-y-1/2 bg-white hover:bg-purple-500 rounded-full p-2 shadow-md z-10"
    onClick={onClick}
  >
    <FaArrowLeft className="text-gray-600 hover:text-white" size={24} />
  </button>
);

export const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-0 -translate-y-1/2 bg-white hover:bg-purple-500 rounded-full p-2 shadow-md z-10"
    onClick={onClick}
  >
    <FaArrowRight className="text-gray-600 hover:text-white" size={24} />
  </button>
);