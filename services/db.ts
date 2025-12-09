import { MOCK_USERS, MOCK_SKILLS } from '../constants';

// Changed keys to v2 to ensure new mock data is loaded for the user
const USERS_KEY = 'skillsync_users_v2';
const SKILLS_KEY = 'skillsync_skills_v2';
const MESSAGES_KEY = 'skillsync_messages_v2';
const SESSION_KEY = 'skillsync_session_v2';

// Simulate network latency for realism
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  async init() {
    // Seed data if local storage is empty
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(MOCK_USERS));
    }
    if (!localStorage.getItem(SKILLS_KEY)) {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(MOCK_SKILLS));
    }
    if (!localStorage.getItem(MESSAGES_KEY)) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify([]));
    }
    await delay(100);
  },

  async getUsers() {
    await delay(100);
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  async createUser(user) {
    await delay(300);
    const users = await this.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return user;
  },

  async getSkills() {
    await delay(100);
    const data = localStorage.getItem(SKILLS_KEY);
    return data ? JSON.parse(data) : [];
  },

  async createSkill(skill) {
    await delay(300);
    const skills = await this.getSkills();
    skills.unshift(skill); // Add new skills to the top
    localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
    return skill;
  },

  async deleteSkill(skillId) {
    await delay(200);
    const skills = await this.getSkills();
    const updatedSkills = skills.filter(s => s.id !== skillId);
    localStorage.setItem(SKILLS_KEY, JSON.stringify(updatedSkills));
    return updatedSkills;
  },

  async getMessages() {
     await delay(100);
     const data = localStorage.getItem(MESSAGES_KEY);
     return data ? JSON.parse(data) : [];
  },

  async createMessage(message) {
    await delay(50); 
    const messages = await this.getMessages();
    messages.push(message);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    return message;
  },

  // Session Management
  setSession(userId) {
    localStorage.setItem(SESSION_KEY, userId);
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession() {
    return localStorage.getItem(SESSION_KEY);
  },
  
  // Debug helper
  async reset() {
      localStorage.removeItem(USERS_KEY);
      localStorage.removeItem(SKILLS_KEY);
      localStorage.removeItem(MESSAGES_KEY);
      localStorage.removeItem(SESSION_KEY);
      window.location.reload();
  }
};