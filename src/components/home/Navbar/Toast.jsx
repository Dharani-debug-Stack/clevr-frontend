// Toast.jsx
import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`fixed top-5 right-5 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
      {message}
    </div>
  );
};

export default Toast;
