import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-medium mb-6">
            ✨ Welcome to the Next Generation
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="gradient-text">NexuHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Your Gateway to Premium Game Accounts. Explore, trade, and dominate with the most secure 3D marketplace for gamers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/explore" className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl font-bold text-lg flex items-center gap-2 shadow-neon-purple hover:scale-105 transition-all">
              Start Exploring <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/register?role=seller" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">
              Become a Seller
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-morphism">
              <Zap className="text-accent flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Instant Delivery</h4>
                <p className="text-sm text-gray-400">Get access immediately after verification.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-morphism">
              <ShieldCheck className="text-secondary flex-shrink-0" size={24} />
              <div>
                <h4 className="font-bold mb-1">Secure Escrow</h4>
                <p className="text-sm text-gray-400">Payment held until you confirm delivery.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-morphism">
              <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center text-[10px] font-bold">3D</div>
              <div>
                <h4 className="font-bold mb-1">Immersive UI</h4>
                <p className="text-sm text-gray-400">A revolutionary browsing experience.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
