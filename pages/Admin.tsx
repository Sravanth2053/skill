import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyzeSkillGap } from '../services/geminiService';
import { SkillType } from '../types';
import { Trash2, AlertCircle } from 'lucide-react';

const Admin = () => {
  const { user, users, skills, deleteSkill } = useApp();
  const [aiReport, setAiReport] = useState('Generating market analysis...');

  useEffect(() => {
    analyzeSkillGap(skills).then(setAiReport);
  }, [skills]);

  if (!user || user.role !== 'ADMIN') return <div className="p-10 text-center text-red-500">Access Denied</div>;

  // Stats for Charts
  const skillsByType = [
    { name: 'Offer', value: skills.filter(s => s.type === SkillType.OFFER).length },
    { name: 'Request', value: skills.filter(s => s.type === SkillType.REQUEST).length }
  ];

  const categoryCount = {};
  skills.forEach(s => {
    categoryCount[s.category] = (categoryCount[s.category] || 0) + 1;
  });
  const skillsByCategory = Object.keys(categoryCount).map(key => ({ name: key, value: categoryCount[key] }));

  const handleDelete = async (id: string, title: string) => {
      if(window.confirm(`Are you sure you want to delete the listing "${title}"?`)) {
          await deleteSkill(id);
      }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            Welcome, {user.name}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium">Total Listings</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{skills.length}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="text-indigo-100 text-sm font-medium mb-2">AI Market Analysis</h3>
            <p className="text-sm leading-relaxed">{aiReport}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-80">
            <h3 className="font-bold mb-4">Listings by Category</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsByCategory}>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#f3f4f6'}} />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-80">
            <h3 className="font-bold mb-4">Supply vs Demand</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={skillsByType}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {skillsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#0ea5e9' : '#8b5cf6'} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Manage Listings Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Manage Listings</h2>
            <p className="text-sm text-gray-500">View and remove inappropriate listings.</p>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 font-medium">Title</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Type</th>
                        <th className="px-6 py-4 font-medium">Posted By</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {skills.map(skill => {
                        const owner = users.find(u => u.id === skill.userId);
                        return (
                            <tr key={skill.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{skill.title}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-xs">{skill.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {skill.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{skill.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{owner?.name || 'Unknown'}</td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleDelete(skill.id, skill.title)}
                                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete Listing"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {skills.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                <AlertCircle className="mx-auto mb-2 opacity-20" size={32} />
                                No listings found in the database.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;