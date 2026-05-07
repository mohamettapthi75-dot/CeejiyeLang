import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Store, Camera } from 'lucide-react';

const SellerApply = () => {
  const [formData, setFormData] = useState({
    shop_name: '',
    game_category: 'Efootball',
    shop_image: ''
  });
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/sellers/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate('/pending-approval');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-24 px-4 flex justify-center items-center bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full glass-morphism p-10 rounded-3xl border border-white/10"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-secondary/30">
              <Store className="text-secondary" size={32} />
            </div>
            <h2 className="text-3xl font-bold gradient-text">Setup Your Shop</h2>
            <p className="text-gray-400 mt-2">Choose your niche and brand your store.</p>
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-xl">
              ⚠️ Warning: You can only choose ONE game category. This cannot be changed later.
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Shop Name</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-secondary outline-none transition-all"
                placeholder="Elite Gamers Store"
                value={formData.shop_name}
                onChange={(e) => setFormData({...formData, shop_name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Game Category</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-secondary outline-none transition-all"
                value={formData.game_category}
                onChange={(e) => setFormData({...formData, game_category: e.target.value})}
              >
                <option value="Efootball">Efootball</option>
                <option value="PUBG">PUBG</option>
                <option value="Ludo">Ludo</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Shop Logo URL</label>
              <div className="relative">
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-secondary outline-none transition-all"
                  placeholder="https://example.com/logo.png"
                  value={formData.shop_image}
                  onChange={(e) => setFormData({...formData, shop_image: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl font-bold shadow-neon-purple hover:scale-[1.02] transition-transform mt-4"
            >
              Submit Application
            </button>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SellerApply;
