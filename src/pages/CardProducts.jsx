import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, updateCartQuantity, removeFromCart } from "../redux/booksSlice";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/footer/Footer";
import Testimonials from "../components/home/testinomials/Testimonials";
import { auth } from "../config/firebase";
import CartItem from "../components/cardProduct/CartItem";
import CartSummary from "../components/cardProduct/CartSummary";

const CartProducts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.books.cart || []);

  // Fetch user cart on mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) dispatch(fetchCart(user.uid));
  }, [dispatch]);

  const handleQuantityChange = (cartId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ cartId, quantity }));
  };

  const handleRemove = (cartId) => {
    dispatch(removeFromCart(cartId));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 font-sans p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 mt-24">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <CartItem
                  key={item.cartId}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))
            )}
          </div>

          <CartSummary cartItems={cartItems} />
        </div>
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default CartProducts;
