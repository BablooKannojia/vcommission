import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/dashboardContext';
import { ProductsProvider } from './context/ProductsContext';
import Layout from './components/common/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/Products/ProductsPage'));

function App() {
  return (
    <Router>
      <DashboardProvider>
        <ProductsProvider>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
              </Routes>
            </Suspense>
          </Layout>
        </ProductsProvider>
      </DashboardProvider>
    </Router>
  );
}

export default App;