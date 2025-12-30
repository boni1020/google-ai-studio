
import { GoogleGenAI } from "@google/genai";
import { EnhancementStyle } from "../types";

export const enhanceText = async (text: string, style: EnhancementStyle): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompts = {
    [EnhancementStyle.POETIC]: "將以下文字轉化為優美的詩句或具備文學氣息的短文：",
    [EnhancementStyle.MOTIVATIONAL]: "將以下文字轉化為充滿力量、激勵人心的名言：",
    [EnhancementStyle.PROFESSIONAL]: "將以下文字轉化為專業、精煉且正式的商業文案：",
    [EnhancementStyle.FUTURISTIC]: "以科幻、未來主義、科技感十足的風格重寫以下文字：",
    [EnhancementStyle.STORY]: "圍繞以下文字創作成一段極短的故事（50字以內）："
  };

  const prompt = `${prompts[style]}\n\n"${text}"\n\n請直接輸出轉化後的內容，不要包含任何額外的解釋或引號。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text || "無法生成內容，請再試一次。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("AI 服務暫時不可用");
  }
};
