import React from 'react';
import { useApp } from '../contexts/AppContext';
import SkillCard from '../components/SkillCard';

const Profile = () => {
  const { user, skills } = useApp();

  if (!user) return <div>Please login.</div>;

  const mySkills = skills.filter(s => s.userId === user.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-8">
        <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full object-cover border-4 border-primary-50" />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 mb-2">{user.location} • Joined {new Date(user.joinedDate).toLocaleDateString()}</p>
          <p className="text-gray-700 max-w-lg mb-4">{user.bio}</p>
          <div className="flex justify-center md:justify-start gap-4">
             <div className="text-center">
                <span className="block text-xl font-bold text-gray-900">{mySkills.length}</span>
                <span className="text-xs text-gray-500">Listings</span>
             </div>
             <div className="text-center">
                <span className="block text-xl font-bold text-gray-900">{user.rating}</span>
                <span className="text-xs text-gray-500">Rating</span>
             </div>
          </div>
        </div>
      </div>

      {/* My Listings */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Listings</h2>
        {mySkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mySkills.map(skill => (
              <SkillCard key={skill.id} skill={skill} owner={user} />
            ))}
          </div>
        ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500">You haven't posted any skills yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Profile;