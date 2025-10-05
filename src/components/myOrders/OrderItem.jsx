// src/components/Orders/OrderItem.jsx
import React from 'react';


const OrderItem = ({ item }) => (

  <div className="flex items-center justify-between border-b border-gray-200 py-2">
    <div className="flex items-center space-x-4">
      <img
        src={item.image || '/placeholder.png'}
        alt={item.name}
        className="w-16 h-20 object-cover rounded-md"
      />
      <div>
        <h4 className="font-medium text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>
    </div>
    <div className="font-semibold text-gray-800">
      ${(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
);

export default OrderItem;
