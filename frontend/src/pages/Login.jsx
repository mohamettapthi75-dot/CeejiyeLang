import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark relative overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 glass-morphism p-10 rounded-3xl relative z-10 border border-white/10"
        >
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold gradient-text">Welcome Back</h2>
            <p className="mt-2 text-center text-sm text-gray-400">Log in to your account</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

            <div className="space-y-4">
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
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl font-bold shadow-neon-purple hover:scale-[1.02] transition-transform"
              >
                Log In
              </button>
            </div>

            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-accent hover:underline">Sign up</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
