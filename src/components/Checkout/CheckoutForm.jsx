// src/components/Checkout/CheckoutForm.jsx
import React from "react";

const CheckoutForm = ({ form, handleChange }) => {
  return (
    <div className="space-y-4">
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <input
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
      <textarea
        name="address"
        placeholder="Delivery Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default CheckoutForm;
