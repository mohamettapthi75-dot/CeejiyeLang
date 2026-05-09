import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Shield, Check, X, Users, Store, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [sellerRes, userRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/sellers/pending`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/admin/users`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        setPendingSellers(await sellerRes.json());
        setUsers(await userRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'admin') fetchAdminData();
  }, [user]);

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/sellers/approve/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setPendingSellers(pendingSellers.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.role !== 'admin') return <div className="p-20 text-center">Access Denied</div>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
        <h1 className="text-4xl font-bold mb-12 flex items-center gap-4">
          <Shield className="text-accent" />
          Admin <span className="gradient-text">Control Center</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pending Sellers */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Store size={24} className="text-secondary" />
                Seller Applications
              </h2>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold border border-white/10">
                {pendingSellers.length} PENDING
              </span>
            </div>

            {pendingSellers.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {pendingSellers.map((seller) => (
                  <motion.div
                    key={seller.id}
                    layout
                    className="p-6 rounded-3xl glass-morphism border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-4">
                      <img src={seller.shop_image || 'https://via.placeholder.com/60'} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                      <div>
                        <h4 className="font-bold text-lg">{seller.shop_name}</h4>
                        <p className="text-sm text-gray-400">{seller.username} • {seller.email}</p>
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest mt-1 block">
                          {seller.game_category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproval(seller.id, 'approved')}
                        className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-colors"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleApproval(seller.id, 'rejected')}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl border border-dashed border-white/10 text-center">
                <p className="text-gray-500">No pending applications at the moment.</p>
              </div>
            )}
          </div>

          {/* Quick Stats & Users */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl glass-morphism border border-white/10">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Users size={20} className="text-primary" />
                User Directory
              </h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-bold text-sm">{u.username}</p>
                      <p className="text-[10px] text-gray-500">{u.email}</p>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                      u.role === 'admin' ? 'bg-accent/20 text-accent' :
                      u.role === 'seller' ? 'bg-secondary/20 text-secondary' :
                      'bg-white/5 text-gray-400'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
              <AlertCircle className="text-amber-500 flex-shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-amber-500 mb-1">System Audit</h4>
                <p className="text-xs text-gray-400">Monitor all transactions and chat logs to ensure platform safety.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
