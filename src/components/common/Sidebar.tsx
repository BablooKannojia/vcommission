// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-40`}>
      <div className="text-white flex items-center justify-between px-4">
        <span className="text-2xl font-extrabold">Admin Panel</span>
        <button 
          onClick={onClose}
          className="md:hidden text-gray-300 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav>
        <Link
          to="/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={onClose}
        >
          Dashboard
        </Link>
        <Link
          to="/products"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={onClose}
        >
          Product Catalogue
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;