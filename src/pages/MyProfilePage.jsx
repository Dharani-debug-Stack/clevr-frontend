import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Navbar from "../components/home/Navbar/Navbar";
import Footer from "../components/home/footer/Footer";
import ProfileTab from "../components/ProfileItem/ProfileTab";
import OrdersTab from "../components/ProfileItem/OrdersTab";
import axios from "axios";

const MyProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchOrders(currentUser.email);
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async (email) => {
    try {
      const { data } = await axios.get(`https://clevr-e-com-boew.onrender.com/api/payment/orders/${email}`);
      setOrders(data.orders); // backend sends { success, orders }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  if (!user) return <p className="text-center mt-12">Please login to view your profile.</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8 bg-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-purple-700">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account and view your orders</p>
          </div>

          {/* Tabs */}
          <div className="bg-white p-2 rounded-lg shadow-md flex mb-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-2 rounded-md font-semibold ${activeTab === "profile" ? "bg-purple-600 text-white" : "text-gray-600"}`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-2 rounded-md font-semibold ${activeTab === "orders" ? "bg-purple-600 text-white" : "text-gray-600"}`}
            >
              My Orders ({orders.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" ? (
            <ProfileTab user={user} order={orders[0]} />
          ) : (
            <OrdersTab orders={orders} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfilePage
