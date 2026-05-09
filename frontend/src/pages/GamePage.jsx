import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Trophy, ShieldCheck, Zap } from 'lucide-react';

const GamePage = () => {
  const { gameName } = useParams();
  const navigate = useNavigate();

  const levels = [
    {
      id: 'High',
      title: 'High Tier',
      desc: 'Max level, rare skins, legendary ranks.',
      icon: <Trophy className="text-yellow-400" size={32} />,
      color: 'border-yellow-400/30'
    },
    {
      id: 'Medium',
      title: 'Medium Tier',
      desc: 'Balanced accounts with good win rates.',
      icon: <ShieldCheck className="text-blue-400" size={32} />,
      color: 'border-blue-400/30'
    },
    {
      id: 'Low',
      title: 'Starter Tier',
      desc: 'Perfect for beginners looking to skip the grind.',
      icon: <Zap className="text-purple-400" size={32} />,
      color: 'border-purple-400/30'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold capitalize mb-4">{gameName} <span className="gradient-text">Marketplace</span></h1>
          <p className="text-gray-400 text-xl">Select your preferred account level to see available shops.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level) => (
            <motion.div
              key={level.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/game/${gameName}/${level.id}`)}
              className={`p-8 rounded-3xl glass-morphism border ${level.color} cursor-pointer text-center group`}
            >
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/10 transition-colors">
                {level.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{level.title}</h3>
              <p className="text-gray-400 mb-8">{level.desc}</p>
              <span className="px-6 py-3 bg-white/5 rounded-xl text-sm font-bold group-hover:bg-accent group-hover:text-dark transition-all">
                Select Level
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GamePage;
