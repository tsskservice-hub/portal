import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Coins, 
  Moon, 
  Sun, 
  MessageSquare, 
  FileText, 
  Grid, 
  Mic, 
  Gamepad2, 
  Play, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Award,
  X,
  KeyRound,
  LogOut,
  Loader2
} from 'lucide-react';
import { supabase } from './lib/supabaseClient'; // 既存のSupabaseクライアント
import { signUpAndRegisterPasskey, signInWithPasskey } from './lib/passkey'; // 新しく作成したパスキー認証関数

// ==========================================
// Stripe プラン・価格ID マッピング定義
// （他のページやファイルからもインポートして共有できます）
// ==========================================
export const STRIPE_PRICES = {
  starter: 'price_1UDmkoZZJezqyZ9eR0I8cvUk', // TODO: 実際のStripe価格ID（price_...）に置き換えてください
  standard: 'price_1xxxx_standard', 
  pro: 'price_1xxxx_pro',
};

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(10);
  
  // 決済処理中のローディング状態管理（どの価格IDを処理中か）
  const [checkoutLoadingPriceId, setCheckoutLoadingPriceId] = useState<string | null>(null);
  
  // パスキー認証・登録モーダルの状態管理
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Supabase セッション状態の監視
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserCredits(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserCredits(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ユーザーのクレジット情報を取得する処理
  const fetchUserCredits = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();
      if (data && !error) {
        setCredits(data.credits ?? 10);
      }
    } catch (err) {
      console.error('Failed to fetch credits:', err);
    }
  };

  // パスキー認証実行ハンドラー（src/lib/passkey.ts の関数を呼び出し）
  const handlePasskeyAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (authMode === 'signup') {
        if (!emailInput) {
          throw new Error('Please enter your email address for passkey registration.');
        }
        await signUpAndRegisterPasskey(emailInput);
        alert('Passkey registration successful! Welcome to AI Yamato.');
      } else {
        await signInWithPasskey();
        alert('Passkey sign in successful!');
      }
      setIsAuthModalOpen(false);
      setEmailInput('');
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Passkey authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // アプリ起動時のガード処理（未ログインならパスキー登録モーダルへ誘導）
  const handleLaunchApp = (appName: string, appUrl: string) => {
    if (!user) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
      return;
    }
    window.location.href = appUrl;
  };

  // Stripeチェックアウトセッション作成＆リダイレクト処理
  const handleCheckout = async (priceId: string) => {
    // 未ログインの場合は、まずサインアップ/ログインモーダルへ誘導
    if (!user) {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setCheckoutLoadingPriceId(priceId);

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        // Stripeのホステッド・チェックアウト画面へリダイレクト
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from server.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert(`Checkout error: ${err.message || 'Please try again.'}`);
    } finally {
      setCheckoutLoadingPriceId(null);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 relative`}>
      {/* 1. Navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-bold text-lg">🇯🇵</span>
            </div>
            <span className="font-extrabold tracking-tight text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              JP Tutor AI <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold ml-1">Yamato</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                  <Coins className="w-3.5 h-3.5" />
                  <span>Credits: {credits}</span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all flex items-center space-x-1 ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => { setAuthMode('signin'); setIsAuthModalOpen(true); }}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all flex items-center space-x-1 ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-200' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-blue-500" />
                  <span>Passkey Sign In</span>
                </button>

                <button 
                  onClick={() => { setAuthMode('signup'); setIsAuthModalOpen(true); }}
                  className="text-xs font-semibold px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center space-x-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Register Passkey</span>
                </button>
              </>
            )}

            <button className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-200' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}>
              Pricing & Plans
            </button>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all ${isDarkMode ? 'border-slate-700 bg-slate-800 text-amber-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Yamato</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* 2. Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Decades of Expertise in Japanese Language Education</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Your Gateway to <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Japanese Mastery
            </span>
          </h1>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Backed by decades of expert classroom teaching, now available to learners worldwide. Experience precision AI-driven Japanese tutoring tailored to your unique goals.
          </p>

          {/* Interactive UI Mockup Preview */}
          <div className={`mt-8 p-4 sm:p-6 rounded-2xl border shadow-2xl backdrop-blur-sm ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/20">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">侍</div>
                <span className="font-bold text-sm">AI Yamato (Concierge)</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-medium">⭐</span>
              </div>
              <div className="text-xs text-slate-400 bg-slate-500/10 px-2.5 py-1 rounded-md">Portal Guide - Tomonari | chat base</div>
            </div>

            <div className="flex items-center justify-between bg-slate-500/5 p-2.5 rounded-xl mb-4 text-xs font-medium">
              <span className="text-slate-500">Learning Pace</span>
              <div className="flex space-x-1 bg-slate-500/10 p-1 rounded-lg">
                <span className="px-3 py-1 rounded bg-blue-600 text-white shadow-sm">Steady</span>
                <span className="px-3 py-1 text-slate-500">Normal</span>
                <span className="px-3 py-1 text-slate-500">Accelerated</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl flex items-start space-x-3 mb-4 text-left ${isDarkMode ? 'bg-slate-800/60' : 'bg-blue-50/50'}`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs">侍</div>
              <div className="text-sm space-y-1">
                <p className="font-medium">Hello! Welcome to JP Tutor AI Yamato 🌸 Each chat session costs 1 credit. How can I help you today?</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <span className="px-3 py-1.5 rounded-lg border border-slate-500/20 bg-slate-500/5 font-medium flex items-center space-x-1"><span>💬</span><span>Japanese Vocabulary</span></span>
              <span className="px-3 py-1.5 rounded-lg border border-slate-500/20 bg-slate-500/5 font-medium flex items-center space-x-1"><span>📚</span><span>Japanese Grammar</span></span>
              <span className="px-3 py-1.5 rounded-lg border border-slate-500/20 bg-slate-500/5 font-medium flex items-center space-x-1"><span>🏯</span><span>Japanese Culture</span></span>
            </div>

            <div className="flex items-center justify-between border border-slate-500/30 rounded-xl p-2 bg-slate-500/5 text-sm">
              <div className="flex items-center space-x-2 text-xs text-slate-500 px-2">
                <span>🎯</span>
                <span>explain with diagrams and illustrations</span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured App Banner */}
        <section className={`rounded-3xl p-6 sm:p-10 border shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border-slate-800`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-black group cursor-pointer">
              <div className="aspect-video flex items-center justify-center relative">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black"></div>
                <div className="w-16 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-medium text-slate-300 px-2">
                  <span>VCE Japanese EOY Exam AI Writing Tutor</span>
                  <span className="bg-black/60 px-2 py-1 rounded backdrop-blur">Watch on YouTube</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <span>⭐ Featured VCE App</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                VCE Japanese EOY Exam <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400">
                  Writing AI Tutor ✍️ 📄
                </span>
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                110 original questions, Kanji & Grammar checker and VCE-aligned instant feedback.
              </p>

              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-pink-400" /><span>Tailored Learning Pace & In-Depth Feedback</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-pink-400" /><span>Genkouyoshi & Text-Type Guidance</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-pink-400" /><span>Passkey Biometric Instant Login</span></li>
              </ul>

              <button 
                onClick={() => handleLaunchApp('Writing Tutor', '/writing-tutor')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Launch App / Get Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. Pricing & Credit Packs */}
        <section className="space-y-12 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight">Choose Your Plan & Credit Packs</h2>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Start for free with daily credits, or top up with prepaid charge packs for intensive study.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Free Plan */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Plan</span>
                <div>
                  <span className="text-4xl font-black">$0</span>
                  <span className="text-xs text-slate-500 ml-1">/ forever</span>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold">
                  Daily 2 Free Credits
                </div>
                <p className="text-xs text-slate-500">Recharged daily upon login. Enjoy basic chat, traditional games, and Genkouyoshi editor tools.</p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-blue-600" /><span>Daily Login Credits ($0.80-$1 value)</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-blue-600" /><span>Free Traditional Games & Tools</span></li>
                </ul>
              </div>
              <button 
                onClick={() => { setAuthMode('signup'); setIsAuthModalOpen(true); }}
                className="mt-6 w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Starter Pack ($10 AUD - Product ID: prod_VPbyVSlnaGjpa8) */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Starter Pack</span>
                <div>
                  <span className="text-4xl font-black">$10</span>
                  <span className="text-xs text-slate-500 ml-1">AUD</span>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold">
                  1,000 Credits
                </div>
                <p className="text-xs text-slate-500">Great for beginners. Ideal for a few essay corrections or voice roleplay sessions.</p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-blue-600" /><span>Standard AI Chat & Q&A</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-blue-600" /><span>Pay-as-you-go flexibility</span></li>
                </ul>
              </div>
              <button 
                onClick={() => handleCheckout(STRIPE_PRICES.starter)} 
                disabled={checkoutLoadingPriceId === STRIPE_PRICES.starter}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {checkoutLoadingPriceId === STRIPE_PRICES.starter && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Buy Starter Pack</span>
              </button>
            </div>

            {/* Standard Pack (Most Popular) */}
            <div className={`p-6 rounded-3xl border-2 border-blue-600 flex flex-col justify-between relative ${isDarkMode ? 'bg-slate-900' : 'bg-white'} shadow-xl`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full">
                Most Popular
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Standard Pack</span>
                <div>
                  <span className="text-4xl font-black">$25</span>
                  <span className="text-xs text-slate-500 ml-1">AUD</span>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold">
                  2,800 Credits (Approx. 10% Bonus)
                </div>
                <p className="text-xs text-slate-500">Our most popular choice. Perfect for regular study routines and test preparation.</p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-blue-600" /><span>10% Bonus Credit Value</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-blue-600" /><span>Regular Study & Test Practice</span></li>
                </ul>
              </div>
              <button 
                onClick={() => handleCheckout(STRIPE_PRICES.standard)} 
                disabled={checkoutLoadingPriceId === STRIPE_PRICES.standard}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {checkoutLoadingPriceId === STRIPE_PRICES.standard && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Buy Standard Pack</span>
              </button>
            </div>

            {/* Pro Intensivist */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Pro Intensivist</span>
                <div>
                  <span className="text-4xl font-black">$50</span>
                  <span className="text-xs text-slate-500 ml-1">AUD</span>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 text-xs font-bold">
                  6,000 Credits (Approx. 20% Bonus)
                </div>
                <p className="text-xs text-slate-500">For heavy users and premium-intensive drills. Maximum value with 20% bonus credits.</p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-purple-600" /><span>20% Bonus Credit Value</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-purple-600" /><span>VCE Exam Prep & Essay Essays</span></li>
                </ul>
              </div>
              <button 
                onClick={() => handleCheckout(STRIPE_PRICES.pro)} 
                disabled={checkoutLoadingPriceId === STRIPE_PRICES.pro}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-600/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {checkoutLoadingPriceId === STRIPE_PRICES.pro && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Buy Pro Pack</span>
              </button>
            </div>
          </div>

          {/* Credit Consumption Guide */}
          <div className={`max-w-2xl mx-auto p-4 rounded-2xl border text-xs ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} shadow-sm`}>
            <div className="flex items-center justify-center space-x-2 font-bold mb-3">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Credit Consumption Guide</span>
            </div>
            <div className="space-y-2 text-slate-500">
              <div className="flex justify-between border-b border-slate-500/10 pb-1.5"><span>Text Chat (Q&A / Vocabulary)</span> <span className="font-semibold text-slate-700 dark:text-slate-300">1-2 credits / turn</span></div>
              <div className="flex justify-between border-b border-slate-500/10 pb-1.5"><span>Essay / Genkouyoshi Correctors</span> <span className="font-semibold text-slate-700 dark:text-slate-300">20-30 credits / session</span></div>
              <div className="flex justify-between border-b border-slate-500/10 pb-1.5"><span>Oral Exam / Voice Roleplay</span> <span className="font-semibold text-slate-700 dark:text-slate-300">15-25 credits / min</span></div>
              <div className="flex justify-between pt-0.5"><span>Mini Games & Drills</span> <span className="font-semibold text-emerald-600">Free / 0.5 credits</span></div>
            </div>
          </div>
        </section>

        {/* 5. Choose Your Learning Path & Free Tools */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Choose Your Learning Path & Free Tools</h2>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Select an application or free tool below to start your journey.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm hover:border-blue-500/50 transition-colors`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base">VCE EOY Oral Exam AI Tutor 🗣️ 🔍</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Practice VCE conversation and discussion with AI Yamato using voice-based interaction and real-time guidance.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Target: Year 12</span>
                <button onClick={() => handleLaunchApp('Oral Tutor', '/oral-tutor')} className="text-blue-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-none p-0">
                  <span>Launch App</span> <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm hover:border-pink-500/50 transition-colors`}>
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base">VCE EOY Writing Exam AI Tutor ✍️ 📄</h3>
                <p className="text-xs text-slate-500 leading-relaxed">110 VCE-aligned essay questions with Genkouyoshi grid millon, instant Kanji/Grammar feedback, and scoring.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Target: Year 11-12</span>
                <button onClick={() => handleLaunchApp('Writing Tutor', '/writing-tutor')} className="text-pink-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-none p-0">
                  <span>Launch App</span> <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm hover:border-emerald-500/50 transition-colors`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Grid className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">Free Writing Tool</span>
                </div>
                <h3 className="font-bold text-base">Genkouyoshi Grid & Essay Tool 🎨</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Free manuscript paper editor for Japanese writing practice, character counting, and clean PDF export.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Free for Everyone</span>
                <a href="/genkouyoshi-editor" className="text-emerald-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer">
                  <span>Open Editor</span> <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 4 */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm hover:border-indigo-500/50 transition-colors`}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">Free Audio Tool</span>
                </div>
                <h3 className="font-bold text-base">VCE Oral Exam Questions & Audio Hub</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Practice with authentic member questions complete with high-quality audio recordings to sharpen your VCE oral exam performance.</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Free for Everyone</span>
                <a href="/audio-hub" className="text-indigo-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer">
                  <span>Open Audio Hub</span> <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Play & Learn Badge Bar */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-sm">
            <Gamepad2 className="w-4 h-4" />
            <span>Play & Learn</span>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className={`border-t py-8 text-center text-xs text-slate-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <p>© 2026 JP Tutor AI Yamato. All rights reserved.</p>
      </footer>

      {/* Passkey Authentication / Registration Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-500/10 transition-colors text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">
                  {authMode === 'signup' ? 'Create Account with Passkey' : 'Sign In with Passkey'}
                </h3>
                <p className="text-xs text-slate-500">
                  {authMode === 'signup' 
                    ? 'Register securely using biometrics, Touch ID, Face ID, or a security key.' 
                    : 'Authenticate instantly with your registered biometric passkey.'}
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handlePasskeyAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-slate-500">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="your.email@school.vic.edu.au"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 focus:border-blue-500 text-slate-100' : 'bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-900'}`}
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{authLoading ? 'Verifying Passkey...' : authMode === 'signup' ? 'Register Passkey' : 'Sign In'}</span>
                </button>
              </form>

              <div className="text-center text-xs">
                {authMode === 'signup' ? (
                  <p className="text-slate-500">
                    Already have a passkey?{' '}
                    <button onClick={() => setAuthMode('signin')} className="text-blue-600 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer">
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p className="text-slate-500">
                    New to AI Yamato?{' '}
                    <button onClick={() => setAuthMode('signup')} className="text-blue-600 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer">
                      Create Account
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}