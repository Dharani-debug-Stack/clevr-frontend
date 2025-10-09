import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooks,
  fetchFavorites,
  fetchCart,
  addToCart,
  toggleFavorite,
} from "../redux/booksSlice";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/footer/Footer";
import Testimonials from "../components/home/testinomials/Testimonials";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import BookCard from "../components/Collections/BookCard";
import Pagination from "../components/Collections/Pagination";

const CollectionsPage = () => {
  const dispatch = useDispatch();
  const { items: books, favorites, loading, error } = useSelector(
    (state) => state.books
  );

  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //  New states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const booksPerPage = 10;

  // Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

  //  Filtered list
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Pagination logic (unchanged)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  if (loading) return <p className="text-center mt-12">Loading books...</p>;
  if (error)
    return <p className="text-center mt-12 text-red-500">{error}</p>;

  // Collect genres dynamically
  const genres = ["All", ...new Set(books.map((book) => book.genre))];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 mt-24">
          Books Collection
        </h2>

        {/*  Search + Genre Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page
            }}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setCurrentPage(1); // reset to first page
            }}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {genres.map((genre, idx) => (
              <option key={idx} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Books Grid (unchanged BookCard) */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                favorites={favorites}
                handleAddToCart={handleAddToCart}
                handleToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No books found.
            </p>
          )}
        </div>

        {/* Pagination (unchanged) */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default CollectionsPage;




