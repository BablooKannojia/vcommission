import React from 'react';
import ProductList from '../../components/products/ProdutList';

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Catalogue</h1>
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsPage;