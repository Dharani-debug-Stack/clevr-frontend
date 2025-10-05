import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import CheckoutForm from "../components/Checkout/CheckoutForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutButton from "../components/Checkout/CheckoutButton";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cartItems = state?.cartItems || [];

  const totalAmount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const [form, setForm] = useState({ name: "", email: "", mobile: "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
      console.log("Razorpay script loaded");
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      toast.error("Failed to load Razorpay script");
    };
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("Form updated:", { ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const { name, email, mobile, address } = form;
    if (!name || !email || !mobile || !address) {
      toast.error("Please fill all fields");
      console.log("Form validation failed");
      return;
    }

    setLoading(true);

    const cartItemsToSend = cartItems.map((item) => ({
      name: item.name,
      image: typeof item.image === "string" ? item.image : item.image?.url,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));
    console.log("Cart items to send:", cartItemsToSend);

    try {
      if (paymentMethod === "razorpay") {
        if (!scriptLoaded) {
          toast.error("Razorpay script not loaded yet");
          console.log("Razorpay script not loaded");
          setLoading(false);
          return;
        }

        console.log("Creating Razorpay order on backend...");
        const { data } = await axios.post("https://clevr-e-com-boew.onrender.com/api/payment/create-order", {
          amount: totalAmount,
        });
        console.log("Backend /create-order response:", data);

        if (!data?.order) {
          toast.error("Failed to create Razorpay order");
          console.log("No order returned from backend");
          setLoading(false);
          return;
        }

        const options = {
          key: "rzp_test_RPeHhqMjMN0rob",
          amount: data.order.amount,
          currency: "INR",
          order_id: data.order.id,
          name: "My Shop",
          prefill: { name, email, contact: mobile },
          theme: { color: "#9333ea" },
          handler: async (response) => {
            console.log("Razorpay payment response:", response);
            try {
              const verifyResponse = await axios.post("https://clevr-e-com-boew.onrender.com/api/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: form,
                cartItems: cartItemsToSend,
              });
              console.log("Backend /verify response:", verifyResponse.data);
              toast.success("Payment successful! Order placed.");
              setTimeout(() => navigate("/"), 2000);
            } catch (err) {
              console.error("Payment verification failed:", err.response?.data || err.message);
              toast.error("Payment verification failed. Check console.");
            }
          },
          modal: {
            ondismiss: () => {
              console.log("Razorpay modal dismissed");
              toast.info("Payment cancelled.");
            },
          },
        };

        console.log("Opening Razorpay checkout with options:", options);
        new window.Razorpay(options).open();
      } else {
        // Cash on Delivery
        console.log("Placing COD order on backend...");
        const codResponse = await axios.post("https://clevr-e-com-boew.onrender.com/api/payment/cod", {
          customer: form,
          cartItems: cartItemsToSend,
        });
        console.log("Backend /cod response:", codResponse.data);
        toast.success("COD order placed successfully!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error("Error in handlePayment:", err.response?.data || err.message);
      toast.error("Order could not be processed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-purple-200">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Checkout</h2>

        <CheckoutForm form={form} handleChange={handleChange} />
        <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
        <CheckoutButton loading={loading} totalAmount={totalAmount} handlePayment={handlePayment} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
