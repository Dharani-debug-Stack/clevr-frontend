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

  // Desktop: 3 (with centerMode for a 2.5 feel)
  return <BookSlider title="Featured Books" books={books} variant="feature" slidesToShow={3}> 
    
  </BookSlider>
};

export default FeatureBook;
