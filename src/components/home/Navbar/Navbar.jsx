import React, { useState, useEffect } from 'react';
import { FaShoppingBasket, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../../config/firebase';
import NavLinks from './NavLinks';
import MobileMenu from './Mobilemenu';
import LoginPopup from './Login';
import logo from '../../../assets/logo.jpg';
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../../redux/booksSlice";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
    const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.books.cart || []);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        dispatch(fetchCart(currentUser.uid)); // fetch cart for this user
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const navItems = [
  { name: "Home", type: "route", to: "/" },
  { name: "Books", type: "anchor", href: "#book" },
  { name: "Seller", type: "anchor", href: "#seller" },
  { name: "Collections", type: "route", to: "/collection" },
  { name: "About us", type: "anchor", href: "#about" },
];

    

  return (
    <>
    
      <nav className="fixed z-50 w-full bg-gray-100 flex items-center justify-between px-4 py-4 md:px-8 shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer flex-shrink-0">
          <img src={logo} alt="Clevr logo" className="w-12 md:w-14 max-w-full" />
          <h2 className="font-bold text-purple-800 text-2xl md:text-4xl lg:text-5xl whitespace-nowrap">Clevr</h2>
        </div>

        <div className="hidden md:flex flex-1 justify-center overflow-x-auto">
          <NavLinks navItems={navItems} isMobile={false} />
        </div>

        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0 relative">
          <div className="relative">
            <Link to="/card">
              <button><FaShoppingBasket size={24} className="text-gray-700" /></button>
            </Link>
            {cartCount > 0 && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-400 rounded-full text-center text-white text-xs flex items-center justify-center">
                {cartCount}
              </div>
            )}
          </div>

          <div className="relative hidden md:block">
            <button
              onClick={() => {
                if (user) setShowProfileMenu(prev => !prev);
                else setShowLoginPopup(true);
              }}
              className="text-purple-700 font-bold border border-purple-600 hover:bg-purple-600 hover:text-white rounded-xl px-4 py-2 transition-colors duration-300 whitespace-nowrap"
            >
              {user ? user.displayName || user.email : "Login"}
            </button>

            {user && showProfileMenu && (
             
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-gray-200 z-[9999]">
                <ul className="flex flex-col text-gray-700">
                  <Link to={"/favourite"}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Favorites</li></Link>
                  <Link to="/myprofile"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li></Link>
                  <Link to="/orders"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Orders</li></Link>
                      {/* Show admin link only for admin@gmail.com */}
                {user.email === "admin@gmail.com" && (
                  <Link to="/admin">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-blue-600">
                      Admin Dashboard
                    </li>
                  </Link>
                )}
                  <li className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer" onClick={() => signOut(auth)}>Logout</li>
                </ul>
              </div>
            )}
          </div>

          <div className="md:hidden z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <MobileMenu
            
            isOpen={isMenuOpen}
  navItems={navItems}
  closeMenu={() => setIsMenuOpen(false)}
  loginPopup={() => setShowLoginPopup(true)}
  user={user} 
          />
        </div>
      </nav>

      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} />}
    </>
  );
};

export default Navbar;
