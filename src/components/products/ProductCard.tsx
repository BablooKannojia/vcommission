import React from 'react';
import { Product } from '../../types/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-300 hover:border-gray-400 shadow-sm w-full max-w-xs overflow-hidden">
      <div className="text-xs text-gray-500">
        <span className='bg-gray-100 asin px-2 text-xs'>ASIN: {product.asin}</span>
      </div>
      <div className="p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain bg-white"
        />
        <h3 className="text-sm font-semibold text-gray-800 mt-3 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center mt-1 text-xs text-gray-600">
          <div className="flex items-center bg-orange-400 text-white px-1 rounded">
            <span className="text-sm font-bold text-xs">{product.rating}</span>
            <svg className="w-4 h-4 ml-1 text-xs" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="ml-2 text-xs">({product.review})</span>
          <span className="ml-auto text-gray-500 text-xs bg-gray-100">Store: {product.storeName}</span>
        </div>

        <div className="mt-2">
          <span className="block w-full text-center text-xs text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>

        <div className="mt-2 grid grid-cols-3 text-xs text-gray-700 gap-2">
          <div>
            <div className="text-gray-500">Price</div>
            <div className="font-semibold text-green-700">${product.price}</div>
          </div>
          <div>
            <div className="text-gray-500">Commission</div>
            <div className="font-semibold">${product.commission}</div>
          </div>
          <div>
            <div className="text-gray-500">Rate</div>
            <div className="font-semibold">{product.rate}%</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-4 py-3 flex justify-center">
        <button className="flex items-center gap-2 text-sm font-medium bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded">
          Generate Affiliate Link
          <svg 
    className="w-3 h-3" 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512"
  >
    <path 
      fill="currentColor" 
      d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
    ></path>
  </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
