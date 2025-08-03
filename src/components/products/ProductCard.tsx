import React from 'react';
import { Product } from '../../types/products';
import { FaShareSquare, FaStar } from 'react-icons/fa';

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
            <FaStar className="w-3 h-3 ml-1 text-xs"/>
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
          <FaShareSquare className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
