import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain max-h-48 w-full"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {product.title}
        </h3>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <p className="text-green-600 font-semibold mt-2">${product.price}</p>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center flex-wrap pt-8">
          <a
            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            href="#"
          >
            Ver Más
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>

          <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
            <svg
              className="w-4 h-4 mr-1"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            1.2K
          </span>

          <span className="text-gray-400 inline-flex items-center leading-none text-sm">
            <svg
              className="w-4 h-4 mr-1"
             Linecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            6
          </span>
        </div>
      </div>
    </div>
  );
};

Card;