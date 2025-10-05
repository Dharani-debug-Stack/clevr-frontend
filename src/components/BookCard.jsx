import { FaStar, FaShoppingBasket, FaHeart,FaRegHeart } from "react-icons/fa";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchBooks, fetchFavorites, fetchCart, addToCart, toggleFavorite } from "../redux/booksSlice";

const BookCard = ({ book, variant = "feature" }) => {
  const dispatch = useDispatch();
  const { items: books, favorites, loading, error } = useSelector(state => state.books);

  const [user, setUser] = useState(null);
  
  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        dispatch(fetchFavorites(currentUser.uid));
        dispatch(fetchCart(currentUser.uid));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // Fetch books
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddToCart = (book) => {
    if (!user) return alert("Please log in to add to cart");
    dispatch(addToCart({ userId: user.uid, productId: book._id, quantity: 1 }));
  };

  const handleToggleFavorite = (productId) => {
    if (!user) return alert("Please log in to favorite a book");
    dispatch(toggleFavorite({ userId: user.uid, productId }));
  };

  // Collections → stacked layout
  if (variant ==="collection") {
    return (
      <div className="bg-white rounded-xl shadow-lg flex flex-col w-full hover:scale-105 transition">
        {/* Image top */}
        <div className="relative w-full h-1/2 p-4">
          <img
            src={book.image?.url}
            alt={book.name}
            className="w-full object-cover rounded-lg"
          />
         
        </div>

        {/* Details */}
        <div className="w-full h-1/2 p-4 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-gray-400">{book.genre}</p>
          <h3 className="font-bold text-sm mb-2">{book.author}</h3>
          <div className="flex items-center bg-purple-100 rounded-full justify-between px-4 py-2">
            <p className="font-bold text-xl text-purple-600">${book.price}</p>
              <button
                    onClick={() => handleAddToCart(book)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <FaShoppingBasket size={16} /> Add to Cart
                  </button>
          </div>
        </div>
      </div>
    );
  }

  // Feature & BestSeller → left-right layout, image always visible
  return (
    <div className="bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 flex flex-row w-full">
      {/* Image left */}
      <div  className={`p-6 ${variant === "feature" ? "w-1/2 md:flex hidden " : "w-full flex justify-center"}`}>
        <img
          src={book.image?.url}
          alt={book.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Details right */}
      <div   className={`p-6 ${variant === "feature" ? "w-full md:w-1/2 " : "w-1/2 flex flex-col justify-center"}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-purple-100 text-purple-600 rounded-xl px-3 py-1 text-sm font-medium">
            {book.genre}
          </span>
          <div className="flex text-yellow-400">
            {Array.from({ length: book.rating || 1 }, (_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2">
          {variant === "feature" ? book.author : book.name}
        </h3>

        {/* Description only for FeatureBook */}
        {variant === "feature" && (
          <p className="text-gray-400 text-sm mb-4">{book.desc}</p>
        )}

        <div className="flex items-center gap-2 mb-4">
          <p className="font-bold text-xl text-purple-600">${book.price}</p>
          {book.Oldprice && (
            <del className="text-gray-400 text-sm">${book.Oldprice}</del>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
                    onClick={() => handleAddToCart(book)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    <FaShoppingBasket size={16} /> Add to Cart
                  </button>
          {variant === "feature" && (
             <button onClick={() => handleToggleFavorite(book._id)}>
                    {favorites.includes(book._id) ? (
                      <FaHeart className="text-red-500 text-xl" />
                    ) : (
                      <FaRegHeart className="text-gray-400 text-xl" />
                    )}
                  </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

