import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Injected by environment
const ai = new GoogleGenAI({ apiKey });

export const findMatches = async (query, skills) => {
  if (!apiKey) {
    console.warn("No API Key available for Gemini");
    return skills.filter(s => s.title.toLowerCase().includes(query.toLowerCase())).map(s => s.id);
  }

  try {
    const skillsJson = JSON.stringify(skills.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category
    })));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a semantic search engine for a skill exchange platform.
      User Query: "${query}"
      
      Available Skills:
      ${skillsJson}
      
      Return a JSON array of the IDs of the top 5 relevant skills that match the user's intent. 
      If the user asks "I want to learn guitar", look for OFFER skills related to guitar.
      If the user says "I can teach coding", look for REQUEST skills related to coding.
      If generic, match keywords.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini matching failed:", error);
    return [];
  }
};

export const generateIcebreaker = async (user1, user2, skillTitle) => {
  if (!apiKey) return "Hi! I saw your skill listing and I'm interested.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a friendly, casual, short (1 sentence) icebreaker message for a skill exchange platform.
      Sender: ${user1.name} (Bio: ${user1.bio})
      Receiver: ${user2.name} (Bio: ${user2.bio})
      Context: Sender is interested in Receiver's skill "${skillTitle}".
      Make it sound natural and encouraging.`,
    });
    return response.text || "Hi! Interested in connecting.";
  } catch (e) {
    return "Hi! Interested in connecting.";
  }
};

export const analyzeSkillGap = async (skills) => {
    if (!apiKey) return "Unable to analyze skills without AI.";

    const skillDescriptions = skills.map(s => `${s.type}: ${s.title}`).join('\n');

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze these skills on a local exchange platform:
            ${skillDescriptions}
            
            Provide a 2-sentence summary of what skills are in high supply vs high demand.`
        });
        return response.text || "";
    } catch (e) {
        return "";
    }
}