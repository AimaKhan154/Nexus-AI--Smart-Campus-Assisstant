//GOOGLE GEMINI AI SE CONNECT KRTA HAI ,YEH AI KA BRIDGE HAI APP KE SATH 
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

export function getGeminiAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export const SYSTEM_INSTRUCTION = "You are Nexus AI, the smart campus assistant for Sir Syed University Karachi. Be helpful, professional, and futuristic. Knowledge: Admissions, Fee structures, Exam schedules, Department locations.";

export async function generateGeminiContent(prompt: string, history: any[] = [], context: any = {}) {
  const ai = getGeminiAI();
  
  const systemPrompt = `SYSTEM: ${SYSTEM_INSTRUCTION}
Context: User is ${context.name || 'a guest'} with role ${context.role || 'unknown'}.`;
  const contents = [
    { role: 'user', parts: [{ text: systemPrompt }] },
    { role: 'model', parts: [{ text: "Acknowledged. Nexus Core Assistant online. I am ready to assist with campus-related queries." }] },
    ...history.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.parts[0].text }]
    })),
    { role: 'user', parts: [{ text: prompt }] }
  ];

  // Try a list of candidate models with retries for transient 503/unavailable errors.
  const candidateModels = [
    'gemini-3-flash-preview',
    'gemini-3',
    'gemini-2',
    // Fallback to a smaller model if higher-tier models are unavailable.
    'gemini-1-mini'
  ];

  for (const model of candidateModels) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await ai.models.generateContent({ model, contents });
        if (response && response.text) return response.text;
        // If no text field, throw to trigger retry/fallback
        throw new Error('AI generated no text');
      } catch (err: any) {
        // If it's a transient high-demand/unavailable error, retry with backoff.
        const isTransient = (err && ((err.error && err.error.code === 503) || err.status === 'UNAVAILABLE' || /high demand/i.test(err.message || '')));
        if (isTransient && attempt < 2) {
          const backoff = Math.pow(2, attempt) * 1000;
          // eslint-disable-next-line no-console
          console.warn(`Model ${model} attempt ${attempt + 1} failed with transient error. Retrying in ${backoff}ms...`);
          await new Promise((res) => setTimeout(res, backoff));
          continue;
        }

        // If last attempt for this model, break to try next model; otherwise rethrow non-transient errors.
        if (!isTransient) {
          throw err;
        }
        break;
      }
    }
    // try next model
  }

  throw new Error('All AI models are currently unavailable due to high demand. Please try again later.');
}
