import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import SkillCard from '../components/SkillCard';
import { findMatches } from '../services/geminiService';
import { SkillCategory } from '../types';
import { Search, Filter, Loader2, Sparkles } from 'lucide-react';

const Explore = () => {
  const { skills, users } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredSkills, setFilteredSkills] = useState(skills);
  const [isSearching, setIsSearching] = useState(false);
  const [aiMode, setAiMode] = useState(false);

  useEffect(() => {
    // Basic filter when not in AI mode
    if (!aiMode) {
      let res = skills;
      if (activeCategory !== 'All') {
        res = res.filter(s => s.category === activeCategory);
      }
      if (searchQuery) {
        res = res.filter(s => 
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredSkills(res);
    }
  }, [searchQuery, activeCategory, skills, aiMode]);

  const handleAiSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    setAiMode(true);
    
    // Call Gemini Service
    const matchedIds = await findMatches(searchQuery, skills);
    
    const matchedSkills = skills.filter(s => matchedIds.includes(s.id));
    // Sort by order of ID return (relevance)
    matchedSkills.sort((a, b) => matchedIds.indexOf(a.id) - matchedIds.indexOf(b.id));
    
    setFilteredSkills(matchedSkills);
    setIsSearching(false);
  };

  const categories = ['All', ...Object.values(SkillCategory)];

  return (
    <div className="space-y-8">
      <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Discover Skills</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="What do you want to learn or teach?"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 bg-white/95 backdrop-blur focus:ring-4 focus:ring-indigo-400 focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === '') setAiMode(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button 
              onClick={handleAiSearch}
              disabled={isSearching}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              {isSearching ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
              AI Match
            </button>
          </div>
          
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setAiMode(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-white text-indigo-900' 
                  : 'bg-indigo-800/50 text-indigo-100 hover:bg-indigo-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {aiMode ? `AI Results for "${searchQuery}"` : `${activeCategory} Skills`}
          </h3>
          <span className="text-sm text-gray-500">{filteredSkills.length} results found</span>
        </div>

        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map(skill => {
              const owner = users.find(u => u.id === skill.userId);
              if (!owner) return null;
              return <SkillCard key={skill.id} skill={skill} owner={owner} />;
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No skills found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;