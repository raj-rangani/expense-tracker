import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-medium text-gray-900 flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="24"
                fill="none"
                viewBox="0 0 44 30"
              >
                <path
                  fill="#C52031"
                  d="M14.712 29.857C6.6 29.857 0 23.19 0 14.997S6.6.14 14.712.14 29.424 6.807 29.424 15c0 .753-.605 1.364-1.35 1.364s-1.351-.611-1.351-1.364c0-6.688-5.387-12.129-12.008-12.129S2.707 8.312 2.707 15s5.387 12.129 12.008 12.129c.745 0 1.35.611 1.35 1.364s-.605 1.364-1.35 1.364z"
                />
                <path
                  fill="#C52031"
                  d="M30.902 29.857c-6.829 0-12.382-5.61-12.382-12.507 0-.753.605-1.364 1.35-1.364s1.35.611 1.35 1.364c0 5.392 4.344 9.776 9.679 9.776 5.334 0 9.678-4.387 9.678-9.776 0-5.388-4.343-9.775-9.678-9.775-.745 0-1.35-.612-1.35-1.364s.605-1.364 1.35-1.364c6.828 0 12.382 5.61 12.382 12.506 0 6.897-5.554 12.507-12.382 12.507z"
                />
              </svg>
              <span className="hidden sm:inline">Petpooja Expense Tracker</span>
            </h1>
          </div>

          <nav className="flex space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Statistics
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
