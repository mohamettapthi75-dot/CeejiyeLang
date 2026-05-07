import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PurchasePage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        setProduct(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handlePayment = async () => {
    setPaying(true);
    try {
      const token = localStorage.getItem('token');
      // 1. Create order
      const orderRes = await fetch(`${API_BASE_URL}/api/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: product.id,
          seller_id: product.seller_id,
          amount: product.price
        })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message);

      // 2. Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 3. Trigger mock webhook
      await fetch(`${API_BASE_URL}/api/payments/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderData.order_id,
          status: 'completed'
        })
      });

      // 4. Redirect to chat
      navigate(`/chat/${orderData.order_id}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <Layout>
      <div className="min-h-screen py-24 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 flex items-center gap-4">
          <CreditCard className="text-accent" />
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="p-6 rounded-3xl glass-morphism border border-white/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" />
                Order Summary
              </h3>
              <div className="flex gap-4 mb-6">
                <img src={`${API_BASE_URL}/${product.image1}`} className="w-20 h-20 rounded-xl object-cover" alt="" />
                <div>
                  <h4 className="font-bold text-sm">{product.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 uppercase">{product.game_category} • {product.level} Level</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Processing Fee</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span className="text-accent">${product.price}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-2xl border border-accent/10">
              <Lock size={16} className="text-accent mt-1" />
              <p className="text-xs text-gray-400">
                Your payment is secure. We use escrow to protect your money until you confirm that you've received the account details.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-3xl glass-morphism border border-white/10">
              <h3 className="font-bold mb-6">Payment Method</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border-2 border-accent bg-accent/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-white/20 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                    <span className="text-sm font-medium">Card ending in 4242</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-white/10 bg-white/5 opacity-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-[8px] font-bold italic">PayPal</div>
                    <span className="text-sm font-medium">PayPal Wallet</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full py-5 bg-gradient-to-r from-primary to-secondary rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-neon-purple hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {paying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  Confirm & Pay <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PurchasePage;
