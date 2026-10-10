import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function onRequestPost(context: {
  request: Request;
  env: {
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
  };
}) {
  const { request, env } = context;

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-09-30.endive" as any,
  });

  const signature = request.headers.get("stripe-signature");
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new Response(
      JSON.stringify({ error: "Missing signature or webhook secret" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const payload = await request.text();
    
    // ★ Cloudflare環境では非同期版の constructEventAsync を使用する
    const event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      const creditsToAdd = Number(session.metadata?.credits || 0);

      if (userId && creditsToAdd > 0) {
        const supabaseAdmin = createClient(
          env.SUPABASE_URL,
          env.SUPABASE_SERVICE_ROLE_KEY
        );

        // 1. クレジットの加算処理（RPCまたは直接UPDATE）
        const { error: rpcError } = await supabaseAdmin.rpc("increment_credits", {
          user_id: userId,
          amount: creditsToAdd,
        });

        if (rpcError) {
          const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("credits")
            .eq("id", userId)
            .single();

          const currentCredits = profile?.credits || 0;
          await supabaseAdmin
            .from("profiles")
            .update({ credits: currentCredits + creditsToAdd })
            .eq("id", userId);
        }

        // 2. purchases テーブルへの購入履歴の保存処理を追加
        const { error: purchaseError } = await supabaseAdmin.from("purchases").insert({
          user_id: userId,
          stripe_session_id: session.id,
          amount_paid: session.amount_total, // 支払金額（Stripeからはセント単位で入るため必要に応じて調整）
          credits_granted: creditsToAdd,
        });

        if (purchaseError) {
          console.error("Failed to insert purchase record:", purchaseError.message);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("WEBHOOK ERROR DETAIL:", err.message, err.stack);
    return new Response(
      JSON.stringify({ error: `Webhook Error: ${err.message}` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}