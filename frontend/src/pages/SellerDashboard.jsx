import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Package,
  Plus,
  Settings,
  BarChart3,
  Edit3,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [sellerInfo, setSellerInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    level: 'Medium',
    game_category: ''
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const sellerRes = await fetch(`${API_BASE_URL}/api/sellers/shop/${user?.sellerInfo?.id || 1}`); // Fallback for demo
        const sData = await sellerRes.json();
        setSellerInfo(sData);
        setNewProduct(prev => ({ ...prev, game_category: sData.game_category }));

        const prodRes = await fetch(`${API_BASE_URL}/api/products?seller_id=${sData.id}`);
        const pData = await prodRes.json();
        setProducts(pData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchDashboardData();
  }, [user]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', newProduct.title);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('level', newProduct.level);
    formData.append('game_category', newProduct.game_category);

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setShowAddModal(false);
        // Refresh products
        const prodRes = await fetch(`${API_BASE_URL}/api/products?seller_id=${sellerInfo.id}`);
        setProducts(await prodRes.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading Dashboard...</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Seller <span className="gradient-text">Dashboard</span></h1>
            <p className="text-gray-400">Manage your {sellerInfo?.game_category} empire.</p>
          </div>
          <div className="flex gap-4">
            <Link to={`/shop/${sellerInfo?.id}`} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
              <ExternalLink size={18} />
              View Shop
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-2xl font-bold flex items-center gap-2 shadow-neon-purple hover:scale-105 transition-all"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Weekly Earnings', value: `$${sellerInfo?.weekly_earnings}`, icon: <TrendingUp className="text-green-400" />, sub: '+12% from last week' },
            { label: 'Monthly Earnings', value: `$${sellerInfo?.monthly_earnings}`, icon: <DollarSign className="text-accent" />, sub: 'Current month' },
            { label: 'Total Sold', value: sellerInfo?.total_sales, icon: <Package className="text-secondary" />, sub: 'Lifetime sales' },
            { label: 'Live Products', value: products.length, icon: <BarChart3 className="text-primary" />, sub: 'Active listings' }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-3xl glass-morphism border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 font-medium text-sm">{stat.label}</span>
                <div className="p-2 rounded-xl bg-white/5">{stat.icon}</div>
              </div>
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="glass-morphism rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-bold text-xl">Your Listings</h3>
            <Settings size={20} className="text-gray-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Level</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={`${API_BASE_URL}/${product.image1}`} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <span className="font-bold">{product.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-accent">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10">{product.level}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${product.status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button className="p-2 hover:text-accent transition-colors"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-2xl w-full glass-morphism p-8 rounded-3xl border border-white/10 relative"
            >
              <h2 className="text-2xl font-bold mb-6">List New Account</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Title</label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-accent outline-none"
                      placeholder="e.g. Max Level Efootball Account with 10 Legends"
                      value={newProduct.title}
                      onChange={e => setNewProduct({...newProduct, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Price ($)</label>
                    <input
                      required type="number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-accent outline-none"
                      placeholder="49.99"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Level</label>
                    <select
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-accent outline-none"
                      value={newProduct.level}
                      onChange={e => setNewProduct({...newProduct, level: e.target.value})}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Description</label>
                    <textarea
                      required rows="3"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:ring-1 focus:ring-accent outline-none"
                      placeholder="Describe the account details, items, etc."
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    ></textarea>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-500 mb-1 block">Images (Max 3)</label>
                    <input
                      type="file" multiple accept="image/*"
                      onChange={e => setFiles(e.target.files)}
                      className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-white/5 rounded-xl font-bold">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold">Create Listing</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SellerDashboard;
