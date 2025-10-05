import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideNav from "../../components/admin/SideNav";
import AdminProductUpload from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminManageProducts from "./AdminManageProducts";

const AdminPanel = () => {
  return (
   
      <div className="flex">
        <SideNav />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="" element={<AdminProductUpload />} /> {/* Add product */}
            <Route path="/product/:id" element={<AdminProductUpload />} /> {/* Edit product */}
            <Route path="/manage-products" element={<AdminManageProducts />} /> {/* Manage products */}
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Default redirect */}
          </Routes>
        </div>
      </div>
  
  );
};

export default AdminPanel;







