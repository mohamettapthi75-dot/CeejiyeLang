import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerApply from './pages/SellerApply';
import GamePage from './pages/GamePage';
import ShopList from './pages/ShopList';
import ShopPage from './pages/ShopPage';
import ProductDetail from './pages/ProductDetail';
import SellerDashboard from './pages/SellerDashboard';
import PurchasePage from './pages/PurchasePage';
import ChatPage from './pages/ChatPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller/apply" element={<SellerApply />} />
          <Route path="/game/:gameName" element={<GamePage />} />
          <Route path="/game/:gameName/:level" element={<ShopList />} />
          <Route path="/shop/:shopId" element={<ShopPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/purchase/:productId" element={<PurchasePage />} />
          <Route path="/chat/:orderId" element={<ChatPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/pending-approval" element={
            <div className="min-h-screen flex items-center justify-center bg-dark text-center px-4">
              <div className="glass-morphism p-10 rounded-3xl max-w-md">
                <h2 className="text-3xl font-bold mb-4 gradient-text">Application Pending</h2>
                <p className="text-gray-400">Your seller application has been submitted and is awaiting admin approval. You will be notified once approved.</p>
                <a href="/" className="mt-8 inline-block text-accent hover:underline">Back to Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
