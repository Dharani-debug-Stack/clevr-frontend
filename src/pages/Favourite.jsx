// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks, fetchFavorites, fetchCart, addToCart, toggleFavorite } from "../redux/booksSlice";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/footer/Footer";
import Testimonials from "../components/home/testinomials/Testimonials";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import FavoriteCard from "../components/Favorites/FavoriteCard";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const { items: books, favorites, loading } = useSelector(state => state.books);

  const [user, setUser] = useState(null);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        dispatch(fetchBooks()).then(() => {
          dispatch(fetchFavorites(currentUser.uid)).finally(() => setLoadingFavorites(false));
        });
        dispatch(fetchCart(currentUser.uid));
      } else {
        setLoadingFavorites(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleAddToCart = (book) => {
    if (!user) return alert("Please log in to add to cart");
    dispatch(addToCart({ userId: user.uid, productId: book._id, quantity: 1 }));
  };

  const handleToggleFavorite = (productId) => {
    if (!user) return alert("Please log in to favorite a book");
    dispatch(toggleFavorite({ userId: user.uid, productId }));
  };

  if (!user) return <p className="text-center mt-12">Please login to see your favorites.</p>;
  if (loading || loadingFavorites) return <p className="text-center mt-12">Loading favorites...</p>;

  // Filter favorite books
  const favoriteBooks = books.filter(book => favorites.includes(book._id));

  if (favoriteBooks.length === 0) return <p className="text-center mt-12">No favorite books.</p>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 mt-20">Favorite Books</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favoriteBooks.map(book => (
            <FavoriteCard
              key={book._id}
              book={book}
              favorites={favorites}
              handleAddToCart={handleAddToCart}
              handleToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default FavoritesPage;


