
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private _ai: GoogleGenAI | null = null;

  private get ai(): GoogleGenAI {
    if (!this._ai) {
      let apiKey = "";
      try {
        // Use a safe check for the environment variable injected by the host
        // @ts-ignore
        apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : "";
      } catch (e) {
        console.warn("Could not access process.env.API_KEY safely:", e);
      }
      this._ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });
    }
    return this._ai;
  }

  async generateIcon(prompt: string): Promise<string | undefined> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `Generate a high-quality, professional mobile app icon. Subject: ${prompt}. Style: minimalist, modern 3D or flat design, vibrant but professional colors.` }]
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
