
import { useSelector } from "react-redux";
import BookSlider from "../../BookSlider";

const BestSeller = () => {
  const books = useSelector((state) => state.books.items.slice(0, 7));

  // Desktop: 4
  return <BookSlider title="Best Sellers" variant="bestseller" books={books} slidesToShow={4} />;
};

export default BestSeller;
