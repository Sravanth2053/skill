import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Exchange skills,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
            empower community.
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The local marketplace for knowledge. Teach what you love, learn what you need. 
          No money required, just fair exchange.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/explore" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-xl shadow-gray-200">
            Find a Skill <ArrowRight size={20} />
          </Link>
          <Link to="/post-skill" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all">
            Offer a Skill
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Matchmaking</h3>
          <p className="text-gray-500">Our intelligent system connects you with the perfect exchange partner based on your unique needs.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Globe size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Local & Virtual</h3>
          <p className="text-gray-500">Connect with neighbors for hands-on learning or go global with virtual sessions.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Verified Community</h3>
          <p className="text-gray-500">Trust-based ratings and verified profiles ensure a safe environment for everyone.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;