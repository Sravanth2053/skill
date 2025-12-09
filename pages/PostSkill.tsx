import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { SkillCategory, SkillType } from '../types';
import { useNavigate } from 'react-router-dom';

const PostSkill = () => {
  const { user, addSkill } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(SkillCategory.OTHER);
  const [type, setType] = useState(SkillType.OFFER);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    addSkill({
      id: `s${Date.now()}`,
      userId: user.id,
      title,
      description,
      category,
      type,
      image: `https://picsum.photos/seed/${Date.now()}/400/300`
    });
    navigate('/explore');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4">
            <button
                type="button"
                onClick={() => setType(SkillType.OFFER)}
                className={`p-4 rounded-xl border-2 font-bold transition-all ${type === SkillType.OFFER ? 'border-primary-500 bg-primary-50 text-primary-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >
                I want to TEACH
            </button>
            <button
                type="button"
                onClick={() => setType(SkillType.REQUEST)}
                className={`p-4 rounded-xl border-2 font-bold transition-all ${type === SkillType.REQUEST ? 'border-secondary-500 bg-secondary-50 text-secondary-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
            >
                I want to LEARN
            </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            placeholder="e.g., Advanced Photography Lessons"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
          >
            {Object.values(SkillCategory).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="Describe what you are offering or looking for..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Publish Listing
        </button>
      </form>
    </div>
  );
};

export default PostSkill;