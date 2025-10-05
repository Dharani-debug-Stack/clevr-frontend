import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../config/firebase";


const LoginPopup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // 🔹 Login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        onClose(); // close popup after success
      } else {
        // 🔹 Signup
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        onClose();
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message);
    }

    setLoading(false);
  };

   const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
    }

    setLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none">
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md text-white font-semibold transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="flex items-center justify-center my-6">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="px-4 text-gray-500 font-medium">or</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>
        <button  onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.253c0-.783-.07-1.5-.195-2.203H12.27v4.16h5.875c-.244 1.488-.98 2.768-2.146 3.665l.006.007 3.255 2.52c1.94-1.8 3.064-4.446 3.064-7.659z" fill="#4285F4"></path>
            <path d="M12.27 22.99c2.94 0 5.4-1.077 7.193-2.827L16.21 17.64c-.87.585-1.99 1.002-3.94 1.002-3.036 0-5.614-2.05-6.536-4.918h-3.35v2.664C4.163 20.3 8.163 22.99 12.27 22.99z" fill="#34A853"></path>
            <path d="M5.734 14.168c-.21-.61-.326-1.26-.326-1.916 0-.655.116-1.306.326-1.915v-2.665h-3.35c-.47 1.07-.734 2.273-.734 3.58 0 1.306.264 2.51.734 3.58l3.35-2.664z" fill="#FBBC05"></path>
            <path d="M12.27 5.01c1.675 0 3.2.593 4.39 1.705l2.91-2.91C17.675 2.553 15.015 1 12.27 1c-4.107 0-8.107 2.69-9.98 6.44l3.35 2.664C6.656 7.06 9.234 5.01 12.27 5.01z" fill="#EA4335"></path>
          </svg>
          Sign in with Google
        </button>
        <p className="mt-6 text-center text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleForm} className="text-blue-600 font-semibold ml-1 hover:underline">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;