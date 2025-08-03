import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom';
import db from '../../../db.json'

const mockProduct = db.products[0];

describe('ProductCard', () => {
  test('renders product details correctly from db.json', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/Premium Headphones/i)).toBeInTheDocument();
    expect(screen.getByText(/ASIN: B01N1UX8RW/i)).toBeInTheDocument();
    expect(screen.getByText(/Store: RENPHO/i)).toBeInTheDocument();
    expect(screen.getByText('$199.99')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Affiliate Link/i })).toBeInTheDocument();
  });
});
