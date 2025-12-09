import { SkillCategory, SkillType } from './types';

export const LOGO_URL = "https://placehold.co/400x400/0f172a/ffffff?text=Skill+Sync";

export const MOCK_USERS = [
  {
    id: 'u1',
    name: 'Aditya Kumar',
    email: 'aditya@example.com',
    avatar: 'https://picsum.photos/seed/aditya/200/200',
    bio: 'Music producer and guitarist with 5 years of teaching experience.',
    location: 'Mumbai, MH',
    joinedDate: '2023-01-15',
    rating: 4.9,
    role: 'USER'
  },
  {
    id: 'u2',
    name: 'Praveen Reddy',
    email: 'praveen@example.com',
    avatar: 'https://picsum.photos/seed/praveen/200/200',
    bio: 'Senior Frontend Engineer. I love teaching React and exploring AI.',
    location: 'Bangalore, KA',
    joinedDate: '2023-03-10',
    rating: 4.7,
    role: 'USER'
  },
  {
    id: 'u3',
    name: 'Soma Sharma',
    email: 'soma@example.com',
    avatar: 'https://picsum.photos/seed/soma/200/200',
    bio: 'Home chef specializing in authentic South Indian cuisine.',
    location: 'Chennai, TN',
    joinedDate: '2023-04-05',
    rating: 4.8,
    role: 'USER'
  },
  {
    id: 'u4',
    name: 'Sundar Pichai',
    email: 'sundar@example.com',
    avatar: 'https://picsum.photos/seed/sundar/200/200',
    bio: 'Tech enthusiast looking to learn classical music.',
    location: 'Hyderabad, TS',
    joinedDate: '2023-02-20',
    rating: 5.0,
    role: 'USER'
  },
  {
    id: 'u5',
    name: 'Prabhas Raju',
    email: 'prabhas@example.com',
    avatar: 'https://picsum.photos/seed/prabhas/200/200',
    bio: 'Fitness trainer and Yoga instructor.',
    location: 'Hyderabad, TS',
    joinedDate: '2023-05-12',
    rating: 4.6,
    role: 'USER'
  },
  {
    id: 'admin1',
    name: 'Santhosh Admin',
    email: 'santhosh@skillsync.com',
    avatar: 'https://picsum.photos/seed/santhosh/200/200',
    bio: 'Platform Administrator',
    location: 'Cloud',
    joinedDate: '2022-01-01',
    rating: 5.0,
    role: 'ADMIN'
  }
];

export const MOCK_SKILLS = [
  {
    id: 's1',
    userId: 'u1', // Aditya
    title: 'Advanced Guitar Riffs & Theory',
    description: 'Master the fretboard with advanced scales and improvisation techniques.',
    category: SkillCategory.MUSIC,
    type: SkillType.OFFER,
    image: 'https://picsum.photos/id/145/400/300'
  },
  {
    id: 's2',
    userId: 'u2', // Praveen
    title: 'Full Stack React Development',
    description: 'Learn to build scalable apps with React, Node.js, and TypeScript.',
    category: SkillCategory.TECH,
    type: SkillType.OFFER,
    image: 'https://picsum.photos/id/180/400/300'
  },
  {
    id: 's3',
    userId: 'u3', // Soma
    title: 'Authentic Chettinad Cooking',
    description: 'Learn to make spicy and aromatic Chettinad dishes from scratch.',
    category: SkillCategory.COOKING,
    type: SkillType.OFFER,
    image: 'https://picsum.photos/id/292/400/300'
  },
  {
    id: 's4',
    userId: 'u4', // Sundar
    title: 'Classical Hindustani Vocals',
    description: 'Looking for a guru to teach me basics of Hindustani classical music.',
    category: SkillCategory.MUSIC,
    type: SkillType.REQUEST,
    image: 'https://picsum.photos/id/453/400/300'
  },
  {
    id: 's5',
    userId: 'u5', // Prabhas
    title: 'Morning Yoga & Meditation',
    description: 'Join me for sunrise yoga sessions to boost your physical and mental health.',
    category: SkillCategory.FITNESS,
    type: SkillType.OFFER,
    image: 'https://picsum.photos/id/338/400/300'
  }
];