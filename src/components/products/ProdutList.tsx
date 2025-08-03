import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../../context/ProductsContext';
import ResumeUploader from './ResumeUploader';
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { BsArrowDownUp } from "react-icons/bs";


const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <div className="flex items-center border border-gray-200 rounded bg-white px-3 py-2 w-full md:w-1/3">
          <FaMagnifyingGlass className="text-gray-400 mr-2" />
          
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none w-full text-sm bg-transparent"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex gap-2">
          <select className="border border-gray-300 bg-white rounded px-3 py-2 text-sm">
            <option>India</option>
            <option>USA</option>
          </select>
          <button className="bg-lime-400 text-white px-4 py-2 rounded hover:bg-lime-500 text-sm flex items-center">
           <FaFilter className="text-white mr-1"/> <span>Filter</span>
          </button>
          <button className="bg-lime-400 flex items-center text-white px-4 py-2 rounded hover:bg-lime-500 text-sm">
            <BsArrowDownUp className="text-white font-bold text-lg mr-1"/> <span>Best Sellers</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <ResumeUploader />
    </div>
  );
};

export default ProductList;
