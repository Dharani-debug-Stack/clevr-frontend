// src/components/Cart/CartItem.jsx
import React from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { cartId, name, author, quantity, price, image } = item;

  return (
    <div className="flex items-center space-x-4 border-b border-gray-200 py-4 last:border-b-0 flex-wrap">
      <img src={image?.url || "/placeholder.png"} alt={name} className="w-16 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{author}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => onQuantityChange(cartId, quantity - 1)} className="p-2 rounded-full border border-gray-300"><FaMinus /></button>
        <span className="font-semibold">{quantity}</span>
        <button onClick={() => onQuantityChange(cartId, quantity + 1)} className="p-2 rounded-full border border-gray-300"><FaPlus /></button>
      </div>
      <span className="w-24 text-right font-semibold">${(price * quantity).toFixed(2)}</span>
      <button onClick={() => onRemove(cartId)} className="p-2 text-red-500 hover:text-red-700"><FaTrash /></button>
    </div>
  );
};

export default CartItem;
