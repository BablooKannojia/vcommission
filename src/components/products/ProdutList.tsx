import React from 'react';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ResumeUploader from './ResumeUploader';

const ProductList: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className='py-3'>
      <ResumeUploader />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;