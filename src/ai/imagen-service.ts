/**
 * @file imagen-service.ts
 * @description Vertex AI 画像生成モジュール（@google/genai 使用）
 */

import { GoogleGenAI } from "@google/genai";

export interface GenerateVisualAidOptions {
  promptText: string;
  projectId?: string;
  location?: string;
}

export async function generateVisualAid(
  promptTextOrOptions: string | GenerateVisualAidOptions
): Promise<string> {
  const options = typeof promptTextOrOptions === "string"
    ? { promptText: promptTextOrOptions }
    : promptTextOrOptions;

  const projectId = options.projectId || process.env.VERTEX_AI_PROJECT_ID;
  const location = options.location || process.env.VERTEX_AI_REGION || "us-central1";

  if (!projectId) {
    throw new Error("VERTEX_AI_PROJECT_ID が設定されていません。");
  }

  const ai = new GoogleGenAI({
    enterprise: true,
    project: projectId,
    location: location,
  });

  // 最新のGemini画像生成モデルまたはImagenモデルを実行
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-image",
    contents: [
      {
        role: "user",
        parts: [{ text: options.promptText }],
      },
    ],
  });

  const candidate = response.candidates?.[0]; // 修正: インデックスを指定
  const parts = candidate?.content?.parts;
  let base64Image: string | undefined;

  if (parts) {
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        base64Image = part.inlineData.data;
        break;
      }
    }
  }

  if (!base64Image) {
    throw new Error("画像の生成に失敗しました。");
  }

  return base64Image;
}