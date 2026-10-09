import { supabaseClient } from "./supabaseClient"; // プロジェクトのSupabaseクライアントのパスに合わせて調整してください

/**
 * purchases テーブルからメールアドレスを検索して購入履歴を確認
 */
export async function checkPurchase(email: string): Promise<boolean> {
  if (!email) return false;

  const { data, error } = await supabaseClient
    .from("purchases")
    .select("*")
    .eq("email", email.trim())
    .maybeSingle();

  if (error) {
    console.error("Purchase check error:", error.message);
    return false;
  }
  return !!data;
}

/**
 * 新規登録フロー：購入確認 ➔ 一時アカウント作成 ➔ パスキー登録
 */
export async function signUpAndRegisterPasskey(email: string): Promise<boolean> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    throw new Error("Please enter your email address.");
  }

  // 1. 購入データベースの確認
  const hasPurchased = await checkPurchase(trimmedEmail);
  if (!hasPurchased) {
    throw new Error(
      "Your email is not registered in our purchase database. Please purchase the access pass first!"
    );
  }

  // 2. 一時パスワードを用いたSupabase Authでのアカウント作成
  const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!";
  const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
    email: trimmedEmail,
    password: tempPassword,
  });

  if (signUpError) throw signUpError;

  if (!signUpData.session) {
    throw new Error(
      "Account created successfully, but auth session failed to initialize. Please sign in again."
    );
  }

  // 3. ブラウザの生体認証（Passkey）登録プロンプトの呼び出し
  const { error: registerError } = await supabaseClient.auth.registerPasskey();
  if (registerError) throw registerError;

  return true;
}

/**
 * パスキーログインフロー：生体認証によるインスタントログイン
 */
export async function signInWithPasskey(): Promise<boolean> {
  const { error } = await supabaseClient.auth.signInWithPasskey();
  if (error) throw error;

  return true;
}