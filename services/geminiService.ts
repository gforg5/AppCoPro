import { GoogleGenAI } from "@google/genai";

/**
 * Safely retrieves the API key from the environment.
 * Prevents "process is not defined" ReferenceErrors in browser-only contexts.
 */
const getSafeApiKey = (): string => {
  try {
    // Check if process and process.env exist before access
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Fallback for extreme environments where even checking process might throw
  }
  return '';
};

export class GeminiService {
  private _ai: GoogleGenAI | null = null;

  private get ai(): GoogleGenAI {
    if (!this._ai) {
      const apiKey = getSafeApiKey();
      // Initialize the SDK. Even with an empty key, the app won't crash on boot.
      this._ai = new GoogleGenAI({ apiKey: apiKey || 'UNSET_API_KEY' });
    }
    return this._ai;
  }

  async editImage(base64Image: string, prompt: string): Promise<string | undefined> {
    try {
      const base64Data = base64Image.includes('base64,') 
        ? base64Image.split('base64,')[1] 
        : base64Image;
      
      const mimeTypeMatch = base64Image.match(/data:([^;]+);/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: prompt },
          ],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    } catch (error) {
      console.error("AI Image Edit Error:", error);
    }
    return undefined;
  }

  async generateIcon(prompt: string): Promise<string | undefined> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Generate a minimalist mobile app icon for: ${prompt}` }]
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    } catch (error) {
      console.error("AI Icon Generation Error:", error);
    }
    return undefined;
  }
}

export const gemini = new GeminiService();