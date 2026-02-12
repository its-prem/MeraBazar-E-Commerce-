import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './CartContext';  // ← Yaha se import

// Import pages
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
// ... other imports

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* ... other routes */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;