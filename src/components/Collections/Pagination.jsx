// src/components/Collections/Pagination.jsx
import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div className="mt-12 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={`page-${i + 1}`}
          onClick={() => setCurrentPage(i + 1)}
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            currentPage === i + 1
              ? "bg-purple-700 text-white"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
