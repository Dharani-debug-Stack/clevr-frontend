// src/components/Cart/CartSummary.jsx
import React, { useMemo } from "react";
import { Link } from "react-router";

const CartSummary = ({ cartItems, taxRate = 0.07 }) => {
  const subtotal = useMemo(() =>
    cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0),
    [cartItems]
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit mt-24">
      <h2 className="text-xl font-bold mb-4">Shopping Summary</h2>
      <div className="space-y-2 text-lg">
        <div className="flex justify-between items-center"><span>Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between items-center"><span>Tax</span><span className="font-semibold">${tax.toFixed(2)}</span></div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4 text-xl font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        <Link to="/checkout" state={{ cartItems, totalAmount: total }}>
          <button className="w-full bg-purple-700 text-white font-semibold py-3 rounded-full hover:bg-purple-800 transition-colors">
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
