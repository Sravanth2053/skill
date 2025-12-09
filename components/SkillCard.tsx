import React from 'react';
import { SkillType, Skill, User } from '../types';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SkillCardProps {
  skill: Skill;
  owner: User;
}

const SkillCard = ({ skill, owner }: SkillCardProps) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col overflow-hidden h-full">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={skill.image} 
          alt={skill.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md ${skill.type === SkillType.OFFER ? 'bg-primary-500' : 'bg-secondary-500'}`}>
          {skill.type === SkillType.OFFER ? 'OFFERING' : 'REQUESTING'}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{skill.category}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-bold">{owner.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{skill.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{skill.description}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-900">{owner.name}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                        <MapPin size={10} /> {owner.location}
                    </span>
                </div>
            </div>
            <Link 
              to={`/messages?userId=${owner.id}&skillId=${skill.id}`}
              className="text-primary-600 hover:bg-primary-50 p-2 rounded-full transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;