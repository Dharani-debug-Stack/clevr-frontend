import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import NavLinks from "./NavLinks";

const MobileMenu = ({ isOpen, navItems, closeMenu, loginPopup, user }) => {
  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Smooth Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Sliding Side Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-3/4 max-w-xs z-20 bg-white shadow-xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}
      >
        <div className="flex flex-col gap-6 mt-16 px-4">
          {/* Main Nav Links */}
          <NavLinks navItems={navItems} isMobile={true} closeMenu={closeMenu} />

          {/* Profile / Login Section */}
          {user ? (
            <ul className="flex flex-col text-gray-700 mt-4 border-t border-gray-200 pt-4">
              <li>
                <Link
                  to="/favourite"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/myprofile"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  onClick={closeMenu}
                  className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Orders
                </Link>
              </li>

              {/* Admin Dashboard */}
              {user.email === "admin@gmail.com" && (
                <Link to="/admin" onClick={closeMenu}>
                  <li className="px-4 py-2 hover:bg-gray-100 text-blue-600 cursor-pointer rounded-md">
                    Admin Dashboard
                  </li>
                </Link>
              )}

              <li
                onClick={() => {
                  signOut(auth);
                  closeMenu();
                }}
                className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer rounded-md"
              >
                Logout
              </li>
            </ul>
          ) : (
            <button
              onClick={() => {
                closeMenu();
                loginPopup();
              }}
              className="text-purple-700 font-bold border border-purple-600 hover:bg-purple-600 hover:text-white rounded-xl px-4 py-2 transition-colors duration-300 w-full whitespace-nowrap"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
