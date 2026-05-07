import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Store, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const [shopRes, prodRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/sellers/shop/${shopId}`),
          fetch(`${API_BASE_URL}/api/products?seller_id=${shopId}`)
        ]);
        const shopData = await shopRes.json();
        const prodData = await prodRes.json();
        setShop(shopData);
        setProducts(prodData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShopData();
  }, [shopId]);

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Shop Banner */}
        <div className="h-64 bg-gradient-to-r from-dark via-primary/20 to-dark border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="w-32 h-32 rounded-3xl bg-dark border-4 border-white/10 overflow-hidden shadow-2xl">
                <img
                  src={shop?.shop_image || 'https://via.placeholder.com/150'}
                  alt={shop?.shop_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left mb-2">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <h1 className="text-4xl font-bold">{shop?.shop_name}</h1>
                  <ShieldCheck className="text-accent" size={24} />
                </div>
                <p className="text-gray-400 mt-1 uppercase tracking-widest text-xs font-bold">{shop?.game_category} PRO SELLER</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="p-6 rounded-3xl glass-morphism border border-white/10">
                <h3 className="font-bold mb-4">Shop Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Total Sales</span>
                    <span className="font-bold">{shop?.total_sales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Member Since</span>
                    <span className="font-bold">2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Response Time</span>
                    <span className="text-green-400 font-bold">&lt; 5 mins</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Store <span className="gradient-text">Items</span></h2>
                <div className="px-4 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs font-bold">
                  {products.length} ACCOUNTS
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="glass-morphism rounded-3xl overflow-hidden border border-white/10 flex flex-col"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={product.image1 ? `${API_BASE_URL}/${product.image1}` : 'https://via.placeholder.com/400x300'}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-dark/60 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-tighter">
                        {product.level} TIER
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h4 className="text-lg font-bold mb-2">{product.title}</h4>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.description}</p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 uppercase font-bold">Price</span>
                          <span className="text-2xl font-black text-accent">${product.price}</span>
                        </div>
                        <Link
                          to={`/product/${product.id}`}
                          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-2xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                          <ShoppingCart size={16} />
                          Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <p className="text-gray-400">This seller hasn't listed any accounts yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
