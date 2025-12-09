import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { generateIcebreaker } from '../services/geminiService';
import { useSearchParams } from 'react-router-dom';
import { Send, Sparkles, User as UserIcon } from 'lucide-react';

const Messages = () => {
  const { user, users, messages, sendMessage, skills } = useApp();
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('userId');
  const targetSkillId = searchParams.get('skillId');

  const [activeContactId, setActiveContactId] = useState(targetUserId);
  const [inputText, setInputText] = useState('');
  const [icebreaker, setIcebreaker] = useState(null);
  const messagesEndRef = useRef(null);

  const activeUser = users.find(u => u.id === activeContactId);
  const chatHistory = messages.filter(
    m => (m.senderId === user?.id && m.receiverId === activeContactId) || 
         (m.senderId === activeContactId && m.receiverId === user?.id)
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Generate icebreaker if new chat
  useEffect(() => {
    const fetchIcebreaker = async () => {
      if (user && activeUser && chatHistory.length === 0 && targetSkillId) {
        const skill = skills.find(s => s.id === targetSkillId);
        if (skill) {
            const suggestion = await generateIcebreaker(user, activeUser, skill.title);
            setIcebreaker(suggestion);
        }
      }
    };
    fetchIcebreaker();
  }, [activeContactId, user, activeUser, chatHistory.length, targetSkillId, skills]);

  const handleSend = (text = inputText) => {
    if (!text.trim() || !user || !activeContactId) return;
    
    const newMsg = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: activeContactId,
      content: text,
      timestamp: Date.now()
    };
    sendMessage(newMsg);
    setInputText('');
    setIcebreaker(null); // Clear suggestion after sending
  };

  if (!user) return <div>Please login to chat.</div>;

  // Mock contact list (anyone who isn't me)
  const contacts = users.filter(u => u.id !== user.id);

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Sidebar Contacts */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-800">Messages</h2>
        </div>
        <div className="overflow-y-auto flex-grow">
            {contacts.map(contact => (
                <div 
                    key={contact.id}
                    onClick={() => setActiveContactId(contact.id)}
                    className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors ${activeContactId === contact.id ? 'bg-white border-l-4 border-primary-500 shadow-sm' : ''}`}
                >
                    <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="overflow-hidden">
                        <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{contact.bio}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {activeUser ? (
            <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white">
                    <img src={activeUser.avatar} alt={activeUser.name} className="w-10 h-10 rounded-full" />
                    <div>
                        <h3 className="font-bold text-gray-900">{activeUser.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                        </div>
                    </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50">
                    {chatHistory.length === 0 && (
                        <div className="text-center text-gray-400 mt-10">
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    )}
                    
                    {icebreaker && chatHistory.length === 0 && (
                         <div className="mx-auto max-w-md bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-center mb-2 text-indigo-500"><Sparkles size={20} /></div>
                            <p className="text-sm text-indigo-900 mb-3 italic">"AI Suggestion: Break the ice!"</p>
                            <p className="text-gray-800 font-medium mb-3">"{icebreaker}"</p>
                            <button 
                                onClick={() => handleSend(icebreaker)}
                                className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                            >
                                Send this message
                            </button>
                         </div>
                    )}

                    {chatHistory.map(msg => {
                        const isMe = msg.senderId === user.id;
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${isMe ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                                    <p>{msg.content}</p>
                                    <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-primary-100' : 'text-gray-400'}`}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            placeholder="Type a message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            onClick={() => handleSend()}
                            className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </>
        ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <UserIcon size={48} />
                </div>
                <p>Select a contact to start messaging</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Messages;