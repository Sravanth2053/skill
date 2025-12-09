import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { Home, Search, MessageSquare, User, LogOut, PlusCircle, ShieldCheck } from 'lucide-react';
import { LOGO_URL } from '../constants';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-primary-600 font-bold" : "text-gray-500 hover:text-gray-900";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={LOGO_URL} 
              alt="SkillSync Logo" 
              className="h-10 w-10 object-contain rounded-lg bg-gray-900" 
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500 hidden sm:block">
              SkillSync
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/explore" className={`flex items-center gap-1 ${isActive('/explore')}`}>
              <Search size={18} /> Explore
            </Link>
            {user && (
              <>
                <Link to="/messages" className={`flex items-center gap-1 ${isActive('/messages')}`}>
                  <MessageSquare size={18} /> Messages
                </Link>
                <Link to="/profile" className={`flex items-center gap-1 ${isActive('/profile')}`}>
                  <User size={18} /> Profile
                </Link>
                 {user.role === 'ADMIN' && (
                    <Link to="/admin" className={`flex items-center gap-1 ${isActive('/admin')}`}>
                      <ShieldCheck size={18} /> Admin
                    </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/post-skill" className="hidden sm:flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                  <PlusCircle size={18} />
                  <span>Post Skill</span>
                </Link>
                <button onClick={logout} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
                <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full border border-gray-300 object-cover" />
              </>
            ) : (
              <Link to="/login" className="text-primary-600 font-medium hover:underline">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 z-40 pb-safe">
         <Link to="/explore" className="flex flex-col items-center text-xs text-gray-600">
           <Search size={20} /> Explore
         </Link>
         {user && (
           <>
            <Link to="/post-skill" className="flex flex-col items-center text-xs text-primary-600 font-bold">
               <PlusCircle size={24} /> Post
             </Link>
             <Link to="/messages" className="flex flex-col items-center text-xs text-gray-600">
               <MessageSquare size={20} /> Chat
             </Link>
             <Link to="/profile" className="flex flex-col items-center text-xs text-gray-600">
               <User size={20} /> Me
             </Link>
           </>
         )}
      </div>
    </div>
  );
};

export default Layout;