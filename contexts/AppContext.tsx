import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../services/db';
import { User, Skill, Message } from '../types';

interface AppContextType {
  user: User | null;
  users: User[];
  skills: Skill[];
  messages: Message[];
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  addSkill: (skill: Skill) => Promise<void>;
  deleteSkill: (skillId: string) => Promise<void>;
  sendMessage: (msg: Message) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await db.init();
      
      const [fetchedUsers, fetchedSkills, fetchedMessages] = await Promise.all([
        db.getUsers(),
        db.getSkills(),
        db.getMessages()
      ]);

      setUsers(fetchedUsers);
      setSkills(fetchedSkills);
      setMessages(fetchedMessages);

      // Restore session
      const sessionId = db.getSession();
      if (sessionId) {
        const currentUser = fetchedUsers.find((u: User) => u.id === sessionId);
        if (currentUser) setUser(currentUser);
      }
      
      setIsLoading(false);
    };

    loadData();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    // Refresh users from DB to ensure uniqueness
    let currentUsers = await db.getUsers();
    let foundUser = currentUsers.find((u: User) => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      // Create new user in DB
      const newUser: User = {
        id: `u${Date.now()}`,
        name: email.split('@')[0],
        email,
        avatar: `https://picsum.photos/seed/${email}/200/200`,
        bio: 'New member ready to learn!',
        location: 'Unknown',
        joinedDate: new Date().toISOString(),
        rating: 5.0,
        role: 'USER'
      };
      foundUser = await db.createUser(newUser);
      setUsers(prev => [...prev, newUser]);
    }

    setUser(foundUser);
    db.setSession(foundUser.id);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    db.clearSession();
  };

  const addSkill = async (skill: Skill) => {
    // Optimistic UI update
    setSkills(prev => [skill, ...prev]);
    // Persist to DB
    await db.createSkill(skill);
  };

  const deleteSkill = async (skillId: string) => {
    // Optimistic UI update
    setSkills(prev => prev.filter(s => s.id !== skillId));
    // Persist to DB
    await db.deleteSkill(skillId);
  };

  const sendMessage = async (msg: Message) => {
    // Optimistic UI update
    setMessages(prev => [...prev, msg]);
    // Persist to DB
    await db.createMessage(msg);
  };

  return (
    <AppContext.Provider value={{ user, users, skills, messages, isLoading, login, logout, addSkill, deleteSkill, sendMessage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};