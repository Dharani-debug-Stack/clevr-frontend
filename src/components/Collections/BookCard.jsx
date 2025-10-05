// src/components/Collections/BookCard.jsx
import React from "react";
import { FaHeart, FaRegHeart, FaShoppingBasket } from "react-icons/fa";

const BookCard = ({ book, favorites, handleAddToCart, handleToggleFavorite }) => {
  const isFavorite = favorites.includes(book._id);

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-200 hover:-translate-y-1 cursor-pointer">
      <img
        src={book.image?.url || "/placeholder.png"}
        alt={book.name || "Book Image"}
        className="h-72 w-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between h-52">
        <h3 className="truncate font-semibold text-lg">{book.name}</h3>
        <p className="text-gray-500 text-sm">{book.author}</p>
        <div className="mt-2 text-purple-700 font-bold text-lg">${book.price}</div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handleAddToCart(book)}
            className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            <FaShoppingBasket size={16} /> Add to Cart
          </button>
          <button onClick={() => handleToggleFavorite(book._id)}>
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-400 text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
