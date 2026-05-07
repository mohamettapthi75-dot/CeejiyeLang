import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import Background3D from '../components/Background3D';

const games = [
  {
    name: 'Efootball',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800',
    description: 'Master the pitch with elite squads and legendary players.',
    accentColor: '#00d2ff'
  },
  {
    name: 'PUBG',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    description: 'Survival of the fittest with rare skins and high rankings.',
    accentColor: '#fbbf24'
  },
  {
    name: 'Ludo',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80&w=800',
    description: 'King of the board with exclusive tokens and win rates.',
    accentColor: '#ef4444'
  }
];

const Home = () => {
  return (
    <Layout>
      <Background3D />
      <Hero />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your <span className="gradient-text">Arena</span></h2>
            <p className="text-gray-400 max-w-md">Select a game to see available seller shops and premium accounts.</p>
          </div>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, idx) => (
            <GameCard key={idx} {...game} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
