
// FeatureBook.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../../redux/booksSlice";
import BookSlider from '../../BookSlider'

const FeatureBook = () => {
  const dispatch = useDispatch();
  const { items: books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length === 0) dispatch(fetchBooks()); // avoid refetch if already loaded
  }, [dispatch, books.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return <BookSlider title="Featured Books" books={books} variant="feature" slidesToShow={2.5}>
    
  </BookSlider>
};

export default FeatureBook;
