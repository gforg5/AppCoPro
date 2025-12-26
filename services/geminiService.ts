
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private _ai: GoogleGenAI | null = null;

  private get ai(): GoogleGenAI {
    if (!this._ai) {
      // Initialize with process.env.API_KEY as required by the guidelines
      this._ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    }
    return this._ai;
  }

  // Fix for error in components/AIImageEditor.tsx: added editImage method
  async editImage(base64Image: string, prompt: string): Promise<string | undefined> {
    try {
      // Strip data URL prefix if present to get raw base64 data
      const base64Data = base64Image.includes('base64,') 
        ? base64Image.split('base64,')[1] 
        : base64Image;
      
      // Attempt to extract MIME type or default to image/png
      const mimeTypeMatch = base64Image.match(/data:([^;]+);/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/png';

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        // Iterate through all parts to find the image part as per guidelines
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString: string = part.inlineData.data;
            return `data:image/png;base64,${base64EncodeString}`;
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
          parts: [{ text: `Generate a high-quality, professional mobile app icon. Subject: ${prompt}. Style: minimalist, modern 3D or flat design, vibrant but professional colors.` }]
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        // Iterate through all parts to find the image part
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
