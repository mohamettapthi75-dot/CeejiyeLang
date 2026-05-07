import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const GameCard = ({ name, image, description, accentColor }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative group cursor-pointer"
      onClick={() => navigate(`/game/${name.toLowerCase()}`)}
    >
      <div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div className="relative h-[400px] w-full rounded-3xl overflow-hidden glass-morphism border border-white/10 flex flex-col">
        <div className="h-2/3 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Browse Shops</span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-dark transition-colors">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
