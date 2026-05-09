import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-morphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-secondary rounded-xl flex items-center justify-center shadow-neon-blue group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tighter gradient-text">NEXUHUB</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <Link to="/explore" className="hover:text-accent transition-colors">Marketplace</Link>
            {user?.role === 'seller' && (
              <Link to="/seller/dashboard" className="hover:text-accent transition-colors">Seller Panel</Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-accent transition-colors">Admin</Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 hover:text-accent">
                  <User size={20} />
                  <span className="hidden sm:inline">{user.username}</span>
                </Link>
                <button onClick={logout} className="p-2 hover:text-red-400 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="px-4 py-2 hover:text-accent transition-colors">Login</Link>
                <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-full font-medium hover:opacity-90 transition-opacity">
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
