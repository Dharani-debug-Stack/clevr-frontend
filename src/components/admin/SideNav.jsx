
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; //  Import icons

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Products", path: "/admin/manage-products" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22}/>} {/*  Icon toggle */}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          sm:translate-x-0 sm:relative sm:w-64
          flex flex-col justify-between z-40    `}
      >
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 mb-6">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="font-semibold hover:text-purple-400 cursor-pointer"
                onClick={() => setIsOpen(false)} // Close menu when link clicked (mobile)
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="font-bold mb-2">Report</p>
          <img
            className="w-20 mb-4 rounded"
            src="https://tse1.mm.bing.net/th/id/OIP.bfGLtrBEmvhDVkJTA2uFMQAAAA?pid=Api&P=0&h=180"
            alt="Report"
          />
          <h2 className="font-bold mb-2">Hi, How can we help?</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Contact us if you need any assistance. We will get back to you as soon as possible.
          </p>
        </div>

        <button className="bg-blue-600 text-white rounded-2xl py-2 px-4 w-full">
          Contact
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 sm:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideNav;





