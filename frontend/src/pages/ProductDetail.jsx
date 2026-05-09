import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Shield, CreditCard, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        const prodData = await prodRes.json();
        setProduct(prodData);

        const shopRes = await fetch(`${API_BASE_URL}/api/sellers/shop/${prodData.seller_id}`);
        const shopData = await shopRes.json();
        setShop(shopData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  const images = product ? [product.image1, product.image2, product.image3].filter(img => img) : [];

  const handleBuy = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!shop?.is_online) {
      alert("Seller is currently offline. You can only purchase when the seller is online to receive your account via live chat.");
      return;
    }

    navigate(`/purchase/${productId}`);
  };

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} />
          <span>Back to Marketplace</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="h-[400px] md:h-[500px] rounded-3xl overflow-hidden glass-morphism border border-white/10 relative">
              <img
                src={`${API_BASE_URL}/${images[activeImage]}`}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 px-4 py-1.5 bg-accent/20 backdrop-blur-md rounded-full border border-accent/30 text-accent font-bold text-xs uppercase tracking-widest">
                {product.level} Tier
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-accent' : 'border-white/5 opacity-60 hover:opacity-100'}`}
                >
                  <img src={`${API_BASE_URL}/${img}`} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-tighter mb-2">
                <Shield size={16} />
                <span>Verified Listing</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="p-8 rounded-3xl glass-morphism border border-white/10 mb-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-gray-500 text-sm font-bold uppercase block mb-1">Fixed Price</span>
                  <span className="text-5xl font-black gradient-text">${product.price}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-sm font-bold uppercase block mb-1">Seller</span>
                  <Link to={`/shop/${shop?.id}`} className="font-bold text-white hover:text-accent flex items-center gap-2 justify-end">
                    {shop?.shop_name}
                    <div className={`w-2 h-2 rounded-full ${shop?.is_online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  </Link>
                </div>
              </div>

              <button
                onClick={handleBuy}
                disabled={!shop?.is_online}
                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${shop?.is_online ? 'bg-gradient-to-r from-primary to-secondary shadow-neon-purple hover:scale-[1.02]' : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'}`}
              >
                <CreditCard size={24} />
                {shop?.is_online ? 'BUY NOW' : 'SELLER OFFLINE'}
              </button>

              {!shop?.is_online && (
                <p className="text-center text-xs text-red-400/70 mt-4">
                  Purchases are only available when the seller is online for instant manual delivery.
                </p>
              )}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                  <Zap size={14} className="text-accent" />
                  <span>Delivery</span>
                </div>
                <p className="font-medium text-sm">Manual via Chat</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                  <MessageSquare size={14} className="text-secondary" />
                  <span>Support</span>
                </div>
                <p className="font-medium text-sm">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
