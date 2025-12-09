import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { LOGO_URL } from '../constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
            <img 
                src={LOGO_URL} 
                alt="SkillSync Logo" 
                className="w-24 h-24 object-contain rounded-2xl bg-gray-900 p-2 shadow-lg" 
            />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SkillSync</h1>
        <p className="text-gray-500 mb-8">
            <span className="block font-semibold text-primary-600 mb-2">New here? No problem!</span>
            Enter your email below. If you don't have an account, we will create one for you instantly.
        </p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
            Login / Register
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400">
            <p className="mb-2 font-semibold">Demo Credentials:</p>
            <div className="grid grid-cols-2 gap-2 text-left bg-gray-50 p-3 rounded-lg">
                <span>santhosh@skillsync.com</span> <span className="text-right text-purple-600 font-bold">Admin</span>
                <span>aditya@example.com</span> <span className="text-right text-blue-600">User</span>
                <span>praveen@example.com</span> <span className="text-right text-blue-600">User</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;