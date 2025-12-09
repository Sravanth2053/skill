export const SkillType = {
  OFFER: 'OFFER',
  REQUEST: 'REQUEST'
};

export const SkillCategory = {
  MUSIC: 'Music',
  TECH: 'Technology',
  LANGUAGE: 'Language',
  ART: 'Art',
  COOKING: 'Cooking',
  FITNESS: 'Fitness',
  HANDYMAN: 'Handyman',
  OTHER: 'Other'
};

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  rating: number;
  role: string;
}

export interface Skill {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  type: string;
  image: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
}