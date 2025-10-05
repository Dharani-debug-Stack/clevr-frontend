
// src/pages/OrdersPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/home/Navbar/Navbar';
import Testimonials from '../components/home/testinomials/Testimonials';
import Footer from '../components/home/footer/Footer';
import { auth } from '../config/firebase';
import OrderCard from '../components/myOrders/OrderCard';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) return;

        const { data } = await axios.get(`https://clevr-e-com-boew.onrender.com/api/payment/orders/${userEmail}`);
        if (data.success) setOrders(data.orders); console.log(orders)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">You have no orders yet.</p>
          ) : (
            orders.map(order => <OrderCard key={order._id} order={order} />)
          )}
        </div>
      </main>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Orders;
