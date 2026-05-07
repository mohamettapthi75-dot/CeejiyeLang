import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Shield, Gamepad } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'customer';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: initialRole
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Auto login
      await login(formData.email, formData.password);

      if (formData.role === 'seller') {
        navigate('/seller/apply');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark relative overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/20 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 glass-morphism p-10 rounded-3xl relative z-10 border border-white/10"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold gradient-text">Create Account</h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Join the elite gaming community today
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'customer'})}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${formData.role === 'customer' ? 'border-accent bg-accent/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <Shield size={24} className={formData.role === 'customer' ? 'text-accent' : 'text-gray-500'} />
                  <span className="text-sm font-medium">Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'seller'})}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${formData.role === 'seller' ? 'border-secondary bg-secondary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <Gamepad size={24} className={formData.role === 'seller' ? 'text-secondary' : 'text-gray-500'} />
                  <span className="text-sm font-medium">Seller</span>
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl font-bold shadow-neon-purple hover:scale-[1.02] transition-transform"
              >
                Sign Up
              </button>
            </div>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline">Log in</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Register;
