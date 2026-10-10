/**
 * @file chat.ts
 * @description Cloudflare Pages Functions用チャットエンドポイント（system-prompt, context, 時間・天気統合 ＆ 画像生成AI連携版）
 */

import { buildSystemPrompt } from '../../src/ai/system-prompt.js';
import { buildSystemInstructionWithTimeAndWeather } from '../../src/ai/time-utils.js';
import { generateVisualAid } from '../../src/ai/imagen-service.js'; // ★ 画像生成モジュールのインポート

export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json() as {
      message: string;
      chatHistory?: Array<{ role: string; content: string }>;
      learningPace?: string;
      userNickname?: string;
      practiceMode?: string;
      sec1Topic?: string;
      turnCount?: string | number;
      currentTurn?: string | number;
      isFinalTurn?: boolean;
      visualPrompt?: string;
      requestVisualAid?: boolean; // 🎨 フロントからの画像生成有効フラグ
    };

    const { 
      message, 
      chatHistory = [], 
      learningPace = "normal", 
      userNickname = "生徒さん",
      practiceMode = "section 1",
      sec1Topic = "all",
      turnCount = "6",
      currentTurn = 1,
      isFinalTurn = false,
      visualPrompt,
      requestVisualAid = false
    } = body;
    
    // Cloudflareの環境変数から設定値を取得
    const projectId = env?.VERTEX_AI_PROJECT_ID;
    const region = env?.VERTEX_AI_REGION || "us-central1";
    const serviceAccountJsonStr = env?.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!projectId || !serviceAccountJsonStr) {
      console.error("Missing config: projectId or serviceAccountJsonStr");
      return new Response(
        JSON.stringify({ 
          reply: "Server configuration error: Vertex AI Project ID or Service Account JSON is missing in Cloudflare environment variables." 
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. サービスアカウントJSONのパース
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(serviceAccountJsonStr);
    } catch (e: any) {
      console.error("JSON parse error for GOOGLE_SERVICE_ACCOUNT_JSON:", e.message);
      return new Response(
        JSON.stringify({ reply: "Server configuration error: GOOGLE_SERVICE_ACCOUNT_JSON is not a valid JSON format." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Google OAuth2 アクセストークンの取得
    const accessToken = await getGoogleAccessToken(serviceAccount);
    if (!accessToken) {
      console.error("Failed to obtain Google access token via JWT.");
      return new Response(
        JSON.stringify({ reply: "Failed to authenticate with Google Vertex AI using the provided service account." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. system-prompt.ts の buildSystemPrompt を使ってメタデータ入りのベースプロンプトを構築
    const baseSystemPrompt = buildSystemPrompt({
      learningPace,
      userNickname,
      practiceMode,
      sec1Topic,
      turnCount,
      currentTurn,
      isFinalTurn,
      requestVisualAid
    });

    // 4. time-utils.ts を使って時間と天気のコンテキストをシステムプロンプトに非同期で結合
    const enhancedSystemPromptText = await buildSystemInstructionWithTimeAndWeather(
      baseSystemPrompt,
      undefined, // デバッグ用の日時上書き
      'melbourne' // 基準都市
    );

    const systemInstruction = {
      role: "system",
      parts: [{ text: enhancedSystemPromptText }]
    };

    const contents = chatHistory.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // 5. Vertex AI テキスト生成エンドポイント呼び出し (Gemini 2.5 Flash)
    const modelId = "gemini-2.5-flash";
    const vertexUrl = `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/publishers/google/models/${modelId}:generateContent`;

    const vertexResponse = await fetch(vertexUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: systemInstruction,
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!vertexResponse.ok) {
      const errorText = await vertexResponse.text();
      console.error(`Vertex AI API error (${vertexResponse.status}):`, errorText);
      throw new Error(`Vertex AI API error (${vertexResponse.status}): ${errorText}`);
    }

    const vertexData = await vertexResponse.json() as any;
    const aiReply = vertexData?.candidates?.[0]?.content?.parts?.[0]?.text || "申し訳ありません。うまく回答を生成できませんでした。";

    // 6. 画像生成の判定と実行 (visualPrompt が明示されている、またはチェックボックス有効時に自動検知)
    let imageUrl: string | undefined = undefined;
    let promptToUse = visualPrompt;

    if (!promptToUse && requestVisualAid) {
      const msgLower = message.toLowerCase();
      // 学習者の発話から図解やイラストが必要な文脈かを簡易判定、または対話内容に基づいたプロンプトを構成
      if (
        msgLower.includes("描いて") || 
        msgLower.includes("イラスト") || 
        msgLower.includes("図解") || 
        msgLower.includes("draw") || 
        msgLower.includes("example") ||
        msgLower.includes("image")
      ) {
        promptToUse = `Educational instructional diagram for VCE Japanese students explaining: ${message}. High quality, clean layout, suitable for high school learning.`;
      }
    }

    if (promptToUse) {
      try {
        // imagen-service.ts の generateVisualAid を呼び出してBase64データを取得
        const base64Image = await generateVisualAid({
          promptText: promptToUse,
          projectId: projectId,
          location: region
        });
        if (base64Image) {
          imageUrl = `data:image/png;base64,${base64Image}`;
        }
      } catch (err: any) {
        console.error("Image Generation Error in chat.ts:", err.message);
        // 画像生成に失敗してもテキスト対話の邪魔をしないよう、ログのみに留める
      }
    }

    return new Response(
      JSON.stringify({
        reply: aiReply,
        imageUrl: imageUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err: any) {
    console.error("Unhandled Exception in onRequestPost:", err.message, err.stack);
    return new Response(
      JSON.stringify({ 
        reply: "Sorry, I encountered an error while processing your request with AI Yamato.", 
        error: err.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ─── 正しい jwt-bearer 方式のアクセストークン取得ヘルパー ───
async function getGoogleAccessToken(serviceAccount: any): Promise<string | null> {
  try {
    const header = { alg: "RS256", typ: "JWT" };
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600;

    const payload = {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: serviceAccount.token_uri,
      iat: now,
      exp: exp,
    };

    const base64UrlEncode = (str: string) => 
      btoa(unescape(encodeURIComponent(str))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

    const unsignedToken = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;

    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    let pemContents = serviceAccount.private_key;
    if (pemContents.includes(pemHeader)) {
      pemContents = pemContents.replace(pemHeader, "").replace(pemFooter, "");
    }
    pemContents = pemContents.replace(/\s/g, "");

    const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
      "pkcs8",
      binaryDer.buffer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      new TextEncoder().encode(unsignedToken)
    );

    const base64UrlSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

    const jwt = `${unsignedToken}.${base64UrlSignature}`;

    const tokenRes = await fetch(serviceAccount.token_uri, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=${encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")}&assertion=${encodeURIComponent(jwt)}`
    });

    if (!tokenRes.ok) {
      const tokenErrText = await tokenRes.text();
      console.error("Google Token Endpoint error:", tokenErrText);
      return null;
    }

    const tokenData = await tokenRes.json() as any;
    return tokenData.access_token || null;
  } catch (e: any) {
    console.error("Token generation internal error:", e.message);
    return null;
  }
}