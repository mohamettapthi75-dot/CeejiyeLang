import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Store, User, Star, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ShopList = () => {
  const { gameName, level } = useParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/sellers/game/${gameName}?level=${level}`);
        const data = await res.json();
        setShops(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [gameName, level]);

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8 text-gray-400 text-sm">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={14} />
          <Link to={`/game/${gameName}`} className="hover:text-accent capitalize">{gameName}</Link>
          <ChevronRight size={14} />
          <span className="text-white">{level} Tier</span>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2">Verified <span className="gradient-text">Sellers</span></h2>
          <p className="text-gray-400">Hand-picked shops selling {level} level {gameName} accounts.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : shops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shops.map((shop) => (
              <motion.div
                key={shop.id}
                whileHover={{ y: -5 }}
                className="glass-morphism rounded-3xl overflow-hidden border border-white/10 group"
              >
                <div className="h-24 bg-gradient-to-r from-primary/30 to-secondary/30 relative">
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-20 h-20 rounded-2xl bg-dark border-4 border-dark overflow-hidden shadow-lg">
                      <img
                        src={shop.shop_image || 'https://via.placeholder.com/80'}
                        alt={shop.shop_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {shop.is_online ? (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-green-400 uppercase">Online</span>
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gray-500/20 border border-gray-500/30 rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Offline</span>
                    </div>
                  )}
                </div>

                <div className="pt-12 p-6">
                  <h3 className="text-xl font-bold mb-1">{shop.shop_name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span>4.9</span>
                    </div>
                    <span>•</span>
                    <span>{shop.total_sales} Sold</span>
                  </div>

                  <Link
                    to={`/shop/${shop.id}`}
                    className="block w-full py-3 bg-white/5 border border-white/10 rounded-xl text-center font-bold group-hover:bg-accent group-hover:text-dark transition-all"
                  >
                    Enter Shop
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Store size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-bold">No shops found</h3>
            <p className="text-gray-400">Try a different level or check back later.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShopList;
