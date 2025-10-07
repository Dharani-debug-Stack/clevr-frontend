import { useSelector } from "react-redux";
import BookSlider from "../../BookSlider";

const Collections = () => {
  const books = useSelector((state) => state.books.items);

  // Desktop: 5
  return <BookSlider title="Collections" variant="collection" books={books} slidesToShow={5} />;
};

export default Collections;