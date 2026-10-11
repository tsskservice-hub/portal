import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, Link } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useEffect, useMemo } from "react";
import { Coins, User, ShieldCheck, Sparkles, Check, ArrowRight, ShoppingBag, Mic, GraduationCap, LogOut, KeyRound, Sun, Moon, Award, Loader2, FileText, Gamepad2, Grid, X } from "lucide-react";
import { Link as Link$1 } from "react-router";
import { createClient } from "@supabase/supabase-js";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "ja", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const beforeSec1 = { "steady": [{ "category": "Entering", "text": "こんにちは。", "audio": "/audio/Q001.mp3", "text_original": "こんにちは。", "defaultAnswer": "こんにちは、よろしくお<ruby>願<rt>ねが</rt></ruby>いします。", "default_answer_original": "こんにちは、よろしくお願いします。" }, { "category": "Entering", "text": "お名前を教えてください。", "audio": "/audio/Q002.mp3", "text_original": "お名前を教えてください。", "defaultAnswer": "私の名前はトーマスです。", "default_answer_original": "私の名前はトーマスです。" }, { "category": "Entering", "text": "<ruby>受験<rt>じゅけん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を教えてください。", "audio": "/audio/Q003.mp3", "text_original": "受験番号を教えてください。", "defaultAnswer": "<ruby>受験<rt>じゅけん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>は一二三四五です。", "default_answer_original": "受験番号は一二三四五です。" }, { "category": "Entering", "text": "<ruby>確認<rt>かくにん</rt></ruby>できました。", "audio": "/audio/Q004.mp3", "text_original": "確認できました。", "defaultAnswer": "はい、分かりました。", "default_answer_original": "はい、分かりました。" }, { "category": "Entering", "text": "オーケーです。", "audio": "/audio/Q005.mp3", "text_original": "オーケーです。", "defaultAnswer": "ありがとうございます。", "default_answer_original": "ありがとうございます。" }, { "category": "Entering", "text": "<ruby>座<rt>すわ</rt></ruby>ってください。", "audio": "/audio/Q006.mp3", "text_original": "座ってください。", "defaultAnswer": "<ruby>失礼<rt>しつれい</rt></ruby>します。", "default_answer_original": "失礼します。" }, { "category": "Entering", "text": "リラックスしてください。", "audio": "/audio/Q007.mp3", "text_original": "リラックスしてください。", "defaultAnswer": "はい、ありがとうございます。", "default_answer_original": "はい、ありがとうございます。" }, { "category": "Entering", "text": "では、会話を始めましょう。", "audio": "/audio/Q008.mp3", "text_original": "では、会話を始めましょう。", "defaultAnswer": "はい、お<ruby>願<rt>ねが</rt></ruby>いします。", "default_answer_original": "はい、お願いします。" }], "normal": [{ "category": "Entering", "text": "こんにちは。", "audio": "/audio/Q150.mp3", "text_original": "こんにちは。", "defaultAnswer": "こんにちは、本日はどうぞよろしくお<ruby>願<rt>ねが</rt></ruby>いいたします。", "default_answer_original": "こんにちは、本日はどうぞよろしくお願いいたします。" }, { "category": "Entering", "text": "お名前と<ruby>受験<rt>じゅけん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を教えてください。", "audio": "/audio/Q151.mp3", "text_original": "お名前と受験番号を教えてください。", "defaultAnswer": "名前はタカシで、<ruby>受験<rt>じゅけん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>は九八七六五です。", "default_answer_original": "名前はタカシで、受験番号は九八七六五です。" }, { "category": "Entering", "text": "はい、<ruby>確認<rt>かくにん</rt></ruby>できました。", "audio": "/audio/Q152.mp3", "text_original": "はい、確認できました。", "defaultAnswer": "ありがとうございます。", "default_answer_original": "ありがとうございます。" }, { "category": "Entering", "text": "どうぞ<ruby>座<rt>すわ</rt></ruby>ってください。", "audio": "/audio/Q153.mp3", "text_original": "どうぞ座ってください。", "defaultAnswer": "<ruby>失礼<rt>しつれい</rt></ruby>いたします。", "default_answer_original": "失礼いたします。" }, { "category": "Entering", "text": "今日は少し<ruby>緊張<rt>きんちょう</rt></ruby>していますか。", "audio": "/audio/Q154.mp3", "text_original": "今日は少し緊張していますか。", "defaultAnswer": "はい、少し<ruby>緊張<rt>きんちょう</rt></ruby>していますが、がんばります。", "default_answer_original": "はい、少し緊張していますが、がんばります。" }, { "category": "Entering", "text": "リラックスして<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>ですからね。", "audio": "/audio/Q155.mp3", "text_original": "リラックスして大丈夫ですからね。", "defaultAnswer": "ありがとうございます、<ruby>安心<rt>あんしん</rt></ruby>しました。", "default_answer_original": "ありがとうございます、安心しました。" }, { "category": "Entering", "text": "では、これからVCE日本語の<ruby>口頭<rt>こうとう</rt></ruby><ruby>試験<rt>しけん</rt></ruby>を始めます。", "audio": "/audio/Q156.mp3", "text_original": "では、これからVCE日本語の口頭試験を始めます。", "defaultAnswer": "はい、よろしくお<ruby>願<rt>ねが</rt></ruby>いいたします。", "default_answer_original": "はい、よろしくお願いいたします。" }, { "category": "Entering", "text": "まずは<ruby>一般<rt>いっぱん</rt></ruby><ruby>的<rt>てき</rt></ruby>な会話から始めましょう。", "audio": "/audio/Q157.mp3", "text_original": "まずは一般的な会話から始めましょう。", "defaultAnswer": "はい、わかりました。", "default_answer_original": "はい、わかりました。" }], "accelerated": [{ "category": "Entering", "text": "こんにちは。", "audio": "/audio/Q307.mp3", "text_original": "こんにちは。", "defaultAnswer": "こんにちは、本日はよろしくお<ruby>願<rt>ねが</rt></ruby>いいたします。", "default_answer_original": "こんにちは、本日はよろしくお願いいたします。" }, { "category": "Entering", "text": "お名前と<ruby>受験<rt>じゅけん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>を<ruby>伺<rt>うかが</rt></ruby>ってもよろしいですか。", "audio": "/audio/Q308.mp3", "text_original": "お名前と受験番号を伺ってもよろしいですか。", "defaultAnswer": "はい、私の名前はジョンで、<ruby>受験<rt>じゅけん</rt></ruby><ruby>番号<rt>ばんごう</rt></ruby>は四三二一〇です。", "default_answer_original": "はい、私の名前はジョンで、受験番号は四三二一〇です。" }, { "category": "Entering", "text": "ありがとうございます。", "audio": "/audio/Q309.mp3", "text_original": "ありがとうございます。", "defaultAnswer": "とんでもありません。", "default_answer_original": "とんでもありません。" }, { "category": "Entering", "text": "<ruby>確認<rt>かくにん</rt></ruby>しましたので、どうぞご<ruby>着席<rt>ちゃくせき</rt></ruby>ください。", "audio": "/audio/Q310.mp3", "text_original": "確認しましたので、どうぞご着席ください。", "defaultAnswer": "<ruby>失礼<rt>しつれい</rt></ruby>いたします。", "default_answer_original": "失礼いたします。" }, { "category": "Entering", "text": "今日は少し<ruby>緊張<rt>きんちょう</rt></ruby>されていますか。", "audio": "/audio/Q311.mp3", "text_original": "今日は少し緊張されていますか。", "defaultAnswer": "はい、<ruby>一生懸命<rt>いっしょうけんめい</rt></ruby><ruby>準備<rt>じゅんび</rt></ruby>してきたので少し<ruby>緊張<rt>きんちょう</rt></ruby>しています。", "default_answer_original": "はい、一生懸命準備してきたので少し緊張しています。" }, { "category": "Entering", "text": "<ruby>日頃<rt>ひごろ</rt></ruby>の<ruby>練習<rt>れんしゅう</rt></ruby>の<ruby>成果<rt>せいか</rt></ruby>を<ruby>発揮<rt>はっき</rt></ruby>できるよう、リラックスして<ruby>臨<rt>のぞ</rt></ruby>んでくださいね。", "audio": "/audio/Q312.mp3", "text_original": "日頃の練習の成果を発揮できるよう、リラックスして臨んでくださいね。", "defaultAnswer": "<ruby>温<rt>あたた</rt></ruby>かいお<ruby>言葉<rt>ことば</rt></ruby>をありがとうございます。ベストを<ruby>尽<rt>つ</rt></ruby>くします。", "default_answer_original": "温かいお言葉をありがとうございます。ベストを尽くします。" }, { "category": "Entering", "text": "それでは、ただいまよりVCE日本語<ruby>口頭<rt>こうとう</rt></ruby><ruby>試験<rt>しけん</rt></ruby>を<ruby>開始<rt>かいし</rt></ruby>します。", "audio": "/audio/Q313.mp3", "text_original": "それでは、ただいまよりVCE日本語口頭試験を開始します。", "defaultAnswer": "はい、よろしくお<ruby>願<rt>ねが</rt></ruby>いいたします。", "default_answer_original": "はい、よろしくお願いいたします。" }, { "category": "Entering", "text": "まずはセクション１の<ruby>一般<rt>いっぱん</rt></ruby>会話から<ruby>進<rt>すす</rt></ruby>めていきましょう。", "audio": "/audio/Q314.mp3", "text_original": "まずはセクション１の一般会話から進めていきましょう。", "defaultAnswer": "はい、<ruby>承知<rt>しょうち</rt></ruby>いたしました。", "default_answer_original": "はい、承知いたしました。" }] };
const sec1 = /* @__PURE__ */ JSON.parse('{"steady":[{"category":"Family","text":"家族は何人ですか。","audio":"/audio/Q009.mp3","text_original":"家族は何人ですか。","defaultAnswer":"四人です。","default_answer_original":"四人です。"},{"category":"Family","text":"家族はだれですか。","audio":"/audio/Q010.mp3","text_original":"家族はだれですか。","defaultAnswer":"父と母と姉と私です。","default_answer_original":"父と母と姉と私です。"},{"category":"Family","text":"お父さん、お母さんの仕事は何ですか。","audio":"/audio/Q011.mp3","text_original":"お父さん、お母さんの仕事は何ですか。","defaultAnswer":"父は会社<ruby>員<rt>いん</rt></ruby>で、母は<ruby>教師<rt>きょうし</rt></ruby>です。","default_answer_original":"父は会社員で、母は教師です。"},{"category":"Family","text":"兄弟がいますか。","audio":"/audio/Q012.mp3","text_original":"兄弟がいますか。","defaultAnswer":"はい、姉が一人います。","default_answer_original":"はい、姉が一人います。"},{"category":"Family","text":"お兄さん、お姉さんはどんな人ですか。","audio":"/audio/Q013.mp3","text_original":"お兄さん、お姉さんはどんな人ですか。","defaultAnswer":"<ruby>優<rt>やさ</rt></ruby>しくて<ruby>頭<rt>あたま</rt></ruby>がいい人です。","default_answer_original":"優しくて頭がいい人です。"},{"category":"Family","text":"ペットを<ruby>飼<rt>か</rt></ruby>っていますか。","audio":"/audio/Q014.mp3","text_original":"ペットを飼っていますか。","defaultAnswer":"はい、犬を<ruby>飼<rt>か</rt></ruby>っています。","default_answer_original":"はい、犬を飼っています。"},{"category":"Family","text":"<ruby>週末<rt>しゅうまつ</rt></ruby>に家族と何をしますか。","audio":"/audio/Q015.mp3","text_original":"週末に家族と何をしますか。","defaultAnswer":"<ruby>一緒<rt>いっしょ</rt></ruby>に買い物をします。","default_answer_original":"一緒に買い物をします。"},{"category":"Family","text":"家族のなかで、だれがいちばん<ruby>面白<rt>おもしろ</rt></ruby>いですか。","audio":"/audio/Q016.mp3","text_original":"家族のなかで、だれがいちばん面白いですか。","defaultAnswer":"父が一番<ruby>面白<rt>おもしろ</rt></ruby>いです。","default_answer_original":"父が一番面白いです。"},{"category":"Family","text":"家族と<ruby>一緒<rt>いっしょ</rt></ruby>に旅行に行きますか。","audio":"/audio/Q017.mp3","text_original":"家族と一緒に旅行に行きますか。","defaultAnswer":"はい、時々行きます。","default_answer_original":"はい、時々行きます。"},{"category":"Family","text":"家で<ruby>料理<rt>りょうり</rt></ruby>を<ruby>手伝<rt>てつだ</rt></ruby>いますか。","audio":"/audio/Q018.mp3","text_original":"家で料理を手伝いますか。","defaultAnswer":"はい、<ruby>皿洗<rt>さらあら</rt></ruby>いを<ruby>手伝<rt>てつだ</rt></ruby>います。","default_answer_original":"はい、皿洗いを手伝います。"},{"category":"School","text":"あなたの学校の名前は何ですか。","audio":"/audio/Q019.mp3","text_original":"あなたの学校の名前は何ですか。","defaultAnswer":"メルボルン高校です。","default_answer_original":"メルボルン高校です。"},{"category":"School","text":"何年生ですか。","audio":"/audio/Q020.mp3","text_original":"何年生ですか。","defaultAnswer":"十二年生です。","default_answer_original":"十二年生です。"},{"category":"School","text":"学校は何時に始まりますか。","audio":"/audio/Q021.mp3","text_original":"学校は何時に始まりますか。","defaultAnswer":"八時半に始まります。","default_answer_original":"八時半に始まります。"},{"category":"School","text":"どんな<ruby>科目<rt>かもく</rt></ruby>を勉強していますか。","audio":"/audio/Q022.mp3","text_original":"どんな科目を勉強していますか。","defaultAnswer":"英語や日本語、<ruby>数学<rt>すうがく</rt></ruby>を勉強しています。","default_answer_original":"英語や日本語、数学を勉強しています。"},{"category":"School","text":"いちばん好きな<ruby>科目<rt>かもく</rt></ruby>は何ですか。どうしてですか。","audio":"/audio/Q023.mp3","text_original":"いちばん好きな科目は何ですか。どうしてですか。","defaultAnswer":"日本語が好きです。アニメが分かるようになるからです。","default_answer_original":"日本語が好きです。アニメが分かるようになるからです。"},{"category":"School","text":"いちばん<ruby>難<rt>むずか</rt></ruby>しい<ruby>科目<rt>かもく</rt></ruby>は何ですか。","audio":"/audio/Q024.mp3","text_original":"いちばん難しい科目は何ですか。","defaultAnswer":"<ruby>数学<rt>すうがく</rt></ruby>が一番<ruby>難<rt>むずか</rt></ruby>しいです。","default_answer_original":"数学が一番難しいです。"},{"category":"School","text":"学校までどうやって行きますか。何で行きますか。","audio":"/audio/Q025.mp3","text_original":"学校までどうやって行きますか。何で行きますか。","defaultAnswer":"電車で行きます。","default_answer_original":"電車で行きます。"},{"category":"School","text":"家から学校までどのくらいかかりますか。","audio":"/audio/Q026.mp3","text_original":"家から学校までどのくらいかかりますか。","defaultAnswer":"三十分くらいかかります。","default_answer_original":"三十分くらいかかります。"},{"category":"School","text":"昼ごはんはどこで食べますか。","audio":"/audio/Q027.mp3","text_original":"昼ごはんはどこで食べますか。","defaultAnswer":"学校の<ruby>庭<rt>にわ</rt></ruby>で食べます。","default_answer_original":"学校の庭で食べます。"},{"category":"School","text":"あなたの学校のいいところは何ですか。","audio":"/audio/Q028.mp3","text_original":"あなたの学校のいいところは何ですか。","defaultAnswer":"先生が<ruby>親切<rt>しんせつ</rt></ruby>なところです。","default_answer_original":"先生が親切なところです。"},{"category":"Hobby","text":"<ruby>趣味<rt>しゅみ</rt></ruby>は何ですか。","audio":"/audio/Q029.mp3","text_original":"趣味は何ですか。","defaultAnswer":"<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>くことです。","default_answer_original":"音楽を聞くことです。"},{"category":"Hobby","text":"<ruby>暇<rt>ひま</rt></ruby>な時に何をしますか。","audio":"/audio/Q030.mp3","text_original":"暇な時に何をしますか。","defaultAnswer":"本を読んだり、ゲームをしたりします。","default_answer_original":"本を読んだり、ゲームをしたりします。"},{"category":"Hobby","text":"<ruby>音楽<rt>おんがく</rt></ruby>を聞くのが好きですか。どんな<ruby>音楽<rt>おんがく</rt></ruby>を聞きますか。","audio":"/audio/Q031.mp3","text_original":"音楽を聞くのが好きですか。どんな音楽を聞きますか。","defaultAnswer":"はい、ポップスをよく<ruby>聞<rt>き</rt></ruby>きます。","default_answer_original":"はい、ポップスをよく聞きます。"},{"category":"Hobby","text":"本をよく読みますか。","audio":"/audio/Q032.mp3","text_original":"本をよく読みますか。","defaultAnswer":"あまり読みませんが、<ruby>漫画<rt>まんが</rt></ruby>は読みます。","default_answer_original":"あまり読みませんが、漫画は読みます。"},{"category":"Hobby","text":"<ruby>映画<rt>えいが</rt></ruby>を見るのが好きですか。好きな<ruby>映画<rt>えいが</rt></ruby>は何ですか。","audio":"/audio/Q033.mp3","text_original":"映画を見るのが好きですか。好きな映画は何ですか。","defaultAnswer":"はい、アクション<ruby>映画<rt>えいが</rt></ruby>が好きです。","default_answer_original":"はい、アクション映画が好きです。"},{"category":"Hobby","text":"週に何回くらい<ruby>趣味<rt>しゅみ</rt></ruby>をしますか。","audio":"/audio/Q034.mp3","text_original":"週に何回くらい趣味をしますか。","defaultAnswer":"毎日少しずつします。","default_answer_original":"毎日少しずつします。"},{"category":"Hobby","text":"いつからその<ruby>趣味<rt>しゅみ</rt></ruby>を始めましたか。","audio":"/audio/Q035.mp3","text_original":"いつからその趣味を始めましたか。","defaultAnswer":"三年前から始めました。","default_answer_original":"三年前から始めました。"},{"category":"Hobby","text":"<ruby>友達<rt>ともだち</rt></ruby>と<ruby>一緒<rt>いっしょ</rt></ruby>に何をしますか。","audio":"/audio/Q036.mp3","text_original":"友達と一緒に何をしますか。","defaultAnswer":"カフェで<ruby>お茶<rt>おちゃ</rt></ruby>をします。","default_answer_original":"カフェでお茶をします。"},{"category":"Hobby","text":"インターネットでユーチューブをよく見ますか。","audio":"/audio/Q037.mp3","text_original":"インターネットでユーチューブをよく見ますか。","defaultAnswer":"はい、毎日見ています。","default_answer_original":"はい、毎日見ています。"},{"category":"Hobby","text":"新しい<ruby>趣味<rt>しゅみ</rt></ruby>を始めたいですか。","audio":"/audio/Q038.mp3","text_original":"新しい趣味を始めたいですか。","defaultAnswer":"はい、ギターを習いたいです。","default_answer_original":"はい、ギターを習いたいです。"},{"category":"Part time Job","text":"アルバイトをしていますか。","audio":"/audio/Q039.mp3","text_original":"アルバイトをしていますか。","defaultAnswer":"はい、しています。","default_answer_original":"はい、しています。"},{"category":"Part time Job","text":"どこでアルバイトをしていますか。","audio":"/audio/Q040.mp3","text_original":"どこでアルバイトをしていますか。","defaultAnswer":"近くのスーパーで働いています。","default_answer_original":"近くのスーパーで働いています。"},{"category":"Part time Job","text":"どんな仕事をしますか。","audio":"/audio/Q041.mp3","text_original":"どんな仕事をしますか。","defaultAnswer":"レジや<ruby>品<rt>しな</rt></ruby>出しをします。","default_answer_original":"レジや品出しをします。"},{"category":"Part time Job","text":"週に何日アルバイトをしますか。","audio":"/audio/Q042.mp3","text_original":"週に何日アルバイトをしますか。","defaultAnswer":"週に二日働いています。","default_answer_original":"週に二日働いています。"},{"category":"Part time Job","text":"何曜日に行きますか。","audio":"/audio/Q043.mp3","text_original":"何曜日に行きますか。","defaultAnswer":"土曜日と日曜日に行きます。","default_answer_original":"土曜日と日曜日に行きます。"},{"category":"Part time Job","text":"アルバイトは楽しいですか、それとも<ruby>大変<rt>たいへん</rt></ruby>ですか。","audio":"/audio/Q044.mp3","text_original":"アルバイトは楽しいですか、それとも大変ですか。","defaultAnswer":"<ruby>忙<rt>いそが</rt></ruby>しいですが、楽しいです。","default_answer_original":"忙しいですが、楽しいです。"},{"category":"Part time Job","text":"お金をもらったら、何に使いますか。","audio":"/audio/Q045.mp3","text_original":"お金をもらったら、何に使いますか。","defaultAnswer":"<ruby>貯金<rt>ちょきん</rt></ruby>したり、<ruby>洋服<rt>ようふく</rt></ruby>を買ったりします。","default_answer_original":"貯金したり、洋服を買ったりします。"},{"category":"Part time Job","text":"アルバイトの人は<ruby>親切<rt>しんせつ</rt></ruby>ですか。","audio":"/audio/Q046.mp3","text_original":"アルバイトの人は親切ですか。","defaultAnswer":"はい、みんな<ruby>親切<rt>しんせつ</rt></ruby>です。","default_answer_original":"はい、みんな親切です。"},{"category":"Part time Job","text":"なぜアルバイトを始めましたか。","audio":"/audio/Q047.mp3","text_original":"なぜアルバイトを始めましたか。","defaultAnswer":"お<ruby>小遣<rt>こづか</rt></ruby>いを<ruby>稼<rt>かせ</rt></ruby>ぎたかったからです。","default_answer_original":"お小遣いを稼ぎたかったからです。"},{"category":"Part time Job","text":"<ruby>将来<rt>しょうらい</rt></ruby>、どんな仕事をしたいですか。","audio":"/audio/Q048.mp3","text_original":"将来、どんな仕事をしたいですか。","defaultAnswer":"<ruby>通訳<rt>つうやく</rt></ruby>になりたいです。","default_answer_original":"通訳になりたいです。"},{"category":"Japanese Study","text":"どうして日本語を勉強していますか。","audio":"/audio/Q049.mp3","text_original":"どうして日本語を勉強していますか。","defaultAnswer":"日本の<ruby>文化<rt>ぶんか</rt></ruby>が好きだからです。","default_answer_original":"日本の文化が好きだからです。"},{"category":"Japanese Study","text":"日本語の勉強は楽しいですか。","audio":"/audio/Q050.mp3","text_original":"日本語の勉強は楽しいですか。","defaultAnswer":"はい、とても楽しいです。","default_answer_original":"はい、とても楽しいです。"},{"category":"Japanese Study","text":"日本語のなかで、何がいちばん<ruby>難<rt>むずか</rt></ruby>しいですか。漢字ですか。<ruby>文法<rt>ぶんぽう</rt></ruby>ですか。会話ですか。","audio":"/audio/Q051.mp3","text_original":"日本語のなかで、何がいちばん難しいですか。漢字ですか。文法ですか。会話ですか。","defaultAnswer":"漢字を<ruby>覚<rt>おぼ</rt></ruby>えるのが一番<ruby>難<rt>むずか</rt></ruby>しいです。","default_answer_original":"漢字を覚えるのが一番難しいです。"},{"category":"Japanese Study","text":"一日にどのくらい日本語を勉強しますか。","audio":"/audio/Q052.mp3","text_original":"一日にどのくらい日本語を勉強しますか。","defaultAnswer":"一時間くらい勉強します。","default_answer_original":"一時間くらい勉強します。"},{"category":"Japanese Study","text":"日本のマンガやアニメが好きですか。","audio":"/audio/Q053.mp3","text_original":"日本のマンガやアニメが好きですか。","defaultAnswer":"はい、大好きです。","default_answer_original":"はい、大好きです。"},{"category":"Japanese Study","text":"好きな漢字は何ですか。","audio":"/audio/Q054.mp3","text_original":"好きな漢字は何ですか。","defaultAnswer":"「<ruby>夢<rt>ゆめ</rt></ruby>」という漢字が好きです。","default_answer_original":"「夢」という漢字が好きです。"},{"category":"Japanese Study","text":"日本語の先生はどんな人ですか。","audio":"/audio/Q055.mp3","text_original":"日本語の先生はどんな人ですか。","defaultAnswer":"<ruby>熱心<rt>ねっしん</rt></ruby>で<ruby>面白<rt>おもしろ</rt></ruby>い先生です。","default_answer_original":"熱心で面白い先生です。"},{"category":"Japanese Study","text":"日本語で話すのは好きですか。","audio":"/audio/Q056.mp3","text_original":"日本語で話すのは好きですか。","defaultAnswer":"はい、好きですが少し<ruby>緊張<rt>きんちょう</rt></ruby>します。","default_answer_original":"はい、好きですが少し緊張します。"},{"category":"Japanese Study","text":"日本人の友だちがいますか。","audio":"/audio/Q057.mp3","text_original":"日本人の友だちがいますか。","defaultAnswer":"いいえ、いませんが<ruby>欲<rt>ほ</rt></ruby>しいです。","default_answer_original":"いいえ、いませんが欲しいです。"},{"category":"Japanese Study","text":"日本語を使って何をしたいですか。","audio":"/audio/Q058.mp3","text_original":"日本語を使って何をしたいですか。","defaultAnswer":"日本へ旅行に行きたいです。","default_answer_original":"日本へ旅行に行きたいです。"},{"category":"Sports","text":"スポーツが好きですか。","audio":"/audio/Q059.mp3","text_original":"スポーツが好きですか。","defaultAnswer":"はい、好きです。","default_answer_original":"はい、好きです。"},{"category":"Sports","text":"どんなスポーツをしますか。どんなスポーツを見ますか。","audio":"/audio/Q060.mp3","text_original":"どんなスポーツをしますか。どんなスポーツを見ますか。","defaultAnswer":"テニスをします。サッカーを見るのが好きです。","default_answer_original":"テニスをします。サッカーを見るのが好きです。"},{"category":"Sports","text":"学校でスポーツの<ruby>部<rt>ぶ</rt></ruby>活動をしていますか。","audio":"/audio/Q061.mp3","text_original":"学校でスポーツの部活動をしていますか。","defaultAnswer":"はい、バスケットボール<ruby>部<rt>ぶ</rt></ruby>に入っています。","default_answer_original":"はい、バスケットボール部に入っています。"},{"category":"Sports","text":"<ruby>週末<rt>しゅうまつ</rt></ruby>にスポーツをしますか。","audio":"/audio/Q062.mp3","text_original":"週末にスポーツをしますか。","defaultAnswer":"はい、<ruby>友達<rt>ともだち</rt></ruby>とテニスをします。","default_answer_original":"はい、友達とテニスをします。"},{"category":"Sports","text":"いちばん好きなスポーツ<ruby>選手<rt>せんしゅ</rt></ruby>はだれですか。","audio":"/audio/Q063.mp3","text_original":"いちばん好きなスポーツ選手はだれですか。","defaultAnswer":"<ruby>大谷<rt>おおや</rt></ruby><ruby>選手<rt>せんしゅ</rt></ruby>が好きです。","default_answer_original":"大谷選手が好きです。"},{"category":"Sports","text":"<ruby>水泳<rt>すいえい</rt></ruby>ができますか。","audio":"/audio/Q064.mp3","text_original":"水泳ができますか。","defaultAnswer":"はい、少しできます。","default_answer_original":"はい、少しできます。"},{"category":"Sports","text":"スポーツをするのと見るのと、どちらが好きですか。","audio":"/audio/Q065.mp3","text_original":"スポーツをするのと見るのと、どちらが好きですか。","defaultAnswer":"自分でやる方が好きです。","default_answer_original":"自分でやる方が好きです。"},{"category":"Sports","text":"オーストラリアで人気があるスポーツは何ですか。","audio":"/audio/Q066.mp3","text_original":"オーストラリアで人気があるスポーツは何ですか。","defaultAnswer":"オージーフットボールやクリケットが人気です。","default_answer_original":"オージーフットボールやクリケットが人気です。"},{"category":"Sports","text":"今までにどんなスポーツを習いましたか。","audio":"/audio/Q067.mp3","text_original":"今までにどんなスポーツを習いましたか。","defaultAnswer":"<ruby>水泳<rt>すいえい</rt></ruby>とテニスを習いました。","default_answer_original":"水泳とテニスを習いました。"},{"category":"Sports","text":"これからやってみたいスポーツがありますか。","audio":"/audio/Q068.mp3","text_original":"これからやってみたいスポーツがありますか。","defaultAnswer":"サーフィンをしてみたいです。","default_answer_original":"サーフィンをしてみたいです。"},{"category":"Travel","text":"旅行が好きですか。","audio":"/audio/Q069.mp3","text_original":"旅行が好きですか。","defaultAnswer":"はい、大好きです。","default_answer_original":"はい、大好きです。"},{"category":"Travel","text":"<ruby>最近<rt>さいきん</rt></ruby>、どこへ旅行に行きましたか。","audio":"/audio/Q070.mp3","text_original":"最近、どこへ旅行に行きましたか。","defaultAnswer":"シドニーへ行きました。","default_answer_original":"シドニーへ行きました。"},{"category":"Travel","text":"だれと行きましたか。","audio":"/audio/Q071.mp3","text_original":"だれと行きましたか。","defaultAnswer":"家族と<ruby>一緒<rt>いっしょ</rt></ruby>に行きました。","default_answer_original":"家族と一緒に行きました。"},{"category":"Travel","text":"そこで何をしましたか。","audio":"/audio/Q072.mp3","text_original":"そこで何をしましたか。","defaultAnswer":"オペラハウスを見ました。","default_answer_original":"オペラハウスを見ました。"},{"category":"Travel","text":"どんな食べものを食べましたか。","audio":"/audio/Q073.mp3","text_original":"どんな食べものを食べましたか。","defaultAnswer":"<ruby>美味<rt>おい</rt></ruby>しい<ruby>海鮮<rt>かいせん</rt></ruby>を食べました。","default_answer_original":"美味しい海鮮を食べました。"},{"category":"Travel","text":"今まで行ったところで、どこがいちばん好きですか。","audio":"/audio/Q074.mp3","text_original":"今まで行ったところで、どこがいちばん好きですか。","defaultAnswer":"ゴールドコーストが一番好きです。","default_answer_original":"ゴールドコーストが一番好きです。"},{"category":"Travel","text":"日本に行ったことがありますか。","audio":"/audio/Q075.mp3","text_original":"日本に行ったことがありますか。","defaultAnswer":"いいえ、まだありません。","default_answer_original":"いいえ、まだありません。"},{"category":"Travel","text":"日本で行ってみたいところはどこですか。","audio":"/audio/Q076.mp3","text_original":"日本で行ってみたいところはどこですか。","defaultAnswer":"京都に行ってみたいです。","default_answer_original":"京都に行ってみたいです。"},{"category":"Travel","text":"旅行のとき、電車で行きますか、車で行きますか。","audio":"/audio/Q077.mp3","text_original":"旅行のとき、電車で行きますか、車で行きますか。","defaultAnswer":"車で行くことが多いです。","default_answer_original":"車で行くことが多いです。"},{"category":"Travel","text":"次の休みはどこに行きたいですか。","audio":"/audio/Q078.mp3","text_original":"次の休みはどこに行きたいですか。","defaultAnswer":"日本に行きたいです。","default_answer_original":"日本に行きたいです。"},{"category":"Leisure Activity","text":"<ruby>週末<rt>しゅうまつ</rt></ruby>はたいてい何をしますか。","audio":"/audio/Q079.mp3","text_original":"週末はたいてい何をしますか。","defaultAnswer":"家でゆっくり休むか、<ruby>友達<rt>ともだち</rt></ruby>と<ruby>遊<rt>あそ</rt></ruby>びます。","default_answer_original":"家でゆっくり休むか、友達と遊びます。"},{"category":"Leisure Activity","text":"友だちと<ruby>遊<rt>あそ</rt></ruby>ぶとき、どこへ行きますか。","audio":"/audio/Q080.mp3","text_original":"友だちと遊ぶとき、どこへ行きますか。","defaultAnswer":"ショッピングモールへ行きます。","default_answer_original":"ショッピングモールへ行きます。"},{"category":"Leisure Activity","text":"買い物、ショッピングが好きですか。何を買いますか。","audio":"/audio/Q081.mp3","text_original":"買い物、ショッピングが好きですか。何を買いますか。","defaultAnswer":"はい、<ruby>服<rt>ふく</rt></ruby>や本を買います。","default_answer_original":"はい、服や本を買います。"},{"category":"Leisure Activity","text":"<ruby>公園<rt>こうえん</rt></ruby>に<ruby>散歩<rt>さんぽ</rt></ruby>に行きますか。","audio":"/audio/Q082.mp3","text_original":"公園に散歩に行きますか。","defaultAnswer":"はい、時々行きます。","default_answer_original":"はい、時々行きます。"},{"category":"Leisure Activity","text":"家でテレビやゲームをしますか。","audio":"/audio/Q083.mp3","text_original":"家でテレビやゲームをしますか。","defaultAnswer":"はい、<ruby>週末<rt>しゅうまつ</rt></ruby>にゲームをします。","default_answer_original":"はい、週末にゲームをします。"},{"category":"Leisure Activity","text":"今年の休みに何をしたいですか。","audio":"/audio/Q084.mp3","text_original":"今年の休みに何をしたいですか。","defaultAnswer":"旅行に行きたいです。","default_answer_original":"旅行に行きたいです。"},{"category":"Leisure Activity","text":"<ruby>誕生<rt>たんじょう</rt></ruby>日に何をしますか。","audio":"/audio/Q085.mp3","text_original":"誕生日に何をしますか。","defaultAnswer":"家族とレストランで食事をします。","default_answer_original":"家族とレストランで食事をします。"},{"category":"Leisure Activity","text":"パーティーによく行きますか。","audio":"/audio/Q086.mp3","text_original":"パーティーによく行きますか。","defaultAnswer":"あまり行きません。","default_answer_original":"あまり行きません。"},{"category":"Leisure Activity","text":"夜、<ruby>寝<rt>ね</rt></ruby>る前に何をしますか。","audio":"/audio/Q087.mp3","text_original":"夜、寝る前に何をしますか。","defaultAnswer":"<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きます。","default_answer_original":"音楽を聞きます。"},{"category":"Leisure Activity","text":"朝<ruby>起<rt>お</rt></ruby>きてから、<ruby>最初<rt>さいしょ</rt></ruby>に何をしますか。","audio":"/audio/Q088.mp3","text_original":"朝起きてから、最初に何をしますか。","defaultAnswer":"<ruby>顔<rt>かお</rt></ruby>を洗います。","default_answer_original":"顔を洗います。"},{"category":"Future","text":"高校を<ruby>卒業<rt>そつぎょう</rt></ruby>してから、何をしたいですか。","audio":"/audio/Q089.mp3","text_original":"高校を卒業してから、何をしたいですか。","defaultAnswer":"大学に<ruby>進学<rt>しんがく</rt></ruby>したいです。","default_answer_original":"大学に進学したいです。"},{"category":"Future","text":"大学に行きたいですか。何を勉強したいですか。","audio":"/audio/Q090.mp3","text_original":"大学に行きたいですか。何を勉強したいですか。","defaultAnswer":"はい、<ruby>経済<rt>けいざい</rt></ruby>学を勉強したいです。","default_answer_original":"はい、経済学を勉強したいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>、どんな仕事をしたいですか。","audio":"/audio/Q091.mp3","text_original":"将来、どんな仕事をしたいですか。","defaultAnswer":"<ruby>通訳<rt>つうやく</rt></ruby>になりたいです。","default_answer_original":"通訳になりたいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>、外国に住んでみたいですか。","audio":"/audio/Q092.mp3","text_original":"将来、外国に住んでみたいですか。","defaultAnswer":"はい、日本に住んでみたいです。","default_answer_original":"はい、日本に住んでみたいです。"},{"category":"Future","text":"日本で働いてみたいですか。","audio":"/audio/Q093.mp3","text_original":"日本で働いてみたいですか。","defaultAnswer":"はい、働いてみたいです。","default_answer_original":"はい、働いてみたいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>、車を<ruby>運転<rt>うんてん</rt></ruby>したいですか。","audio":"/audio/Q094.mp3","text_original":"将来、車を運転したいですか。","defaultAnswer":"はい、<ruby>運転<rt>うんてん</rt></ruby>したいです。","default_answer_original":"はい、運転したいです。"},{"category":"Future","text":"車を買いたいですか。どんな車がいいですか。","audio":"/audio/Q095.mp3","text_original":"車を買いたいですか。どんな車がいいですか。","defaultAnswer":"はい、赤い車が<ruby>欲<rt>ほ</rt></ruby>しいです。","default_answer_original":"はい、赤い車が欲しいです。"},{"category":"Future","text":"大人になったら、どこに住みたいですか。","audio":"/audio/Q096.mp3","text_original":"大人になったら、どこに住みたいですか。","defaultAnswer":"都会に住みたいです。","default_answer_original":"都会に住みたいです。"},{"category":"Future","text":"10年後、あなたは何をしていると思いますか。","audio":"/audio/Q097.mp3","text_original":"10年後、あなたは何をしていると思いますか。","defaultAnswer":"会社で働いていると思います。","default_answer_original":"会社で働いていると思います。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>は何ですか。","audio":"/audio/Q098.mp3","text_original":"将来の夢は何ですか。","defaultAnswer":"<ruby>世界中<rt>せかいじゅう</rt></ruby>を旅行することです。","default_answer_original":"世界中を旅行することです。"},{"category":"Technology","text":"スマホを持っていますか。","audio":"/audio/Q099.mp3","text_original":"スマホを持っていますか。","defaultAnswer":"はい、持っています。","default_answer_original":"はい、持っています。"},{"category":"Technology","text":"一日にどのくらいスマホを使いますか。","audio":"/audio/Q100.mp3","text_original":"一日にどのくらいスマホを使いますか。","defaultAnswer":"四時間くらい使います。","default_answer_original":"四時間くらい使います。"},{"category":"Technology","text":"スマホで何をしますか。ゲームですか。SNSですか。勉強ですか。","audio":"/audio/Q101.mp3","text_original":"スマホで何をしますか。ゲームですか。SNSですか。勉強ですか。","defaultAnswer":"SNSを見ることが多いです。","default_answer_original":"SNSを見ることが多いです。"},{"category":"Technology","text":"パソコンを使いますか。","audio":"/audio/Q102.mp3","text_original":"パソコンを使いますか。","defaultAnswer":"はい、学校の<ruby>宿題<rt>しゅくだい</rt></ruby>に使います。","default_answer_original":"はい、学校の宿題に使います。"},{"category":"Technology","text":"オンラインで買い物をしますか。","audio":"/audio/Q103.mp3","text_original":"オンラインで買い物をしますか。","defaultAnswer":"はい、時々本を買います。","default_answer_original":"はい、時々本を買います。"},{"category":"Technology","text":"ソーシャルメディア、SNS、をよく使いますか。","audio":"/audio/Q104.mp3","text_original":"ソーシャルメディア、SNS、をよく使いますか。","defaultAnswer":"はい、インスタグラムをよく使います。","default_answer_original":"はい、インスタグラムをよく使います。"},{"category":"Technology","text":"テクノロジーは<ruby>便利<rt>べんり</rt></ruby>だと思いますか。","audio":"/audio/Q105.mp3","text_original":"テクノロジーは便利だと思いますか。","defaultAnswer":"はい、とても<ruby>便利<rt>べんり</rt></ruby>だと思います。","default_answer_original":"はい、とても便利だと思います。"},{"category":"Technology","text":"AI、<ruby>人工<rt>じんこう</rt></ruby><ruby>知能<rt>ちのう</rt></ruby>、についてどう思いますか。","audio":"/audio/Q106.mp3","text_original":"AI、人工知能、についてどう思いますか。","defaultAnswer":"すごいと思いますが、少し<ruby>心配<rt>しんぱい</rt></ruby>もあります。","default_answer_original":"すごいと思いますが、少し心配もあります。"},{"category":"Technology","text":"スマホがない生活ができますか。","audio":"/audio/Q107.mp3","text_original":"スマホがない生活ができますか。","defaultAnswer":"少し<ruby>難<rt>むずか</rt></ruby>しいと思います。","default_answer_original":"少し難しいと思います。"},{"category":"Technology","text":"新しいパソコンやスマホが<ruby>欲<rt>ほ</rt></ruby>しいですか。","audio":"/audio/Q108.mp3","text_original":"新しいパソコンやスマホが欲しいですか。","defaultAnswer":"はい、<ruby>最新<rt>さいしん</rt></ruby>のモデルが<ruby>欲<rt>ほ</rt></ruby>しいです。","default_answer_original":"はい、最新のモデルが欲しいです。"}],"normal":[{"category":"Family","text":"ご家族は何人いらっしゃいますか。","audio":"/audio/Q158.mp3","text_original":"ご家族は何人いらっしゃいますか。","defaultAnswer":"私の家族は四人です。","default_answer_original":"私の家族は四人です。"},{"category":"Family","text":"家族の中で、だれと一番<ruby>仲<rt>なか</rt></ruby>がいいですか。","audio":"/audio/Q159.mp3","text_original":"家族の中で、だれと一番仲がいいですか。","defaultAnswer":"母と一番<ruby>仲<rt>なか</rt></ruby>が<ruby>良<rt>よ</rt></ruby>いです。何でも話せるからです。","default_answer_original":"母と一番仲が良いです。何でも話せるからです。"},{"category":"Family","text":"お<ruby>父様<rt>とうさま</rt></ruby>やお<ruby>母様<rt>かあさま</rt></ruby>はどんなお仕事をなさっていますか。","audio":"/audio/Q160.mp3","text_original":"お父様やお母様はどんなお仕事をなさっていますか。","defaultAnswer":"父はエンジニアで、母は<ruby>看護<rt>かんご</rt></ruby><ruby>師<rt>し</rt></ruby>として働いています。","default_answer_original":"父はエンジニアで、母は看護師として働いています。"},{"category":"Family","text":"ご兄弟はおいくつですか。","audio":"/audio/Q161.mp3","text_original":"ご兄弟はおいくつですか。","defaultAnswer":"二<ruby>歳<rt>さい</rt></ruby>上の兄が一人います。","default_answer_original":"二歳上の兄が一人います。"},{"category":"Family","text":"ご家族はどんな<ruby>性格<rt>せいかく</rt></ruby>ですか。<ruby>優<rt>やさ</rt></ruby>しいですか。<ruby>厳<rt>きび</rt></ruby>しいですか。","audio":"/audio/Q162.mp3","text_original":"ご家族はどんな性格ですか。優しいですか。厳しいですか。","defaultAnswer":"<ruby>両親<rt>りょうしん</rt></ruby>は<ruby>普段<rt>ふだん</rt></ruby>は<ruby>優<rt>やさ</rt></ruby>しいですが、<ruby>礼儀<rt>れいぎ</rt></ruby>には<ruby>厳<rt>きび</rt></ruby>しいです。","default_answer_original":"両親は普段は優しいですが、礼儀には厳しいです。"},{"category":"Family","text":"ペットを<ruby>飼<rt>か</rt></ruby>ったことがありますか。","audio":"/audio/Q163.mp3","text_original":"ペットを飼ったことがありますか。","defaultAnswer":"はい、子どもの<ruby>頃<rt>ころ</rt></ruby>からずっと犬を<ruby>飼<rt>か</rt></ruby>っています。","default_answer_original":"はい、子どもの頃からずっと犬を飼っています。"},{"category":"Family","text":"<ruby>週末<rt>しゅうまつ</rt></ruby>は家族と<ruby>一緒<rt>いっしょ</rt></ruby>にどんなことをして<ruby>過<rt>す</rt></ruby>ごしますか。","audio":"/audio/Q164.mp3","text_original":"週末は家族と一緒にどんなことをして過ごしますか。","defaultAnswer":"日曜日の夜に家族みんなで夕食を食べるのが<ruby>習慣<rt>しゅうかん</rt></ruby>です。","default_answer_original":"日曜日の夜に家族みんなで夕食を食べるのが習慣です。"},{"category":"Family","text":"家で何か<ruby>特別<rt>とくべつ</rt></ruby>な家族のルールや<ruby>習慣<rt>しゅうかん</rt></ruby>がありますか。","audio":"/audio/Q165.mp3","text_original":"家で何か特別な家族のルールや習慣がありますか。","defaultAnswer":"夕食時はテレビやスマホを見ないというルールがあります。","default_answer_original":"夕食時はテレビやスマホを見ないというルールがあります。"},{"category":"Family","text":"今まで家族とどこへ旅行に行ったことがありますか。","audio":"/audio/Q166.mp3","text_original":"今まで家族とどこへ旅行に行ったことがありますか。","defaultAnswer":"去年、家族<ruby>全員<rt>ぜんいん</rt></ruby>でニュージーランドへ旅行に行きました。","default_answer_original":"去年、家族全員でニュージーランドへ旅行に行きました。"},{"category":"Family","text":"家事を<ruby>手伝<rt>てつだ</rt></ruby>うために、いつもどんなことをしていますか。","audio":"/audio/Q167.mp3","text_original":"家事を手伝うために、いつもどんなことをしていますか。","defaultAnswer":"夕食後の<ruby>皿洗<rt>さらあら</rt></ruby>いや、<ruby>庭<rt>にわ</rt></ruby>の<ruby>掃除<rt>そうじ</rt></ruby>を<ruby>手伝<rt>てつだ</rt></ruby>っています。","default_answer_original":"夕食後の皿洗いや、庭の掃除を手伝っています。"},{"category":"School","text":"<ruby>通<rt>かよ</rt></ruby>っている学校はどんな学校ですか。","audio":"/audio/Q168.mp3","text_original":"通っている学校はどんな学校ですか。","defaultAnswer":"<ruby>生徒<rt>せいと</rt></ruby>が<ruby>自主<rt>じしゅ</rt></ruby><ruby>的<rt>てき</rt></ruby>に学ぶことを<ruby>大切<rt>たいせつ</rt></ruby>にする、明るい学校です。","default_answer_original":"生徒が自主的に学ぶことを大切にする、明るい学校です。"},{"category":"School","text":"今、何年生で、何のコースを<ruby>専攻<rt>せんこう</rt></ruby>していますか。","audio":"/audio/Q169.mp3","text_original":"今、何年生で、何のコースを専攻していますか。","defaultAnswer":"<ruby>現在<rt>げんざい</rt></ruby>十二年生で、VCEの日本語や生物などを学んでいます。","default_answer_original":"現在十二年生で、VCEの日本語や生物などを学んでいます。"},{"category":"School","text":"朝、学校は何時までに着かなければなりませんか。","audio":"/audio/Q170.mp3","text_original":"朝、学校は何時までに着かなければなりませんか。","defaultAnswer":"八時四十五分までに学校に<ruby>到着<rt>とうちゃく</rt></ruby>する<ruby>必要<rt>ひつよう</rt></ruby>があります。","default_answer_original":"八時四十五分までに学校に到着する必要があります。"},{"category":"School","text":"<ruby>今学期<rt>こんがっき</rt></ruby>は、どんな<ruby>科目<rt>かもく</rt></ruby>をとっていますか。","audio":"/audio/Q171.mp3","text_original":"今学期は、どんな科目をとっていますか。","defaultAnswer":"英語、日本語、<ruby>数学<rt>すうがく</rt></ruby>、<ruby>化学<rt>かがく</rt></ruby>、生物をとっています。","default_answer_original":"英語、日本語、数学、化学、生物をとっています。"},{"category":"School","text":"一番<ruby>興味<rt>きょうみ</rt></ruby>がある<ruby>科目<rt>かもく</rt></ruby>は何ですか。その<ruby>理由<rt>りゆう</rt></ruby>も教えてください。","audio":"/audio/Q172.mp3","text_original":"一番興味がある科目は何ですか。その理由も教えてください。","defaultAnswer":"<ruby>科学<rt>かがく</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>現象<rt>げんしょう</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>く<ruby>理解<rt>りかい</rt></ruby>できる生物が一番<ruby>面白<rt>おもしろ</rt></ruby>いです。","default_answer_original":"科学的な現象を深く理解できる生物が一番面白いです。"},{"category":"School","text":"一番<ruby>苦手<rt>にがて</rt></ruby>な<ruby>科目<rt>かもく</rt></ruby>について、どうやって勉強していますか。","audio":"/audio/Q173.mp3","text_original":"一番苦手な科目について、どうやって勉強していますか。","defaultAnswer":"<ruby>数学<rt>すうがく</rt></ruby>が<ruby>苦手<rt>にがて</rt></ruby>なので、<ruby>放課後<rt>ほうかご</rt></ruby>に先生に<ruby>質問<rt>しつもん</rt></ruby>して<ruby>補<rt>おぎな</rt></ruby>っています。","default_answer_original":"数学が苦手なので、放課後に先生に質問して補っています。"},{"category":"School","text":"学校まで<ruby>通<rt>かよ</rt></ruby>うのに、どんな<ruby>交通<rt>こうつう</rt></ruby><ruby>手段<rt>しゅだん</rt></ruby>を使っていますか。","audio":"/audio/Q174.mp3","text_original":"学校まで通うのに、どんな交通手段を使っていますか。","defaultAnswer":"電車とバスを<ruby>乗り継<rt>のりつ</rt></ruby>いで<ruby>通学<rt>つうがく</rt></ruby>しています。","default_answer_original":"電車とバスを乗り継いで通学しています。"},{"category":"School","text":"家から学校まで行くのに、どのくらい時間がかかりますか。","audio":"/audio/Q175.mp3","text_original":"家から学校まで行くのに、どのくらい時間がかかりますか。","defaultAnswer":"ドアツードアで<ruby>約<rt>やく</rt></ruby>四十分かかります。","default_answer_original":"ドアツードアで約四十分かかります。"},{"category":"School","text":"昼休みはいつもどこで、だれと何をしていますか。","audio":"/audio/Q176.mp3","text_original":"昼休みはいつもどこで、だれと何をしていますか。","defaultAnswer":"<ruby>食堂<rt>しょくどう</rt></ruby>の近くで、<ruby>仲<rt>なか</rt></ruby>の<ruby>良<rt>よ</rt></ruby>い<ruby>友達<rt>ともだち</rt></ruby>とお<ruby>弁当<rt>べんとう</rt></ruby>を食べながらおしゃべりをします。","default_answer_original":"食堂の近くで、仲の良い友達とお弁当を食べながらおしゃべりをします。"},{"category":"School","text":"あなたの学校の長所、<ruby>良<rt>よ</rt></ruby>いところ、と<ruby>短所<rt>たんしょ</rt></ruby>、<ruby>悪<rt>わる</rt></ruby>いところ、は何ですか。","audio":"/audio/Q177.mp3","text_original":"あなたの学校の長所、良いところ、と短所、悪いところ、は何ですか。","defaultAnswer":"長所は<ruby>施設<rt>しせつ</rt></ruby>が<ruby>綺麗<rt>きれい</rt></ruby>なことで、<ruby>短所<rt>たんしょ</rt></ruby>は冬に<ruby>教室<rt>きょうしつ</rt></ruby>が少し<ruby>寒<rt>さむ</rt></ruby>いことです。","default_answer_original":"長所は施設が綺麗なことで、短所は冬に教室が少し寒いことです。"},{"category":"Hobby","text":"どんなことに<ruby>興味<rt>きょうみ</rt></ruby>がありますか。<ruby>趣味<rt>しゅみ</rt></ruby>について教えてください。","audio":"/audio/Q178.mp3","text_original":"どんなことに興味がありますか。趣味について教えてください。","defaultAnswer":"<ruby>写真<rt>しゃしん</rt></ruby><ruby>撮影<rt>さつえい</rt></ruby>に<ruby>興味<rt>きょうみ</rt></ruby>があり、休日に<ruby>風景<rt>ふうけい</rt></ruby>や<ruby>街並<rt>まちな</rt></ruby>みを<ruby>撮<rt>と</rt></ruby>りに出かけています。","default_answer_original":"写真撮影に興味があり、休日に風景や街並みを撮りに出かけています。"},{"category":"Hobby","text":"時間があるとき、どんなことをして気分<ruby>転換<rt>てんかん</rt></ruby>をしますか。","audio":"/audio/Q179.mp3","text_original":"時間があるとき、どんなことをして気分転換をしますか。","defaultAnswer":"お気に入りの<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きながら、近所を<ruby>散歩<rt>さんぽ</rt></ruby>することです。","default_answer_original":"お気に入りの音楽を聞きながら、近所を散歩することです。"},{"category":"Hobby","text":"よく<ruby>聞<rt>き</rt></ruby>く<ruby>音楽<rt>おんがく</rt></ruby>のジャンルや、好きな<ruby>歌手<rt>かしゅ</rt></ruby>はだれですか。","audio":"/audio/Q180.mp3","text_original":"よく聞く音楽のジャンルや、好きな歌手はだれですか。","defaultAnswer":"インディーズのロックや、日本のポップスをよく<ruby>聞<rt>き</rt></ruby>きます。","default_answer_original":"インディーズのロックや、日本のポップスをよく聞きます。"},{"category":"Hobby","text":"<ruby>最近<rt>さいきん</rt></ruby>読んだ本の中で、<ruby>面白<rt>おもしろ</rt></ruby>かったものは何ですか。","audio":"/audio/Q181.mp3","text_original":"最近読んだ本の中で、面白かったものは何ですか。","defaultAnswer":"<ruby>村上<rt>むらかみ</rt></ruby><ruby>春樹<rt>はるき</rt></ruby>さんの<ruby>小説<rt>しょうせつ</rt></ruby>を読み、<ruby>独特<rt>どくとく</rt></ruby>の<ruby>世界<rt>せかい</rt></ruby><ruby>観<rt>かん</rt></ruby>に<ruby>引き込<rt>ひきこ</rt></ruby>まれました。","default_answer_original":"村上春樹さんの小説を読み、独特の世界観に引き込まれました。"},{"category":"Hobby","text":"どんな<ruby>種類<rt>しゅるい</rt></ruby>の<ruby>映画<rt>えいが</rt></ruby>が好きですか。<ruby>最近<rt>さいきん</rt></ruby>何か見ましたか。","audio":"/audio/Q182.mp3","text_original":"どんな種類の映画が好きですか。最近何か見ましたか。","defaultAnswer":"SFやサスペンス<ruby>映画<rt>えいが</rt></ruby>が好きで、先週<ruby>末<rt>まつ</rt></ruby>も新作を見ました。","default_answer_original":"SFやサスペンス映画が好きで、先週末も新作を見ました。"},{"category":"Hobby","text":"一週間にどのくらい<ruby>趣味<rt>しゅみ</rt></ruby>の時間がありますか。","audio":"/audio/Q183.mp3","text_original":"一週間にどのくらい趣味の時間がありますか。","defaultAnswer":"<ruby>週末<rt>しゅうまつ</rt></ruby>を<ruby>中心<rt>ちゅうしん</rt></ruby>に、<ruby>合計<rt>ごうけい</rt></ruby>で五時間ほど<ruby>確保<rt>かくほ</rt></ruby>しています。","default_answer_original":"週末を中心に、合計で五時間ほど確保しています。"},{"category":"Hobby","text":"その<ruby>趣味<rt>しゅみ</rt></ruby>を始めたきっかけは何ですか。","audio":"/audio/Q184.mp3","text_original":"その趣味を始めたきっかけは何ですか。","defaultAnswer":"友人がカメラを<ruby>貸<rt>か</rt></ruby>してくれたことがきっかけでハマりました。","default_answer_original":"友人がカメラを貸してくれたことがきっかけでハマりました。"},{"category":"Hobby","text":"<ruby>友達<rt>ともだち</rt></ruby>と同じ<ruby>趣味<rt>しゅみ</rt></ruby>を持っていますか。<ruby>一緒<rt>いっしょ</rt></ruby>に何をして楽しみますか。","audio":"/audio/Q185.mp3","text_original":"友達と同じ趣味を持っていますか。一緒に何をして楽しみますか。","defaultAnswer":"はい、友人と<ruby>一緒<rt>いっしょ</rt></ruby>にライブに行ったり<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>ったりします。","default_answer_original":"はい、友人と一緒にライブに行ったり写真を撮ったりします。"},{"category":"Hobby","text":"YouTubeなどの<ruby>動画<rt>どうが</rt></ruby>サイトで、どのようなチャンネルをよく見ますか。","audio":"/audio/Q186.mp3","text_original":"YouTubeなどの動画サイトで、どのようなチャンネルをよく見ますか。","defaultAnswer":"旅行Vlogや<ruby>料理<rt>りょうり</rt></ruby>のレシピ<ruby>動画<rt>どうが</rt></ruby>チャンネルをよく見ています。","default_answer_original":"旅行Vlogや料理のレシピ動画チャンネルをよく見ています。"},{"category":"Hobby","text":"今後、新しく<ruby>挑戦<rt>ちょうせん</rt></ruby>してみたい<ruby>趣味<rt>しゅみ</rt></ruby>や活動はありますか。","audio":"/audio/Q187.mp3","text_original":"今後、新しく挑戦してみたい趣味や活動はありますか。","defaultAnswer":"<ruby>料理<rt>りょうり</rt></ruby>のレパートリーを<ruby>増<rt>ふ</rt></ruby>やすことと、ボランティア活動に<ruby>興味<rt>きょうみ</rt></ruby>があります。","default_answer_original":"料理のレパートリーを増やすことと、ボランティア活動に興味があります。"},{"category":"Part time Job","text":"今、何かアルバイトをしていますか。","audio":"/audio/Q188.mp3","text_original":"今、何かアルバイトをしていますか。","defaultAnswer":"はい、近所のカフェでアルバイトをしています。","default_answer_original":"はい、近所のカフェでアルバイトをしています。"},{"category":"Part time Job","text":"どんなお店や会社で働いていますか。","audio":"/audio/Q189.mp3","text_original":"どんなお店や会社で働いていますか。","defaultAnswer":"<ruby>週末<rt>しゅうまつ</rt></ruby>だけ<ruby>営業<rt>えいぎょう</rt></ruby>している、アットホームな<ruby>個人<rt>こじん</rt></ruby><ruby>経営<rt>けいえい</rt></ruby>のカフェです。","default_answer_original":"週末だけ営業している、アットホームな個人経営のカフェです。"},{"category":"Part time Job","text":"アルバイトでどんな仕事をしていますか。","audio":"/audio/Q190.mp3","text_original":"アルバイトでどんな仕事をしていますか。","defaultAnswer":"<ruby>主<rt>おも</rt></ruby>に<ruby>接客<rt>せっきゃく</rt></ruby>やドリンクの<ruby>提供<rt>ていきょう</rt></ruby>、レジ<ruby>打<rt>う</rt></ruby>ちを<ruby>担当<rt>たんとう</rt></ruby>しています。","default_answer_original":"主に接客やドリンクの提供、レジ打ちを担当しています。"},{"category":"Part time Job","text":"一週間に何日、何時間くらい働いていますか。","audio":"/audio/Q191.mp3","text_original":"一週間に何日、何時間くらい働いていますか。","defaultAnswer":"土曜日の五時間だけ、週に一<ruby>度<rt>ど</rt></ruby>働いています。","default_answer_original":"土曜日の五時間だけ、週に一度働いています。"},{"category":"Part time Job","text":"いつも何曜日やどんなシフトで働いていますか。","audio":"/audio/Q192.mp3","text_original":"いつも何曜日やどんなシフトで働いていますか。","defaultAnswer":"土曜日の朝八時から午後一時までのシフトに入っています。","default_answer_original":"土曜日の朝八時から午後一時までのシフトに入っています。"},{"category":"Part time Job","text":"アルバイトをしていて、どんなときに<ruby>大変<rt>たいへん</rt></ruby>だと<ruby>感<rt>かん</rt></ruby>じますか。","audio":"/audio/Q193.mp3","text_original":"アルバイトをしていて、どんなときに大変だと感じますか。","defaultAnswer":"<ruby>混雑<rt>こんざつ</rt></ruby>時にたくさんの<ruby>お客様<rt>おきゃくさま</rt></ruby>が同時にいらっしゃったときは<ruby>焦<rt>あせ</rt></ruby>ります。","default_answer_original":"混雑時にたくさんのお客様が同時にいらっしゃったときは焦ります。"},{"category":"Part time Job","text":"アルバイトで<ruby>稼<rt>かせ</rt></ruby>いだ<ruby>給料<rt>きゅうりょう</rt></ruby>、お金、は何に使っていますか。","audio":"/audio/Q194.mp3","text_original":"アルバイトで稼いだ給料、お金、は何に使っていますか。","defaultAnswer":"<ruby>将来<rt>しょうらい</rt></ruby>の大学<ruby>進学<rt>しんがく</rt></ruby>のための<ruby>貯金<rt>ちょきん</rt></ruby>と、<ruby>友達<rt>ともだち</rt></ruby>と出かけるときの<ruby>費用<rt>ひよう</rt></ruby>に使っています。","default_answer_original":"将来の大学進学のための貯金と、友達と出かけるときの費用に使っています。"},{"category":"Part time Job","text":"<ruby>職場<rt>しょくば</rt></ruby>の<ruby>同僚<rt>どうりょう</rt></ruby>、どうりょう、やマネージャーはどんな人たちですか。","audio":"/audio/Q195.mp3","text_original":"職場の同僚、どうりょう、やマネージャーはどんな人たちですか。","defaultAnswer":"<ruby>皆<rt>みな</rt></ruby>とても<ruby>優<rt>やさ</rt></ruby>しく、仕事のコツを<ruby>丁寧<rt>ていねい</rt></ruby>に教えてくれるので働きやすいです。","default_answer_original":"皆とても優しく、仕事のコツを丁寧に教えてくれるので働きやすいです。"},{"category":"Part time Job","text":"どうして今のアルバイトを<ruby>選<rt>えら</rt></ruby>びましたか。","audio":"/audio/Q196.mp3","text_original":"どうして今のアルバイトを選びましたか。","defaultAnswer":"学校から近く、<ruby>学業<rt>がくぎょう</rt></ruby>と<ruby>無理<rt>むり</rt></ruby>なく<ruby>両立<rt>りょうりつ</rt></ruby>できるシフトだったからです。","default_answer_original":"学校から近く、学業と無理なく両立できるシフトだったからです。"},{"category":"Part time Job","text":"アルバイトの<ruby>経験<rt>けいけん</rt></ruby>は、<ruby>将来<rt>しょうらい</rt></ruby>の仕事に<ruby>役立<rt>やくだ</rt></ruby>つと思いますか。","audio":"/audio/Q197.mp3","text_original":"アルバイトの経験は、将来の仕事に役立つと思いますか。","defaultAnswer":"はい、<ruby>様々<rt>さまざま</rt></ruby>な人と<ruby>接<rt>せっ</rt></ruby>することでコミュニケーション<ruby>能力<rt>のうりょく</rt></ruby>が<ruby>身<rt>み</rt></ruby>についたと思います。","default_answer_original":"はい、様々な人と接することでコミュニケーション能力が身についたと思います。"},{"category":"Japanese Study","text":"どのような<ruby>目的<rt>もくてき</rt></ruby>で日本語を勉強し始めましたか。","audio":"/audio/Q198.mp3","text_original":"どのような目的で日本語を勉強し始めましたか。","defaultAnswer":"日本のアニメや<ruby>文化<rt>ぶんか</rt></ruby>に<ruby>魅力<rt>みりょく</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じ、自分の<ruby>言葉<rt>ことば</rt></ruby>で<ruby>理解<rt>りかい</rt></ruby>したいと思ったからです。","default_answer_original":"日本のアニメや文化に魅力を感じ、自分の言葉で理解したいと思ったからです。"},{"category":"Japanese Study","text":"日本語を勉強していて、どんなときが一番楽しいですか。","audio":"/audio/Q199.mp3","text_original":"日本語を勉強していて、どんなときが一番楽しいですか。","defaultAnswer":"ネイティブの方とスムーズに会話が<ruby>通<rt>つう</rt></ruby>じたときに大きな<ruby>喜<rt>よろこ</rt></ruby>びを<ruby>感<rt>かん</rt></ruby>じます。","default_answer_original":"ネイティブの方とスムーズに会話が通じたときに大きな喜びを感じます。"},{"category":"Japanese Study","text":"日本語の勉強で一番<ruby>難<rt>むずか</rt></ruby>しいと<ruby>感<rt>かん</rt></ruby>じるところはどこですか。","audio":"/audio/Q200.mp3","text_original":"日本語の勉強で一番難しいと感じるところはどこですか。","defaultAnswer":"<ruby>敬語<rt>けいご</rt></ruby>の使い方や、ニュアンスの<ruby>微妙<rt>びみょう</rt></ruby>な<ruby>違<rt>ちが</rt></ruby>いを<ruby>理解<rt>りかい</rt></ruby>するのが<ruby>難<rt>むずか</rt></ruby>しいです。","default_answer_original":"敬語の使い方や、ニュアンスの微妙な違いを理解するのが難しいです。"},{"category":"Japanese Study","text":"毎日、どのように日本語を勉強していますか。","audio":"/audio/Q201.mp3","text_original":"毎日、どのように日本語を勉強していますか。","defaultAnswer":"<ruby>単語<rt>たんご</rt></ruby>アプリを使ったり、日本語のニュース<ruby>記事<rt>きじ</rt></ruby>を読んだりしています。","default_answer_original":"単語アプリを使ったり、日本語のニュース記事を読んだりしています。"},{"category":"Japanese Study","text":"日本のアニメやマンガの中で、お気に入りの<ruby>作品<rt>さくひん</rt></ruby>は何ですか。","audio":"/audio/Q202.mp3","text_original":"日本のアニメやマンガの中で、お気に入りの作品は何ですか。","defaultAnswer":"ジブリの<ruby>作品<rt>さくひん</rt></ruby>や『<ruby>進撃<rt>しんげき</rt></ruby>の<ruby>巨人<rt>きょじん</rt></ruby>』のストーリーと<ruby>作風<rt>さくふう</rt></ruby>が好きです。","default_answer_original":"ジブリの作品や『進撃の巨人』のストーリーと作風が好きです。"},{"category":"Japanese Study","text":"一番好きな漢字や、<ruby>覚<rt>おぼ</rt></ruby>えやすいと思った<ruby>言葉<rt>ことば</rt></ruby>は何ですか。","audio":"/audio/Q203.mp3","text_original":"一番好きな漢字や、覚えやすいと思った言葉は何ですか。","defaultAnswer":"「<ruby>努力<rt>どりょく</rt></ruby>」という<ruby>言葉<rt>ことば</rt></ruby>が好きです。<ruby>意味<rt>いみ</rt></ruby>も<ruby>形<rt>かたち</rt></ruby>もシンプルだからです。","default_answer_original":"「努力」という言葉が好きです。意味も形もシンプルだからです。"},{"category":"Japanese Study","text":"日本語の先生は<ruby>授業<rt>じゅぎょう</rt></ruby>でどんな教え方をしていますか。","audio":"/audio/Q204.mp3","text_original":"日本語の先生は授業でどんな教え方をしていますか。","defaultAnswer":"<ruby>実際<rt>じっさい</rt></ruby>の<ruby>日常<rt>にちじょう</rt></ruby>会話で使える<ruby>自然<rt>しぜん</rt></ruby>な<ruby>表現<rt>ひょうげん</rt></ruby>を楽しく教えてくれます。","default_answer_original":"実際の日常会話で使える自然な表現を楽しく教えてくれます。"},{"category":"Japanese Study","text":"日本語で自分の考えを<ruby>伝<rt>つた</rt></ruby>えるのは<ruby>得意<rt>とくい</rt></ruby>ですか。","audio":"/audio/Q205.mp3","text_original":"日本語で自分の考えを伝えるのは得意ですか。","defaultAnswer":"まだ<ruby>完璧<rt>かんぺき</rt></ruby>ではありませんが、自分の<ruby>意見<rt>いけん</rt></ruby>を分かりやすく<ruby>伝<rt>つた</rt></ruby>えようと<ruby>心<rt>こころ</rt></ruby>がけています。","default_answer_original":"まだ完璧ではありませんが、自分の意見を分かりやすく伝えようと心がけています。"},{"category":"Japanese Study","text":"日本人の<ruby>知り合<rt>しりあ</rt></ruby>いや友だちと日本語で話したことがありますか。","audio":"/audio/Q206.mp3","text_original":"日本人の知り合いや友だちと日本語で話したことがありますか。","defaultAnswer":"オンラインの言語<ruby>交換<rt>こうかん</rt></ruby>アプリで日本人の<ruby>友達<rt>ともだち</rt></ruby>と話したことがあります。","default_answer_original":"オンラインの言語交換アプリで日本人の友達と話したことがあります。"},{"category":"Japanese Study","text":"<ruby>将来<rt>しょうらい</rt></ruby>、日本語の<ruby>知識<rt>ちしき</rt></ruby>をどのように生かしたいですか。","audio":"/audio/Q207.mp3","text_original":"将来、日本語の知識をどのように生かしたいですか。","defaultAnswer":"<ruby>将来<rt>しょうらい</rt></ruby>は<ruby>国際<rt>こくさい</rt></ruby><ruby>的<rt>てき</rt></ruby>なビジネスに<ruby>関<rt>かか</rt></ruby>わり、日本とオーストラリアの<ruby>架け橋<rt>かけはし</rt></ruby>になりたいです。","default_answer_original":"将来は国際的なビジネスに関わり、日本とオーストラリアの架け橋になりたいです。"},{"category":"Sports","text":"スポーツをやったり<ruby>観戦<rt>かんせん</rt></ruby>したりするのが好きですか。","audio":"/audio/Q208.mp3","text_original":"スポーツをやったり観戦したりするのが好きですか。","defaultAnswer":"体を動かすことも、プロの<ruby>試合<rt>しあい</rt></ruby>を<ruby>観戦<rt>かんせん</rt></ruby>することも<ruby>両方<rt>りょうほう</rt></ruby>好きです。","default_answer_original":"体を動かすことも、プロの試合を観戦することも両方好きです。"},{"category":"Sports","text":"日ごろ、どんなスポーツを楽しんでいますか。","audio":"/audio/Q209.mp3","text_original":"日ごろ、どんなスポーツを楽しんでいますか。","defaultAnswer":"週に一回、学校の<ruby>友達<rt>ともだち</rt></ruby>とバスケットボールをしています。","default_answer_original":"週に一回、学校の友達とバスケットボールをしています。"},{"category":"Sports","text":"学校の<ruby>部<rt>ぶ</rt></ruby>活動や<ruby>地域<rt>ちいき</rt></ruby>のクラブチームに<ruby>参加<rt>さんか</rt></ruby>していますか。","audio":"/audio/Q210.mp3","text_original":"学校の部活動や地域のクラブチームに参加していますか。","defaultAnswer":"はい、<ruby>地域<rt>ちいき</rt></ruby>のテニスクラブに<ruby>所属<rt>しょぞく</rt></ruby>して<ruby>週末<rt>しゅうまつ</rt></ruby>に<ruby>練習<rt>れんしゅう</rt></ruby>しています。","default_answer_original":"はい、地域のテニスクラブに所属して週末に練習しています。"},{"category":"Sports","text":"<ruby>週末<rt>しゅうまつ</rt></ruby>に体を動かすために何をしていますか。","audio":"/audio/Q211.mp3","text_original":"週末に体を動かすために何をしていますか。","defaultAnswer":"近所の<ruby>公園<rt>こうえん</rt></ruby>をランニングしたり、ジムに行ったりしています。","default_answer_original":"近所の公園をランニングしたり、ジムに行ったりしています。"},{"category":"Sports","text":"<ruby>憧<rt>あこが</rt></ruby>れているスポーツ<ruby>選手<rt>せんしゅ</rt></ruby>はだれですか。","audio":"/audio/Q212.mp3","text_original":"憧れているスポーツ選手はだれですか。","defaultAnswer":"<ruby>諦<rt>あきら</rt></ruby>めない<ruby>姿勢<rt>しせい</rt></ruby>が<ruby>素晴<rt>すば</rt></ruby>らしいテニス<ruby>選手<rt>せんしゅ</rt></ruby>に<ruby>憧<rt>あこが</rt></ruby>れています。","default_answer_original":"諦めない姿勢が素晴らしいテニス選手に憧れています。"},{"category":"Sports","text":"何か<ruby>得意<rt>とくい</rt></ruby>なスポーツや、長く<ruby>続<rt>つづ</rt></ruby>けている<ruby>運動<rt>うんどう</rt></ruby>はありますか。","audio":"/audio/Q213.mp3","text_original":"何か得意なスポーツや、長く続けている運動はありますか。","defaultAnswer":"小学校から<ruby>続<rt>つづ</rt></ruby>けている<ruby>水泳<rt>すいえい</rt></ruby>が<ruby>得意<rt>とくい</rt></ruby>です。","default_answer_original":"小学校から続けている水泳が得意です。"},{"category":"Sports","text":"スポーツを自分でプレイするのとテレビで<ruby>観<rt>み</rt></ruby>るのと、どちらが好きですか。","audio":"/audio/Q214.mp3","text_original":"スポーツを自分でプレイするのとテレビで観るのと、どちらが好きですか。","defaultAnswer":"<ruby>熱気<rt>ねっき</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じられるので、自分でプレイする方が好きです。","default_answer_original":"熱気を感じられるので、自分でプレイする方が好きです。"},{"category":"Sports","text":"オーストラリアで人気があるスポーツについてどう思いますか。","audio":"/audio/Q215.mp3","text_original":"オーストラリアで人気があるスポーツについてどう思いますか。","defaultAnswer":"<ruby>多様<rt>たよう</rt></ruby>なスポーツ<ruby>文化<rt>ぶんか</rt></ruby>があり、人々を<ruby>繋<rt>つな</rt></ruby>ぐ<ruby>素晴<rt>すば</rt></ruby>らしい<ruby>力<rt>ちから</rt></ruby>があると思います。","default_answer_original":"多様なスポーツ文化があり、人々を繋ぐ素晴らしい力があると思います。"},{"category":"Sports","text":"子どものころ、どんなスポーツを習っていましたか。","audio":"/audio/Q216.mp3","text_original":"子どものころ、どんなスポーツを習っていましたか。","defaultAnswer":"<ruby>水泳<rt>すいえい</rt></ruby>と<ruby>体操<rt>たいそう</rt></ruby>を<ruby>数<rt>すう</rt></ruby>年間習っていました。","default_answer_original":"水泳と体操を数年間習っていました。"},{"category":"Sports","text":"今後、新しくやってみたいスポーツやアクティビティはありますか。","audio":"/audio/Q217.mp3","text_original":"今後、新しくやってみたいスポーツやアクティビティはありますか。","defaultAnswer":"ロッククライミングやスノーボードに<ruby>挑戦<rt>ちょうせん</rt></ruby>してみたいです。","default_answer_original":"ロッククライミングやスノーボードに挑戦してみたいです。"},{"category":"Travel","text":"旅行に行くのが好きな<ruby>理由<rt>りゆう</rt></ruby>は何ですか。","audio":"/audio/Q218.mp3","text_original":"旅行に行くのが好きな理由は何ですか。","defaultAnswer":"<ruby>普段<rt>ふだん</rt></ruby>と<ruby>違<rt>ちが</rt></ruby>う<ruby>環境<rt>かんきょう</rt></ruby>を<ruby>体験<rt>たいけん</rt></ruby>し、新しい<ruby>文化<rt>ぶんか</rt></ruby>や人に出会えるからです。","default_answer_original":"普段と違う環境を体験し、新しい文化や人に出会えるからです。"},{"category":"Travel","text":"<ruby>最近<rt>さいきん</rt></ruby>行った旅行で、一番<ruby>心<rt>こころ</rt></ruby>に<ruby>残<rt>のこ</rt></ruby>っている場所はどこですか。","audio":"/audio/Q219.mp3","text_original":"最近行った旅行で、一番心に残っている場所はどこですか。","defaultAnswer":"去年の休みに<ruby>訪<rt>おとず</rt></ruby>れたメルボルン<ruby>郊外<rt>こうがい</rt></ruby>の<ruby>自然<rt>しぜん</rt></ruby><ruby>豊<rt>ゆた</rt></ruby>かな場所です。","default_answer_original":"去年の休みに訪れたメルボルン郊外の自然豊かな場所です。"},{"category":"Travel","text":"いつもだれと<ruby>一緒<rt>いっしょ</rt></ruby>に旅行に行くことが多いですか。","audio":"/audio/Q220.mp3","text_original":"いつもだれと一緒に旅行に行くことが多いですか。","defaultAnswer":"<ruby>基本<rt>きほん</rt></ruby><ruby>的<rt>てき</rt></ruby>には家族と<ruby>一緒<rt>いっしょ</rt></ruby>に行くことが多いです。","default_answer_original":"基本的には家族と一緒に行くことが多いです。"},{"category":"Travel","text":"旅先では、どんな<ruby>観光<rt>かんこう</rt></ruby>や活動をしましたか。","audio":"/audio/Q221.mp3","text_original":"旅先では、どんな観光や活動をしましたか。","defaultAnswer":"<ruby>地元<rt>じもと</rt></ruby>の<ruby>美味<rt>おい</rt></ruby>しいレストランを<ruby>巡<rt>めぐ</rt></ruby>ったり、<ruby>史跡<rt>しせき</rt></ruby>を見学したりしました。","default_answer_original":"地元の美味しいレストランを巡ったり、史跡を見学したりしました。"},{"category":"Travel","text":"旅行中に食べた<ruby>美味<rt>おい</rt></ruby>しい名物<ruby>料理<rt>りょうり</rt></ruby>について教えてください。","audio":"/audio/Q222.mp3","text_original":"旅行中に食べた美味しい名物料理について教えてください。","defaultAnswer":"タスマニアで食べた<ruby>新鮮<rt>しんせん</rt></ruby>な<ruby>魚介<rt>ぎょかい</rt></ruby><ruby>類<rt>るい</rt></ruby>の<ruby>料理<rt>りょうり</rt></ruby>が<ruby>忘<rt>わす</rt></ruby>れられません。","default_answer_original":"タスマニアで食べた新鮮な魚介類の料理が忘れられません。"},{"category":"Travel","text":"今まで<ruby>訪<rt>おとず</rt></ruby>れた中で、<ruby>もう一度<rt>もういちど</rt></ruby>行きたい場所はどこですか。","audio":"/audio/Q223.mp3","text_original":"今まで訪れた中で、もう一度行きたい場所はどこですか。","defaultAnswer":"<ruby>美<rt>うつく</rt></ruby>しいビーチが広がっていたケアンズに<ruby>もう一度<rt>もういちど</rt></ruby>行きたいです。","default_answer_original":"美しいビーチが広がっていたケアンズにもう一度行きたいです。"},{"category":"Travel","text":"日本に行ったとき、<ruby>印象<rt>いんしょう</rt></ruby>に<ruby>残<rt>のこ</rt></ruby>った出来事はありますか。","audio":"/audio/Q224.mp3","text_original":"日本に行ったとき、印象に残った出来事はありますか。","defaultAnswer":"まだ行ったことがありませんが、<ruby>伝統<rt>でんとう</rt></ruby><ruby>的<rt>てき</rt></ruby>なお寺や<ruby>街並<rt>まちな</rt></ruby>みを見てみたいです。","default_answer_original":"まだ行ったことがありませんが、伝統的なお寺や街並みを見てみたいです。"},{"category":"Travel","text":"もし日本へ行く<ruby>機会<rt>きかい</rt></ruby>があったら、どこを<ruby>訪<rt>たず</rt></ruby>ねてみたいですか。","audio":"/audio/Q225.mp3","text_original":"もし日本へ行く機会があったら、どこを訪ねてみたいですか。","defaultAnswer":"東京の<ruby>現代<rt>げんだい</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>街<rt>まち</rt></ruby>と、京都の<ruby>歴史<rt>れきし</rt></ruby><ruby>的<rt>てき</rt></ruby>な寺社<ruby>仏閣<rt>ぶっかく</rt></ruby>の<ruby>両方<rt>りょうほう</rt></ruby>に行きたいです。","default_answer_original":"東京の現代的な街と、京都の歴史的な寺社仏閣の両方に行きたいです。"},{"category":"Travel","text":"<ruby>長距離<rt>ちょうきょり</rt></ruby>の旅行をするとき、どんな<ruby>移動<rt>いどう</rt></ruby><ruby>手段<rt>しゅだん</rt></ruby>、乗り物を好みますか。","audio":"/audio/Q226.mp3","text_original":"長距離の旅行をするとき、どんな移動手段、乗り物を好みますか。","defaultAnswer":"<ruby>景色<rt>けしき</rt></ruby>をゆっくり楽しめる電車での<ruby>移動<rt>いどう</rt></ruby>が好きです。","default_answer_original":"景色をゆっくり楽しめる電車での移動が好きです。"},{"category":"Travel","text":"次の<ruby>長期<rt>ちょうき</rt></ruby>休みには、どこへ旅行する<ruby>計画<rt>けいかく</rt></ruby>を立てていますか。","audio":"/audio/Q227.mp3","text_original":"次の長期休みには、どこへ旅行する計画を立てていますか。","defaultAnswer":"家族と<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>国内<rt>こくない</rt></ruby>の<ruby>別<rt>べつ</rt></ruby>の州へ旅行する<ruby>計画<rt>けいかく</rt></ruby>を立てています。","default_answer_original":"家族と一緒に国内の別の州へ旅行する計画を立てています。"},{"category":"Leisure Activity","text":"休みの日は<ruby>普段<rt>ふだん</rt></ruby>、どのように<ruby>過<rt>す</rt></ruby>ごすことが多いですか。","audio":"/audio/Q228.mp3","text_original":"休みの日は普段、どのように過ごすことが多いですか。","defaultAnswer":"午前中は<ruby>趣味<rt>しゅみ</rt></ruby>の時間にあて、午後は<ruby>友達<rt>ともだち</rt></ruby>と出かけることが多いです。","default_answer_original":"午前中は趣味の時間にあて、午後は友達と出かけることが多いです。"},{"category":"Leisure Activity","text":"友だちと出かけるときは、よくどこで会いますか。<ruby>待ち合<rt>まちあわ</rt></ruby>せますか。","audio":"/audio/Q229.mp3","text_original":"友だちと出かけるときは、よくどこで会いますか。待ち合せますか。","defaultAnswer":"駅前のカフェやショッピングモールの入り口で<ruby>待ち合<rt>まちあ</rt></ruby>わせます。","default_answer_original":"駅前のカフェやショッピングモールの入り口で待ち合わせます。"},{"category":"Leisure Activity","text":"買い物をするとき、どのようなお店によく行きますか。","audio":"/audio/Q230.mp3","text_original":"買い物をするとき、どのようなお店によく行きますか。","defaultAnswer":"お気に入りの<ruby>洋服<rt>ようふく</rt></ruby>ブランドが入っているショッピングセンターに行きます。","default_answer_original":"お気に入りの洋服ブランドが入っているショッピングセンターに行きます。"},{"category":"Leisure Activity","text":"気分<ruby>転換<rt>てんかん</rt></ruby>のために、近くの<ruby>公園<rt>こうえん</rt></ruby>や<ruby>自然<rt>しぜん</rt></ruby>がある場所へ行きますか。","audio":"/audio/Q231.mp3","text_original":"気分転換のために、近くの公園や自然がある場所へ行きますか。","defaultAnswer":"はい、天気が<ruby>良<rt>よ</rt></ruby>い日は近くの大きな<ruby>公園<rt>こうえん</rt></ruby>へ<ruby>散歩<rt>さんぽ</rt></ruby>に行きます。","default_answer_original":"はい、天気が良い日は近くの大きな公園へ散歩に行きます。"},{"category":"Leisure Activity","text":"家にいるときは、どのようにリラックスしていますか。","audio":"/audio/Q232.mp3","text_original":"家にいるときは、どのようにリラックスしていますか。","defaultAnswer":"お気に入りの<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>いたり、本を読んだりしてリラックスします。","default_answer_original":"お気に入りの音楽を聞いたり、本を読んだりしてリラックスします。"},{"category":"Leisure Activity","text":"今年の<ruby>休暇<rt>きゅうか</rt></ruby>には、どんな<ruby>特別<rt>とくべつ</rt></ruby>なお出かけをしたいですか。","audio":"/audio/Q233.mp3","text_original":"今年の休暇には、どんな特別なお出かけをしたいですか。","defaultAnswer":"少し<ruby>遠出<rt>とおで</rt></ruby>をして、<ruby>自然<rt>しぜん</rt></ruby>に<ruby>囲<rt>かこ</rt></ruby>まれたコテージに泊まりたいです。","default_answer_original":"少し遠出をして、自然に囲まれたコテージに泊まりたいです。"},{"category":"Leisure Activity","text":"<ruby>誕生<rt>たんじょう</rt></ruby>日などの<ruby>特別<rt>とくべつ</rt></ruby>な日には、いつもどんな<ruby>お祝<rt>おいわ</rt></ruby>いをしますか。","audio":"/audio/Q234.mp3","text_original":"誕生日などの特別な日には、いつもどんなお祝いをしますか。","defaultAnswer":"家族<ruby>全員<rt>ぜんいん</rt></ruby>で<ruby>美味<rt>おい</rt></ruby>しいディナーを食べに行き、ケーキを<ruby>囲<rt>かこ</rt></ruby>みます。","default_answer_original":"家族全員で美味しいディナーを食べに行き、ケーキを囲みます。"},{"category":"Leisure Activity","text":"<ruby>友達<rt>ともだち</rt></ruby>の家で<ruby>開<rt>ひら</rt></ruby>かれるパーティーやイベントによく<ruby>参加<rt>さんか</rt></ruby>しますか。","audio":"/audio/Q235.mp3","text_original":"友達の家で開かれるパーティーやイベントによく参加しますか。","defaultAnswer":"はい、<ruby>誕生<rt>たんじょう</rt></ruby>パーティーや<ruby>祝日<rt>しゅくじつ</rt></ruby>の<ruby>集<rt>あつ</rt></ruby>まりによく<ruby>参加<rt>さんか</rt></ruby>します。","default_answer_original":"はい、誕生パーティーや祝日の集まりによく参加します。"},{"category":"Leisure Activity","text":"一日の終わりに、<ruby>寝<rt>ね</rt></ruby>る前によく行う<ruby>習慣<rt>しゅうかん</rt></ruby>はありますか。","audio":"/audio/Q236.mp3","text_original":"一日の終わりに、寝る前によく行う習慣はありますか。","defaultAnswer":"<ruby>翌日<rt>よくじつ</rt></ruby>の<ruby>時間割<rt>じかんわり</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>し、<ruby>軽<rt>かる</rt></ruby>いストレッチをしてから<ruby>寝<rt>ね</rt></ruby>ます。","default_answer_original":"翌日の時間割を確認し、軽いストレッチをしてから寝ます。"},{"category":"Leisure Activity","text":"朝<ruby>起<rt>お</rt></ruby>きてから家を出るまでに、どのようなルーティンがありますか。","audio":"/audio/Q237.mp3","text_original":"朝起きてから家を出るまでに、どのようなルーティンがありますか。","defaultAnswer":"<ruby>起<rt>お</rt></ruby>きてすぐに<ruby>顔<rt>かお</rt></ruby>を洗い、朝食を食べたあと、<ruby>身支度<rt>みじたく</rt></ruby>を<ruby>整<rt>ととの</rt></ruby>えて家を出ます。","default_answer_original":"起きてすぐに顔を洗い、朝食を食べたあと、身支度を整えて家を出ます。"},{"category":"Future","text":"高校を<ruby>卒業<rt>そつぎょう</rt></ruby>した後の<ruby>進路<rt>しんろ</rt></ruby>について、どのように考えていますか。","audio":"/audio/Q238.mp3","text_original":"高校を卒業した後の進路について、どのように考えていますか。","defaultAnswer":"大学に<ruby>進学<rt>しんがく</rt></ruby>して、<ruby>国際<rt>こくさい</rt></ruby><ruby>関係<rt>かんけい</rt></ruby>かビジネスを学びたいと考えています。","default_answer_original":"大学に進学して、国際関係かビジネスを学びたいと考えています。"},{"category":"Future","text":"大学に<ruby>進学<rt>しんがく</rt></ruby>する<ruby>場合<rt>ばあい</rt></ruby>、どんな<ruby>分野<rt>ぶんや</rt></ruby>を<ruby>専門<rt>せんもん</rt></ruby><ruby>的<rt>てき</rt></ruby>に学びたいですか。","audio":"/audio/Q239.mp3","text_original":"大学に進学する場合、どんな分野を専門的に学びたいですか。","defaultAnswer":"グローバルな社会で<ruby>役立<rt>やくだ</rt></ruby>つ言語や<ruby>経済<rt>けいざい</rt></ruby>の<ruby>分野<rt>ぶんや</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>く学びたいです。","default_answer_original":"グローバルな社会で役立つ言語や経済の分野を深く学びたいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>、どのような<ruby>職種<rt>しょくしゅ</rt></ruby>やキャリアを<ruby>目指<rt>めざ</rt></ruby>していますか。","audio":"/audio/Q240.mp3","text_original":"将来、どのような職種やキャリアを目指していますか。","defaultAnswer":"<ruby>将来<rt>しょうらい</rt></ruby>は海外とビジネスの<ruby>やり取<rt>やりと</rt></ruby>りができる仕事に<ruby>就<rt>つ</rt></ruby>きたいです。","default_answer_original":"将来は海外とビジネスのやり取りができる仕事に就きたいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>、海外で働いたり<ruby>暮<rt>く</rt></ruby>らしたりすることに<ruby>興味<rt>きょうみ</rt></ruby>がありますか。","audio":"/audio/Q241.mp3","text_original":"将来、海外で働いたり暮らしたりすることに興味がありますか。","defaultAnswer":"はい、日本を<ruby>含<rt>ふく</rt></ruby>む<ruby>様々<rt>さまざま</rt></ruby>な国で働くことに大きな<ruby>興味<rt>きょうみ</rt></ruby>があります。","default_answer_original":"はい、日本を含む様々な国で働くことに大きな興味があります。"},{"category":"Future","text":"<ruby>機会<rt>きかい</rt></ruby>があれば、日本で生活してみたいと思いますか。","audio":"/audio/Q242.mp3","text_original":"機会があれば、日本で生活してみたいと思いますか。","defaultAnswer":"はい、ぜひ<ruby>数<rt>すう</rt></ruby>年間日本に住んで働きながら<ruby>文化<rt>ぶんか</rt></ruby>を学びたいです。","default_answer_original":"はい、ぜひ数年間日本に住んで働きながら文化を学びたいです。"},{"category":"Future","text":"車の<ruby>免許<rt>めんきょ</rt></ruby>を<ruby>取<rt>と</rt></ruby>って、自分で<ruby>運転<rt>うんてん</rt></ruby>できるようになりたいですか。","audio":"/audio/Q243.mp3","text_original":"車の免許を取って、自分で運転できるようになりたいですか。","defaultAnswer":"はい、<ruby>移動<rt>いどう</rt></ruby>の<ruby>自由<rt>じゆう</rt></ruby>が広がるので早く<ruby>免許<rt>めんきょ</rt></ruby>を<ruby>取得<rt>しゅとく</rt></ruby>したいです。","default_answer_original":"はい、移動の自由が広がるので早く免許を取得したいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>、どんな<ruby>種類<rt>しゅるい</rt></ruby>の車に乗りたいと思っていますか。","audio":"/audio/Q244.mp3","text_original":"将来、どんな種類の車に乗りたいと思っていますか。","defaultAnswer":"<ruby>環境<rt>かんきょう</rt></ruby>に<ruby>優<rt>やさ</rt></ruby>しい電気自動車や、コンパクトな車に乗りたいです。","default_answer_original":"環境に優しい電気自動車や、コンパクトな車に乗りたいです。"},{"category":"Future","text":"自立したら、どんな<ruby>街<rt>まち</rt></ruby>や<ruby>部屋<rt>へや</rt></ruby>に住んでみたいですか。","audio":"/audio/Q245.mp3","text_original":"自立したら、どんな街や部屋に住んでみたいですか。","defaultAnswer":"<ruby>交通<rt>こうつう</rt></ruby>の<ruby>便<rt>びん</rt></ruby>が<ruby>良<rt>よ</rt></ruby>い都会の<ruby>便利<rt>べんり</rt></ruby>なアパートに住んでみたいです。","default_answer_original":"交通の便が良い都会の便利なアパートに住んでみたいです。"},{"category":"Future","text":"10年後の自分は、どのような生活を<ruby>送<rt>おく</rt></ruby>っていると<ruby>想像<rt>そうぞう</rt></ruby>しますか。","audio":"/audio/Q246.mp3","text_original":"10年後の自分は、どのような生活を送っていると想像しますか。","defaultAnswer":"自分の<ruby>専門<rt>せんもん</rt></ruby><ruby>分野<rt>ぶんや</rt></ruby>でキャリアを<ruby>積<rt>つ</rt></ruby>み、<ruby>充実<rt>じゅうじつ</rt></ruby>した毎日を<ruby>送<rt>おく</rt></ruby>っていると思います。","default_answer_original":"自分の専門分野でキャリアを積み、充実した毎日を送っていると思います。"},{"category":"Future","text":"あなたにとって、一番<ruby>叶<rt>かな</rt></ruby>えたい「<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>」は何ですか。","audio":"/audio/Q247.mp3","text_original":"あなたにとって、一番叶えたい「将来の夢」は何ですか。","defaultAnswer":"<ruby>世界中<rt>せかいじゅう</rt></ruby>を<ruby>飛び回<rt>とびまわ</rt></ruby>りながら、多くの人々の<ruby>役に立<rt>やくにた</rt></ruby>つ仕事をすることです。","default_answer_original":"世界中を飛び回りながら、多くの人々の役に立つ仕事をすることです。"},{"category":"Technology","text":"<ruby>現在<rt>げんざい</rt></ruby>、どのようなスマートフォンやデバイスを使っていますか。","audio":"/audio/Q248.mp3","text_original":"現在、どのようなスマートフォンやデバイスを使っていますか。","defaultAnswer":"<ruby>最新<rt>さいしん</rt></ruby>のモデルのスマートフォンと、勉強<ruby>用<rt>よう</rt></ruby>のノートパソコンを使っています。","default_answer_original":"最新のモデルのスマートフォンと、勉強用のノートパソコンを使っています。"},{"category":"Technology","text":"一日に<ruby>平均<rt>へいきん</rt></ruby>して何時間くらいスマホ<ruby>画面<rt>がめん</rt></ruby>を見ていますか。","audio":"/audio/Q249.mp3","text_original":"一日に平均して何時間くらいスマホ画面を見ていますか。","defaultAnswer":"大体四時間から五時間くらい見ていると思います。","default_answer_original":"大体四時間から五時間くらい見ていると思います。"},{"category":"Technology","text":"スマホを使って、<ruby>主<rt>おも</rt></ruby>にどのような<ruby>作業<rt>さぎょう</rt></ruby>や<ruby>連絡<rt>れんらく</rt></ruby>を行っていますか。","audio":"/audio/Q250.mp3","text_original":"スマホを使って、主にどのような作業や連絡を行っていますか。","defaultAnswer":"<ruby>友達<rt>ともだち</rt></ruby>とのメッセージの<ruby>やり取<rt>やりと</rt></ruby>りや、<ruby>課題<rt>かだい</rt></ruby>の<ruby>調<rt>しら</rt></ruby>べ物に<ruby>活用<rt>かつよう</rt></ruby>しています。","default_answer_original":"友達とのメッセージのやり取りや、課題の調べ物に活用しています。"},{"category":"Technology","text":"<ruby>普段<rt>ふだん</rt></ruby>の学習や<ruby>作業<rt>さぎょう</rt></ruby>で、パソコンをどのように<ruby>活用<rt>かつよう</rt></ruby>していますか。","audio":"/audio/Q251.mp3","text_original":"普段の学習や作業で、パソコンをどのように活用していますか。","defaultAnswer":"レポートの<ruby>作成<rt>さくせい</rt></ruby>や、オンラインでの<ruby>資料<rt>しりょう</rt></ruby><ruby>収集<rt>しゅうしゅう</rt></ruby>に使っています。","default_answer_original":"レポートの作成や、オンラインでの資料収集に使っています。"},{"category":"Technology","text":"オンラインショッピングや電子<ruby>決済<rt>けっさい</rt></ruby>、キャッシュレス、を<ruby>利用<rt>りよう</rt></ruby>する<ruby>頻度<rt>ひんど</rt></ruby>と<ruby>利便<rt>りべん</rt></ruby><ruby>性<rt>せい</rt></ruby>についてどう思いますか。","audio":"/audio/Q252.mp3","text_original":"オンラインショッピングや電子決済、キャッシュレス、を利用する頻度と利便性についてどう思いますか。","defaultAnswer":"<ruby>財布<rt>さいふ</rt></ruby>を持ち歩かずに買い物ができるのでとても<ruby>便利<rt>べんり</rt></ruby>で、<ruby>頻繁<rt>ひんぱん</rt></ruby>に<ruby>利用<rt>りよう</rt></ruby>しています。","default_answer_original":"財布を持ち歩かずに買い物ができるのでとても便利で、頻繁に利用しています。"},{"category":"Technology","text":"SNS、ソーシャルメディア、を使う<ruby>利点<rt>りてん</rt></ruby>と<ruby>問題<rt>もんだい</rt></ruby>点は何だと思いますか。","audio":"/audio/Q253.mp3","text_original":"SNS、ソーシャルメディア、を使う利点と問題点は何だと思いますか。","defaultAnswer":"<ruby>利点<rt>りてん</rt></ruby>は<ruby>世界中<rt>せかいじゅう</rt></ruby>の人と<ruby>繋<rt>つな</rt></ruby>がれることであり、<ruby>問題<rt>もんだい</rt></ruby>点は時間を<ruby>奪<rt>うば</rt></ruby>われやすいことです。","default_answer_original":"利点は世界中の人と繋がれることであり、問題点は時間を奪われやすいことです。"},{"category":"Technology","text":"<ruby>最新<rt>さいしん</rt></ruby>のテクノロジーによって生活はどのように<ruby>変<rt>か</rt></ruby>わったと思いますか。","audio":"/audio/Q254.mp3","text_original":"最新のテクノロジーによって生活はどのように変わったと思いますか。","defaultAnswer":"<ruby>情報<rt>じょうほう</rt></ruby>へのアクセスが<ruby>圧倒的<rt>あっとうてき</rt></ruby>に早くなり、生活が<ruby>効率<rt>こうりつ</rt></ruby><ruby>的<rt>てき</rt></ruby>になりました。","default_answer_original":"情報へのアクセスが圧倒的に早くなり、生活が効率的になりました。"},{"category":"Technology","text":"AI、<ruby>人工<rt>じんこう</rt></ruby><ruby>知能<rt>ちのう</rt></ruby>、の<ruby>発展<rt>はってん</rt></ruby>について、どのように<ruby>感<rt>かん</rt></ruby>じていますか。","audio":"/audio/Q255.mp3","text_original":"AI、人工知能、の発展について、どのように感じていますか。","defaultAnswer":"仕事や学習をサポートしてくれる<ruby>反面<rt>はんめん</rt></ruby>、使い方に<ruby>注意<rt>ちゅうい</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>だと<ruby>感<rt>かん</rt></ruby>じます。","default_answer_original":"仕事や学習をサポートしてくれる反面、使い方に注意が必要だと感じます。"},{"category":"Technology","text":"もしスマホを一日中使えないとしたら、どうなると思いますか。","audio":"/audio/Q256.mp3","text_original":"もしスマホを一日中使えないとしたら、どうなると思いますか。","defaultAnswer":"<ruby>最初<rt>さいしょ</rt></ruby>は<ruby>不便<rt>ふべん</rt></ruby>に<ruby>感<rt>かん</rt></ruby>じるでしょうが、本を読んだり外で<ruby>過<rt>す</rt></ruby>ごす<ruby>良<rt>よ</rt></ruby>い<ruby>機会<rt>きかい</rt></ruby>になると思います。","default_answer_original":"最初は不便に感じるでしょうが、本を読んだり外で過ごす良い機会になると思います。"},{"category":"Technology","text":"近いうちに買いたいと思っている<ruby>最新<rt>さいしん</rt></ruby>のガジェットや電子<ruby>機器<rt>きき</rt></ruby>はありますか。","audio":"/audio/Q257.mp3","text_original":"近いうちに買いたいと思っている最新のガジェットや電子機器はありますか。","defaultAnswer":"ノイズキャンセリング<ruby>機能<rt>きのう</rt></ruby><ruby>付<rt>つ</rt></ruby>きのワイヤレスイヤホンが<ruby>欲<rt>ほ</rt></ruby>しいです。","default_answer_original":"ノイズキャンセリング機能付きのワイヤレスイヤホンが欲しいです。"}],"accelerated":[{"category":"Family","text":"ご家族<ruby>構成<rt>こうせい</rt></ruby>について教えていただけますか。","audio":"/audio/Q315.mp3","text_original":"ご家族構成について教えていただけますか。","defaultAnswer":"私の家族<ruby>構成<rt>こうせい</rt></ruby>は<ruby>両親<rt>りょうしん</rt></ruby>と妹が一人の四人家族で、<ruby>お互<rt>おたが</rt></ruby>いに<ruby>支<rt>ささ</rt></ruby>え<ruby>合<rt>あ</rt></ruby>って<ruby>暮<rt>く</rt></ruby>らしています。","default_answer_original":"私の家族構成は両親と妹が一人の四人家族で、お互いに支え合って暮らしています。"},{"category":"Family","text":"家族の中で、一番<ruby>意見<rt>いけん</rt></ruby>が<ruby>合<rt>あ</rt></ruby>う人や<ruby>気軽<rt>きがる</rt></ruby>に話せる人はだれですか。","audio":"/audio/Q316.mp3","text_original":"家族の中で、一番意見が合う人や気軽に話せる人はだれですか。","defaultAnswer":"母とは<ruby>年齢<rt>ねんれい</rt></ruby>の近い友人<ruby>感覚<rt>かんかく</rt></ruby>で何でも<ruby>相談<rt>そうだん</rt></ruby>できるため、一番話しやすい<ruby>存在<rt>そんざい</rt></ruby>です。","default_answer_original":"母とは年齢の近い友人感覚で何でも相談できるため、一番話しやすい存在です。"},{"category":"Family","text":"お<ruby>父様<rt>とうさま</rt></ruby>やお<ruby>母様<rt>かあさま</rt></ruby>は、<ruby>普段<rt>ふだん</rt></ruby>どのようなお仕事をなさっていますか。","audio":"/audio/Q317.mp3","text_original":"お父様やお母様は、普段どのようなお仕事をなさっていますか。","defaultAnswer":"父は<ruby>経営<rt>けいえい</rt></ruby>コンサルタントとして<ruby>企業<rt>きぎょう</rt></ruby>を<ruby>支援<rt>しえん</rt></ruby>しており、母は<ruby>教育<rt>きょういく</rt></ruby><ruby>関係<rt>かんけい</rt></ruby>の仕事に<ruby>従事<rt>じゅうじ</rt></ruby>しています。","default_answer_original":"父は経営コンサルタントとして企業を支援しており、母は教育関係の仕事に従事しています。"},{"category":"Family","text":"ご兄弟とは<ruby>歳<rt>とし</rt></ruby>の<ruby>差<rt>さ</rt></ruby>がありますか。どのような<ruby>関係<rt>かんけい</rt></ruby>ですか。","audio":"/audio/Q318.mp3","text_original":"ご兄弟とは歳の差がありますか。どのような関係ですか。","defaultAnswer":"妹とは三<ruby>歳<rt>さい</rt></ruby>の<ruby>差<rt>さ</rt></ruby>があり、時には<ruby>喧嘩<rt>けんか</rt></ruby>もしますが<ruby>良<rt>よ</rt></ruby>き<ruby>相談<rt>そうだん</rt></ruby><ruby>相手<rt>あいて</rt></ruby>でもあります。","default_answer_original":"妹とは三歳の差があり、時には喧嘩もしますが良き相談相手でもあります。"},{"category":"Family","text":"ご家族はそれぞれどのようなお<ruby>人柄<rt>ひとがら</rt></ruby>やご<ruby>性格<rt>せいかく</rt></ruby>ですか。","audio":"/audio/Q319.mp3","text_original":"ご家族はそれぞれどのようなお人柄やご性格ですか。","defaultAnswer":"父は<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>勤勉<rt>きんべん</rt></ruby>で<ruby>責任<rt>せきにん</rt></ruby><ruby>感<rt>かん</rt></ruby>が強く、母は<ruby>温和<rt>おんわ</rt></ruby>で<ruby>周囲<rt>しゅうい</rt></ruby>への<ruby>気配<rt>きくば</rt></ruby>りを<ruby>大切<rt>たいせつ</rt></ruby>にする<ruby>性格<rt>せいかく</rt></ruby>です。","default_answer_original":"父は非常に勤勉で責任感が強く、母は温和で周囲への気配りを大切にする性格です。"},{"category":"Family","text":"今までにペットを<ruby>飼<rt>か</rt></ruby>った<ruby>経験<rt>けいけん</rt></ruby>や、<ruby>忘<rt>わす</rt></ruby>れられない思い出はありますか。","audio":"/audio/Q320.mp3","text_original":"今までにペットを飼った経験や、忘れられない思い出はありますか。","defaultAnswer":"<ruby>幼<rt>おさな</rt></ruby>い<ruby>頃<rt>ころ</rt></ruby>から犬を<ruby>飼<rt>か</rt></ruby>っており、<ruby>辛<rt>つら</rt></ruby>いときにいつも<ruby>寄り添<rt>よりそ</rt></ruby>ってくれた<ruby>大切<rt>たいせつ</rt></ruby>な思い出があります。","default_answer_original":"幼い頃から犬を飼っており、辛いときにいつも寄り添ってくれた大切な思い出があります。"},{"category":"Family","text":"<ruby>週末<rt>しゅうまつ</rt></ruby>や休日には、ご家族と<ruby>一緒<rt>いっしょ</rt></ruby>にどのように<ruby>過<rt>す</rt></ruby>ごすことが多いですか。","audio":"/audio/Q321.mp3","text_original":"週末や休日には、ご家族と一緒にどのように過ごすことが多いですか。","defaultAnswer":"<ruby>週末<rt>しゅうまつ</rt></ruby>には<ruby>全員<rt>ぜんいん</rt></ruby>で時間を<ruby>合<rt>あ</rt></ruby>わせて、少し<ruby>凝<rt>こ</rt></ruby>った<ruby>料理<rt>りょうり</rt></ruby>を<ruby>囲<rt>かこ</rt></ruby>みながら一週間の出来事を話します。","default_answer_original":"週末には全員で時間を合わせて、少し凝った料理を囲みながら一週間の出来事を話します。"},{"category":"Family","text":"あなたのご<ruby>家庭<rt>かてい</rt></ruby>ならではの<ruby>独特<rt>どくとく</rt></ruby>な<ruby>習慣<rt>しゅうかん</rt></ruby>や<ruby>決<rt>き</rt></ruby>まり事はありますか。","audio":"/audio/Q322.mp3","text_original":"あなたのご家庭ならではの独特な習慣や決まり事はありますか。","defaultAnswer":"月に一<ruby>度<rt>ど</rt></ruby>、家族<ruby>全員<rt>ぜんいん</rt></ruby>で新しい<ruby>文化<rt>ぶんか</rt></ruby>や国の<ruby>料理<rt>りょうり</rt></ruby>に<ruby>挑戦<rt>ちょうせん</rt></ruby>して楽しむというルールがあります。","default_answer_original":"月に一度、家族全員で新しい文化や国の料理に挑戦して楽しむというルールがあります。"},{"category":"Family","text":"今までに家族で<ruby>訪<rt>おとず</rt></ruby>れた場所の中で、<ruby>特<rt>とく</rt></ruby>に<ruby>印象深<rt>いんしょうぶか</rt></ruby>い旅行先はどこですか。","audio":"/audio/Q323.mp3","text_original":"今までに家族で訪れた場所の中で、特に印象深い旅行先はどこですか。","defaultAnswer":"<ruby>数<rt>すう</rt></ruby>年前に<ruby>訪<rt>おとず</rt></ruby>れたヨーロッパの<ruby>歴史<rt>れきし</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>街<rt>まち</rt></ruby><ruby>並<rt>な</rt></ruby>みが、家族<ruby>全員<rt>ぜんいん</rt></ruby>にとって<ruby>最<rt>もっと</rt></ruby>も<ruby>印象深<rt>いんしょうぶか</rt></ruby>く<ruby>残<rt>のこ</rt></ruby>っています。","default_answer_original":"数年前に訪れたヨーロッパの歴史的な街並みが、家族全員にとって最も印象深く残っています。"},{"category":"Family","text":"家事の<ruby>分担<rt>ぶんたん</rt></ruby>として、<ruby>普段<rt>ふだん</rt></ruby>ご<ruby>自身<rt>じしん</rt></ruby>でどんな<ruby>役割<rt>やくわり</rt></ruby>を<ruby>担当<rt>たんとう</rt></ruby>していますか。","audio":"/audio/Q324.mp3","text_original":"家事の分担として、普段ご自身でどんな役割を担当していますか。","defaultAnswer":"毎日の<ruby>食器<rt>しょっき</rt></ruby>の<ruby>片付<rt>かたづ</rt></ruby>けと、<ruby>週末<rt>しゅうまつ</rt></ruby>の<ruby>庭<rt>にわ</rt></ruby>のメンテナンスを私の<ruby>担当<rt>たんとう</rt></ruby>として<ruby>責任<rt>せきにん</rt></ruby>を持っています。","default_answer_original":"毎日の食器の片付けと、週末の庭のメンテナンスを私の担当として責任を持っています。"},{"category":"School","text":"<ruby>現在<rt>げんざい</rt></ruby><ruby>通<rt>かよ</rt></ruby>っていらっしゃる学校の<ruby>特色<rt>とくしょく</rt></ruby>や<ruby>雰囲気<rt>ふんいき</rt></ruby>を教えてください。","audio":"/audio/Q325.mp3","text_original":"現在通っていらっしゃる学校の特色や雰囲気を教えてください。","defaultAnswer":"<ruby>生徒<rt>せいと</rt></ruby>の<ruby>自主<rt>じしゅ</rt></ruby><ruby>性<rt>せい</rt></ruby>と<ruby>多様<rt>たよう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>重<rt>おも</rt></ruby>んじる、オープンで活気のある<ruby>雰囲気<rt>ふんいき</rt></ruby>が<ruby>特徴<rt>とくちょう</rt></ruby>の学校です。","default_answer_original":"生徒の自主性と多様性を重んじる、オープンで活気のある雰囲気が特徴の学校です。"},{"category":"School","text":"学年や<ruby>専攻<rt>せんこう</rt></ruby><ruby>課程<rt>かてい</rt></ruby>において、どのようなテーマを<ruby>中心<rt>ちゅうしん</rt></ruby>に学んでいますか。","audio":"/audio/Q326.mp3","text_original":"学年や専攻課程において、どのようなテーマを中心に学んでいますか。","defaultAnswer":"人文<ruby>科学<rt>かがく</rt></ruby>と<ruby>科学<rt>かがく</rt></ruby><ruby>技術<rt>ぎじゅつ</rt></ruby>の<ruby>両面<rt>りょうめん</rt></ruby>から、<ruby>現代<rt>げんだい</rt></ruby>社会の<ruby>課題<rt>かだい</rt></ruby><ruby>解決<rt>かいけつ</rt></ruby>に<ruby>繋<rt>つな</rt></ruby>がるアプローチを学んでいます。","default_answer_original":"人文科学と科学技術の両面から、現代社会の課題解決に繋がるアプローチを学んでいます。"},{"category":"School","text":"朝の<ruby>登校<rt>とうこう</rt></ruby>時間や<ruby>遅刻<rt>ちこく</rt></ruby><ruby>に関<rt>にかん</rt></ruby>する学校の<ruby>規則<rt>きそく</rt></ruby>について教えてください。","audio":"/audio/Q327.mp3","text_original":"朝の登校時間や遅刻に関する学校の規則について教えてください。","defaultAnswer":"朝八時半までに<ruby>登校<rt>とうこう</rt></ruby>が<ruby>義務付<rt>ぎむづ</rt></ruby>けられており、<ruby>厳格<rt>げんかく</rt></ruby>かつ<ruby>規律<rt>きりつ</rt></ruby>ある<ruby>管理<rt>かんり</rt></ruby><ruby>体制<rt>たいせい</rt></ruby>が<ruby>敷<rt>し</rt></ruby>かれています。","default_answer_original":"朝八時半までに登校が義務付けられており、厳格かつ規律ある管理体制が敷かれています。"},{"category":"School","text":"<ruby>今学期<rt>こんがっき</rt></ruby><ruby>履修<rt>りしゅう</rt></ruby>している<ruby>科目<rt>かもく</rt></ruby>の中で、<ruby>特<rt>とく</rt></ruby>に<ruby>力<rt>ちから</rt></ruby>を入れて勉強しているものは何ですか。","audio":"/audio/Q328.mp3","text_original":"今学期履修している科目の中で、特に力を入れて勉強しているものは何ですか。","defaultAnswer":"大学<ruby>進学<rt>しんがく</rt></ruby>を<ruby>視野<rt>しや</rt></ruby>に入れて、<ruby>高度<rt>こうど</rt></ruby>な日本語と<ruby>数学<rt>すうがく</rt></ruby>の<ruby>応用<rt>おうよう</rt></ruby><ruby>科目<rt>かもく</rt></ruby>に<ruby>最<rt>もっと</rt></ruby>も<ruby>注力<rt>ちゅうりょく</rt></ruby>しています。","default_answer_original":"大学進学を視野に入れて、高度な日本語と数学の応用科目に最も注力しています。"},{"category":"School","text":"一番<ruby>興味深<rt>きょうみぶか</rt></ruby>く<ruby>感<rt>かん</rt></ruby>じられる<ruby>科目<rt>かもく</rt></ruby>と、その<ruby>理由<rt>りゆう</rt></ruby>について<ruby>詳<rt>くわ</rt></ruby>しく教えてください。","audio":"/audio/Q329.mp3","text_original":"一番興味深く感じられる科目と、その理由について詳しく教えてください。","defaultAnswer":"生物学です。<ruby>生命<rt>せいめい</rt></ruby>の<ruby>精緻<rt>せいち</rt></ruby>なメカニズムを<ruby>科学<rt>かがく</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>解き明<rt>ときあ</rt></ruby>かすプロセスに<ruby>深<rt>ふか</rt></ruby>く<ruby>惹<rt>ひ</rt></ruby>かれるからです。","default_answer_original":"生物学です。生命の精緻なメカニズムを科学的に解き明かすプロセスに深く惹かれるからです。"},{"category":"School","text":"<ruby>苦手<rt>にがて</rt></ruby><ruby>意識<rt>いしき</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じている<ruby>科目<rt>かもく</rt></ruby><ruby>に対<rt>にたい</rt></ruby>して、どのようなアプローチで<ruby>取り組<rt>とりく</rt></ruby>んでいますか。","audio":"/audio/Q330.mp3","text_original":"苦手意識を感じている科目に対して、どのようなアプローチで取り組んでいますか。","defaultAnswer":"<ruby>自身<rt>じしん</rt></ruby>の<ruby>弱点<rt>じゃくてん</rt></ruby>を<ruby>分析<rt>ぶんせき</rt></ruby>し、<ruby>参考<rt>さんこう</rt></ruby>書を<ruby>変<rt>か</rt></ruby>えたり<ruby>個別<rt>こべつ</rt></ruby>で<ruby>教師<rt>きょうし</rt></ruby>に<ruby>指導<rt>しどう</rt></ruby>を<ruby>仰<rt>あお</rt></ruby>いだりして<ruby>克服<rt>こくふく</rt></ruby>に<ruby>努<rt>つと</rt></ruby>めています。","default_answer_original":"自身の弱点を分析し、参考書を変えたり個別で教師に指導を仰いだりして克服に努めています。"},{"category":"School","text":"学校に<ruby>通<rt>かよ</rt></ruby>うための<ruby>交通<rt>こうつう</rt></ruby><ruby>手段<rt>しゅだん</rt></ruby>や、<ruby>通学<rt>つうがく</rt></ruby>のルートについて<ruby>説明<rt>せつめい</rt></ruby>してください。","audio":"/audio/Q331.mp3","text_original":"学校に通うための交通手段や、通学のルートについて説明してください。","defaultAnswer":"<ruby>自宅<rt>じたく</rt></ruby>から<ruby>最寄り駅<rt>もよりえき</rt></ruby>までバスを<ruby>利用<rt>りよう</rt></ruby>し、そこから電車を<ruby>乗り継<rt>のりつ</rt></ruby>いで<ruby>約<rt>やく</rt></ruby>四十分かけて<ruby>通学<rt>つうがく</rt></ruby>しています。","default_answer_original":"自宅から最寄り駅までバスを利用し、そこから電車を乗り継いで約四十分かけて通学しています。"},{"category":"School","text":"毎日の<ruby>通学<rt>つうがく</rt></ruby>時間や、その時間を<ruby>有効<rt>ゆうこう</rt></ruby><ruby>活用<rt>かつよう</rt></ruby>するために<ruby>工夫<rt>くふう</rt></ruby>していることはありますか。","audio":"/audio/Q332.mp3","text_original":"毎日の通学時間や、その時間を有効活用するために工夫していることはありますか。","defaultAnswer":"電車<ruby>内<rt>ない</rt></ruby>での時間を<ruby>有効<rt>ゆうこう</rt></ruby>に使うため、<ruby>単語<rt>たんご</rt></ruby>の<ruby>暗記<rt>あんき</rt></ruby>やポッドキャストによるリスニングの<ruby>練習<rt>れんしゅう</rt></ruby>にあてています。","default_answer_original":"電車内での時間を有効に使うため、単語の暗記やポッドキャストによるリスニングの練習にあてています。"},{"category":"School","text":"昼休みなどの<ruby>休憩<rt>きゅうけい</rt></ruby>時間には、<ruby>普段<rt>ふだん</rt></ruby>どのように<ruby>過<rt>す</rt></ruby>ごすのが<ruby>一般<rt>いっぱん</rt></ruby><ruby>的<rt>てき</rt></ruby>ですか。","audio":"/audio/Q333.mp3","text_original":"昼休みなどの休憩時間には、普段どのように過ごすのが一般的ですか。","defaultAnswer":"<ruby>図書<rt>としょ</rt></ruby><ruby>室<rt>しつ</rt></ruby>で<ruby>静<rt>しず</rt></ruby>かに自習をしたり、気の<ruby>置<rt>お</rt></ruby>けない友人たちとカフェテリアで<ruby>議論<rt>ぎろん</rt></ruby>を<ruby>交<rt>か</rt></ruby>わしたりして<ruby>過<rt>す</rt></ruby>ごします。","default_answer_original":"図書室で静かに自習をしたり、気の置けない友人たちとカフェテリアで議論を交わしたりして過ごします。"},{"category":"School","text":"<ruby>在籍<rt>ざいせき</rt></ruby>している学校の強み、メリット、と<ruby>課題<rt>かだい</rt></ruby>、デメリット、は何だと考えますか。","audio":"/audio/Q334.mp3","text_original":"在籍している学校の強み、メリット、と課題、デメリット、は何だと考えますか。","defaultAnswer":"強みは<ruby>質<rt>しつ</rt></ruby>の高い<ruby>教育<rt>きょういく</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>ですが、<ruby>課題<rt>かだい</rt></ruby>としては<ruby>生徒<rt>せいと</rt></ruby>の<ruby>負担<rt>ふたん</rt></ruby>が時として大きくなる点が<ruby>挙<rt>あ</rt></ruby>げられます。","default_answer_original":"強みは質の高い教育環境ですが、課題としては生徒の負担が時として大きくなる点が挙げられます。"},{"category":"Hobby","text":"あなたが<ruby>現在<rt>げんざい</rt></ruby>、<ruby>最<rt>もっと</rt></ruby>も<ruby>夢中<rt>むちゅう</rt></ruby>になっている<ruby>趣味<rt>しゅみ</rt></ruby>や<ruby>関心<rt>かんしん</rt></ruby>事について教えてください。","audio":"/audio/Q335.mp3","text_original":"あなたが現在、最も夢中になっている趣味や関心事について教えてください。","defaultAnswer":"ドローンを<ruby>用<rt>もち</rt></ruby>いた<ruby>風景<rt>ふうけい</rt></ruby>の<ruby>空撮<rt>くうさつ</rt></ruby>と、それを<ruby>編集<rt>へんしゅう</rt></ruby>して一つの<ruby>映像<rt>えいぞう</rt></ruby><ruby>作品<rt>さくひん</rt></ruby>に仕上げることに<ruby>没頭<rt>ぼっとう</rt></ruby>しています。","default_answer_original":"ドローンを用いた風景の空撮と、それを編集して一つの映像作品に仕上げることに没頭しています。"},{"category":"Hobby","text":"<ruby>日常<rt>にちじょう</rt></ruby>のストレスを<ruby>発散<rt>はっさん</rt></ruby>したり気分<ruby>転換<rt>てんかん</rt></ruby>をしたりする<ruby>際<rt>さい</rt></ruby>、どのような活動をしますか。","audio":"/audio/Q336.mp3","text_original":"日常のストレスを発散したり気分転換をしたりする際、どのような活動をしますか。","defaultAnswer":"<ruby>静<rt>しず</rt></ruby>かな<ruby>環境<rt>かんきょう</rt></ruby>で読書に<ruby>没頭<rt>ぼっとう</rt></ruby>するか、あるいは<ruby>自然<rt>しぜん</rt></ruby>の中を<ruby>長距離<rt>ちょうきょり</rt></ruby>ランニングすることでリフレッシュします。","default_answer_original":"静かな環境で読書に没頭するか、あるいは自然の中を長距離ランニングすることでリフレッシュします。"},{"category":"Hobby","text":"<ruby>日常<rt>にちじょう</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>親<rt>した</rt></ruby>しんでいる<ruby>音楽<rt>おんがく</rt></ruby>のジャンルや、<ruby>感銘<rt>かんめい</rt></ruby>を<ruby>受<rt>う</rt></ruby>けたアーティストはいますか。","audio":"/audio/Q337.mp3","text_original":"日常的に親しんでいる音楽のジャンルや、感銘を受けたアーティストはいますか。","defaultAnswer":"ジャズやクラシックの<ruby>要素<rt>ようそ</rt></ruby>を<ruby>取り入<rt>とりい</rt></ruby>れた<ruby>現代<rt>げんだい</rt></ruby><ruby>的<rt>てき</rt></ruby>なインストゥルメンタル<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>く<ruby>愛好<rt>あいこう</rt></ruby>しています。","default_answer_original":"ジャズやクラシックの要素を取り入れた現代的なインストゥルメンタル音楽を深く愛好しています。"},{"category":"Hobby","text":"<ruby>最近<rt>さいきん</rt></ruby>読んだ本や<ruby>記事<rt>きじ</rt></ruby>の中で、<ruby>特<rt>とく</rt></ruby>に考えさせられた<ruby>作品<rt>さくひん</rt></ruby>は何ですか。","audio":"/audio/Q338.mp3","text_original":"最近読んだ本や記事の中で、特に考えさせられた作品は何ですか。","defaultAnswer":"<ruby>人工<rt>じんこう</rt></ruby><ruby>知能<rt>ちのう</rt></ruby>の<ruby>倫理<rt>りんり</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>課題<rt>かだい</rt></ruby>を<ruby>扱<rt>あつか</rt></ruby>った<ruby>専門<rt>せんもん</rt></ruby>書を読み、テクノロジーと人間の<ruby>共生<rt>きょうせい</rt></ruby>について<ruby>深<rt>ふか</rt></ruby>く考えさせられました。","default_answer_original":"人工知能の倫理的課題を扱った専門書を読み、テクノロジーと人間の共生について深く考えさせられました。"},{"category":"Hobby","text":"どのような<ruby>種類<rt>しゅるい</rt></ruby>の<ruby>映画<rt>えいが</rt></ruby>に<ruby>惹<rt>ひ</rt></ruby>かれますか。<ruby>印象<rt>いんしょう</rt></ruby>に<ruby>残<rt>のこ</rt></ruby>っている<ruby>作品<rt>さくひん</rt></ruby>を教えてください。","audio":"/audio/Q339.mp3","text_original":"どのような種類の映画に惹かれますか。印象に残っている作品を教えてください。","defaultAnswer":"社会<ruby>的<rt>てき</rt></ruby>メッセージ<ruby>性<rt>せい</rt></ruby>の高いドキュメンタリー<ruby>映画<rt>えいが</rt></ruby>や、<ruby>緻密<rt>ちみつ</rt></ruby>な<ruby>構成<rt>こうせい</rt></ruby>のヒューマンドラマに強く<ruby>惹<rt>ひ</rt></ruby>かれます。","default_answer_original":"社会的メッセージ性の高いドキュメンタリー映画や、緻密な構成のヒューマンドラマに強く惹かれます。"},{"category":"Hobby","text":"<ruby>忙<rt>いそが</rt></ruby>しい<ruby>日常<rt>にちじょう</rt></ruby>の中で、<ruby>趣味<rt>しゅみ</rt></ruby>のための時間をどのように<ruby>確保<rt>かくほ</rt></ruby>していますか。","audio":"/audio/Q340.mp3","text_original":"忙しい日常の中で、趣味のための時間をどのように確保していますか。","defaultAnswer":"スケジュールを<ruby>厳密<rt>げんみつ</rt></ruby>に<ruby>管理<rt>かんり</rt></ruby>し、毎日の生活の中に<ruby>一定<rt>いってい</rt></ruby>のフリータイムを<ruby>意図<rt>いと</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>組み込<rt>くみこ</rt></ruby>んでいます。","default_answer_original":"スケジュールを厳密に管理し、毎日の生活の中に一定のフリータイムを意図的に組み込んでいます。"},{"category":"Hobby","text":"その<ruby>趣味<rt>しゅみ</rt></ruby>に<ruby>興味<rt>きょうみ</rt></ruby>を持ったきっかけや、始めた<ruby>経緯<rt>けいい</rt></ruby>について教えてください。","audio":"/audio/Q341.mp3","text_original":"その趣味に興味を持ったきっかけや、始めた経緯について教えてください。","defaultAnswer":"<ruby>視覚<rt>しかく</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>表現<rt>ひょうげん</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて自分の<ruby>内面<rt>ないめん</rt></ruby><ruby>世界<rt>せかい</rt></ruby>を<ruby>表現<rt>ひょうげん</rt></ruby>したいという思いから、<ruby>独学<rt>どくがく</rt></ruby>で<ruby>映像<rt>えいぞう</rt></ruby><ruby>制作<rt>せいさく</rt></ruby>を始めました。","default_answer_original":"視覚的な表現を通じて自分の内面世界を表現したいという思いから、独学で映像制作を始めました。"},{"category":"Hobby","text":"<ruby>共通<rt>きょうつう</rt></ruby>の<ruby>趣味<rt>しゅみ</rt></ruby>を持つ友人と、どのような時間を<ruby>共有<rt>きょうゆう</rt></ruby>して楽しんでいますか。","audio":"/audio/Q342.mp3","text_original":"共通の趣味を持つ友人と、どのような時間を共有して楽しんでいますか。","defaultAnswer":"<ruby>撮影<rt>さつえい</rt></ruby>した<ruby>素材<rt>そざい</rt></ruby>を<ruby>持ち寄<rt>もちよ</rt></ruby>り、<ruby>お互<rt>おたが</rt></ruby>いの<ruby>作品<rt>さくひん</rt></ruby>の<ruby>演出<rt>えんしゅつ</rt></ruby><ruby>方法<rt>ほうほう</rt></ruby>や<ruby>技術<rt>ぎじゅつ</rt></ruby>について<ruby>建設<rt>けんせつ</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>意見<rt>いけん</rt></ruby><ruby>交換<rt>こうかん</rt></ruby>を行っています。","default_answer_original":"撮影した素材を持ち寄り、お互いの作品の演出方法や技術について建設的な意見交換を行っています。"},{"category":"Hobby","text":"<ruby>普段<rt>ふだん</rt></ruby>インターネットや<ruby>動画<rt>どうが</rt></ruby><ruby>配信<rt>はいしん</rt></ruby>サービスで、どのようなコンテンツをチェックしていますか。","audio":"/audio/Q343.mp3","text_original":"普段インターネットや動画配信サービスで、どのようなコンテンツをチェックしていますか。","defaultAnswer":"<ruby>世界<rt>せかい</rt></ruby>のニュース<ruby>解説<rt>かいせつ</rt></ruby>や、<ruby>最先端<rt>さいせんたん</rt></ruby>の<ruby>科学<rt>かがく</rt></ruby><ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>に関<rt>にかん</rt></ruby>するドキュメンタリー<ruby>番組<rt>ばんぐみ</rt></ruby>を好んで<ruby>視聴<rt>しちょう</rt></ruby>しています。","default_answer_original":"世界のニュース解説や、最先端の科学技術に関するドキュメンタリー番組を好んで視聴しています。"},{"category":"Hobby","text":"<ruby>将来<rt>しょうらい</rt></ruby><ruby>的<rt>てき</rt></ruby>に新しく<ruby>挑戦<rt>ちょうせん</rt></ruby>してみたい<ruby>趣味<rt>しゅみ</rt></ruby>や、<ruby>深<rt>ふか</rt></ruby>めてみたい<ruby>分野<rt>ぶんや</rt></ruby>はありますか。","audio":"/audio/Q344.mp3","text_original":"将来的に新しく挑戦してみたい趣味や、深めてみたい分野はありますか。","defaultAnswer":"<ruby>他国<rt>たこく</rt></ruby>の言語や<ruby>文化<rt>ぶんか</rt></ruby>をさらに<ruby>深<rt>ふか</rt></ruby>く<ruby>理解<rt>りかい</rt></ruby>するため、<ruby>第<rt>だい</rt></ruby>3外国語の<ruby>習得<rt>しゅうとく</rt></ruby>や<ruby>異<rt>い</rt></ruby><ruby>文化<rt>ぶんか</rt></ruby><ruby>交流<rt>こうりゅう</rt></ruby>プログラムに<ruby>挑戦<rt>ちょうせん</rt></ruby>したいです。","default_answer_original":"他国の言語や文化をさらに深く理解するため、第3外国語の習得や異文化交流プログラムに挑戦したいです。"},{"category":"Part time Job","text":"<ruby>現在<rt>げんざい</rt></ruby>、どのような<ruby>業界<rt>ぎょうかい</rt></ruby>や<ruby>職種<rt>しょくしゅ</rt></ruby>でアルバイトをなさっていますか。","audio":"/audio/Q345.mp3","text_original":"現在、どのような業界や職種でアルバイトをなさっていますか。","defaultAnswer":"<ruby>教育<rt>きょういく</rt></ruby><ruby>関連<rt>かんれん</rt></ruby>のサポート<ruby>業務<rt>ぎょうむ</rt></ruby>、あるいは<ruby>専門<rt>せんもん</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>知識<rt>ちしき</rt></ruby>が活かせる書店でアルバイトをしています。","default_answer_original":"教育関連のサポート業務、あるいは専門的な知識が活かせる書店でアルバイトをしています。"},{"category":"Part time Job","text":"<ruby>勤務<rt>きんむ</rt></ruby>先の<ruby>店舗<rt>てんぽ</rt></ruby>や<ruby>企業<rt>きぎょう</rt></ruby>の<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>特徴<rt>とくちょう</rt></ruby>や<ruby>業務<rt>ぎょうむ</rt></ruby><ruby>内容<rt>ないよう</rt></ruby>を教えてください。","audio":"/audio/Q346.mp3","text_original":"勤務先の店舗や企業の具体的な特徴や業務内容を教えてください。","defaultAnswer":"<ruby>顧客<rt>こきゃく</rt></ruby>一人ひとりに<ruby>寄り添<rt>よりそ</rt></ruby>った<ruby>質<rt>しつ</rt></ruby>の高いサービスを<ruby>提供<rt>ていきょう</rt></ruby>することを<ruby>最<rt>さい</rt></ruby><ruby>優先<rt>ゆうせん</rt></ruby>としている<ruby>職場<rt>しょくば</rt></ruby>です。","default_answer_original":"顧客一人ひとりに寄り添った質の高いサービスを提供することを最優先としている職場です。"},{"category":"Part time Job","text":"<ruby>職場<rt>しょくば</rt></ruby>では、<ruby>主<rt>おも</rt></ruby>にどのような<ruby>責任<rt>せきにん</rt></ruby>や<ruby>役割<rt>やくわり</rt></ruby>を<ruby>任<rt>まか</rt></ruby>されていますか。","audio":"/audio/Q347.mp3","text_original":"職場では、主にどのような責任や役割を任されていますか。","defaultAnswer":"<ruby>在庫<rt>ざいこ</rt></ruby>の<ruby>管理<rt>かんり</rt></ruby>や、<ruby>新規<rt>しんき</rt></ruby><ruby>顧客<rt>こきゃく</rt></ruby>への<ruby>案内<rt>あんない</rt></ruby><ruby>業務<rt>ぎょうむ</rt></ruby>など、<ruby>信頼<rt>しんらい</rt></ruby>を<ruby>要<rt>よう</rt></ruby>する<ruby>重要<rt>じゅうよう</rt></ruby>なタスクを<ruby>任<rt>まか</rt></ruby>されています。","default_answer_original":"在庫の管理や、新規顧客への案内業務など、信頼を要する重要なタスクを任されています。"},{"category":"Part time Job","text":"<ruby>学業<rt>がくぎょう</rt></ruby>と<ruby>両立<rt>りょうりつ</rt></ruby>させながら、週にどの<ruby>程度<rt>ていど</rt></ruby>のペースで<ruby>勤務<rt>きんむ</rt></ruby>していますか。","audio":"/audio/Q348.mp3","text_original":"学業と両立させながら、週にどの程度のペースで勤務していますか。","defaultAnswer":"<ruby>学業<rt>がくぎょう</rt></ruby>に<ruby>支障<rt>ししょう</rt></ruby>が出ないよう、<ruby>週末<rt>しゅうまつ</rt></ruby>のみに<ruby>限定<rt>げんてい</rt></ruby>して週八時間ほどのペースで<ruby>勤務<rt>きんむ</rt></ruby>を<ruby>維持<rt>いじ</rt></ruby>しています。","default_answer_original":"学業に支障が出ないよう、週末のみに限定して週八時間ほどのペースで勤務を維持しています。"},{"category":"Part time Job","text":"<ruby>勤務<rt>きんむ</rt></ruby>のスケジュールやシフトは、どのように<ruby>決定<rt>けってい</rt></ruby>されていますか。","audio":"/audio/Q349.mp3","text_original":"勤務のスケジュールやシフトは、どのように決定されていますか。","defaultAnswer":"テスト<ruby>期間<rt>きかん</rt></ruby>や学校の行事を<ruby>考慮<rt>こうりょ</rt></ruby>し、マネージャーと事前に十分な<ruby>相談<rt>そうだん</rt></ruby>の上で<ruby>決定<rt>けってい</rt></ruby>しています。","default_answer_original":"テスト期間や学校の行事を考慮し、マネージャーと事前に十分な相談の上で決定しています。"},{"category":"Part time Job","text":"アルバイトを行う中で、<ruby>最<rt>もっと</rt></ruby>もやりがいを<ruby>感<rt>かん</rt></ruby>じる<ruby>瞬間<rt>しゅんかん</rt></ruby>や<ruby>苦労<rt>くろう</rt></ruby>する<ruby>場面<rt>ばめん</rt></ruby>は何ですか。","audio":"/audio/Q350.mp3","text_original":"アルバイトを行う中で、最もやりがいを感じる瞬間や苦労する場面は何ですか。","defaultAnswer":"自分の<ruby>対応<rt>たいおう</rt></ruby>によって<ruby>顧客<rt>こきゃく</rt></ruby>が<ruby>満足<rt>まんぞく</rt></ruby>してくれたときに<ruby>最大<rt>さいだい</rt></ruby>のやりがいを<ruby>感<rt>かん</rt></ruby>じ、<ruby>繁忙<rt>はんぼう</rt></ruby><ruby>期<rt>き</rt></ruby>の<ruby>対応<rt>たいおう</rt></ruby>に<ruby>苦労<rt>くろう</rt></ruby>します。","default_answer_original":"自分の対応によって顧客が満足してくれたときに最大のやりがいを感じ、繁忙期の対応に苦労します。"},{"category":"Part time Job","text":"アルバイトで<ruby>得<rt>え</rt></ruby>た<ruby>収入<rt>しゅうにゅう</rt></ruby>は、<ruby>主<rt>おも</rt></ruby>にどのような<ruby>目的<rt>もくてき</rt></ruby>で<ruby>管理<rt>かんり</rt></ruby>、<ruby>使用<rt>しよう</rt></ruby>していますか。","audio":"/audio/Q351.mp3","text_original":"アルバイトで得た収入は、主にどのような目的で管理、使用していますか。","defaultAnswer":"<ruby>将来<rt>しょうらい</rt></ruby>の自立<ruby>資金<rt>しきん</rt></ruby>と<ruby>教育<rt>きょういく</rt></ruby><ruby>費<rt>ひ</rt></ruby>として<ruby>計画<rt>けいかく</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>貯蓄<rt>ちょちく</rt></ruby>し、<ruby>一部<rt>いちぶ</rt></ruby>を<ruby>自己<rt>じこ</rt></ruby><ruby>投資<rt>とうし</rt></ruby>や<ruby>書籍<rt>しょせき</rt></ruby>の<ruby>購入<rt>こうにゅう</rt></ruby>にあてています。","default_answer_original":"将来の自立資金と教育費として計画的に貯蓄し、一部を自己投資や書籍の購入にあてています。"},{"category":"Part time Job","text":"<ruby>職場<rt>しょくば</rt></ruby>の人間<ruby>関係<rt>かんけい</rt></ruby>やチームワークの<ruby>雰囲気<rt>ふんいき</rt></ruby>はいかがですか。","audio":"/audio/Q352.mp3","text_original":"職場の人間関係やチームワークの雰囲気はいかがですか。","defaultAnswer":"<ruby>世代<rt>せだい</rt></ruby>を<ruby>超<rt>こ</rt></ruby>えたスタッフ<ruby>同士<rt>どうし</rt></ruby>が<ruby>互<rt>たが</rt></ruby>いを<ruby>尊重<rt>そんちょう</rt></ruby>し<ruby>合<rt>あ</rt></ruby>い、<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>良好<rt>りょうこう</rt></ruby>なチームワークが<ruby>築<rt>きず</rt></ruby>かれています。","default_answer_original":"世代を超えたスタッフ同士が互いを尊重し合い、非常に良好なチームワークが築かれています。"},{"category":"Part time Job","text":"<ruby>数<rt>かず</rt></ruby>あるアルバイトの中から、<ruby>現在<rt>げんざい</rt></ruby>の仕事を<ruby>選<rt>えら</rt></ruby>んだ<ruby>理由<rt>りゆう</rt></ruby>は何ですか。","audio":"/audio/Q353.mp3","text_original":"数あるアルバイトの中から、現在の仕事を選んだ理由は何ですか。","defaultAnswer":"<ruby>単<rt>たん</rt></ruby>なる<ruby>金銭<rt>きんせん</rt></ruby><ruby>目的<rt>もくてき</rt></ruby>ではなく、<ruby>将来<rt>しょうらい</rt></ruby>のキャリア<ruby>形成<rt>けいせい</rt></ruby>に<ruby>直結<rt>ちょっけつ</rt></ruby>する<ruby>対人<rt>たいじん</rt></ruby>スキルや<ruby>実務<rt>じつむ</rt></ruby><ruby>経験<rt>けいけん</rt></ruby>が<ruby>積<rt>つ</rt></ruby>めるからです。","default_answer_original":"単なる金銭目的ではなく、将来のキャリア形成に直結する対人スキルや実務経験が積めるからです。"},{"category":"Part time Job","text":"アルバイトでの<ruby>実務<rt>じつむ</rt></ruby><ruby>経験<rt>けいけん</rt></ruby>は、<ruby>将来<rt>しょうらい</rt></ruby>の社会人生活にどう<ruby>影響<rt>えいきょう</rt></ruby>すると思いますか。","audio":"/audio/Q354.mp3","text_original":"アルバイトでの実務経験は、将来の社会人生活にどう影響すると思いますか。","defaultAnswer":"<ruby>責任<rt>せきにん</rt></ruby><ruby>感<rt>かん</rt></ruby>や<ruby>臨機応変<rt>りんきおうへん</rt></ruby>な<ruby>問題<rt>もんだい</rt></ruby><ruby>解決<rt>かいけつ</rt></ruby><ruby>能力<rt>のうりょく</rt></ruby>など、学校の<ruby>授業<rt>じゅぎょう</rt></ruby>だけでは<ruby>得<rt>え</rt></ruby>られない<ruby>貴重<rt>きちょう</rt></ruby>な学びとなっています。","default_answer_original":"責任感や臨機応変な問題解決能力など、学校の授業だけでは得られない貴重な学びとなっています。"},{"category":"Japanese Study","text":"日本語の学習を<ruby>本格<rt>ほんかく</rt></ruby><ruby>的<rt>てき</rt></ruby>に始めようと考えたきっかけや<ruby>目的<rt>もくてき</rt></ruby>は何ですか。","audio":"/audio/Q355.mp3","text_original":"日本語の学習を本格的に始めようと考えたきっかけや目的は何ですか。","defaultAnswer":"<ruby>単<rt>たん</rt></ruby>なる言語の<ruby>習得<rt>しゅうとく</rt></ruby>を<ruby>超<rt>こ</rt></ruby>えて、日本<ruby>独自<rt>どくじ</rt></ruby>の<ruby>深<rt>ふか</rt></ruby>い<ruby>文化<rt>ぶんか</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>背景<rt>はいけい</rt></ruby>や<ruby>哲学<rt>てつがく</rt></ruby>を<ruby>直接<rt>ちょくせつ</rt></ruby><ruby>理解<rt>りかい</rt></ruby>したいと考えたためです。","default_answer_original":"単なる言語の習得を超えて、日本独自の深い文化的背景や哲学を直接理解したいと考えたためです。"},{"category":"Japanese Study","text":"日本語を学んでいる中で、どのような<ruby>瞬間<rt>しゅんかん</rt></ruby>に<ruby>達成<rt>たっせい</rt></ruby><ruby>感<rt>かん</rt></ruby>や<ruby>面白<rt>おもしろ</rt></ruby>さを<ruby>感<rt>かん</rt></ruby>じますか。","audio":"/audio/Q356.mp3","text_original":"日本語を学んでいる中で、どのような瞬間に達成感や面白さを感じますか。","defaultAnswer":"<ruby>複雑<rt>ふくざつ</rt></ruby>な<ruby>構造<rt>こうぞう</rt></ruby>の長文を<ruby>自力<rt>じりき</rt></ruby>で<ruby>読解<rt>どっかい</rt></ruby>できたり、自分の<ruby>意見<rt>いけん</rt></ruby>を<ruby>正確<rt>せいかく</rt></ruby>に<ruby>表現<rt>ひょうげん</rt></ruby>できたりしたときに<ruby>感<rt>かん</rt></ruby>じます。","default_answer_original":"複雑な構造の長文を自力で読解できたり、自分の意見を正確に表現できたりしたときに感じます。"},{"category":"Japanese Study","text":"<ruby>語彙<rt>ごい</rt></ruby>、<ruby>文法<rt>ぶんぽう</rt></ruby>、会話などの<ruby>要素<rt>ようそ</rt></ruby>のうち、<ruby>特<rt>とく</rt></ruby>に<ruby>壁<rt>かべ</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じる<ruby>部分<rt>ぶぶん</rt></ruby>はどこですか。","audio":"/audio/Q357.mp3","text_original":"語彙、文法、会話などの要素のうち、特に壁を感じる部分はどこですか。","defaultAnswer":"<ruby>論理<rt>ろんり</rt></ruby><ruby>的<rt>てき</rt></ruby>なディスカッションにおいて、<ruby>場面<rt>ばめん</rt></ruby>に<ruby>応<rt>おう</rt></ruby>じた<ruby>適切<rt>てきせつ</rt></ruby>な<ruby>敬語<rt>けいご</rt></ruby>や<ruby>高度<rt>こうど</rt></ruby>な<ruby>抽象<rt>ちゅうしょう</rt></ruby>語を使い分ける点です。","default_answer_original":"論理的なディスカッションにおいて、場面に応じた適切な敬語や高度な抽象語を使い分ける点です。"},{"category":"Japanese Study","text":"<ruby>効率<rt>こうりつ</rt></ruby><ruby>的<rt>てき</rt></ruby>に日本語<ruby>能力<rt>のうりょく</rt></ruby>を<ruby>向上<rt>こうじょう</rt></ruby>させるために、<ruby>日頃<rt>ひごろ</rt></ruby>どのような学習<ruby>法<rt>ほう</rt></ruby>を<ruby>工夫<rt>くふう</rt></ruby>していますか。","audio":"/audio/Q358.mp3","text_original":"効率的に日本語能力を向上させるために、日頃どのような学習法を工夫していますか。","defaultAnswer":"メディアの<ruby>活用<rt>かつよう</rt></ruby>や、ネイティブとの<ruby>実践<rt>じっせん</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>対話<rt>たいわ</rt></ruby><ruby>を通<rt>をとお</rt></ruby>して、生きた<ruby>表現<rt>ひょうげん</rt></ruby>を<ruby>継続<rt>けいぞく</rt></ruby><ruby>的<rt>てき</rt></ruby>にインプットしています。","default_answer_original":"メディアの活用や、ネイティブとの実践的な対話を通して、生きた表現を継続的にインプットしています。"},{"category":"Japanese Study","text":"日本のポップカルチャー、アニメ、マンガ、<ruby>映画<rt>えいが</rt></ruby><ruby>等<rt>とう</rt></ruby>、の中で、お気に入りの<ruby>作品<rt>さくひん</rt></ruby>とその<ruby>魅力<rt>みりょく</rt></ruby>は何ですか。","audio":"/audio/Q359.mp3","text_original":"日本のポップカルチャー、アニメ、マンガ、映画等、の中で、お気に入りの作品とその魅力は何ですか。","defaultAnswer":"社会<ruby>風刺<rt>ふうし</rt></ruby>や人間の<ruby>内面<rt>ないめん</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>く<ruby>描<rt>えが</rt></ruby>いた<ruby>宮崎<rt>みやざき</rt></ruby><ruby>駿<rt>しゅん</rt></ruby><ruby>監督<rt>かんとく</rt></ruby>の<ruby>作品<rt>さくひん</rt></ruby><ruby>群<rt>ぐん</rt></ruby>に、<ruby>普遍<rt>ふへん</rt></ruby><ruby>的<rt>てき</rt></ruby>なメッセージ<ruby>性<rt>せい</rt></ruby>と<ruby>美<rt>うつく</rt></ruby>しさを<ruby>感<rt>かん</rt></ruby>じます。","default_answer_original":"社会風刺や人間の内面を深く描いた宮崎駿監督の作品群に、普遍的なメッセージ性と美しさを感じます。"},{"category":"Japanese Study","text":"これまでに学んだ漢字や<ruby>表現<rt>ひょうげん</rt></ruby>の中で、<ruby>特<rt>とく</rt></ruby>に<ruby>美<rt>うつく</rt></ruby>しいまたは<ruby>面白<rt>おもしろ</rt></ruby>いと<ruby>感<rt>かん</rt></ruby>じたものは何ですか。","audio":"/audio/Q360.mp3","text_original":"これまでに学んだ漢字や表現の中で、特に美しいまたは面白いと感じたものは何ですか。","defaultAnswer":"「<ruby>一期一会<rt>いちごいちえ</rt></ruby>」という<ruby>言葉<rt>ことば</rt></ruby>です。その<ruby>瞬間<rt>しゅんかん</rt></ruby>の出会いの<ruby>尊<rt>とうと</rt></ruby>さを<ruby>表<rt>あらわ</rt></ruby>す<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>深<rt>ふか</rt></ruby>い<ruby>意味<rt>いみ</rt></ruby>に<ruby>感銘<rt>かんめい</rt></ruby>を<ruby>受<rt>う</rt></ruby>けました。","default_answer_original":"「一期一会」という言葉です。その瞬間の出会いの尊さを表す非常に深い意味に感銘を受けました。"},{"category":"Japanese Study","text":"<ruby>担当<rt>たんとう</rt></ruby>の先生は、<ruby>授業<rt>じゅぎょう</rt></ruby><ruby>内容<rt>ないよう</rt></ruby>を<ruby>理解<rt>りかい</rt></ruby>しやすくするためにどのような<ruby>工夫<rt>くふう</rt></ruby>をされていますか。","audio":"/audio/Q361.mp3","text_original":"担当の先生は、授業内容を理解しやすくするためにどのような工夫をされていますか。","defaultAnswer":"<ruby>実際<rt>じっさい</rt></ruby>の社会<ruby>的<rt>てき</rt></ruby>トピックを<ruby>題材<rt>だいざい</rt></ruby>に<ruby>扱<rt>あつか</rt></ruby>い、<ruby>生徒<rt>せいと</rt></ruby>が<ruby>主体<rt>しゅたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>議論<rt>ぎろん</rt></ruby>に<ruby>参加<rt>さんか</rt></ruby>できるインタラクティブな<ruby>授業<rt>じゅぎょう</rt></ruby>を<ruby>展開<rt>てんかい</rt></ruby>してくれます。","default_answer_original":"実際の社会的トピックを題材に扱い、生徒が主体的に議論に参加できるインタラクティブな授業を展開してくれます。"},{"category":"Japanese Study","text":"自分の<ruby>意見<rt>いけん</rt></ruby>や<ruby>感情<rt>かんじょう</rt></ruby>を日本語でスムーズに<ruby>表現<rt>ひょうげん</rt></ruby>するために、<ruby>意識<rt>いしき</rt></ruby>していることはありますか。","audio":"/audio/Q362.mp3","text_original":"自分の意見や感情を日本語でスムーズに表現するために、意識していることはありますか。","defaultAnswer":"<ruby>単<rt>たん</rt></ruby>に<ruby>単語<rt>たんご</rt></ruby>を<ruby>並<rt>なら</rt></ruby>べるのではなく、前後の<ruby>文脈<rt>ぶんみゃく</rt></ruby>や<ruby>論理<rt>ろんり</rt></ruby><ruby>的<rt>てき</rt></ruby>つながりを<ruby>意識<rt>いしき</rt></ruby>して<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>構築<rt>こうちく</rt></ruby>するように<ruby>努<rt>つと</rt></ruby>めています。","default_answer_original":"単に単語を並べるのではなく、前後の文脈や論理的つながりを意識して文章を構築するように努めています。"},{"category":"Japanese Study","text":"母語<ruby>話者<rt>わしゃ</rt></ruby>、ネイティブ、の方と日本語でコミュニケーションを<ruby>取<rt>と</rt></ruby>った<ruby>経験<rt>けいけん</rt></ruby>について教えてください。","audio":"/audio/Q363.mp3","text_original":"母語話者、ネイティブ、の方と日本語でコミュニケーションを取った経験について教えてください。","defaultAnswer":"<ruby>留学生<rt>りゅうがくせい</rt></ruby>との<ruby>交流<rt>こうりゅう</rt></ruby>会で、<ruby>お互<rt>おたが</rt></ruby>いの<ruby>文化<rt>ぶんか</rt></ruby>の<ruby>違<rt>ちが</rt></ruby>いについて<ruby>意見<rt>いけん</rt></ruby>を<ruby>交<rt>か</rt></ruby>わし、<ruby>非常<rt>ひじょう</rt></ruby>に<ruby>刺激<rt>しげき</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>体験<rt>たいけん</rt></ruby>となりました。","default_answer_original":"留学生との交流会で、お互いの文化の違いについて意見を交わし、非常に刺激的な体験となりました。"},{"category":"Japanese Study","text":"<ruby>習得<rt>しゅうとく</rt></ruby>した日本語<ruby>能力<rt>のうりょく</rt></ruby>を活かして、<ruby>将来<rt>しょうらい</rt></ruby>どのように社会や<ruby>自身<rt>じしん</rt></ruby>の<ruby>目標<rt>もくひょう</rt></ruby>に<ruby>貢献<rt>こうけん</rt></ruby>したいですか。","audio":"/audio/Q364.mp3","text_original":"習得した日本語能力を活かして、将来どのように社会や自身の目標に貢献したいですか。","defaultAnswer":"<ruby>国際<rt>こくさい</rt></ruby><ruby>的<rt>てき</rt></ruby>なプロジェクトに<ruby>参画<rt>さんかく</rt></ruby>し、言語の<ruby>壁<rt>かべ</rt></ruby>を<ruby>越<rt>こ</rt></ruby>えた<ruby>相互<rt>そうご</rt></ruby><ruby>理解<rt>りかい</rt></ruby>と<ruby>協力<rt>きょうりょく</rt></ruby>を<ruby>促進<rt>そくしん</rt></ruby>する<ruby>役割<rt>やくわり</rt></ruby>を<ruby>担<rt>にな</rt></ruby>いたいです。","default_answer_original":"国際的なプロジェクトに参画し、言語の壁を越えた相互理解と協力を促進する役割を担いたいです。"},{"category":"Sports","text":"スポーツを自らプレイすること、または<ruby>観戦<rt>かんせん</rt></ruby>すること<ruby>に対<rt>にたい</rt></ruby>してどのように<ruby>感<rt>かん</rt></ruby>じていますか。","audio":"/audio/Q365.mp3","text_original":"スポーツを自らプレイすること、または観戦することに対してどのように感じていますか。","defaultAnswer":"自ら<ruby>挑戦<rt>ちょうせん</rt></ruby>して<ruby>心身<rt>しんしん</rt></ruby>を<ruby>鍛錬<rt>たんれん</rt></ruby>する<ruby>充実<rt>じゅうじつ</rt></ruby><ruby>感<rt>かん</rt></ruby>と、トップアスリートの<ruby>卓越<rt>たくえつ</rt></ruby>した<ruby>技<rt>わざ</rt></ruby>を<ruby>観<rt>み</rt></ruby>る<ruby>感動<rt>かんどう</rt></ruby>の<ruby>両方<rt>りょうほう</rt></ruby>に<ruby>価値<rt>かち</rt></ruby>を見出しています。","default_answer_original":"自ら挑戦して心身を鍛錬する充実感と、トップアスリートの卓越した技を観る感動の両方に価値を見出しています。"},{"category":"Sports","text":"<ruby>健康<rt>けんこう</rt></ruby><ruby>維持<rt>いじ</rt></ruby>やリフレッシュのために、<ruby>日頃<rt>ひごろ</rt></ruby>どのような<ruby>運動<rt>うんどう</rt></ruby>を<ruby>取り入<rt>とりい</rt></ruby>れていますか。","audio":"/audio/Q366.mp3","text_original":"健康維持やリフレッシュのために、日頃どのような運動を取り入れていますか。","defaultAnswer":"毎日の<ruby>規則正<rt>きそくただ</rt></ruby>しいウォーキングや、<ruby>週末<rt>しゅうまつ</rt></ruby>のジョギングをライフスタイルの<ruby>一部<rt>いちぶ</rt></ruby>として<ruby>取り入<rt>とりい</rt></ruby>れています。","default_answer_original":"毎日の規則正しいウォーキングや、週末のジョギングをライフスタイルの一部として取り入れています。"},{"category":"Sports","text":"クラブ活動やスポーツチームに<ruby>所属<rt>しょぞく</rt></ruby>して活動した<ruby>経験<rt>けいけん</rt></ruby>はありますか。","audio":"/audio/Q367.mp3","text_original":"クラブ活動やスポーツチームに所属して活動した経験はありますか。","defaultAnswer":"学生<ruby>時代<rt>じだい</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて学校の<ruby>陸上<rt>りくじょう</rt></ruby><ruby>競技<rt>きょうぎ</rt></ruby>チームに<ruby>所属<rt>しょぞく</rt></ruby>し、<ruby>規律<rt>きりつ</rt></ruby>と<ruby>忍耐<rt>にんたい</rt></ruby><ruby>力<rt>りょく</rt></ruby>を<ruby>培<rt>つちか</rt></ruby>いました。","default_answer_original":"学生時代を通じて学校の陸上競技チームに所属し、規律と忍耐力を培いました。"},{"category":"Sports","text":"休日に体を動かす<ruby>際<rt>さい</rt></ruby>、<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>にどのようなアクティビティを好みますか。","audio":"/audio/Q368.mp3","text_original":"休日に体を動かす際、具体的にどのようなアクティビティを好みますか。","defaultAnswer":"<ruby>自然<rt>しぜん</rt></ruby><ruby>豊<rt>ゆた</rt></ruby>かなトレイルコースをハイキングしたり、<ruby>開放<rt>かいほう</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>環境<rt>かんきょう</rt></ruby>でサイクリングを楽しんだりします。","default_answer_original":"自然豊かなトレイルコースをハイキングしたり、開放的な環境でサイクリングを楽しんだりします。"},{"category":"Sports","text":"<ruby>尊敬<rt>そんけい</rt></ruby>しているスポーツ<ruby>選手<rt>せんしゅ</rt></ruby>や、<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>受<rt>う</rt></ruby>けたアスリートについて教えてください。","audio":"/audio/Q369.mp3","text_original":"尊敬しているスポーツ選手や、影響を受けたアスリートについて教えてください。","defaultAnswer":"<ruby>逆境<rt>ぎゃっきょう</rt></ruby>に<ruby>屈<rt>くっ</rt></ruby>せず<ruby>常<rt>つね</rt></ruby>に<ruby>挑戦<rt>ちょうせん</rt></ruby>し<ruby>続<rt>つづ</rt></ruby>けるプロスポーツ<ruby>選手<rt>せんしゅ</rt></ruby>の、強い<ruby>精神<rt>せいしん</rt></ruby><ruby>力<rt>りょく</rt></ruby>とプロ<ruby>意識<rt>いしき</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>く<ruby>尊敬<rt>そんけい</rt></ruby>しています。","default_answer_original":"逆境に屈せず常に挑戦し続けるプロスポーツ選手の、強い精神力とプロ意識を深く尊敬しています。"},{"category":"Sports","text":"長年<ruby>続<rt>つづ</rt></ruby>けているスポーツや、<ruby>自信<rt>じしん</rt></ruby>を持って<ruby>得意<rt>とくい</rt></ruby>だと言える<ruby>種目<rt>しゅもく</rt></ruby>はありますか。","audio":"/audio/Q370.mp3","text_original":"長年続けているスポーツや、自信を持って得意だと言える種目はありますか。","defaultAnswer":"長年<ruby>鍛錬<rt>たんれん</rt></ruby>を<ruby>重<rt>かさ</rt></ruby>ねてきた中<ruby>長距離<rt>ちょうきょり</rt></ruby><ruby>走<rt>はし</rt></ruby>において、<ruby>自己<rt>じこ</rt></ruby><ruby>管理<rt>かんり</rt></ruby><ruby>能力<rt>のうりょく</rt></ruby>と<ruby>持久<rt>じきゅう</rt></ruby><ruby>力<rt>りょく</rt></ruby>を<ruby>培<rt>つちか</rt></ruby>うことができました。","default_answer_original":"長年鍛錬を重ねてきた中長距離走において、自己管理能力と持久力を培うことができました。"},{"category":"Sports","text":"<ruby>自身<rt>じしん</rt></ruby>で<ruby>実際<rt>じっさい</rt></ruby>にプレイする楽しさと、<ruby>観客<rt>かんきゃく</rt></ruby>として<ruby>観戦<rt>かんせん</rt></ruby>する楽しさの<ruby>違<rt>ちが</rt></ruby>いは何だと思いますか。","audio":"/audio/Q371.mp3","text_original":"自身で実際にプレイする楽しさと、観客として観戦する楽しさの違いは何だと思いますか。","defaultAnswer":"<ruby>主体<rt>しゅたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>参加<rt>さんか</rt></ruby>して<ruby>得<rt>え</rt></ruby>られる<ruby>達成<rt>たっせい</rt></ruby><ruby>感<rt>かん</rt></ruby>と、<ruby>他者<rt>たしゃ</rt></ruby>のドラマチックな<ruby>挑戦<rt>ちょうせん</rt></ruby>に<ruby>共感<rt>きょうかん</rt></ruby>する<ruby>感動<rt>かんどう</rt></ruby>という<ruby>本質<rt>ほんしつ</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>違<rt>ちが</rt></ruby>いがあります。","default_answer_original":"主体的に参加して得られる達成感と、他者のドラマチックな挑戦に共感する感動という本質的な違いがあります。"},{"category":"Sports","text":"自国で<ruby>盛<rt>さか</rt></ruby>んなスポーツカルチャーについて、どのような<ruby>意見<rt>いけん</rt></ruby>をお持ちですか。","audio":"/audio/Q372.mp3","text_original":"自国で盛んなスポーツカルチャーについて、どのような意見をお持ちですか。","defaultAnswer":"スポーツが<ruby>地域<rt>ちいき</rt></ruby>コミュニティの<ruby>絆<rt>きずな</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>め、<ruby>健全<rt>けんぜん</rt></ruby>な社会を<ruby>形成<rt>けいせい</rt></ruby>する上で<ruby>極<rt>きわ</rt></ruby>めて<ruby>重要<rt>じゅうよう</rt></ruby>な<ruby>役割<rt>やくわり</rt></ruby>を<ruby>果<rt>は</rt></ruby>たしていると考えます。","default_answer_original":"スポーツが地域コミュニティの絆を深め、健全な社会を形成する上で極めて重要な役割を果たしていると考えます。"},{"category":"Sports","text":"<ruby>幼少<rt>ようしょう</rt></ruby><ruby>期<rt>き</rt></ruby>に習っていたスポーツや、<ruby>運動<rt>うんどう</rt></ruby><ruby>に関<rt>にかん</rt></ruby>する<ruby>思い出深<rt>おもいでぶか</rt></ruby>い出来事はありますか。","audio":"/audio/Q373.mp3","text_original":"幼少期に習っていたスポーツや、運動に関する思い出深い出来事はありますか。","defaultAnswer":"チーム<ruby>競技<rt>きょうぎ</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて、<ruby>仲間<rt>なかま</rt></ruby>と<ruby>協力<rt>きょうりょく</rt></ruby>して<ruby>困難<rt>こんなん</rt></ruby>を<ruby>乗り越<rt>のりこ</rt></ruby>えることの<ruby>大切<rt>たいせつ</rt></ruby>さを学んだことが<ruby>最大<rt>さいだい</rt></ruby>の<ruby>財産<rt>ざいさん</rt></ruby>です。","default_answer_original":"チーム競技を通じて、仲間と協力して困難を乗り越えることの大切さを学んだことが最大の財産です。"},{"category":"Sports","text":"今後、新たにスキルを<ruby>習得<rt>しゅうとく</rt></ruby>してみたいスポーツやアウトドア活動はありますか。","audio":"/audio/Q374.mp3","text_original":"今後、新たにスキルを習得してみたいスポーツやアウトドア活動はありますか。","defaultAnswer":"<ruby>自然<rt>しぜん</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>への<ruby>理解<rt>りかい</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>めるためにも、<ruby>本格<rt>ほんかく</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>登山<rt>とざん</rt></ruby>やカヤックなどのアウトドア活動に<ruby>挑戦<rt>ちょうせん</rt></ruby>したいです。","default_answer_original":"自然環境への理解を深めるためにも、本格的な登山やカヤックなどのアウトドア活動に挑戦したいです。"},{"category":"Travel","text":"旅行が持つ<ruby>魅力<rt>みりょく</rt></ruby>や、見知らぬ<ruby>土地<rt>とち</rt></ruby>を<ruby>訪<rt>おとず</rt></ruby>れることの<ruby>意義<rt>いぎ</rt></ruby>についてどう考えますか。","audio":"/audio/Q375.mp3","text_original":"旅行が持つ魅力や、見知らぬ土地を訪れることの意義についてどう考えますか。","defaultAnswer":"<ruby>既成<rt>きせい</rt></ruby><ruby>概念<rt>がいねん</rt></ruby>にとらわれた<ruby>視野<rt>しや</rt></ruby>を広げ、<ruby>多様<rt>たよう</rt></ruby>な<ruby>価値<rt>かち</rt></ruby><ruby>観<rt>かん</rt></ruby>や<ruby>文化<rt>ぶんか</rt></ruby>を<ruby>受け入<rt>うけい</rt></ruby>れる人間<ruby>的<rt>てき</rt></ruby>な<ruby>成長<rt>せいちょう</rt></ruby>の<ruby>機会<rt>きかい</rt></ruby>をもたらす点にあります。","default_answer_original":"既成概念にとらわれた視野を広げ、多様な価値観や文化を受け入れる人間的な成長の機会をもたらす点にあります。"},{"category":"Travel","text":"これまでに<ruby>訪<rt>おとず</rt></ruby>れた旅先の中で、<ruby>最<rt>もっと</rt></ruby>も<ruby>深<rt>ふか</rt></ruby>く<ruby>記憶<rt>きおく</rt></ruby>に<ruby>刻<rt>きざ</rt></ruby>まれている場所はどこですか。","audio":"/audio/Q376.mp3","text_original":"これまでに訪れた旅先の中で、最も深く記憶に刻まれている場所はどこですか。","defaultAnswer":"<ruby>歴史<rt>れきし</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>遺産<rt>いさん</rt></ruby>が多く<ruby>残<rt>のこ</rt></ruby>るアジアの<ruby>古代<rt>こだい</rt></ruby>都市を<ruby>訪<rt>おとず</rt></ruby>れた<ruby>際<rt>さい</rt></ruby>、その<ruby>圧倒的<rt>あっとうてき</rt></ruby>な<ruby>歴史<rt>れきし</rt></ruby>の<ruby>重<rt>おも</rt></ruby>みに<ruby>深<rt>ふか</rt></ruby>く<ruby>心<rt>こころ</rt></ruby>を<ruby>打<rt>う</rt></ruby>たれました。","default_answer_original":"歴史的遺産が多く残るアジアの古代都市を訪れた際、その圧倒的な歴史の重みに深く心を打たれました。"},{"category":"Travel","text":"<ruby>普段<rt>ふだん</rt></ruby>、旅行を<ruby>計画<rt>けいかく</rt></ruby>する<ruby>際<rt>さい</rt></ruby>はどなたと<ruby>一緒<rt>いっしょ</rt></ruby>に行動することが多いですか。","audio":"/audio/Q377.mp3","text_original":"普段、旅行を計画する際はどなたと一緒に行動することが多いですか。","defaultAnswer":"<ruby>共通<rt>きょうつう</rt></ruby>の<ruby>探求<rt>たんきゅう</rt></ruby><ruby>心<rt>しん</rt></ruby>を持つ家族や、同じ<ruby>目的<rt>もくてき</rt></ruby><ruby>意識<rt>いしき</rt></ruby>を持った学友たちと<ruby>綿密<rt>めんみつ</rt></ruby>な<ruby>計画<rt>けいかく</rt></ruby>を立てて行動します。","default_answer_original":"共通の探求心を持つ家族や、同じ目的意識を持った学友たちと綿密な計画を立てて行動します。"},{"category":"Travel","text":"<ruby>目的<rt>もくてき</rt></ruby><ruby>地<rt>ち</rt></ruby>に<ruby>到着<rt>とうちゃく</rt></ruby>した後は、どのような<ruby>観光<rt>かんこう</rt></ruby>スポットや<ruby>体験<rt>たいけん</rt></ruby>を<ruby>優先<rt>ゆうせん</rt></ruby>しますか。","audio":"/audio/Q378.mp3","text_original":"目的地に到着した後は、どのような観光スポットや体験を優先しますか。","defaultAnswer":"<ruby>画一<rt>かくいつ</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>観光<rt>かんこう</rt></ruby><ruby>地<rt>ち</rt></ruby><ruby>巡<rt>めぐ</rt></ruby>りよりも、その<ruby>地域<rt>ちいき</rt></ruby>の<ruby>伝統<rt>でんとう</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>暮<rt>く</rt></ruby>らしや食<ruby>文化<rt>ぶんか</rt></ruby>に<ruby>触<rt>ふ</rt></ruby>れられる場所を<ruby>優先<rt>ゆうせん</rt></ruby>します。","default_answer_original":"画一的な観光地巡りよりも、その地域の伝統的な暮らしや食文化に触れられる場所を優先します。"},{"category":"Travel","text":"旅先で出会った<ruby>地域<rt>ちいき</rt></ruby><ruby>固有<rt>こゆう</rt></ruby>の<ruby>伝統<rt>でんとう</rt></ruby><ruby>料理<rt>りょうり</rt></ruby>や食<ruby>文化<rt>ぶんか</rt></ruby>について、<ruby>印象<rt>いんしょう</rt></ruby><ruby>的<rt>てき</rt></ruby>なエピソードはありますか。","audio":"/audio/Q379.mp3","text_original":"旅先で出会った地域固有の伝統料理や食文化について、印象的なエピソードはありますか。","defaultAnswer":"<ruby>地元<rt>じもと</rt></ruby>の市場で食べた名物<ruby>料理<rt>りょうり</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて、その<ruby>土地<rt>とち</rt></ruby>の<ruby>気候<rt>きこう</rt></ruby><ruby>風土<rt>ふうど</rt></ruby>と人々の<ruby>知恵<rt>ちえ</rt></ruby>の<ruby>結<rt>むす</rt></ruby>びつきを<ruby>実感<rt>じっかん</rt></ruby>しました。","default_answer_original":"地元の市場で食べた名物料理を通じて、その土地の気候風土と人々の知恵の結びつきを実感しました。"},{"category":"Travel","text":"<ruby>一度<rt>いちど</rt></ruby><ruby>訪<rt>おとず</rt></ruby>れた場所の中で、「<ruby>将来<rt>しょうらい</rt></ruby><ruby>再訪<rt>さいほう</rt></ruby>したい」と<ruby>感<rt>かん</rt></ruby>じた場所とその<ruby>理由<rt>りゆう</rt></ruby>を教えてください。","audio":"/audio/Q380.mp3","text_original":"一度訪れた場所の中で、「将来再訪したい」と感じた場所とその理由を教えてください。","defaultAnswer":"<ruby>自然<rt>しぜん</rt></ruby>と<ruby>近代<rt>きんだい</rt></ruby>都市が<ruby>調和<rt>ちょうわ</rt></ruby>した<ruby>美<rt>うつく</rt></ruby>しい<ruby>景観<rt>けいかん</rt></ruby>を持つ都市へ<ruby>戻<rt>もど</rt></ruby>り、さらに<ruby>深<rt>ふか</rt></ruby>い<ruby>文化<rt>ぶんか</rt></ruby><ruby>体験<rt>たいけん</rt></ruby>を<ruby>重<rt>かさ</rt></ruby>ねたいと考えています。","default_answer_original":"自然と近代都市が調和した美しい景観を持つ都市へ戻り、さらに深い文化体験を重ねたいと考えています。"},{"category":"Travel","text":"<ruby>実際<rt>じっさい</rt></ruby>に日本を<ruby>訪<rt>おとず</rt></ruby>れた<ruby>際<rt>さい</rt></ruby>、あるいは日本の<ruby>情報<rt>じょうほう</rt></ruby>に<ruby>接<rt>せっ</rt></ruby>した<ruby>際<rt>さい</rt></ruby>、<ruby>最<rt>もっと</rt></ruby>も<ruby>文化<rt>ぶんか</rt></ruby>の<ruby>違<rt>ちが</rt></ruby>いを<ruby>感<rt>かん</rt></ruby>じた点は何ですか。","audio":"/audio/Q381.mp3","text_original":"実際に日本を訪れた際、あるいは日本の情報に接した際、最も文化の違いを感じた点は何ですか。","defaultAnswer":"<ruby>細<rt>こま</rt></ruby>やかな<ruby>心遣<rt>こころづか</rt></ruby>いや<ruby>秩序<rt>ちつじょ</rt></ruby>を<ruby>重<rt>おも</rt></ruby>んじる社会<ruby>規範<rt>きはん</rt></ruby>の<ruby>美<rt>うつく</rt></ruby>しさと、ハイテクと<ruby>伝統<rt>でんとう</rt></ruby>が<ruby>共存<rt>きょうぞん</rt></ruby>する<ruby>独特<rt>どくとく</rt></ruby>の<ruby>雰囲気<rt>ふんいき</rt></ruby>に<ruby>圧倒<rt>あっとう</rt></ruby>されました。","default_answer_original":"細やかな心遣いや秩序を重んじる社会規範の美しさと、ハイテクと伝統が共存する独特の雰囲気に圧倒されました。"},{"category":"Travel","text":"もし<ruby>自由<rt>じゆう</rt></ruby>に日本<ruby>国内<rt>こくない</rt></ruby>を旅行できるとしたら、どの<ruby>地域<rt>ちいき</rt></ruby>をどのように<ruby>巡<rt>めぐ</rt></ruby>りたいですか。","audio":"/audio/Q382.mp3","text_original":"もし自由に日本国内を旅行できるとしたら、どの地域をどのように巡りたいですか。","defaultAnswer":"<ruby>地方<rt>ちほう</rt></ruby>の<ruby>伝統<rt>でんとう</rt></ruby><ruby>工芸<rt>こうげい</rt></ruby>や<ruby>美<rt>うつく</rt></ruby>しい<ruby>自然<rt>しぜん</rt></ruby>が<ruby>残<rt>のこ</rt></ruby>る<ruby>地域<rt>ちいき</rt></ruby>を、<ruby>ローカル線<rt>ろーかるせん</rt></ruby>を<ruby>乗り継<rt>のりつ</rt></ruby>ぎながらゆっくりと<ruby>巡<rt>めぐ</rt></ruby>りたいです。","default_answer_original":"地方の伝統工芸や美しい自然が残る地域を、ローカル線を乗り継ぎながらゆっくりと巡りたいです。"},{"category":"Travel","text":"<ruby>移動<rt>いどう</rt></ruby>時間も<ruby>含<rt>ふく</rt></ruby>めて旅を楽しむために、どのような<ruby>交通<rt>こうつう</rt></ruby><ruby>手段<rt>しゅだん</rt></ruby>を<ruby>選択<rt>せんたく</rt></ruby>しますか。","audio":"/audio/Q383.mp3","text_original":"移動時間も含めて旅を楽しむために、どのような交通手段を選択しますか。","defaultAnswer":"<ruby>車窓<rt>しゃそう</rt></ruby>からの<ruby>風景<rt>ふうけい</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby>を<ruby>味<rt>あじ</rt></ruby>わい、<ruby>地域<rt>ちいき</rt></ruby>の<ruby>日常<rt>にちじょう</rt></ruby>を<ruby>肌<rt>はだ</rt></ruby>で<ruby>感<rt>かん</rt></ruby>じることができる<ruby>鉄道<rt>てつどう</rt></ruby>の旅を好んで<ruby>選<rt>えら</rt></ruby>びます。","default_answer_original":"車窓からの風景の変化を味わい、地域の日常を肌で感じることができる鉄道の旅を好んで選びます。"},{"category":"Travel","text":"次の<ruby>長期<rt>ちょうき</rt></ruby><ruby>休暇<rt>きゅうか</rt></ruby>に<ruby>向<rt>む</rt></ruby>けて、<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>にどのような旅行<ruby>計画<rt>けいかく</rt></ruby>や<ruby>構想<rt>こうそう</rt></ruby>を<ruby>温<rt>あたた</rt></ruby>めていますか。","audio":"/audio/Q384.mp3","text_original":"次の長期休暇に向けて、具体的にどのような旅行計画や構想を温めていますか。","defaultAnswer":"<ruby>歴史<rt>れきし</rt></ruby>と<ruby>現代<rt>げんだい</rt></ruby><ruby>文化<rt>ぶんか</rt></ruby>の<ruby>融合<rt>ゆうごう</rt></ruby>をテーマに、これまで<ruby>未踏<rt>みとう</rt></ruby>だった<ruby>地域<rt>ちいき</rt></ruby>を<ruby>巡<rt>めぐ</rt></ruby>る<ruby>周遊<rt>しゅうゆう</rt></ruby>プランを<ruby>個人<rt>こじん</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>立案<rt>りつあん</rt></ruby>しています。","default_answer_original":"歴史と現代文化の融合をテーマに、これまで未踏だった地域を巡る周遊プランを個人的に立案しています。"},{"category":"Leisure Activity","text":"休日や<ruby>自由<rt>じゆう</rt></ruby>な時間を<ruby>活用<rt>かつよう</rt></ruby>して、どのように<ruby>心身<rt>しんしん</rt></ruby>をリフレッシュさせていますか。","audio":"/audio/Q385.mp3","text_original":"休日や自由な時間を活用して、どのように心身をリフレッシュさせていますか。","defaultAnswer":"デジタル<ruby>機器<rt>きき</rt></ruby>から<ruby>離<rt>はな</rt></ruby>れた<ruby>静寂<rt>せいじゃく</rt></ruby>な<ruby>空間<rt>くうかん</rt></ruby>で、読書や<ruby>自然<rt>しぜん</rt></ruby>との<ruby>対話<rt>たいわ</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて<ruby>内省<rt>ないせい</rt></ruby><ruby>的<rt>てき</rt></ruby>な時間を<ruby>過<rt>す</rt></ruby>ごしています。","default_answer_original":"デジタル機器から離れた静寂な空間で、読書や自然との対話を通じて内省的な時間を過ごしています。"},{"category":"Leisure Activity","text":"友人と休日を<ruby>過<rt>す</rt></ruby>ごす<ruby>場合<rt>ばあい</rt></ruby>、どのような場所を好んで<ruby>集<rt>あつ</rt></ruby>まることが多いですか。","audio":"/audio/Q386.mp3","text_original":"友人と休日を過ごす場合、どのような場所を好んで集まることが多いですか。","defaultAnswer":"<ruby>落ち着<rt>おちつ</rt></ruby>いた<ruby>雰囲気<rt>ふんいき</rt></ruby>の中でじっくりと会話を楽しめる、<ruby>隠れ家<rt>かくれが</rt></ruby><ruby>的<rt>てき</rt></ruby>なカフェや<ruby>美術館<rt>びじゅつかん</rt></ruby>を好みます。","default_answer_original":"落ち着いた雰囲気の中でじっくりと会話を楽しめる、隠れ家的なカフェや美術館を好みます。"},{"category":"Leisure Activity","text":"買い物をする<ruby>際<rt>さい</rt></ruby>、どのような<ruby>基準<rt>きじゅん</rt></ruby>で<ruby>店舗<rt>てんぽ</rt></ruby>や<ruby>品物<rt>しなもの</rt></ruby>を<ruby>選<rt>えら</rt></ruby>びますか。","audio":"/audio/Q387.mp3","text_original":"買い物をする際、どのような基準で店舗や品物を選びますか。","defaultAnswer":"<ruby>流行<rt>りゅうこう</rt></ruby>に左右されず、<ruby>環境<rt>かんきょう</rt></ruby>への<ruby>配慮<rt>はいりょ</rt></ruby>や<ruby>倫理<rt>りんり</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>生産<rt>せいさん</rt></ruby>プロセスで作られた高<ruby>品質<rt>ひんしつ</rt></ruby>な<ruby>製品<rt>せいひん</rt></ruby>を<ruby>選択<rt>せんたく</rt></ruby><ruby>基準<rt>きじゅん</rt></ruby>としています。","default_answer_original":"流行に左右されず、環境への配慮や倫理的な生産プロセスで作られた高品質な製品を選択基準としています。"},{"category":"Leisure Activity","text":"<ruby>自然<rt>しぜん</rt></ruby>を<ruby>感<rt>かん</rt></ruby>じられる場所、<ruby>公園<rt>こうえん</rt></ruby>や海など、で<ruby>過<rt>す</rt></ruby>ごす時間について、どう<ruby>感<rt>かん</rt></ruby>じていますか。","audio":"/audio/Q388.mp3","text_original":"自然を感じられる場所、公園や海など、で過ごす時間について、どう感じていますか。","defaultAnswer":"<ruby>多忙<rt>たぼう</rt></ruby>な<ruby>日常<rt>にちじょう</rt></ruby>生活の中で<ruby>失<rt>うしな</rt></ruby>いがちな<ruby>精神<rt>せいしん</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>平穏<rt>へいおん</rt></ruby>を<ruby>取り戻<rt>とりもど</rt></ruby>し、思考をリセットするために<ruby>不可欠<rt>ふかけつ</rt></ruby>な時間です。","default_answer_original":"多忙な日常生活の中で失いがちな精神的平穏を取り戻し、思考をリセットするために不可欠な時間です。"},{"category":"Leisure Activity","text":"<ruby>在宅<rt>ざいたく</rt></ruby>の時間を<ruby>充実<rt>じゅうじつ</rt></ruby>させるために、<ruby>室内<rt>しつない</rt></ruby>でどんな<ruby>娯楽<rt>ごらく</rt></ruby>や<ruby>工夫<rt>くふう</rt></ruby>を楽しんでいますか。","audio":"/audio/Q389.mp3","text_original":"在宅の時間を充実させるために、室内でどんな娯楽や工夫を楽しんでいますか。","defaultAnswer":"<ruby>部屋<rt>へや</rt></ruby>のレイアウトを<ruby>工夫<rt>くふう</rt></ruby>したり、<ruby>音楽<rt>おんがく</rt></ruby>やアート<ruby>を通<rt>をつう</rt></ruby>じて<ruby>自己<rt>じこ</rt></ruby>の<ruby>感性<rt>かんせい</rt></ruby>を高めるインドア活動を楽しんでいます。","default_answer_original":"部屋のレイアウトを工夫したり、音楽やアートを通じて自己の感性を高めるインドア活動を楽しんでいます。"},{"category":"Leisure Activity","text":"近い<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>休暇<rt>きゅうか</rt></ruby>を<ruby>利用<rt>りよう</rt></ruby>して、<ruby>挑戦<rt>ちょうせん</rt></ruby>してみたい<ruby>特別<rt>とくべつ</rt></ruby>なレジャー活動はありますか。","audio":"/audio/Q390.mp3","text_original":"近い将来の休暇を利用して、挑戦してみたい特別なレジャー活動はありますか。","defaultAnswer":"<ruby>未知<rt>みち</rt></ruby>の<ruby>自然<rt>しぜん</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>を自分の<ruby>足<rt>あし</rt></ruby>で<ruby>踏破<rt>とうは</rt></ruby>するような、<ruby>本格<rt>ほんかく</rt></ruby><ruby>的<rt>てき</rt></ruby>なバックパッキングやトレッキングに<ruby>挑<rt>いど</rt></ruby>みたいです。","default_answer_original":"未知の自然環境を自分の足で踏破するような、本格的なバックパッキングやトレッキングに挑みたいです。"},{"category":"Leisure Activity","text":"<ruby>誕生<rt>たんじょう</rt></ruby>日や<ruby>記念<rt>きねん</rt></ruby>日などの<ruby>特別<rt>とくべつ</rt></ruby>な<ruby>節目<rt>ふしめ</rt></ruby>には、どのような<ruby>お祝<rt>おいわ</rt></ruby>いをする<ruby>伝統<rt>でんとう</rt></ruby>がありますか。","audio":"/audio/Q391.mp3","text_original":"誕生日や記念日などの特別な節目には、どのようなお祝いをする伝統がありますか。","defaultAnswer":"家族や<ruby>親<rt>した</rt></ruby>しい友人たちが<ruby>一堂<rt>いちどう</rt></ruby>に会し、<ruby>お互<rt>おたが</rt></ruby>いの<ruby>成長<rt>せいちょう</rt></ruby>や<ruby>健康<rt>けんこう</rt></ruby>を<ruby>感謝<rt>かんしゃ</rt></ruby>し<ruby>合<rt>あ</rt></ruby>う<ruby>温<rt>あたた</rt></ruby>かい食事会を<ruby>開<rt>ひら</rt></ruby>きます。","default_answer_original":"家族や親しい友人たちが一堂に会し、お互いの成長や健康を感謝し合う温かい食事会を開きます。"},{"category":"Leisure Activity","text":"友人やコミュニティの<ruby>集<rt>あつ</rt></ruby>まり、イベント・パーティー、には<ruby>積極<rt>せっきょく</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>参加<rt>さんか</rt></ruby>するほうですか。","audio":"/audio/Q392.mp3","text_original":"友人やコミュニティの集まり、イベント・パーティー、には積極的に参加するほうですか。","defaultAnswer":"<ruby>多様<rt>たよう</rt></ruby>な<ruby>背景<rt>はいけい</rt></ruby>を持つ人々との<ruby>交流<rt>こうりゅう</rt></ruby>から新しい<ruby>視点<rt>してん</rt></ruby>を<ruby>得<rt>え</rt></ruby>られるため、<ruby>前向<rt>まえむ</rt></ruby>きに<ruby>参加<rt>さんか</rt></ruby>するよう<ruby>心<rt>こころ</rt></ruby>がけています。","default_answer_original":"多様な背景を持つ人々との交流から新しい視点を得られるため、前向きに参加するよう心がけています。"},{"category":"Leisure Activity","text":"一日の終わりに自分<ruby>自身<rt>じしん</rt></ruby>の時間を<ruby>確保<rt>かくほ</rt></ruby>するため、どのようなナイトルーティンを行っていますか。","audio":"/audio/Q393.mp3","text_original":"一日の終わりに自分自身の時間を確保するため、どのようなナイトルーティンを行っていますか。","defaultAnswer":"今日一日の<ruby>振り返<rt>ふりかえ</rt></ruby>りを<ruby>日記<rt>にっき</rt></ruby>に<ruby>記<rt>しる</rt></ruby>し、<ruby>心<rt>こころ</rt></ruby>を<ruby>静<rt>しず</rt></ruby>めてから<ruby>質<rt>しつ</rt></ruby>の高い<ruby>睡眠<rt>すいみん</rt></ruby>をとるための<ruby>準備<rt>じゅんび</rt></ruby>をします。","default_answer_original":"今日一日の振り返りを日記に記し、心を静めてから質の高い睡眠をとるための準備をします。"},{"category":"Leisure Activity","text":"朝の<ruby>限<rt>かぎ</rt></ruby>られた時間を<ruby>効率<rt>こうりつ</rt></ruby><ruby>的<rt>てき</rt></ruby>に使うために、どのようなモーニングルーティンを<ruby>実践<rt>じっせん</rt></ruby>していますか。","audio":"/audio/Q394.mp3","text_original":"朝の限られた時間を効率的に使うために、どのようなモーニングルーティンを実践していますか。","defaultAnswer":"早朝の<ruby>静<rt>しず</rt></ruby>かな時間<ruby>帯<rt>たい</rt></ruby>に<ruby>軽<rt>かる</rt></ruby>い<ruby>運動<rt>うんどう</rt></ruby>と読書を<ruby>済<rt>す</rt></ruby>ませ、一日のスケジュールを<ruby>明確<rt>めいかく</rt></ruby>にしてから出発します。","default_answer_original":"早朝の静かな時間帯に軽い運動と読書を済ませ、一日のスケジュールを明確にしてから出発します。"},{"category":"Future","text":"<ruby>高等<rt>こうとう</rt></ruby>学校を<ruby>卒業<rt>そつぎょう</rt></ruby>した後の<ruby>進路<rt>しんろ</rt></ruby><ruby>方針<rt>ほうしん</rt></ruby>について、どのように<ruby>描<rt>えが</rt></ruby>いていますか。","audio":"/audio/Q395.mp3","text_original":"高等学校を卒業した後の進路方針について、どのように描いていますか。","defaultAnswer":"大学の<ruby>学部<rt>がくぶ</rt></ruby><ruby>教育<rt>きょういく</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて<ruby>専門<rt>せんもん</rt></ruby><ruby>性<rt>せい</rt></ruby>を高め、<ruby>国際<rt>こくさい</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>舞台<rt>ぶたい</rt></ruby>で<ruby>通用<rt>つうよう</rt></ruby>する<ruby>実力<rt>じつりょく</rt></ruby>を<ruby>身<rt>み</rt></ruby>につける<ruby>方針<rt>ほうしん</rt></ruby>を<ruby>描<rt>えが</rt></ruby>いています。","default_answer_original":"大学の学部教育を通じて専門性を高め、国際的な舞台で通用する実力を身につける方針を描いています。"},{"category":"Future","text":"<ruby>高等<rt>こうとう</rt></ruby><ruby>教育<rt>きょういく</rt></ruby>、大学や<ruby>専門<rt>せんもん</rt></ruby>学校など、で<ruby>探究<rt>たんきゅう</rt></ruby>したい<ruby>専門<rt>せんもん</rt></ruby><ruby>分野<rt>ぶんや</rt></ruby>やテーマは何ですか。","audio":"/audio/Q396.mp3","text_original":"高等教育、大学や専門学校など、で探究したい専門分野やテーマは何ですか。","defaultAnswer":"グローバル<ruby>経済<rt>けいざい</rt></ruby>、<ruby>国際<rt>こくさい</rt></ruby><ruby>法<rt>ほう</rt></ruby>、あるいは<ruby>先端<rt>せんたん</rt></ruby><ruby>科学<rt>かがく</rt></ruby><ruby>技術<rt>ぎじゅつ</rt></ruby>の<ruby>倫理<rt>りんり</rt></ruby><ruby>的<rt>てき</rt></ruby><ruby>側面<rt>そくめん</rt></ruby>について<ruby>深<rt>ふか</rt></ruby>く<ruby>探究<rt>たんきゅう</rt></ruby>したいです。","default_answer_original":"グローバル経済、国際法、あるいは先端科学技術の倫理的側面について深く探究したいです。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby><ruby>的<rt>てき</rt></ruby>にどのような<ruby>職業<rt>しょくぎょう</rt></ruby>や<ruby>業界<rt>ぎょうかい</rt></ruby>で、どのようなキャリアを<ruby>形成<rt>けいせい</rt></ruby>したいと考えていますか。","audio":"/audio/Q397.mp3","text_original":"将来的にどのような職業や業界で、どのようなキャリアを形成したいと考えていますか。","defaultAnswer":"<ruby>国際<rt>こくさい</rt></ruby><ruby>機関<rt>きかん</rt></ruby>やグローバル<ruby>企業<rt>きぎょう</rt></ruby>において、社会<ruby>的<rt>てき</rt></ruby><ruby>課題<rt>かだい</rt></ruby>の<ruby>解決<rt>かいけつ</rt></ruby>に<ruby>寄与<rt>きよ</rt></ruby>する<ruby>専門<rt>せんもん</rt></ruby><ruby>性<rt>せい</rt></ruby>の高いキャリアを<ruby>志向<rt>しこう</rt></ruby>しています。","default_answer_original":"国際機関やグローバル企業において、社会的課題の解決に寄与する専門性の高いキャリアを志向しています。"},{"category":"Future","text":"グローバルな<ruby>環境<rt>かんきょう</rt></ruby>や海外を<ruby>拠点<rt>きょてん</rt></ruby>にして働くことについて、どのような<ruby>関心<rt>かんしん</rt></ruby>をお持ちですか。","audio":"/audio/Q398.mp3","text_original":"グローバルな環境や海外を拠点にして働くことについて、どのような関心をお持ちですか。","defaultAnswer":"<ruby>国境<rt>こっきょう</rt></ruby>を<ruby>越<rt>こ</rt></ruby>えた<ruby>協<rt>きょう</rt></ruby>働<ruby>を通<rt>をつう</rt></ruby>じて、<ruby>多様<rt>たよう</rt></ruby>な<ruby>文化<rt>ぶんか</rt></ruby><ruby>背景<rt>はいけい</rt></ruby>を持つ人々と<ruby>価値<rt>かち</rt></ruby>あるプロジェクトを<ruby>創出<rt>そうしゅつ</rt></ruby>することに<ruby>関心<rt>かんしん</rt></ruby>があります。","default_answer_original":"国境を越えた協働を通じて、多様な文化背景を持つ人々と価値あるプロジェクトを創出することに関心があります。"},{"category":"Future","text":"<ruby>一定<rt>いってい</rt></ruby><ruby>期間<rt>きかん</rt></ruby>、日本に<ruby>滞在<rt>たいざい</rt></ruby>して仕事をしたり生活したりする<ruby>可能<rt>かのう</rt></ruby><ruby>性<rt>せい</rt></ruby>についてどう考えますか。","audio":"/audio/Q399.mp3","text_original":"一定期間、日本に滞在して仕事をしたり生活したりする可能性についてどう考えますか。","defaultAnswer":"<ruby>現地<rt>げんち</rt></ruby>での<ruby>深<rt>ふか</rt></ruby>い<ruby>実務<rt>じつむ</rt></ruby><ruby>経験<rt>けいけん</rt></ruby><ruby>を通<rt>をつう</rt></ruby>じて、言語<ruby>力<rt>りょく</rt></ruby>だけでなく日本社会への<ruby>理解<rt>りかい</rt></ruby>をより<ruby>一層<rt>いっそう</rt></ruby><ruby>深<rt>ふか</rt></ruby>めたいと考えています。","default_answer_original":"現地での深い実務経験を通じて、言語力だけでなく日本社会への理解をより一層深めたいと考えています。"},{"category":"Future","text":"<ruby>自家用車<rt>じかようしゃ</rt></ruby>の<ruby>運転<rt>うんてん</rt></ruby><ruby>免許<rt>めんきょ</rt></ruby>を<ruby>取得<rt>しゅとく</rt></ruby>し、<ruby>日常<rt>にちじょう</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>移動<rt>いどう</rt></ruby><ruby>手段<rt>しゅだん</rt></ruby>として<ruby>活用<rt>かつよう</rt></ruby>したいですか。","audio":"/audio/Q400.mp3","text_original":"自家用車の運転免許を取得し、日常的に移動手段として活用したいですか。","defaultAnswer":"はい、行動<ruby>範囲<rt>はんい</rt></ruby>を<ruby>劇的<rt>げきてき</rt></ruby>に広げ、自立した生活を<ruby>送<rt>おく</rt></ruby>るための<ruby>必須<rt>ひっす</rt></ruby>のライフスキルとして<ruby>取得<rt>しゅとく</rt></ruby>を<ruby>予定<rt>よてい</rt></ruby>しています。","default_answer_original":"はい、行動範囲を劇的に広げ、自立した生活を送るための必須のライフスキルとして取得を予定しています。"},{"category":"Future","text":"<ruby>将来<rt>しょうらい</rt></ruby>ご<ruby>自身<rt>じしん</rt></ruby>で<ruby>所有<rt>しょゆう</rt></ruby>したい<ruby>理想<rt>りそう</rt></ruby>の<ruby>移動<rt>いどう</rt></ruby><ruby>手段<rt>しゅだん</rt></ruby>や<ruby>車両<rt>しゃりょう</rt></ruby>のタイプはありますか。","audio":"/audio/Q401.mp3","text_original":"将来ご自身で所有したい理想の移動手段や車両のタイプはありますか。","defaultAnswer":"<ruby>環境<rt>かんきょう</rt></ruby><ruby>負荷<rt>ふか</rt></ruby>を<ruby>最小限<rt>さいしょうげん</rt></ruby>に<ruby>抑<rt>おさ</rt></ruby>えた<ruby>最新<rt>さいしん</rt></ruby>のクリーンエネルギー車や、<ruby>効率<rt>こうりつ</rt></ruby><ruby>的<rt>てき</rt></ruby>なコンパクトカーを<ruby>想定<rt>そうてい</rt></ruby>しています。","default_answer_original":"環境負荷を最小限に抑えた最新のクリーンエネルギー車や、効率的なコンパクトカーを想定しています。"},{"category":"Future","text":"<ruby>親元<rt>おやもと</rt></ruby>を<ruby>離<rt>はな</rt></ruby>れて自立した<ruby>際<rt>さい</rt></ruby>、どのような<ruby>住環境<rt>じゅうかんきょう</rt></ruby>やエリアで<ruby>暮<rt>く</rt></ruby>らしたいですか。","audio":"/audio/Q402.mp3","text_original":"親元を離れて自立した際、どのような住環境やエリアで暮らしたいですか。","defaultAnswer":"<ruby>学業<rt>がくぎょう</rt></ruby>や仕事へのアクセスが<ruby>優<rt>すぐ</rt></ruby>れ、かつ<ruby>緑<rt>みどり</rt></ruby><ruby>豊<rt>ゆた</rt></ruby>かな<ruby>公園<rt>こうえん</rt></ruby>や<ruby>文化<rt>ぶんか</rt></ruby><ruby>施設<rt>しせつ</rt></ruby>が<ruby>身近<rt>みぢか</rt></ruby>にある都市<ruby>部<rt>ぶ</rt></ruby>で<ruby>暮<rt>く</rt></ruby>らしたいです。","default_answer_original":"学業や仕事へのアクセスが優れ、かつ緑豊かな公園や文化施設が身近にある都市部で暮らしたいです。"},{"category":"Future","text":"今から10年後のご<ruby>自身<rt>じしん</rt></ruby>は、どのようなライフスタイルや社会<ruby>的<rt>てき</rt></ruby>立場にあると<ruby>想像<rt>そうぞう</rt></ruby>しますか。","audio":"/audio/Q403.mp3","text_original":"今から10年後のご自身は、どのようなライフスタイルや社会的立場にあると想像しますか。","defaultAnswer":"<ruby>専門<rt>せんもん</rt></ruby><ruby>分野<rt>ぶんや</rt></ruby>での<ruby>確<rt>たし</rt></ruby>かな<ruby>実績<rt>じっせき</rt></ruby>を<ruby>築<rt>きず</rt></ruby>き、社会<ruby>に対<rt>にたい</rt></ruby>して<ruby>有意義<rt>ゆういぎ</rt></ruby>な<ruby>影響<rt>えいきょう</rt></ruby><ruby>力<rt>りょく</rt></ruby>を<ruby>発揮<rt>はっき</rt></ruby>できる立場にあると<ruby>想像<rt>そうぞう</rt></ruby>します。","default_answer_original":"専門分野での確かな実績を築き、社会に対して有意義な影響力を発揮できる立場にあると想像します。"},{"category":"Future","text":"あなたが人生<ruby>を通<rt>をつう</rt></ruby>じて<ruby>最終<rt>さいしゅう</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>達成<rt>たっせい</rt></ruby>したい「<ruby>最大<rt>さいだい</rt></ruby>の<ruby>目標<rt>もくひょう</rt></ruby>や<ruby>夢<rt>ゆめ</rt></ruby>」は何ですか。","audio":"/audio/Q404.mp3","text_original":"あなたが人生を通じて最終的に達成したい「最大の目標や夢」は何ですか。","defaultAnswer":"<ruby>自身<rt>じしん</rt></ruby>の<ruby>培<rt>つちか</rt></ruby>った知見と語学<ruby>力<rt>りょく</rt></ruby>を<ruby>駆使<rt>くし</rt></ruby>して、<ruby>世界中<rt>せかいじゅう</rt></ruby>の人々が<ruby>平和<rt>へいわ</rt></ruby>に<ruby>共生<rt>きょうせい</rt></ruby>できる社会の<ruby>実現<rt>じつげん</rt></ruby>に<ruby>寄与<rt>きよ</rt></ruby>することです。","default_answer_original":"自身の培った知見と語学力を駆使して、世界中の人々が平和に共生できる社会の実現に寄与することです。"},{"category":"Technology","text":"<ruby>日常<rt>にちじょう</rt></ruby>生活において、<ruby>主<rt>おも</rt></ruby>にどのようなIT<ruby>機器<rt>きき</rt></ruby>やスマートデバイスを<ruby>活用<rt>かつよう</rt></ruby>していますか。","audio":"/audio/Q405.mp3","text_original":"日常生活において、主にどのようなIT機器やスマートデバイスを活用していますか。","defaultAnswer":"多<ruby>機能<rt>きのう</rt></ruby>なスマートフォンをハブとして、学習<ruby>用<rt>よう</rt></ruby>の<ruby>高性能<rt>こうせいのう</rt></ruby>PCやタブレットを<ruby>状況<rt>じょうきょう</rt></ruby>に<ruby>応<rt>おう</rt></ruby>じて使い分けています。","default_answer_original":"多機能なスマートフォンをハブとして、学習用の高性能PCやタブレットを状況に応じて使い分けています。"},{"category":"Technology","text":"<ruby>画面<rt>がめん</rt></ruby>を見る時間、スクリーンタイム、の長さについて、ご<ruby>自身<rt>じしん</rt></ruby>でどのように<ruby>管理<rt>かんり</rt></ruby>していますか。","audio":"/audio/Q406.mp3","text_original":"画面を見る時間、スクリーンタイム、の長さについて、ご自身でどのように管理していますか。","defaultAnswer":"アプリの<ruby>利用<rt>りよう</rt></ruby><ruby>制限<rt>せいげん</rt></ruby><ruby>機能<rt>きのう</rt></ruby>を<ruby>活用<rt>かつよう</rt></ruby>し、<ruby>必要<rt>ひつよう</rt></ruby>のない時間<ruby>帯<rt>たい</rt></ruby>はデバイスを<ruby>遠<rt>とお</rt></ruby>ざけることで<ruby>過度<rt>かど</rt></ruby>な<ruby>使用<rt>しよう</rt></ruby>を<ruby>抑制<rt>よくせい</rt></ruby>しています。","default_answer_original":"アプリの利用制限機能を活用し、必要のない時間帯はデバイスを遠ざけることで過度な使用を抑制しています。"},{"category":"Technology","text":"デバイスを<ruby>用<rt>もち</rt></ruby>いて、<ruby>主<rt>おも</rt></ruby>にどのような<ruby>情報<rt>じょうほう</rt></ruby><ruby>収集<rt>しゅうしゅう</rt></ruby>やコミュニケーションを行っていますか。","audio":"/audio/Q407.mp3","text_original":"デバイスを用いて、主にどのような情報収集やコミュニケーションを行っていますか。","defaultAnswer":"<ruby>信頼<rt>しんらい</rt></ruby><ruby>性<rt>せい</rt></ruby>の高い<ruby>国際<rt>こくさい</rt></ruby>ニュースの<ruby>購読<rt>こうどく</rt></ruby>や、<ruby>学術<rt>がくじゅつ</rt></ruby><ruby>的<rt>てき</rt></ruby>なリサーチ、そしてチームでの<ruby>円滑<rt>えんかつ</rt></ruby>な<ruby>情報<rt>じょうほう</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>に<ruby>活用<rt>かつよう</rt></ruby>しています。","default_answer_original":"信頼性の高い国際ニュースの購読や、学術的なリサーチ、そしてチームでの円滑な情報共有に活用しています。"},{"category":"Technology","text":"学習や仕事の<ruby>生産<rt>せいさん</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>向上<rt>こうじょう</rt></ruby>させるために、PCやソフトウェアをどのように<ruby>運用<rt>うんよう</rt></ruby>していますか。","audio":"/audio/Q408.mp3","text_original":"学習や仕事の生産性を向上させるために、PCやソフトウェアをどのように運用していますか。","defaultAnswer":"クラウドサービスによるデータの一元<ruby>管理<rt>かんり</rt></ruby>と、タスク<ruby>管理<rt>かんり</rt></ruby>ツールを<ruby>用<rt>もち</rt></ruby>いた<ruby>効率<rt>こうりつ</rt></ruby><ruby>的<rt>てき</rt></ruby>なスケジュール<ruby>運用<rt>うんよう</rt></ruby>を行っています。","default_answer_original":"クラウドサービスによるデータの一元管理と、タスク管理ツールを用いた効率的なスケジュール運用を行っています。"},{"category":"Technology","text":"オンラインショッピングや電子<ruby>決済<rt>けっさい</rt></ruby>、キャッシュレス、を<ruby>利用<rt>りよう</rt></ruby>する<ruby>頻度<rt>ひんど</rt></ruby>と<ruby>利便<rt>りべん</rt></ruby><ruby>性<rt>せい</rt></ruby>についてどう思いますか。","audio":"/audio/Q409.mp3","text_original":"オンラインショッピングや電子決済、キャッシュレス、を利用する頻度と利便性についてどう思いますか。","defaultAnswer":"時間と場所の<ruby>制約<rt>せいやく</rt></ruby>を<ruby>大幅<rt>おおはば</rt></ruby>に<ruby>軽減<rt>けいげん</rt></ruby>してくれる<ruby>極<rt>きわ</rt></ruby>めて<ruby>合理<rt>ごうり</rt></ruby><ruby>的<rt>てき</rt></ruby>なシステムとして、<ruby>日常<rt>にちじょう</rt></ruby><ruby>的<rt>てき</rt></ruby>に大いに<ruby>活用<rt>かつよう</rt></ruby>しています。","default_answer_original":"時間と場所の制約を大幅に軽減してくれる極めて合理的なシステムとして、日常的に大いに活用しています。"},{"category":"Technology","text":"SNSの<ruby>普及<rt>ふきゅう</rt></ruby>がもたらす社会<ruby>的<rt>てき</rt></ruby>なメリットと、<ruby>懸念<rt>けねん</rt></ruby>されるデメリットについてどう考えますか。","audio":"/audio/Q410.mp3","text_original":"SNSの普及がもたらす社会的なメリットと、懸念されるデメリットについてどう考えますか。","defaultAnswer":"<ruby>情報<rt>じょうほう</rt></ruby><ruby>拡散<rt>かくさん</rt></ruby>の<ruby>迅速<rt>じんそく</rt></ruby><ruby>化<rt>か</rt></ruby>という<ruby>利点<rt>りてん</rt></ruby>がある一方、フェイク<ruby>情報<rt>じょうほう</rt></ruby>の<ruby>氾濫<rt>はんらん</rt></ruby>やプライバシー<ruby>侵害<rt>しんがい</rt></ruby>のリスクが<ruby>懸念<rt>けねん</rt></ruby>されます。","default_answer_original":"情報拡散の迅速化という利点がある一方、フェイク情報の氾濫やプライバシー侵害のリスクが懸念されます。"},{"category":"Technology","text":"<ruby>急速<rt>きゅうそく</rt></ruby>な<ruby>技術<rt>ぎじゅつ</rt></ruby><ruby>革新<rt>かくしん</rt></ruby>によって、私たちの生活<ruby>様式<rt>ようしき</rt></ruby>はどのように<ruby>変化<rt>へんか</rt></ruby>したと<ruby>感<rt>かん</rt></ruby>じますか。","audio":"/audio/Q411.mp3","text_original":"急速な技術革新によって、私たちの生活様式はどのように変化したと感じますか。","defaultAnswer":"あらゆる<ruby>手続<rt>てつづ</rt></ruby>きやコミュニケーションの<ruby>形<rt>かたち</rt></ruby>が<ruby>簡素<rt>かんそ</rt></ruby><ruby>化<rt>か</rt></ruby>され、時間<ruby>的<rt>てき</rt></ruby>・<ruby>地理<rt>ちり</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>制約<rt>せいやく</rt></ruby>が<ruby>劇的<rt>げきてき</rt></ruby>に<ruby>減少<rt>げんしょう</rt></ruby>しました。","default_answer_original":"あらゆる手続きやコミュニケーションの形が簡素化され、時間的・地理的な制約が劇的に減少しました。"},{"category":"Technology","text":"<ruby>人工<rt>じんこう</rt></ruby><ruby>知能<rt>ちのう</rt></ruby>、AI、<ruby>技術<rt>ぎじゅつ</rt></ruby>の<ruby>進化<rt>しんか</rt></ruby>が今後の社会や<ruby>雇用<rt>こよう</rt></ruby>に<ruby>与<rt>あた</rt></ruby>える<ruby>影響<rt>えいきょう</rt></ruby>について、どうお考えですか。","audio":"/audio/Q412.mp3","text_original":"人工知能、AI、技術の進化が今後の社会や雇用に与える影響について、どうお考えですか。","defaultAnswer":"<ruby>定型<rt>ていけい</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>業務<rt>ぎょうむ</rt></ruby>が自動<ruby>化<rt>か</rt></ruby>される一方で、人間にしかできない<ruby>創造<rt>そうぞう</rt></ruby><ruby>的<rt>てき</rt></ruby>・<ruby>倫理<rt>りんり</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>能力<rt>のうりょく</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>が<ruby>一層<rt>いっそう</rt></ruby>高まると考えます。","default_answer_original":"定型的な業務が自動化される一方で、人間にしかできない創造的・倫理的な能力の重要性が一層高まると考えます。"},{"category":"Technology","text":"もしデジタル<ruby>機器<rt>きき</rt></ruby>から<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>離<rt>はな</rt></ruby>れた生活、デジタルデトックス、を<ruby>求<rt>もと</rt></ruby>められたら、どう<ruby>対処<rt>たいしょ</rt></ruby>しますか。","audio":"/audio/Q413.mp3","text_original":"もしデジタル機器から完全に離れた生活、デジタルデトックス、を求められたら、どう対処しますか。","defaultAnswer":"<ruby>最初<rt>さいしょ</rt></ruby>は<ruby>情報<rt>じょうほう</rt></ruby><ruby>遮断<rt>しゃだん</rt></ruby>に<ruby>戸惑<rt>とまど</rt></ruby>うでしょうが、<ruby>自然<rt>しぜん</rt></ruby>に<ruby>身<rt>み</rt></ruby>を<ruby>委<rt>ゆだ</rt></ruby>ねて<ruby>精神<rt>せいしん</rt></ruby><ruby>的<rt>てき</rt></ruby>なバランスを<ruby>回復<rt>かいふく</rt></ruby>する<ruby>絶好<rt>ぜっこう</rt></ruby>の<ruby>機会<rt>きかい</rt></ruby>と<ruby>捉<rt>とら</rt></ruby>えます。","default_answer_original":"最初は情報遮断に戸惑うでしょうが、自然に身を委ねて精神的なバランスを回復する絶好の機会と捉えます。"},{"category":"Technology","text":"今後<ruby>導入<rt>どうにゅう</rt></ruby>されることが<ruby>期待<rt>きたい</rt></ruby>される<ruby>最新<rt>さいしん</rt></ruby>のテクノロジーや<ruby>製品<rt>せいひん</rt></ruby>で、<ruby>関心<rt>かんしん</rt></ruby>を持っているものはありますか。","audio":"/audio/Q414.mp3","text_original":"今後導入されることが期待される最新のテクノロジーや製品で、関心を持っているものはありますか。","defaultAnswer":"<ruby>再生<rt>さいせい</rt></ruby><ruby>可能<rt>かのう</rt></ruby>エネルギーの<ruby>効率<rt>こうりつ</rt></ruby>を<ruby>飛躍<rt>ひやく</rt></ruby><ruby>的<rt>てき</rt></ruby>に高める<ruby>次世代<rt>じせだい</rt></ruby>の<ruby>蓄電<rt>ちくでん</rt></ruby><ruby>技術<rt>ぎじゅつ</rt></ruby>や、<ruby>環境<rt>かんきょう</rt></ruby><ruby>配慮<rt>はいりょ</rt></ruby><ruby>型<rt>がた</rt></ruby>の新<ruby>素材<rt>そざい</rt></ruby>に<ruby>関心<rt>かんしん</rt></ruby>があります。","default_answer_original":"再生可能エネルギーの効率を飛躍的に高める次世代の蓄電技術や、環境配慮型の新素材に関心があります。"}]}');
const sec2 = /* @__PURE__ */ JSON.parse('{"steady":[{"category":"Discussion Intro & Pitch","text":"今日のトピックは何ですか。","audio":"/audio/Q109.mp3","text_original":"今日のトピックは何ですか。","defaultAnswer":"今日のトピックは日本の<ruby>伝統<rt>でんとう</rt></ruby><ruby>文化<rt>ぶんか</rt></ruby>についてです。","default_answer_original":"今日のトピックは日本の伝統文化についてです。"},{"category":"Discussion Intro & Pitch","text":"なぜこのトピックを<ruby>選<rt>えら</rt></ruby>びましたか。","audio":"/audio/Q110.mp3","text_original":"なぜこのトピックを選びましたか。","defaultAnswer":"<ruby>昔<rt>むかし</rt></ruby>からの<ruby>習慣<rt>しゅうかん</rt></ruby>や考え方に<ruby>興味<rt>きょうみ</rt></ruby>があったからです。","default_answer_original":"昔からの習慣や考え方に興味があったからです。"},{"category":"Discussion Intro & Pitch","text":"トピックについて、<ruby>簡単<rt>かんたん</rt></ruby>に話してください。","audio":"/audio/Q111.mp3","text_original":"トピックについて、簡単に話してください。","defaultAnswer":"日本の<ruby>茶道<rt>さどう</rt></ruby>や着物などの<ruby>文化<rt>ぶんか</rt></ruby>が<ruby>現代<rt>げんだい</rt></ruby>にどう生きているかについて<ruby>調<rt>しら</rt></ruby>べました。","default_answer_original":"日本の茶道や着物などの文化が現代にどう生きているかについて調べました。"},{"category":"Discussion Intro & Pitch","text":"どうしてこれに<ruby>興味<rt>きょうみ</rt></ruby>を持ちましたか。","audio":"/audio/Q112.mp3","text_original":"どうしてこれに興味を持ちましたか。","defaultAnswer":"日本の古い<ruby>歴史<rt>れきし</rt></ruby>と<ruby>現代<rt>げんだい</rt></ruby>の生活のつながりを知りたかったからです。","default_answer_original":"日本の古い歴史と現代の生活のつながりを知りたかったからです。"},{"category":"Discussion Intro & Pitch","text":"どんな本や<ruby>映画<rt>えいが</rt></ruby>を使いましたか。","audio":"/audio/Q113.mp3","text_original":"どんな本や映画を使いましたか。","defaultAnswer":"日本の<ruby>伝統<rt>でんとう</rt></ruby><ruby>に関<rt>にかん</rt></ruby>するドキュメンタリー<ruby>映画<rt>えいが</rt></ruby>やウェブサイトを使いました。","default_answer_original":"日本の伝統に関するドキュメンタリー映画やウェブサイトを使いました。"},{"category":"Discussion Intro & Pitch","text":"その<ruby>資料<rt>しりょう</rt></ruby>から何を勉強しましたか。","audio":"/audio/Q114.mp3","text_original":"その資料から何を勉強しましたか。","defaultAnswer":"<ruby>文化<rt>ぶんか</rt></ruby>を<ruby>大切<rt>たいせつ</rt></ruby>にする<ruby>心<rt>こころ</rt></ruby>や、<ruby>礼儀<rt>れいぎ</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>を学びました。","default_answer_original":"文化を大切にする心や、礼儀の重要性を学びました。"},{"category":"Clarification & Details","text":"もう少し<ruby>詳<rt>くわ</rt></ruby>しく教えてください。","audio":"/audio/Q115.mp3","text_original":"もう少し詳しく教えてください。","defaultAnswer":"<ruby>例<rt>たと</rt></ruby>えば、<ruby>茶道<rt>さどう</rt></ruby>におけるおもてなしの<ruby>精神<rt>せいしん</rt></ruby>について<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>説明<rt>せつめい</rt></ruby>します。","default_answer_original":"例えば、茶道におけるおもてなしの精神について具体的に説明します。"},{"category":"Clarification & Details","text":"<ruby>例<rt>たと</rt></ruby>えば、どんなことがありますか。","audio":"/audio/Q116.mp3","text_original":"例えば、どんなことがありますか。","defaultAnswer":"<ruby>季節<rt>きせつ</rt></ruby><ruby>感<rt>かん</rt></ruby>を<ruby>大切<rt>たいせつ</rt></ruby>にする<ruby>和菓子<rt>わがし</rt></ruby>や、<ruby>掛け軸<rt>かけじく</rt></ruby>の<ruby>選び方<rt>えらびかた</rt></ruby>などがあります。","default_answer_original":"季節感を大切にする和菓子や、掛け軸の選び方などがあります。"},{"category":"Clarification & Details","text":"それはいつから始まりましたか。","audio":"/audio/Q117.mp3","text_original":"それはいつから始まりましたか。","defaultAnswer":"<ruby>室町<rt>むろまち</rt></ruby><ruby>時代<rt>じだい</rt></ruby><ruby>頃<rt>ごろ</rt></ruby>から広く<ruby>発展<rt>はってん</rt></ruby>したと言われています。","default_answer_original":"室町時代頃から広く発展したと言われています。"},{"category":"Clarification & Details","text":"どんな人が<ruby>関係<rt>かんけい</rt></ruby>していますか。","audio":"/audio/Q118.mp3","text_original":"どんな人が関係していますか。","defaultAnswer":"<ruby>職人<rt>しょくにん</rt></ruby>や<ruby>茶道<rt>さどう</rt></ruby>家、そしてそれを<ruby>継承<rt>けいしょう</rt></ruby>する人々が<ruby>関係<rt>かんけい</rt></ruby>しています。","default_answer_original":"職人や茶道家、そしてそれを継承する人々が関係しています。"},{"category":"Clarification & Details","text":"<ruby>資料<rt>しりょう</rt></ruby>には何が書いてありましたか。","audio":"/audio/Q119.mp3","text_original":"資料には何が書いてありましたか。","defaultAnswer":"<ruby>現代<rt>げんだい</rt></ruby>でもその<ruby>伝統<rt>でんとう</rt></ruby>を<ruby>守<rt>まも</rt></ruby>ろうとする人々の<ruby>取り組<rt>とりく</rt></ruby>みが<ruby>紹介<rt>しょうかい</rt></ruby>されていました。","default_answer_original":"現代でもその伝統を守ろうとする人々の取り組みが紹介されていました。"},{"category":"Reasons & Justifications","text":"それはどうしてですか。","audio":"/audio/Q120.mp3","text_original":"それはどうしてですか。","defaultAnswer":"デジタル<ruby>化<rt>か</rt></ruby>が<ruby>進<rt>すす</rt></ruby>む中で、<ruby>心<rt>こころ</rt></ruby>の<ruby>豊<rt>ゆた</rt></ruby>かさを<ruby>求<rt>もと</rt></ruby>める人が<ruby>増<rt>ふ</rt></ruby>えているからです。","default_answer_original":"デジタル化が進む中で、心の豊かさを求める人が増えているからです。"},{"category":"Reasons & Justifications","text":"なぜそう思いますか。","audio":"/audio/Q121.mp3","text_original":"なぜそう思いますか。","defaultAnswer":"<ruby>資料<rt>しりょう</rt></ruby>の中で多くの<ruby>若<rt>わか</rt></ruby>い<ruby>世代<rt>せだい</rt></ruby>も<ruby>体験<rt>たいけん</rt></ruby>イベントに<ruby>参加<rt>さんか</rt></ruby>しているデータを見たからです。","default_answer_original":"資料の中で多くの若い世代も体験イベントに参加しているデータを見たからです。"},{"category":"Reasons & Justifications","text":"<ruby>理由<rt>りゆう</rt></ruby>を教えてください。","audio":"/audio/Q122.mp3","text_original":"理由を教えてください。","defaultAnswer":"<ruby>伝統<rt>でんとう</rt></ruby><ruby>文化<rt>ぶんか</rt></ruby>は国のアイデンティティを<ruby>保<rt>たも</rt></ruby>つために<ruby>欠<rt>か</rt></ruby>かせないからです。","default_answer_original":"伝統文化は国のアイデンティティを保つために欠かせないからです。"},{"category":"Reasons & Justifications","text":"なぜこれが大きな<ruby>問題<rt>もんだい</rt></ruby>ですか。","audio":"/audio/Q123.mp3","text_original":"なぜこれが大きな問題ですか。","defaultAnswer":"<ruby>後継<rt>こうけい</rt></ruby><ruby>者<rt>しゃ</rt></ruby><ruby>不足<rt>ふそく</rt></ruby>によって、<ruby>貴重<rt>きちょう</rt></ruby>な<ruby>技術<rt>ぎじゅつ</rt></ruby>が<ruby>失<rt>うしな</rt></ruby>われつつあるからです。","default_answer_original":"後継者不足によって、貴重な技術が失われつつあるからです。"},{"category":"Impacts, Pros & Cons","text":"どんないい点がありますか。","audio":"/audio/Q124.mp3","text_original":"どんないい点がありますか。","defaultAnswer":"リラックス<ruby>効果<rt>こうか</rt></ruby>があり、<ruby>精神<rt>せいしん</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>落ち着<rt>おちつ</rt></ruby>きを<ruby>得<rt>え</rt></ruby>られる点です。","default_answer_original":"リラックス効果があり、精神的な落ち着きを得られる点です。"},{"category":"Impacts, Pros & Cons","text":"どんな<ruby>悪<rt>わる</rt></ruby>い点、<ruby>問題<rt>もんだい</rt></ruby>、がありますか。","audio":"/audio/Q125.mp3","text_original":"どんな悪い点、問題、がありますか。","defaultAnswer":"学ぶための時間やお金がかかることがハードルになります。","default_answer_original":"学ぶための時間やお金がかかることがハードルになります。"},{"category":"Impacts, Pros & Cons","text":"私たちの生活にどんな<ruby>影響<rt>えいきょう</rt></ruby>がありますか。","audio":"/audio/Q126.mp3","text_original":"私たちの生活にどんな影響がありますか。","defaultAnswer":"日々の<ruby>忙<rt>いそが</rt></ruby>しい生活の中で、自分を見つめ<ruby>直<rt>なお</rt></ruby>す<ruby>良<rt>よ</rt></ruby>いきっかけになります。","default_answer_original":"日々の忙しい生活の中で、自分を見つめ直す良いきっかけになります。"},{"category":"Impacts, Pros & Cons","text":"だれが一番<ruby>困<rt>こま</rt></ruby>っていますか。","audio":"/audio/Q127.mp3","text_original":"だれが一番困っていますか。","defaultAnswer":"<ruby>伝統<rt>でんとう</rt></ruby><ruby>工芸<rt>こうげい</rt></ruby>の<ruby>職人<rt>しょくにん</rt></ruby>など、<ruby>収入<rt>しゅうにゅう</rt></ruby>が<ruby>不安定<rt>ふあんてい</rt></ruby>で後を<ruby>継<rt>つ</rt></ruby>ぐ人がいない方々です。","default_answer_original":"伝統工芸の職人など、収入が不安定で後を継ぐ人がいない方々です。"},{"category":"Comparison & Contrast","text":"<ruby>昔<rt>むかし</rt></ruby>と今で、何が<ruby>変<rt>か</rt></ruby>わりましたか。","audio":"/audio/Q128.mp3","text_original":"昔と今で、何が変わりましたか。","defaultAnswer":"<ruby>昔<rt>むかし</rt></ruby>は<ruby>日常<rt>にちじょう</rt></ruby><ruby>的<rt>てき</rt></ruby>だったものが、<ruby>現在<rt>げんざい</rt></ruby>は<ruby>特別<rt>とくべつ</rt></ruby>な行事として<ruby>体験<rt>たいけん</rt></ruby>されるようになりました。","default_answer_original":"昔は日常的だったものが、現在は特別な行事として体験されるようになりました。"},{"category":"Comparison & Contrast","text":"日本とオーストラリアの<ruby>違<rt>ちが</rt></ruby>いは何ですか。","audio":"/audio/Q129.mp3","text_original":"日本とオーストラリアの違いは何ですか。","defaultAnswer":"日本には<ruby>数<rt>すう</rt></ruby>百年<ruby>続<rt>つづ</rt></ruby>く古い<ruby>歴史<rt>れきし</rt></ruby>や<ruby>伝統<rt>でんとう</rt></ruby>が<ruby>身近<rt>みぢか</rt></ruby>にありますが、オーストラリアは多<ruby>文化<rt>ぶんか</rt></ruby>の新しい<ruby>歴史<rt>れきし</rt></ruby>が<ruby>中心<rt>ちゅうしん</rt></ruby>です。","default_answer_original":"日本には数百年続く古い歴史や伝統が身近にありますが、オーストラリアは多文化の新しい歴史が中心です。"},{"category":"Comparison & Contrast","text":"<ruby>若<rt>わか</rt></ruby>い人と大人の考え方は<ruby>違<rt>ちが</rt></ruby>いますか。","audio":"/audio/Q130.mp3","text_original":"若い人と大人の考え方は違いますか。","defaultAnswer":"大人は<ruby>形<rt>かたち</rt></ruby>や<ruby>礼儀<rt>れいぎ</rt></ruby>を<ruby>重<rt>おも</rt></ruby>んじる<ruby>傾向<rt>けいこう</rt></ruby>がありますが、<ruby>若<rt>わか</rt></ruby>い人は<ruby>現代<rt>げんだい</rt></ruby><ruby>風<rt>ふう</rt></ruby>にアレンジすることに<ruby>関心<rt>かんしん</rt></ruby>があります。","default_answer_original":"大人は形や礼儀を重んじる傾向がありますが、若い人は現代風にアレンジすることに関心があります。"},{"category":"Comparison & Contrast","text":"あなたの国でも同じですか。","audio":"/audio/Q131.mp3","text_original":"あなたの国でも同じですか。","defaultAnswer":"オーストラリアでも<ruby>先住民<rt>せんじゅうみん</rt></ruby>族の<ruby>文化<rt>ぶんか</rt></ruby>を<ruby>大切<rt>たいせつ</rt></ruby>にする動きがあり、<ruby>似<rt>に</rt></ruby>た<ruby>面<rt>めん</rt></ruby>があります。","default_answer_original":"オーストラリアでも先住民族の文化を大切にする動きがあり、似た面があります。"},{"category":"Opinions & Stance","text":"あなたはどう思いますか。","audio":"/audio/Q132.mp3","text_original":"あなたはどう思いますか。","defaultAnswer":"<ruby>伝統<rt>でんとう</rt></ruby>は<ruby>守<rt>まも</rt></ruby>りつつも、<ruby>時代<rt>じだい</rt></ruby>に<ruby>合<rt>あ</rt></ruby>わせて<ruby>変化<rt>へんか</rt></ruby>していくべきだと思います。","default_answer_original":"伝統は守りつつも、時代に合わせて変化していくべきだと思います。"},{"category":"Opinions & Stance","text":"それに<ruby>賛成<rt>さんせい</rt></ruby>ですか、<ruby>反対<rt>はんたい</rt></ruby>ですか。","audio":"/audio/Q133.mp3","text_original":"それに賛成ですか、反対ですか。","defaultAnswer":"はい、その考え方に<ruby>賛成<rt>さんせい</rt></ruby>です。","default_answer_original":"はい、その考え方に賛成です。"},{"category":"Opinions & Stance","text":"あなたなら、どうしますか。","audio":"/audio/Q134.mp3","text_original":"あなたなら、どうしますか。","defaultAnswer":"私<ruby>自身<rt>じしん</rt></ruby>も<ruby>実際<rt>じっさい</rt></ruby>に<ruby>体験<rt>たいけん</rt></ruby>してみて、その<ruby>魅力<rt>みりょく</rt></ruby>をSNS<ruby>等<rt>とう</rt></ruby>で<ruby>発信<rt>はっしん</rt></ruby>したいです。","default_answer_original":"私自身も実際に体験してみて、その魅力をSNS等で発信したいです。"},{"category":"Solutions & Future Prospects","text":"どうやってこの<ruby>問題<rt>もんだい</rt></ruby>を<ruby>解決<rt>かいけつ</rt></ruby>しますか。","audio":"/audio/Q135.mp3","text_original":"どうやってこの問題を解決しますか。","defaultAnswer":"学校<ruby>教育<rt>きょういく</rt></ruby>に<ruby>取り入<rt>とりい</rt></ruby>れたり、海外に<ruby>向<rt>む</rt></ruby>けてオンラインで<ruby>紹介<rt>しょうかい</rt></ruby>することが<ruby>有効<rt>ゆうこう</rt></ruby>だと思います。","default_answer_original":"学校教育に取り入れたり、海外に向けてオンラインで紹介することが有効だと思います。"},{"category":"Solutions & Future Prospects","text":"私たちは何をするべきですか。","audio":"/audio/Q136.mp3","text_original":"私たちは何をするべきですか。","defaultAnswer":"まずは自分たちの国の<ruby>文化<rt>ぶんか</rt></ruby>や、<ruby>他<rt>た</rt></ruby>の国の<ruby>文化<rt>ぶんか</rt></ruby>に<ruby>関心<rt>かんしん</rt></ruby>を持つことが<ruby>大切<rt>たいせつ</rt></ruby>です。","default_answer_original":"まずは自分たちの国の文化や、他の国の文化に関心を持つことが大切です。"},{"category":"Solutions & Future Prospects","text":"<ruby>将来<rt>しょうらい</rt></ruby>、どうなると思いますか。","audio":"/audio/Q137.mp3","text_original":"将来、どうなると思いますか。","defaultAnswer":"<ruby>デジタル技術<rt>でじたるぎじゅつ</rt></ruby>を<ruby>活用<rt>かつよう</rt></ruby>して、<ruby>世界中<rt>せかいじゅう</rt></ruby>から<ruby>簡単<rt>かんたん</rt></ruby>にアクセスできるようになると思います。","default_answer_original":"デジタル技術を活用して、世界中から簡単にアクセスできるようになると思います。"},{"category":"Solutions & Future Prospects","text":"今すぐできることは何ですか。","audio":"/audio/Q138.mp3","text_original":"今すぐできることは何ですか。","defaultAnswer":"本を読んだり、<ruby>関連<rt>かんれん</rt></ruby>するドキュメンタリーを見たりして<ruby>知識<rt>ちしき</rt></ruby>を<ruby>深<rt>ふか</rt></ruby>めることです。","default_answer_original":"本を読んだり、関連するドキュメンタリーを見たりして知識を深めることです。"},{"category":"Examiner Prompts & Counter-arguments","text":"でも、ほかの<ruby>意見<rt>いけん</rt></ruby>もありますよね。どう思いますか。","audio":"/audio/Q139.mp3","text_original":"でも、ほかの意見もありますよね。どう思いますか。","defaultAnswer":"<ruby>確<rt>たし</rt></ruby>かに古いものにこだわらず、新しいものを<ruby>取り入<rt>とりい</rt></ruby>れるべきだという<ruby>意見<rt>いけん</rt></ruby>も<ruby>理解<rt>りかい</rt></ruby>できます。","default_answer_original":"確かに古いものにこだわらず、新しいものを取り入れるべきだという意見も理解できます。"},{"category":"Examiner Prompts & Counter-arguments","text":"<ruby>本当<rt>ほんとう</rt></ruby>にそうですか。","audio":"/audio/Q140.mp3","text_original":"本当にそうですか。","defaultAnswer":"はい、私の<ruby>調<rt>しら</rt></ruby>べた<ruby>範囲<rt>はんい</rt></ruby>では多くの人がそう<ruby>感<rt>かん</rt></ruby>じていることが分かりました。","default_answer_original":"はい、私の調べた範囲では多くの人がそう感じていることが分かりました。"},{"category":"Examiner Prompts & Counter-arguments","text":"もしそうだったら、どうしますか。","audio":"/audio/Q141.mp3","text_original":"もしそうだったら、どうしますか。","defaultAnswer":"その<ruby>場合<rt>ばあい</rt></ruby>は<ruby>別<rt>べつ</rt></ruby>の<ruby>視点<rt>してん</rt></ruby>からアプローチ<ruby>方法<rt>ほうほう</rt></ruby>を<ruby>考え直<rt>かんがえなお</rt></ruby>す<ruby>必要<rt>ひつよう</rt></ruby>があります。","default_answer_original":"その場合は別の視点からアプローチ方法を考え直す必要があります。"},{"category":"Examiner Prompts & Counter-arguments","text":"<ruby>最後<rt>さいご</rt></ruby>に、一番言いたいことは何ですか。","audio":"/audio/Q142.mp3","text_original":"最後に、一番言いたいことは何ですか。","defaultAnswer":"<ruby>伝統<rt>でんとう</rt></ruby><ruby>文化<rt>ぶんか</rt></ruby>を<ruby>次世代<rt>じせだい</rt></ruby>に<ruby>残<rt>のこ</rt></ruby>すためには、私たち<ruby>若<rt>わか</rt></ruby>い<ruby>世代<rt>せだい</rt></ruby>の<ruby>関心<rt>かんしん</rt></ruby>が<ruby>不可欠<rt>ふかけつ</rt></ruby>だということです。","default_answer_original":"伝統文化を次世代に残すためには、私たち若い世代の関心が不可欠だということです。"}],"normal":[{"category":"Discussion Intro & Pitch","text":"今日のトピック、またはサブトピック、は何ですか。","audio":"/audio/Q258.mp3","text_original":"今日のトピック、またはサブトピック、は何ですか。","defaultAnswer":"今日のテーマは<ruby>現代<rt>げんだい</rt></ruby>社会における<ruby>環境<rt>かんきょう</rt></ruby><ruby>問題<rt>もんだい</rt></ruby>と<ruby>若者<rt>わかもの</rt></ruby>の<ruby>意識<rt>いしき</rt></ruby>についてです。","default_answer_original":"今日のテーマは現代社会における環境問題と若者の意識についてです。"},{"category":"Discussion Intro & Pitch","text":"なぜこのトピックを<ruby>選<rt>えら</rt></ruby>びましたか。","audio":"/audio/Q259.mp3","text_original":"なぜこのトピックを選びましたか。","defaultAnswer":"<ruby>地球<rt>ちきゅう</rt></ruby><ruby>温暖<rt>おんだん</rt></ruby><ruby>化<rt>か</rt></ruby>が<ruby>深刻<rt>しんこく</rt></ruby><ruby>化<rt>か</rt></ruby>する中、私たち<ruby>世代<rt>せだい</rt></ruby>が<ruby>果<rt>は</rt></ruby>たすべき<ruby>役割<rt>やくわり</rt></ruby>に<ruby>関心<rt>かんしん</rt></ruby>があったからです。","default_answer_original":"地球温暖化が深刻化する中、私たち世代が果たすべき役割に関心があったからです。"},{"category":"Discussion Intro & Pitch","text":"このトピックについて、<ruby>簡単<rt>かんたん</rt></ruby>に<ruby>説明<rt>せつめい</rt></ruby>してください。","audio":"/audio/Q260.mp3","text_original":"このトピックについて、簡単に説明してください。","defaultAnswer":"プラスチックごみの<ruby>削減<rt>さくげん</rt></ruby>やリサイクル活動<ruby>に対<rt>にたい</rt></ruby>する<ruby>若者<rt>わかもの</rt></ruby>の<ruby>取り組<rt>とりく</rt></ruby>みについて<ruby>調査<rt>ちょうさ</rt></ruby>しました。","default_answer_original":"プラスチックごみの削減やリサイクル活動に対する若者の取り組みについて調査しました。"},{"category":"Discussion Intro & Pitch","text":"そのテーマに<ruby>興味<rt>きょうみ</rt></ruby>を持ったきっかけは何ですか。","audio":"/audio/Q261.mp3","text_original":"そのテーマに興味を持ったきっかけは何ですか。","defaultAnswer":"学校の<ruby>授業<rt>じゅぎょう</rt></ruby>で海洋<ruby>汚染<rt>おせん</rt></ruby>のニュースを見たことがきっかけです。","default_answer_original":"学校の授業で海洋汚染のニュースを見たことがきっかけです。"},{"category":"Discussion Intro & Pitch","text":"この<ruby>研究<rt>けんきゅう</rt></ruby>をするために、どんな<ruby>資料<rt>しりょう</rt></ruby>、<ruby>記事<rt>きじ</rt></ruby>、本、<ruby>映画<rt>えいが</rt></ruby>など、を使いましたか。","audio":"/audio/Q262.mp3","text_original":"この研究をするために、どんな資料、記事、本、映画など、を使いましたか。","defaultAnswer":"<ruby>環境<rt>かんきょう</rt></ruby><ruby>保護<rt>ほご</rt></ruby><ruby>団体<rt>だんたい</rt></ruby>のレポートや、日本語のニュース<ruby>記事<rt>きじ</rt></ruby>、<ruby>関連<rt>かんれん</rt></ruby><ruby>書籍<rt>しょせき</rt></ruby>を<ruby>使用<rt>しよう</rt></ruby>しました。","default_answer_original":"環境保護団体のレポートや、日本語のニュース記事、関連書籍を使用しました。"},{"category":"Discussion Intro & Pitch","text":"その<ruby>資料<rt>しりょう</rt></ruby>から何を<ruby>取り上<rt>とりあ</rt></ruby>げましたか／何を学びましたか。","audio":"/audio/Q263.mp3","text_original":"その資料から何を取り上げましたか／何を学びましたか。","defaultAnswer":"<ruby>個人<rt>こじん</rt></ruby>の小さな行動の<ruby>積み重<rt>つみかさ</rt></ruby>ねが、大きな<ruby>変化<rt>へんか</rt></ruby>につながるということを学びました。","default_answer_original":"個人の小さな行動の積み重ねが、大きな変化につながるということを学びました。"},{"category":"Clarification & Details","text":"もう少し<ruby>詳<rt>くわ</rt></ruby>しく教えてください。","audio":"/audio/Q264.mp3","text_original":"もう少し詳しく教えてください。","defaultAnswer":"<ruby>例<rt>たと</rt></ruby>えば、<ruby>街頭<rt>がいとう</rt></ruby>でのエコバッグ<ruby>持参<rt>じさん</rt></ruby>の<ruby>呼<rt>よ</rt></ruby>びかけや、学校でのリサイクル<ruby>推進<rt>すいしん</rt></ruby>活動などがあります。","default_answer_original":"例えば、街頭でのエコバッグ持参の呼びかけや、学校でのリサイクル推進活動などがあります。"},{"category":"Clarification & Details","text":"<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に、どんな<ruby>例<rt>れい</rt></ruby>がありますか。","audio":"/audio/Q265.mp3","text_original":"具体的に、どんな例がありますか。","defaultAnswer":"マイボトルの<ruby>利用<rt>りよう</rt></ruby>を<ruby>徹底<rt>てってい</rt></ruby>する学生が<ruby>増<rt>ふ</rt></ruby>えていることが<ruby>挙<rt>あ</rt></ruby>げられます。","default_answer_original":"マイボトルの利用を徹底する学生が増えていることが挙げられます。"},{"category":"Clarification & Details","text":"それはいつ<ruby>頃<rt>ころ</rt></ruby>からの<ruby>問題<rt>もんだい</rt></ruby>、または<ruby>現象<rt>げんしょう</rt></ruby>、ですか。","audio":"/audio/Q266.mp3","text_original":"それはいつ頃からの問題、または現象、ですか。","defaultAnswer":"近年、<ruby>特<rt>とく</rt></ruby>にSNS<ruby>を通<rt>をつう</rt></ruby>じて<ruby>世界中<rt>せかいじゅう</rt></ruby>で<ruby>急速<rt>きゅうそく</rt></ruby>に<ruby>意識<rt>いしき</rt></ruby>が高まってきた<ruby>現象<rt>げんしょう</rt></ruby>です。","default_answer_original":"近年、特にSNSを通じて世界中で急速に意識が高まってきた現象です。"},{"category":"Clarification & Details","text":"その<ruby>背景<rt>はいけい</rt></ruby>には、どんな<ruby>事情<rt>じじょう</rt></ruby>がありますか。","audio":"/audio/Q267.mp3","text_original":"その背景には、どんな事情がありますか。","defaultAnswer":"<ruby>異常<rt>いじょう</rt></ruby><ruby>気象<rt>きしょう</rt></ruby>の<ruby>増加<rt>ぞうか</rt></ruby>などにより、<ruby>環境<rt>かんきょう</rt></ruby><ruby>破壊<rt>はかい</rt></ruby>の<ruby>危機<rt>きき</rt></ruby><ruby>感<rt>かん</rt></ruby>が<ruby>現実<rt>げんじつ</rt></ruby>のものとして<ruby>迫<rt>せま</rt></ruby>っている<ruby>事情<rt>じじょう</rt></ruby>があります。","default_answer_original":"異常気象の増加などにより、環境破壊の危機感が現実のものとして迫っている事情があります。"},{"category":"Clarification & Details","text":"どんな人がその<ruby>問題<rt>もんだい</rt></ruby>に<ruby>関<rt>かか</rt></ruby>わっていますか。","audio":"/audio/Q268.mp3","text_original":"どんな人がその問題に関わっていますか。","defaultAnswer":"<ruby>政治<rt>せいじ</rt></ruby>家や<ruby>企業<rt>きぎょう</rt></ruby>だけでなく、<ruby>若<rt>わか</rt></ruby>い学生やボランティア<ruby>団体<rt>だんたい</rt></ruby>など多くの人が<ruby>関<rt>かか</rt></ruby>わっています。","default_answer_original":"政治家や企業だけでなく、若い学生やボランティア団体など多くの人が関わっています。"},{"category":"Clarification & Details","text":"その<ruby>資料<rt>しりょう</rt></ruby>、または<ruby>映画<rt>えいが</rt></ruby>、<ruby>記事<rt>きじ</rt></ruby>、には、どんな<ruby>内容<rt>ないよう</rt></ruby>が書いてありましたか。","audio":"/audio/Q269.mp3","text_original":"その資料、または映画、記事、には、どんな内容が書いてありましたか。","defaultAnswer":"<ruby>企業<rt>きぎょう</rt></ruby><ruby>側<rt>がわ</rt></ruby>も<ruby>環境<rt>かんきょう</rt></ruby>に<ruby>配慮<rt>はいりょ</rt></ruby>した<ruby>製品<rt>せいひん</rt></ruby><ruby>開発<rt>かいはつ</rt></ruby>に<ruby>力<rt>ちから</rt></ruby>を入れているというデータが<ruby>記載<rt>きさい</rt></ruby>されていました。","default_answer_original":"企業側も環境に配慮した製品開発に力を入れているというデータが記載されていました。"},{"category":"Reasons & Justifications","text":"それはどうしてですか。","audio":"/audio/Q270.mp3","text_original":"それはどうしてですか。","defaultAnswer":"<ruby>未来<rt>みらい</rt></ruby>の<ruby>地球<rt>ちきゅう</rt></ruby>を<ruby>守<rt>まも</rt></ruby>ることは、私たちの<ruby>生存<rt>せいぞん</rt></ruby>に<ruby>直接<rt>ちょくせつ</rt></ruby>かかわる<ruby>重大<rt>じゅうだい</rt></ruby>な<ruby>課題<rt>かだい</rt></ruby>だからです。","default_answer_original":"未来の地球を守ることは、私たちの生存に直接かかわる重大な課題だからです。"},{"category":"Reasons & Justifications","text":"なぜそのように思いますか。どうしてそう考えますか。","audio":"/audio/Q271.mp3","text_original":"なぜそのように思いますか。どうしてそう考えますか。","defaultAnswer":"一人ひとりの<ruby>意識<rt>いしき</rt></ruby><ruby>改革<rt>かいかく</rt></ruby>がなければ、<ruby>根本<rt>こんぽん</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>解決<rt>かいけつ</rt></ruby>にならないと考えるからです。","default_answer_original":"一人ひとりの意識改革がなければ、根本的な解決にならないと考えるからです。"},{"category":"Reasons & Justifications","text":"その<ruby>理由<rt>りゆう</rt></ruby>を<ruby>説明<rt>せつめい</rt></ruby>できますか。","audio":"/audio/Q272.mp3","text_original":"その理由を説明できますか。","defaultAnswer":"<ruby>使い捨<rt>つかいす</rt></ruby>て<ruby>文化<rt>ぶんか</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>けると、<ruby>資源<rt>しげん</rt></ruby>が<ruby>枯渇<rt>こかつ</rt></ruby>し<ruby>取り返<rt>とりかえ</rt></ruby>しのつかない<ruby>事態<rt>じたい</rt></ruby>になるからです。","default_answer_original":"使い捨て文化を続けると、資源が枯渇し取り返しのつかない事態になるからです。"},{"category":"Reasons & Justifications","text":"なぜそれが大きな<ruby>問題<rt>もんだい</rt></ruby>になっているのですか。","audio":"/audio/Q273.mp3","text_original":"なぜそれが大きな問題になっているのですか。","defaultAnswer":"<ruby>地球<rt>ちきゅう</rt></ruby><ruby>規模<rt>きぼ</rt></ruby>での<ruby>影響<rt>えいきょう</rt></ruby>が<ruby>避<rt>さ</rt></ruby>けられず、<ruby>次世代<rt>じせだい</rt></ruby>に大きなツケを<ruby>残<rt>のこ</rt></ruby>すことになるからです。","default_answer_original":"地球規模での影響が避けられず、次世代に大きなツケを残すことになるからです。"},{"category":"Reasons & Justifications","text":"そう考える<ruby>根拠<rt>こんきょ</rt></ruby>は何ですか。","audio":"/audio/Q274.mp3","text_original":"そう考える根拠は何ですか。","defaultAnswer":"<ruby>科学<rt>かがく</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>気候<rt>きこう</rt></ruby><ruby>変動<rt>へんどう</rt></ruby>のデータや、生物<ruby>多様<rt>たよう</rt></ruby><ruby>性<rt>せい</rt></ruby>の<ruby>減少<rt>げんしょう</rt></ruby><ruby>に関<rt>にかん</rt></ruby>する<ruby>統計<rt>とうけい</rt></ruby>がその<ruby>根拠<rt>こんきょ</rt></ruby>です。","default_answer_original":"科学的な気候変動のデータや、生物多様性の減少に関する統計がその根拠です。"},{"category":"Impacts, Pros & Cons","text":"それには、どんないい点、メリット、長所、がありますか。","audio":"/audio/Q275.mp3","text_original":"それには、どんないい点、メリット、長所、がありますか。","defaultAnswer":"<ruby>環境<rt>かんきょう</rt></ruby>が<ruby>改善<rt>かいぜん</rt></ruby>されるだけでなく、人々が<ruby>協力<rt>きょうりょく</rt></ruby>し<ruby>合<rt>あ</rt></ruby>う<ruby>連帯<rt>れんたい</rt></ruby><ruby>感<rt>かん</rt></ruby>が生まれる点です。","default_answer_original":"環境が改善されるだけでなく、人々が協力し合う連帯感が生まれる点です。"},{"category":"Impacts, Pros & Cons","text":"<ruby>逆<rt>ぎゃく</rt></ruby>に、どんな<ruby>悪<rt>わる</rt></ruby>い点、デメリット、<ruby>短所<rt>たんしょ</rt></ruby>、<ruby>問題<rt>もんだい</rt></ruby>点、がありますか。","audio":"/audio/Q276.mp3","text_original":"逆に、どんな悪い点、デメリット、短所、問題点、がありますか。","defaultAnswer":"コストがかかったり、<ruby>個人<rt>こじん</rt></ruby>の生活スタイルを大きく<ruby>変<rt>か</rt></ruby>えなければならない<ruby>負担<rt>ふたん</rt></ruby>が生じる点です。","default_answer_original":"コストがかかったり、個人の生活スタイルを大きく変えなければならない負担が生じる点です。"},{"category":"Impacts, Pros & Cons","text":"それは人々の生活にどのような<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えていますか。","audio":"/audio/Q277.mp3","text_original":"それは人々の生活にどのような影響を与えていますか。","defaultAnswer":"よりエコフレンドリーな<ruby>製品<rt>せいひん</rt></ruby>を<ruby>選<rt>えら</rt></ruby>ぶなど、<ruby>消費<rt>しょうひ</rt></ruby>行動そのものが<ruby>変<rt>か</rt></ruby>わりつつあります。","default_answer_original":"よりエコフレンドリーな製品を選ぶなど、消費行動そのものが変わりつつあります。"},{"category":"Impacts, Pros & Cons","text":"社会、または<ruby>環境<rt>かんきょう</rt></ruby>、<ruby>若者<rt>わかもの</rt></ruby>、にとって、どんなプラス／マイナスの<ruby>効果<rt>こうか</rt></ruby>がありますか。","audio":"/audio/Q278.mp3","text_original":"社会、または環境、若者、にとって、どんなプラス／マイナスの効果がありますか。","defaultAnswer":"プラス<ruby>面<rt>めん</rt></ruby>は<ruby>持続<rt>じぞく</rt></ruby><ruby>可能<rt>かのう</rt></ruby>な社会への<ruby>意識<rt>いしき</rt></ruby>が高まることで、マイナス<ruby>面<rt>めん</rt></ruby>は<ruby>経済<rt>けいざい</rt></ruby><ruby>的<rt>てき</rt></ruby>なコストの<ruby>負担<rt>ふたん</rt></ruby>です。","default_answer_original":"プラス面は持続可能な社会への意識が高まることで、マイナス面は経済的なコストの負担です。"},{"category":"Impacts, Pros & Cons","text":"それによって、だれが一番<ruby>困<rt>こま</rt></ruby>っていますか／<ruby>得<rt>とく</rt></ruby>をしていますか。","audio":"/audio/Q279.mp3","text_original":"それによって、だれが一番困っていますか／得をしていますか。","defaultAnswer":"<ruby>環境<rt>かんきょう</rt></ruby><ruby>規制<rt>きせい</rt></ruby>によって一時<ruby>的<rt>てき</rt></ruby>に<ruby>打撃<rt>だげき</rt></ruby>を<ruby>受<rt>う</rt></ruby>ける<ruby>従来<rt>じゅうらい</rt></ruby>の<ruby>製造<rt>せいぞう</rt></ruby><ruby>業<rt>ぎょう</rt></ruby>が<ruby>困<rt>こま</rt></ruby>る一方、<ruby>地球<rt>ちきゅう</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby><ruby>全体<rt>ぜんたい</rt></ruby>が<ruby>得<rt>とく</rt></ruby>をします。","default_answer_original":"環境規制によって一時的に打撃を受ける従来の製造業が困る一方、地球環境全体が得をします。"},{"category":"Comparison & Contrast","text":"<ruby>昔<rt>むかし</rt></ruby>と今とで、何が<ruby>変<rt>か</rt></ruby>わりましたか。","audio":"/audio/Q280.mp3","text_original":"昔と今とで、何が変わりましたか。","defaultAnswer":"<ruby>昔<rt>むかし</rt></ruby>は<ruby>便利<rt>べんり</rt></ruby>さが<ruby>優先<rt>ゆうせん</rt></ruby>されていましたが、<ruby>現在<rt>げんざい</rt></ruby>は<ruby>環境<rt>かんきょう</rt></ruby>への<ruby>配慮<rt>はいりょ</rt></ruby>が<ruby>重視<rt>じゅうし</rt></ruby>されるようになりました。","default_answer_original":"昔は便利さが優先されていましたが、現在は環境への配慮が重視されるようになりました。"},{"category":"Comparison & Contrast","text":"日本とオーストラリア、または<ruby>他<rt>た</rt></ruby>の国、の<ruby>違<rt>ちが</rt></ruby>いは何ですか。","audio":"/audio/Q281.mp3","text_original":"日本とオーストラリア、または他の国、の違いは何ですか。","defaultAnswer":"日本はプラスチック<ruby>包装<rt>ほうそう</rt></ruby>の<ruby>削減<rt>さくげん</rt></ruby>に<ruby>独特<rt>どくとく</rt></ruby>の<ruby>課題<rt>かだい</rt></ruby>があり、オーストラリアは広大な<ruby>自然<rt>しぜん</rt></ruby><ruby>保護<rt>ほご</rt></ruby>に<ruby>力<rt>ちから</rt></ruby>を入れています。","default_answer_original":"日本はプラスチック包装の削減に独特の課題があり、オーストラリアは広大な自然保護に力を入れています。"},{"category":"Comparison & Contrast","text":"<ruby>若<rt>わか</rt></ruby>い人と古い<ruby>世代<rt>せだい</rt></ruby>、お<ruby>年寄<rt>としよ</rt></ruby>り、とで、考え方に<ruby>違<rt>ちが</rt></ruby>いはありますか。","audio":"/audio/Q282.mp3","text_original":"若い人と古い世代、お年寄り、とで、考え方に違いはありますか。","defaultAnswer":"<ruby>若<rt>わか</rt></ruby>い<ruby>世代<rt>せだい</rt></ruby>のほうがSNS<ruby>を通<rt>をつう</rt></ruby>じて<ruby>迅速<rt>じんそく</rt></ruby>に<ruby>情報<rt>じょうほう</rt></ruby>を<ruby>共有<rt>きょうゆう</rt></ruby>し、行動に<ruby>移<rt>うつ</rt></ruby>す<ruby>傾向<rt>けいこう</rt></ruby>が強いです。","default_answer_original":"若い世代のほうがSNSを通じて迅速に情報を共有し、行動に移す傾向が強いです。"},{"category":"Comparison & Contrast","text":"あなたの国でも同じようなことがありますか。","audio":"/audio/Q283.mp3","text_original":"あなたの国でも同じようなことがありますか。","defaultAnswer":"はい、オーストラリアでも学校や<ruby>地域<rt>ちいき</rt></ruby>社会で<ruby>同様<rt>どうよう</rt></ruby>の<ruby>環境<rt>かんきょう</rt></ruby><ruby>保護<rt>ほご</rt></ruby><ruby>運動<rt>うんどう</rt></ruby>が行われています。","default_answer_original":"はい、オーストラリアでも学校や地域社会で同様の環境保護運動が行われています。"},{"category":"Comparison & Contrast","text":"<ruby>他<rt>た</rt></ruby>の<ruby>解決<rt>かいけつ</rt></ruby><ruby>方法<rt>ほうほう</rt></ruby>や<ruby>選択肢<rt>せんたくし</rt></ruby>と<ruby>比<rt>くら</rt></ruby>べて、どうですか。","audio":"/audio/Q284.mp3","text_original":"他の解決方法や選択肢と比べて、どうですか。","defaultAnswer":"<ruby>法律<rt>ほうりつ</rt></ruby>による<ruby>規制<rt>きせい</rt></ruby>だけでなく、<ruby>教育<rt>きょういく</rt></ruby>を<ruby>通<rt>つう</rt></ruby>じた<ruby>意識<rt>いしき</rt></ruby><ruby>改革<rt>かいかく</rt></ruby>のほうが<ruby>長期<rt>ちょうき</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>効果<rt>こうか</rt></ruby><ruby>的<rt>てき</rt></ruby>だと思います。","default_answer_original":"法律による規制だけでなく、教育を通じた意識改革のほうが長期的に効果的だと思います。"},{"category":"Opinions & Stance","text":"あなた<ruby>自身<rt>じしん</rt></ruby>は、これについてどう思いますか。どう<ruby>感<rt>かん</rt></ruby>じますか。","audio":"/audio/Q285.mp3","text_original":"あなた自身は、これについてどう思いますか。どう感じますか。","defaultAnswer":"一人ひとりが<ruby>当事者<rt>とうじしゃ</rt></ruby><ruby>意識<rt>いしき</rt></ruby>を持って行動することが何よりも<ruby>重要<rt>じゅうよう</rt></ruby>だと<ruby>感<rt>かん</rt></ruby>じています。","default_answer_original":"一人ひとりが当事者意識を持って行動することが何よりも重要だと感じています。"},{"category":"Opinions & Stance","text":"その考えに<ruby>賛成<rt>さんせい</rt></ruby>ですか、それとも<ruby>反対<rt>はんたい</rt></ruby>ですか。","audio":"/audio/Q286.mp3","text_original":"その考えに賛成ですか、それとも反対ですか。","defaultAnswer":"もちろん<ruby>賛成<rt>さんせい</rt></ruby>です。","default_answer_original":"もちろん賛成です。"},{"category":"Opinions & Stance","text":"その<ruby>状況<rt>じょうきょう</rt></ruby>、または<ruby>問題<rt>もんだい</rt></ruby>、について、どう<ruby>感<rt>かん</rt></ruby>じましたか。","audio":"/audio/Q287.mp3","text_original":"その状況、または問題、について、どう感じましたか。","defaultAnswer":"<ruby>事態<rt>じたい</rt></ruby>がここまで<ruby>深刻<rt>しんこく</rt></ruby>になる前に、もっと早く<ruby>対策<rt>たいさく</rt></ruby>すべきだったと<ruby>感<rt>かん</rt></ruby>じました。","default_answer_original":"事態がここまで深刻になる前に、もっと早く対策すべきだったと感じました。"},{"category":"Opinions & Stance","text":"あなたなら、どうしますか。","audio":"/audio/Q288.mp3","text_original":"あなたなら、どうしますか。","defaultAnswer":"私<ruby>自身<rt>じしん</rt></ruby>もマイバッグやマイボトルの<ruby>使用<rt>しよう</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>け、<ruby>周囲<rt>しゅうい</rt></ruby>にも<ruby>伝<rt>つた</rt></ruby>えていきたいです。","default_answer_original":"私自身もマイバッグやマイボトルの使用を続け、周囲にも伝えていきたいです。"},{"category":"Solutions & Future Prospects","text":"この<ruby>問題<rt>もんだい</rt></ruby>を<ruby>解決<rt>かいけつ</rt></ruby>するために、どんなことができますか。","audio":"/audio/Q289.mp3","text_original":"この問題を解決するために、どんなことができますか。","defaultAnswer":"プラスチック<ruby>製品<rt>せいひん</rt></ruby>の<ruby>使用<rt>しよう</rt></ruby>を<ruby>減<rt>へ</rt></ruby>らし、リサイクルを<ruby>徹底<rt>てってい</rt></ruby>することが<ruby>挙<rt>あ</rt></ruby>げられます。","default_answer_original":"プラスチック製品の使用を減らし、リサイクルを徹底することが挙げられます。"},{"category":"Solutions & Future Prospects","text":"<ruby>政府<rt>せいふ</rt></ruby>、または学校、社会、<ruby>個人<rt>こじん</rt></ruby>は、何をするべきだと思いますか。","audio":"/audio/Q290.mp3","text_original":"政府、または学校、社会、個人は、何をするべきだと思いますか。","defaultAnswer":"<ruby>政府<rt>せいふ</rt></ruby>は<ruby>法<rt>ほう</rt></ruby><ruby>整備<rt>せいび</rt></ruby>を<ruby>進<rt>すす</rt></ruby>め、<ruby>個人<rt>こじん</rt></ruby>は日々の生活でエコな<ruby>選択<rt>せんたく</rt></ruby>をするべきです。","default_answer_original":"政府は法整備を進め、個人は日々の生活でエコな選択をするべきです。"},{"category":"Solutions & Future Prospects","text":"<ruby>将来<rt>しょうらい</rt></ruby>、この<ruby>状況<rt>じょうきょう</rt></ruby>はどうなっていくと思いますか。どう<ruby>変<rt>か</rt></ruby>わると思いますか。","audio":"/audio/Q291.mp3","text_original":"将来、この状況はどうなっていくと思いますか。どう変わると思いますか。","defaultAnswer":"<ruby>技術<rt>ぎじゅつ</rt></ruby>の<ruby>発展<rt>はってん</rt></ruby>により、<ruby>環境<rt>かんきょう</rt></ruby>に<ruby>優<rt>やさ</rt></ruby>しい新<ruby>素材<rt>そざい</rt></ruby>が<ruby>普及<rt>ふきゅう</rt></ruby>して<ruby>状況<rt>じょうきょう</rt></ruby>は<ruby>改善<rt>かいぜん</rt></ruby>に<ruby>向<rt>む</rt></ruby>かうと<ruby>期待<rt>きたい</rt></ruby>しています。","default_answer_original":"技術の発展により、環境に優しい新素材が普及して状況は改善に向かうと期待しています。"},{"category":"Solutions & Future Prospects","text":"私たちが今すぐできることは何ですか。","audio":"/audio/Q292.mp3","text_original":"私たちが今すぐできることは何ですか。","defaultAnswer":"<ruby>無駄<rt>むだ</rt></ruby>なエネルギーの<ruby>消費<rt>しょうひ</rt></ruby>を<ruby>抑<rt>おさ</rt></ruby>え、ゴミの<ruby>分別<rt>ふんべつ</rt></ruby>をしっかり行うことです。","default_answer_original":"無駄なエネルギーの消費を抑え、ゴミの分別をしっかり行うことです。"},{"category":"Solutions & Future Prospects","text":"これからどんな<ruby>対策<rt>たいさく</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>だと考えますか。","audio":"/audio/Q293.mp3","text_original":"これからどんな対策が必要だと考えますか。","defaultAnswer":"<ruby>国際<rt>こくさい</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>枠組<rt>わくぐ</rt></ruby>みを作って、<ruby>国境<rt>こっきょう</rt></ruby>を<ruby>越<rt>こ</rt></ruby>えて<ruby>協力<rt>きょうりょく</rt></ruby>し<ruby>合<rt>あ</rt></ruby>う<ruby>体制<rt>たいせい</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。","default_answer_original":"国際的な枠組みを作って、国境を越えて協力し合う体制が必要です。"},{"category":"Examiner Prompts & Counter-arguments","text":"でも、こんな考え方、<ruby>意見<rt>いけん</rt></ruby>もありますよね。それについてはどう思いますか。","audio":"/audio/Q294.mp3","text_original":"でも、こんな考え方、意見もありますよね。それについてはどう思いますか。","defaultAnswer":"<ruby>経済<rt>けいざい</rt></ruby><ruby>成長<rt>せいちょう</rt></ruby>を<ruby>優先<rt>ゆうせん</rt></ruby>すべきだという<ruby>意見<rt>いけん</rt></ruby>もありますが、<ruby>環境<rt>かんきょう</rt></ruby><ruby>破壊<rt>はかい</rt></ruby>が<ruby>進<rt>すす</rt></ruby>めば元も子もないと考えます。","default_answer_original":"経済成長を優先すべきだという意見もありますが、環境破壊が進めば元も子もないと考えます。"},{"category":"Examiner Prompts & Counter-arguments","text":"このように言われていますが、<ruby>本当<rt>ほんとう</rt></ruby>にそうですか。","audio":"/audio/Q295.mp3","text_original":"このように言われていますが、本当にそうですか。","defaultAnswer":"はい、<ruby>過去<rt>かこ</rt></ruby>のデータや<ruby>専門<rt>せんもん</rt></ruby>家の<ruby>意見<rt>いけん</rt></ruby>を<ruby>基<rt>もと</rt></ruby>にしてもその<ruby>通<rt>とお</rt></ruby>りだと言えます。","default_answer_original":"はい、過去のデータや専門家の意見を基にしてもその通りだと言えます。"},{"category":"Examiner Prompts & Counter-arguments","text":"もしそうだったら、どうなりますか。","audio":"/audio/Q296.mp3","text_original":"もしそうだったら、どうなりますか。","defaultAnswer":"もし<ruby>対策<rt>たいさく</rt></ruby>が<ruby>遅<rt>おく</rt></ruby>れれば、<ruby>地球<rt>ちきゅう</rt></ruby><ruby>環境<rt>かんきょう</rt></ruby>は<ruby>取り返<rt>とりかえ</rt></ruby>しのつかないダメージを<ruby>受<rt>う</rt></ruby>けるでしょう。","default_answer_original":"もし対策が遅れれば、地球環境は取り返しのつかないダメージを受けるでしょう。"},{"category":"Examiner Prompts & Counter-arguments","text":"つまり、あなたの<ruby>意見<rt>いけん</rt></ruby>はどういうことですか。","audio":"/audio/Q297.mp3","text_original":"つまり、あなたの意見はどういうことですか。","defaultAnswer":"つまり、<ruby>持続<rt>じぞく</rt></ruby><ruby>可能<rt>かのう</rt></ruby>な<ruby>未来<rt>みらい</rt></ruby>を作るためには今すぐ行動を<ruby>起<rt>お</rt></ruby>こすべきだということです。","default_answer_original":"つまり、持続可能な未来を作るためには今すぐ行動を起こすべきだということです。"},{"category":"Examiner Prompts & Counter-arguments","text":"<ruby>最後<rt>さいご</rt></ruby>に、このトピックについて一番<ruby>伝<rt>つた</rt></ruby>えたいことは何ですか。","audio":"/audio/Q298.mp3","text_original":"最後に、このトピックについて一番伝えたいことは何ですか。","defaultAnswer":"<ruby>環境<rt>かんきょう</rt></ruby><ruby>問題<rt>もんだい</rt></ruby>は<ruby>他<rt>た</rt></ruby>人事ではなく、私たち<ruby>全員<rt>ぜんいん</rt></ruby>の<ruby>共通<rt>きょうつう</rt></ruby>の<ruby>責任<rt>せきにん</rt></ruby>であるということです。","default_answer_original":"環境問題は他人事ではなく、私たち全員の共通の責任であるということです。"}],"accelerated":[{"category":"Discussion Intro & Pitch","text":"今回<ruby>取り上<rt>とりあ</rt></ruby>げる<ruby>研究<rt>けんきゅう</rt></ruby>テーマ、サブトピックと、そのポイントを教えてください。","audio":"/audio/Q415.mp3","text_original":"今回取り上げる研究テーマ、サブトピックと、そのポイントを教えてください。","defaultAnswer":"今回<ruby>取り上<rt>とりあ</rt></ruby>げるテーマは、テクノロジーの<ruby>進化<rt>しんか</rt></ruby>が<ruby>教育<rt>きょういく</rt></ruby><ruby>現場<rt>げんば</rt></ruby>に<ruby>与<rt>あた</rt></ruby>える<ruby>影響<rt>えいきょう</rt></ruby>とその<ruby>可能<rt>かのう</rt></ruby><ruby>性<rt>せい</rt></ruby>についてです。","default_answer_original":"今回取り上げるテーマは、テクノロジーの進化が教育現場に与える影響とその可能性についてです。"},{"category":"Discussion Intro & Pitch","text":"<ruby>数<rt>かず</rt></ruby>あるテーマの中で、なぜこの<ruby>問題<rt>もんだい</rt></ruby>に<ruby>注目<rt>ちゅうもく</rt></ruby>しましたか。","audio":"/audio/Q416.mp3","text_original":"数あるテーマの中で、なぜこの問題に注目しましたか。","defaultAnswer":"オンライン学習やAIの<ruby>導入<rt>どうにゅう</rt></ruby>によって、学びの<ruby>形<rt>かたち</rt></ruby>が<ruby>劇的<rt>げきてき</rt></ruby>に<ruby>変化<rt>へんか</rt></ruby>している点に強い<ruby>関心<rt>かんしん</rt></ruby>があったからです。","default_answer_original":"オンライン学習やAIの導入によって、学びの形が劇的に変化している点に強い関心があったからです。"},{"category":"Discussion Intro & Pitch","text":"<ruby>研究<rt>けんきゅう</rt></ruby><ruby>内容<rt>ないよう</rt></ruby>の<ruby>要点<rt>ようてん</rt></ruby>を、<ruby>短<rt>みじか</rt></ruby>くまとめて<ruby>説明<rt>せつめい</rt></ruby>してください。","audio":"/audio/Q417.mp3","text_original":"研究内容の要点を、短くまとめて説明してください。","defaultAnswer":"テクノロジーは学習の<ruby>効率<rt>こうりつ</rt></ruby><ruby>化<rt>か</rt></ruby>やアクセスの<ruby>向上<rt>こうじょう</rt></ruby>に<ruby>貢献<rt>こうけん</rt></ruby>する一方、<ruby>対面<rt>たいめん</rt></ruby>でのコミュニケーション<ruby>不足<rt>ふそく</rt></ruby>という<ruby>課題<rt>かだい</rt></ruby>もある点です。","default_answer_original":"テクノロジーは学習の効率化やアクセスの向上に貢献する一方、対面でのコミュニケーション不足という課題もある点です。"},{"category":"Discussion Intro & Pitch","text":"この<ruby>研究<rt>けんきゅう</rt></ruby>をするために、どのような<ruby>資料<rt>しりょう</rt></ruby>やメディアを使いましたか。","audio":"/audio/Q418.mp3","text_original":"この研究をするために、どのような資料やメディアを使いましたか。","defaultAnswer":"<ruby>教育<rt>きょういく</rt></ruby><ruby>分野<rt>ぶんや</rt></ruby>におけるAI<ruby>活用<rt>かつよう</rt></ruby><ruby>に関<rt>にかん</rt></ruby>する<ruby>学術<rt>がくじゅつ</rt></ruby><ruby>論文<rt>ろんぶん</rt></ruby>や、<ruby>国内外<rt>こくないがい</rt></ruby>のニュース<ruby>記事<rt>きじ</rt></ruby>を<ruby>参照<rt>さんしょう</rt></ruby>しました。","default_answer_original":"教育分野におけるAI活用に関する学術論文や、国内外のニュース記事を参照しました。"},{"category":"Discussion Intro & Pitch","text":"その<ruby>資料<rt>しりょう</rt></ruby>、<ruby>映像<rt>えいぞう</rt></ruby>、<ruby>文献<rt>ぶんけん</rt></ruby>を、<ruby>分析<rt>ぶんせき</rt></ruby>して、<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>にどのような<ruby>結論<rt>けつろん</rt></ruby>を<ruby>得<rt>え</rt></ruby>ましたか。","audio":"/audio/Q419.mp3","text_original":"その資料、映像、文献を、分析して、具体的にどのような結論を得ましたか。","defaultAnswer":"テクノロジーはあくまで<ruby>道具<rt>どうぐ</rt></ruby>であり、<ruby>教師<rt>きょうし</rt></ruby>との<ruby>対話<rt>たいわ</rt></ruby>や人間<ruby>的<rt>てき</rt></ruby>な<ruby>指導<rt>しどう</rt></ruby>と<ruby>組み合<rt>くみあ</rt></ruby>わせることが<ruby>不可欠<rt>ふかけつ</rt></ruby>であるという<ruby>結論<rt>けつろん</rt></ruby>に<ruby>至<rt>いた</rt></ruby>りました。","default_answer_original":"テクノロジーはあくまで道具であり、教師との対話や人間的な指導と組み合わせることが不可欠であるという結論に至りました。"},{"category":"Clarification & Details","text":"今言った点について、もう少し<ruby>掘り下<rt>ほりさ</rt></ruby>げて<ruby>具体<rt>ぐたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>説明<rt>せつめい</rt></ruby>できますか。","audio":"/audio/Q420.mp3","text_original":"今言った点について、もう少し掘り下げて具体的に説明できますか。","defaultAnswer":"<ruby>例<rt>たと</rt></ruby>えば、AIチューターが<ruby>生徒<rt>せいと</rt></ruby>の<ruby>苦手<rt>にがて</rt></ruby>を<ruby>分析<rt>ぶんせき</rt></ruby>して<ruby>個別<rt>こべつ</rt></ruby><ruby>指導<rt>しどう</rt></ruby>を<ruby>最適<rt>さいてき</rt></ruby><ruby>化<rt>か</rt></ruby>する一方で、<ruby>協調<rt>きょうちょう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>育<rt>はぐく</rt></ruby>むには<ruby>集団<rt>しゅうだん</rt></ruby>活動が<ruby>必要<rt>ひつよう</rt></ruby>であるという点です。","default_answer_original":"例えば、AIチューターが生徒の苦手を分析して個別指導を最適化する一方で、協調性を育むには集団活動が必要であるという点です。"},{"category":"Clarification & Details","text":"それを<ruby>裏付<rt>うらづ</rt></ruby>けるような<ruby>具体<rt>ぐたい</rt></ruby><ruby>例<rt>れい</rt></ruby>やデータはありますか。","audio":"/audio/Q421.mp3","text_original":"それを裏付けるような具体例やデータはありますか。","defaultAnswer":"オンライン<ruby>教育<rt>きょういく</rt></ruby>を<ruby>導入<rt>どうにゅう</rt></ruby>した学校で学習<ruby>効率<rt>こうりつ</rt></ruby>が<ruby>向上<rt>こうじょう</rt></ruby>したという<ruby>統計<rt>とうけい</rt></ruby>データがあります。","default_answer_original":"オンライン教育を導入した学校で学習効率が向上したという統計データがあります。"},{"category":"Clarification & Details","text":"この<ruby>問題<rt>もんだい</rt></ruby>が<ruby>深刻<rt>しんこく</rt></ruby>になった<ruby>背景<rt>はいけい</rt></ruby>には、何があると考えていますか。","audio":"/audio/Q422.mp3","text_original":"この問題が深刻になった背景には、何があると考えていますか。","defaultAnswer":"<ruby>急速<rt>きゅうそく</rt></ruby>なデジタル<ruby>化<rt>か</rt></ruby>に<ruby>教育<rt>きょういく</rt></ruby><ruby>現場<rt>げんば</rt></ruby>や人間の<ruby>適応<rt>てきおう</rt></ruby>が<ruby>追<rt>お</rt></ruby>いついていないことが<ruby>背景<rt>はいけい</rt></ruby>にあります。","default_answer_original":"急速なデジタル化に教育現場や人間の適応が追いついていないことが背景にあります。"},{"category":"Clarification & Details","text":"このテーマにおいて、<ruby>主要<rt>しゅよう</rt></ruby>な<ruby>関係<rt>かんけい</rt></ruby><ruby>者<rt>しゃ</rt></ruby>となるのはどのような人たちですか。","audio":"/audio/Q423.mp3","text_original":"このテーマにおいて、主要な関係者となるのはどのような人たちですか。","defaultAnswer":"<ruby>生徒<rt>せいと</rt></ruby>、<ruby>教師<rt>きょうし</rt></ruby>、<ruby>保護<rt>ほご</rt></ruby><ruby>者<rt>しゃ</rt></ruby>、そして<ruby>教育<rt>きょういく</rt></ruby>テック<ruby>企業<rt>きぎょう</rt></ruby>の<ruby>開発<rt>かいはつ</rt></ruby><ruby>者<rt>しゃ</rt></ruby>などが<ruby>主要<rt>しゅよう</rt></ruby>な<ruby>関係<rt>かんけい</rt></ruby><ruby>者<rt>しゃ</rt></ruby>です。","default_answer_original":"生徒、教師、保護者、そして教育テック企業の開発者などが主要な関係者です。"},{"category":"Clarification & Details","text":"<ruby>調<rt>しら</rt></ruby>べた<ruby>資料<rt>しりょう</rt></ruby>の中で、<ruby>特<rt>とく</rt></ruby>に<ruby>注目<rt>ちゅうもく</rt></ruby>した<ruby>内容<rt>ないよう</rt></ruby>はどんなことですか。","audio":"/audio/Q424.mp3","text_original":"調べた資料の中で、特に注目した内容はどんなことですか。","defaultAnswer":"デジタルデバイド、<ruby>情報<rt>じょうほう</rt></ruby><ruby>格差<rt>かくさ</rt></ruby>、によって<ruby>教育<rt>きょういく</rt></ruby>の<ruby>機会<rt>きかい</rt></ruby><ruby>均等<rt>きんとう</rt></ruby>が<ruby>脅<rt>おびや</rt></ruby>かされているという<ruby>指摘<rt>してき</rt></ruby>に<ruby>注目<rt>ちゅうもく</rt></ruby>しました。","default_answer_original":"デジタルデバイド、情報格差、によって教育の機会均等が脅かされているという指摘に注目しました。"},{"category":"Reasons & Justifications","text":"そのような<ruby>結論<rt>けつろん</rt></ruby>になった<ruby>理由<rt>りゆう</rt></ruby>や<ruby>根拠<rt>こんきょ</rt></ruby>は何ですか。","audio":"/audio/Q425.mp3","text_original":"そのような結論になった理由や根拠は何ですか。","defaultAnswer":"<ruby>知識<rt>ちしき</rt></ruby>の<ruby>伝達<rt>でんたつ</rt></ruby>だけでなく、<ruby>道徳心<rt>どうとくしん</rt></ruby>や<ruby>批判<rt>ひはん</rt></ruby><ruby>的<rt>てき</rt></ruby>思考<ruby>力<rt>りょく</rt></ruby>は人との<ruby>関<rt>かか</rt></ruby>わりの中で<ruby>最<rt>もっと</rt></ruby>もよく<ruby>育<rt>はぐく</rt></ruby>まれるからです。","default_answer_original":"知識の伝達だけでなく、道徳心や批判的思考力は人との関わりの中で最もよく育まれるからです。"},{"category":"Reasons & Justifications","text":"なぜ社会、または人々、がそのような行動をとるのだと考えていますか。","audio":"/audio/Q426.mp3","text_original":"なぜ社会、または人々、がそのような行動をとるのだと考えていますか。","defaultAnswer":"<ruby>効率<rt>こうりつ</rt></ruby><ruby>性<rt>せい</rt></ruby>や<ruby>利便<rt>りべん</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>追求<rt>ついきゅう</rt></ruby>する<ruby>現代<rt>げんだい</rt></ruby>社会のニーズに<ruby>合致<rt>がっち</rt></ruby>しているからです。","default_answer_original":"効率性や利便性を追求する現代社会のニーズに合致しているからです。"},{"category":"Reasons & Justifications","text":"なぜこの出来事、<ruby>現象<rt>げんしょう</rt></ruby>が、これほど大きな<ruby>関心<rt>かんしん</rt></ruby>を<ruby>集<rt>あつ</rt></ruby>めているのですか。","audio":"/audio/Q427.mp3","text_original":"なぜこの出来事、現象が、これほど大きな関心を集めているのですか。","defaultAnswer":"私たちの働き方や学び方の<ruby>根幹<rt>こんかん</rt></ruby>を<ruby>揺<rt>ゆ</rt></ruby>るがすほどのインパクトを持っているからです。","default_answer_original":"私たちの働き方や学び方の根幹を揺るがすほどのインパクトを持っているからです。"},{"category":"Reasons & Justifications","text":"<ruby>単<rt>たん</rt></ruby>なる<ruby>個人<rt>こじん</rt></ruby>の<ruby>問題<rt>もんだい</rt></ruby>ではなく、社会<ruby>問題<rt>もんだい</rt></ruby>として考えるべき<ruby>理由<rt>りゆう</rt></ruby>は何ですか。","audio":"/audio/Q428.mp3","text_original":"単なる個人の問題ではなく、社会問題として考えるべき理由は何ですか。","defaultAnswer":"<ruby>次世代<rt>じせだい</rt></ruby>を<ruby>担<rt>にな</rt></ruby>う<ruby>子供<rt>こども</rt></ruby>たちの<ruby>育成<rt>いくせい</rt></ruby>や<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>労働<rt>ろうどう</rt></ruby>市場に<ruby>直接的<rt>ちょくせつてき</rt></ruby>な<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>及<rt>およ</rt></ruby>ぼすからです。","default_answer_original":"次世代を担う子供たちの育成や将来の労働市場に直接的な影響を及ぼすからです。"},{"category":"Impacts, Pros & Cons","text":"その<ruby>取り組<rt>とりく</rt></ruby>みや<ruby>現象<rt>げんしょう</rt></ruby>がもたらすメリットには何がありますか。","audio":"/audio/Q429.mp3","text_original":"その取り組みや現象がもたらすメリットには何がありますか。","defaultAnswer":"<ruby>地理<rt>ちり</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>制約<rt>せいやく</rt></ruby>を<ruby>越<rt>こ</rt></ruby>えて、<ruby>誰<rt>だれ</rt></ruby>でも高<ruby>品質<rt>ひんしつ</rt></ruby>な<ruby>教育<rt>きょういく</rt></ruby>にアクセスできるようになる点です。","default_answer_original":"地理的な制約を越えて、誰でも高品質な教育にアクセスできるようになる点です。"},{"category":"Impacts, Pros & Cons","text":"一方で、<ruby>見過<rt>みす</rt></ruby>ごすことができない<ruby>問題<rt>もんだい</rt></ruby>点やデメリットは何ですか。","audio":"/audio/Q430.mp3","text_original":"一方で、見過ごすことができない問題点やデメリットは何ですか。","defaultAnswer":"<ruby>画面<rt>がめん</rt></ruby>を見<ruby>続<rt>つづ</rt></ruby>けることによる<ruby>健康<rt>けんこう</rt></ruby>への<ruby>悪影響<rt>あくえいきょう</rt></ruby>や、人間<ruby>関係<rt>かんけい</rt></ruby>の<ruby>希薄<rt>きはく</rt></ruby><ruby>化<rt>か</rt></ruby>が<ruby>懸念<rt>けねん</rt></ruby>されます。","default_answer_original":"画面を見続けることによる健康への悪影響や、人間関係の希薄化が懸念されます。"},{"category":"Impacts, Pros & Cons","text":"この<ruby>変化<rt>へんか</rt></ruby>は、人々の生活や考え方にどのような<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えていますか。","audio":"/audio/Q431.mp3","text_original":"この変化は、人々の生活や考え方にどのような影響を与えていますか。","defaultAnswer":"いつでもどこでも学べるという<ruby>柔軟<rt>じゅうなん</rt></ruby><ruby>性<rt>せい</rt></ruby>が<ruby>定着<rt>ていちゃく</rt></ruby>し、<ruby>生涯<rt>しょうがい</rt></ruby>学習のハードルが下がりました。","default_answer_original":"いつでもどこでも学べるという柔軟性が定着し、生涯学習のハードルが下がりました。"},{"category":"Impacts, Pros & Cons","text":"<ruby>利益<rt>りえき</rt></ruby>を<ruby>得<rt>え</rt></ruby>る人と、<ruby>不利益<rt>ふりえき</rt></ruby>を<ruby>受<rt>う</rt></ruby>ける人の間で、どのような<ruby>違<rt>ちが</rt></ruby>いが生じていますか。","audio":"/audio/Q432.mp3","text_original":"利益を得る人と、不利益を受ける人の間で、どのような違いが生じていますか。","defaultAnswer":"<ruby>最新<rt>さいしん</rt></ruby>デバイスや<ruby>高速<rt>こうそく</rt></ruby><ruby>回線<rt>かいせん</rt></ruby>を<ruby>利用<rt>りよう</rt></ruby>できる<ruby>層<rt>そう</rt></ruby>とそうでない<ruby>層<rt>そう</rt></ruby>の間で、<ruby>学力<rt>がくりょく</rt></ruby>や<ruby>機会<rt>きかい</rt></ruby>の<ruby>格差<rt>かくさ</rt></ruby>が広がっています。","default_answer_original":"最新デバイスや高速回線を利用できる層とそうでない層の間で、学力や機会の格差が広がっています。"},{"category":"Comparison & Contrast","text":"<ruby>過去<rt>かこ</rt></ruby>の<ruby>状況<rt>じょうきょう</rt></ruby>と<ruby>比較<rt>ひかく</rt></ruby>して、<ruby>最<rt>もっと</rt></ruby>も大きな<ruby>変化<rt>へんか</rt></ruby>は何ですか。","audio":"/audio/Q433.mp3","text_original":"過去の状況と比較して、最も大きな変化は何ですか。","defaultAnswer":"<ruby>教師<rt>きょうし</rt></ruby>が<ruby>教壇<rt>きょうだん</rt></ruby>で一方<ruby>的<rt>てき</rt></ruby>に教えるスタイルから、<ruby>生徒<rt>せいと</rt></ruby>が自らデジタル<ruby>教材<rt>きょうざい</rt></ruby>で<ruby>探究<rt>たんきゅう</rt></ruby>するスタイルへの<ruby>変化<rt>へんか</rt></ruby>です。","default_answer_original":"教師が教壇で一方的に教えるスタイルから、生徒が自らデジタル教材で探究するスタイルへの変化です。"},{"category":"Comparison & Contrast","text":"日本の<ruby>文化<rt>ぶんか</rt></ruby>や社会と、オーストラリアなどの<ruby>諸<rt>しょ</rt></ruby>外国との<ruby>共通<rt>きょうつう</rt></ruby>点や<ruby>違<rt>ちが</rt></ruby>いは何ですか。","audio":"/audio/Q434.mp3","text_original":"日本の文化や社会と、オーストラリアなどの諸外国との共通点や違いは何ですか。","defaultAnswer":"ICT<ruby>導入<rt>どうにゅう</rt></ruby>のスピードや<ruby>教育<rt>きょういく</rt></ruby><ruby>方針<rt>ほうしん</rt></ruby>に<ruby>違<rt>ちが</rt></ruby>いはありますが、デジタル<ruby>教育<rt>きょういく</rt></ruby>の<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>を<ruby>模索<rt>もさく</rt></ruby>している点は<ruby>共通<rt>きょうつう</rt></ruby>しています。","default_answer_original":"ICT導入のスピードや教育方針に違いはありますが、デジタル教育の重要性を模索している点は共通しています。"},{"category":"Comparison & Contrast","text":"<ruby>若者<rt>わかもの</rt></ruby>と<ruby>高齢<rt>こうれい</rt></ruby><ruby>者<rt>しゃ</rt></ruby>の間の考え方のギャップについて、どう<ruby>分析<rt>ぶんせき</rt></ruby>しますか。","audio":"/audio/Q435.mp3","text_original":"若者と高齢者の間の考え方のギャップについて、どう分析しますか。","defaultAnswer":"デジタルネイティブである<ruby>若者<rt>わかもの</rt></ruby>は新しい<ruby>技術<rt>ぎじゅつ</rt></ruby>を<ruby>自然<rt>しぜん</rt></ruby>に<ruby>受け入<rt>うけい</rt></ruby>れる一方、<ruby>高齢<rt>こうれい</rt></ruby><ruby>世代<rt>せだい</rt></ruby>は<ruby>慎重<rt>しんちょう</rt></ruby>になりがちです。","default_answer_original":"デジタルネイティブである若者は新しい技術を自然に受け入れる一方、高齢世代は慎重になりがちです。"},{"category":"Comparison & Contrast","text":"<ruby>他<rt>た</rt></ruby>の<ruby>解決<rt>かいけつ</rt></ruby><ruby>方法<rt>ほうほう</rt></ruby>と<ruby>比較<rt>ひかく</rt></ruby>したとき、そのアプローチはどれくらい<ruby>有効<rt>ゆうこう</rt></ruby>だと思いますか。","audio":"/audio/Q436.mp3","text_original":"他の解決方法と比較したとき、そのアプローチはどれくらい有効だと思いますか。","defaultAnswer":"<ruby>即効<rt>そっこう</rt></ruby><ruby>性<rt>せい</rt></ruby>がある<ruby>反面<rt>はんめん</rt></ruby>、<ruby>倫理<rt>りんり</rt></ruby><ruby>的<rt>てき</rt></ruby>なガイドラインを<ruby>伴<rt>ともな</rt></ruby>わなければ<ruby>不十分<rt>ふじゅうぶん</rt></ruby>であると考えます。","default_answer_original":"即効性がある反面、倫理的なガイドラインを伴わなければ不十分であると考えます。"},{"category":"Opinions & Stance","text":"<ruby>異<rt>こと</rt></ruby>なる立場の<ruby>意見<rt>いけん</rt></ruby>を<ruby>踏<rt>ふ</rt></ruby>まえた上で、あなた<ruby>自身<rt>じしん</rt></ruby>の考えを聞かせてください。","audio":"/audio/Q437.mp3","text_original":"異なる立場の意見を踏まえた上で、あなた自身の考えを聞かせてください。","defaultAnswer":"テクノロジーを<ruby>積極<rt>せっきょく</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>活用<rt>かつよう</rt></ruby>しつつも、人間<ruby>的<rt>てき</rt></ruby>な<ruby>触れ合<rt>ふれあ</rt></ruby>いを<ruby>担保<rt>たんぽ</rt></ruby>するハイブリッドな<ruby>教育<rt>きょういく</rt></ruby>が<ruby>理想<rt>りそう</rt></ruby><ruby>的<rt>てき</rt></ruby>です。","default_answer_original":"テクノロジーを積極的に活用しつつも、人間的な触れ合いを担保するハイブリッドな教育が理想的です。"},{"category":"Opinions & Stance","text":"この考え方に<ruby>賛成<rt>さんせい</rt></ruby>ですか、<ruby>反対<rt>はんたい</rt></ruby>ですか。その<ruby>理由<rt>りゆう</rt></ruby>も教えてください。","audio":"/audio/Q438.mp3","text_original":"この考え方に賛成ですか、反対ですか。その理由も教えてください。","defaultAnswer":"<ruby>賛成<rt>さんせい</rt></ruby>です。<ruby>技術<rt>ぎじゅつ</rt></ruby>と人間<ruby>性<rt>せい</rt></ruby>がうまく<ruby>融合<rt>ゆうごう</rt></ruby>することで<ruby>最大<rt>さいだい</rt></ruby>の<ruby>効果<rt>こうか</rt></ruby>が生まれるからです。","default_answer_original":"賛成です。技術と人間性がうまく融合することで最大の効果が生まれるからです。"},{"category":"Opinions & Stance","text":"<ruby>調<rt>しら</rt></ruby>べる中で、<ruby>最初<rt>さいしょ</rt></ruby>の<ruby>予想<rt>よそう</rt></ruby>や自分の考えが<ruby>変<rt>か</rt></ruby>わるような発見はありましたか。","audio":"/audio/Q439.mp3","text_original":"調べる中で、最初の予想や自分の考えが変わるような発見はありましたか。","defaultAnswer":"ただ<ruby>便利<rt>べんり</rt></ruby>になるだけでなく、プライバシー<ruby>保護<rt>ほご</rt></ruby>やメンタルヘルスのケアという新たな<ruby>課題<rt>かだい</rt></ruby>の大きさに気づかされました。","default_answer_original":"ただ便利になるだけでなく、プライバシー保護やメンタルヘルスのケアという新たな課題の大きさに気づかされました。"},{"category":"Opinions & Stance","text":"もし自分が<ruby>当事者<rt>とうじしゃ</rt></ruby>の立場だったら、どのように<ruby>判断<rt>はんだん</rt></ruby>して行動しますか。","audio":"/audio/Q440.mp3","text_original":"もし自分が当事者の立場だったら、どのように判断して行動しますか。","defaultAnswer":"新しいツールを<ruby>積極<rt>せっきょく</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>試<rt>ため</rt></ruby>すとともに、そのメリットとデメリットを<ruby>冷静<rt>れいせい</rt></ruby>に<ruby>検証<rt>けんしょう</rt></ruby>します。","default_answer_original":"新しいツールを積極的に試すとともに、そのメリットとデメリットを冷静に検証します。"},{"category":"Solutions & Future Prospects","text":"この<ruby>課題<rt>かだい</rt></ruby>を<ruby>解決<rt>かいけつ</rt></ruby>するためには、どのような<ruby>対策<rt>たいさく</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>ですか。","audio":"/audio/Q441.mp3","text_original":"この課題を解決するためには、どのような対策が必要ですか。","defaultAnswer":"<ruby>教育<rt>きょういく</rt></ruby><ruby>格差<rt>かくさ</rt></ruby>を<ruby>埋<rt>う</rt></ruby>めるためのインフラ<ruby>整備<rt>せいび</rt></ruby>と、デジタルリテラシー<ruby>教育<rt>きょういく</rt></ruby>の<ruby>徹底<rt>てってい</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。","default_answer_original":"教育格差を埋めるためのインフラ整備と、デジタルリテラシー教育の徹底が必要です。"},{"category":"Solutions & Future Prospects","text":"<ruby>政府<rt>せいふ</rt></ruby>によるルール作りと、<ruby>個人<rt>こじん</rt></ruby>の<ruby>意識<rt>いしき</rt></ruby>を<ruby>変<rt>か</rt></ruby>えることのどちらが<ruby>大切<rt>たいせつ</rt></ruby>ですか。","audio":"/audio/Q442.mp3","text_original":"政府によるルール作りと、個人の意識を変えることのどちらが大切ですか。","defaultAnswer":"<ruby>安全<rt>あんぜん</rt></ruby>な<ruby>枠組<rt>わくぐ</rt></ruby>みを作る<ruby>政府<rt>せいふ</rt></ruby>のルール作りと、<ruby>主体<rt>しゅたい</rt></ruby><ruby>的<rt>てき</rt></ruby>に使いこなす<ruby>個人<rt>こじん</rt></ruby>の<ruby>意識<rt>いしき</rt></ruby>の<ruby>両方<rt>りょうほう</rt></ruby>が<ruby>不可欠<rt>ふかけつ</rt></ruby>です。","default_answer_original":"安全な枠組みを作る政府のルール作りと、主体的に使いこなす個人の意識の両方が不可欠です。"},{"category":"Solutions & Future Prospects","text":"今後10年や20年で、この<ruby>問題<rt>もんだい</rt></ruby>はどうなっていくと<ruby>予測<rt>よそく</rt></ruby>しますか。","audio":"/audio/Q443.mp3","text_original":"今後10年や20年で、この問題はどうなっていくと予測しますか。","defaultAnswer":"AIがさらに<ruby>進化<rt>しんか</rt></ruby>し、一人ひとりに<ruby>完全<rt>かんぜん</rt></ruby>にカスタマイズされた<ruby>教育<rt>きょういく</rt></ruby>が<ruby>当たり前<rt>あたりまえ</rt></ruby>になると<ruby>予測<rt>よそく</rt></ruby>します。","default_answer_original":"AIがさらに進化し、一人ひとりに完全にカスタマイズされた教育が当たり前になると予測します。"},{"category":"Solutions & Future Prospects","text":"<ruby>状況<rt>じょうきょう</rt></ruby>を<ruby>良<rt>よ</rt></ruby>くするために、私たちが今すぐ<ruby>取<rt>と</rt></ruby>るべき行動は何ですか。","audio":"/audio/Q444.mp3","text_original":"状況を良くするために、私たちが今すぐ取るべき行動は何ですか。","defaultAnswer":"新しいテクノロジー<ruby>に対<rt>にたい</rt></ruby>して<ruby>批判<rt>ひはん</rt></ruby><ruby>的<rt>てき</rt></ruby>な目を持ちつつ、<ruby>積極<rt>せっきょく</rt></ruby><ruby>的<rt>てき</rt></ruby>に学び<ruby>活用<rt>かつよう</rt></ruby>していく<ruby>姿勢<rt>しせい</rt></ruby>を持つことです。","default_answer_original":"新しいテクノロジーに対して批判的な目を持ちつつ、積極的に学び活用していく姿勢を持つことです。"},{"category":"Examiner Prompts & Counter-arguments","text":"でも、こういう<ruby>反対<rt>はんたい</rt></ruby><ruby>意見<rt>いけん</rt></ruby>もありますよね。それにはどう<ruby>反論<rt>はんろん</rt></ruby>しますか。","audio":"/audio/Q445.mp3","text_original":"でも、こういう反対意見もありますよね。それにはどう反論しますか。","defaultAnswer":"<ruby>確<rt>たし</rt></ruby>かに<ruby>依存<rt>いぞん</rt></ruby>のリスクはありますが、<ruby>適切<rt>てきせつ</rt></ruby>な<ruby>管理<rt>かんり</rt></ruby>と<ruby>教育<rt>きょういく</rt></ruby>を行えば十分に<ruby>防<rt>ふせ</rt></ruby>ぐことができます。","default_answer_original":"確かに依存のリスクはありますが、適切な管理と教育を行えば十分に防ぐことができます。"},{"category":"Examiner Prompts & Counter-arguments","text":"そのような点ばかり言われていますが、このようなリスクもあるのではないでしょうか。","audio":"/audio/Q446.mp3","text_original":"そのような点ばかり言われていますが、このようなリスクもあるのではないでしょうか。","defaultAnswer":"おっしゃる<ruby>通<rt>とお</rt></ruby>りのリスクが<ruby>存在<rt>そんざい</rt></ruby>するため、事前の<ruby>対策<rt>たいさく</rt></ruby>や<ruby>法<rt>ほう</rt></ruby><ruby>整備<rt>せいび</rt></ruby>が<ruby>急務<rt>きゅうむ</rt></ruby>であると考えます。","default_answer_original":"おっしゃる通りのリスクが存在するため、事前の対策や法整備が急務であると考えます。"},{"category":"Examiner Prompts & Counter-arguments","text":"もしその<ruby>前提<rt>ぜんてい</rt></ruby>が<ruby>変<rt>か</rt></ruby>わった<ruby>場合<rt>ばあい</rt></ruby>でも、あなたの<ruby>意見<rt>いけん</rt></ruby>は<ruby>変<rt>か</rt></ruby>わりませんか。","audio":"/audio/Q447.mp3","text_original":"もしその前提が変わった場合でも、あなたの意見は変わりませんか。","defaultAnswer":"<ruby>前提<rt>ぜんてい</rt></ruby><ruby>条件<rt>じょうけん</rt></ruby>が<ruby>変<rt>か</rt></ruby>われば、それに<ruby>合<rt>あ</rt></ruby>わせて<ruby>柔軟<rt>じゅうなん</rt></ruby>に<ruby>解決<rt>かいけつ</rt></ruby><ruby>策<rt>さく</rt></ruby>を<ruby>再<rt>さい</rt></ruby><ruby>検討<rt>けんとう</rt></ruby>すべきだと思います。","default_answer_original":"前提条件が変われば、それに合わせて柔軟に解決策を再検討すべきだと思います。"},{"category":"Examiner Prompts & Counter-arguments","text":"<ruby>要<rt>よう</rt></ruby>するに、そのようなリスクがあっても<ruby>進<rt>すす</rt></ruby>めるべきだということですか。","audio":"/audio/Q448.mp3","text_original":"要するに、そのようなリスクがあっても進めるべきだということですか。","defaultAnswer":"はい、リスクを<ruby>管理<rt>かんり</rt></ruby>・<ruby>克服<rt>こくふく</rt></ruby>しながら<ruby>進<rt>すす</rt></ruby>める<ruby>価値<rt>かち</rt></ruby>が十分にあると考えます。","default_answer_original":"はい、リスクを管理・克服しながら進める価値が十分にあると考えます。"},{"category":"Examiner Prompts & Counter-arguments","text":"<ruby>最後<rt>さいご</rt></ruby>に、このディスカッション<ruby>全体<rt>ぜんたい</rt></ruby><ruby>を通<rt>をとお</rt></ruby>して一番<ruby>伝<rt>つた</rt></ruby>えたいメッセージは何ですか。","audio":"/audio/Q449.mp3","text_original":"最後に、このディスカッション全体を通して一番伝えたいメッセージは何ですか。","defaultAnswer":"テクノロジーの<ruby>恩恵<rt>おんけい</rt></ruby>を<ruby>最大限<rt>さいだいげん</rt></ruby>に活かしつつ、人間<ruby>性<rt>せい</rt></ruby>を<ruby>育<rt>はぐく</rt></ruby>むバランスの<ruby>取<rt>と</rt></ruby>れた<ruby>未来<rt>みらい</rt></ruby>を<ruby>築<rt>きず</rt></ruby>くことの<ruby>重要<rt>じゅうよう</rt></ruby><ruby>性<rt>せい</rt></ruby>です。","default_answer_original":"テクノロジーの恩恵を最大限に活かしつつ、人間性を育むバランスの取れた未来を築くことの重要性です。"}]}');
const afterSec2 = { "steady": [{ "category": "End", "text": "では、これで終わります。", "audio": "/audio/Q143.mp3", "text_original": "では、これで終わります。", "defaultAnswer": "はい、ありがとうございました。", "default_answer_original": "はい、ありがとうございました。" }, { "category": "End", "text": "時間になりました。", "audio": "/audio/Q144.mp3", "text_original": "時間になりました。", "defaultAnswer": "分かりました。", "default_answer_original": "分かりました。" }, { "category": "End", "text": "今日はここまでです。", "audio": "/audio/Q145.mp3", "text_original": "今日はここまでです。", "defaultAnswer": "<ruby>お疲れ様<rt>おつかれさま</rt></ruby>でした。", "default_answer_original": "お疲れ様でした。" }, { "category": "End", "text": "これで<ruby>試験<rt>しけん</rt></ruby>は終わりです。", "audio": "/audio/Q146.mp3", "text_original": "これで試験は終わりです。", "defaultAnswer": "ありがとうございました。", "default_answer_original": "ありがとうございました。" }, { "category": "End", "text": "よく<ruby>頑張<rt>がんば</rt></ruby>りましたね。", "audio": "/audio/Q147.mp3", "text_original": "よく頑張りましたね。", "defaultAnswer": "ありがとうございます。", "default_answer_original": "ありがとうございます。" }, { "category": "End", "text": "気をつけて帰ってください。", "audio": "/audio/Q148.mp3", "text_original": "気をつけて帰ってください。", "defaultAnswer": "はい、さようなら。", "default_answer_original": "はい、さようなら。" }, { "category": "End", "text": "さようなら。", "audio": "/audio/Q149.mp3", "text_original": "さようなら。", "defaultAnswer": "さようなら。", "default_answer_original": "さようなら。" }], "normal": [{ "category": "End", "text": "これで<ruby>特別<rt>とくべつ</rt></ruby><ruby>研究<rt>けんきゅう</rt></ruby>を終わります。", "audio": "/audio/Q299.mp3", "text_original": "これで特別研究を終わります。", "defaultAnswer": "はい、ありがとうございました。", "default_answer_original": "はい、ありがとうございました。" }, { "category": "End", "text": "お時間になりました。", "audio": "/audio/Q300.mp3", "text_original": "お時間になりました。", "defaultAnswer": "<ruby>承知<rt>しょうち</rt></ruby>いたしました。", "default_answer_original": "承知いたしました。" }, { "category": "End", "text": "今日の<ruby>質問<rt>しつもん</rt></ruby>はここまでです。", "audio": "/audio/Q301.mp3", "text_original": "今日の質問はここまでです。", "defaultAnswer": "<ruby>お世話<rt>おせわ</rt></ruby>になりました。", "default_answer_original": "お世話になりました。" }, { "category": "End", "text": "これで日本語の<ruby>試験<rt>しけん</rt></ruby>はすべて<ruby>終了<rt>しゅうりょう</rt></ruby>です。", "audio": "/audio/Q302.mp3", "text_original": "これで日本語の試験はすべて終了です。", "defaultAnswer": "ありがとうございました、<ruby>失礼<rt>しつれい</rt></ruby>します。", "default_answer_original": "ありがとうございました、失礼します。" }, { "category": "End", "text": "<ruby>お疲れ様<rt>おつかれさま</rt></ruby>でした。", "audio": "/audio/Q303.mp3", "text_original": "お疲れ様でした。", "defaultAnswer": "<ruby>お疲れ様<rt>おつかれさま</rt></ruby>でした。", "default_answer_original": "お疲れ様でした。" }, { "category": "End", "text": "本日はよく<ruby>頑張<rt>がんば</rt></ruby>りましたね。", "audio": "/audio/Q304.mp3", "text_original": "本日はよく頑張りましたね。", "defaultAnswer": "ありがとうございます、楽しかったです。", "default_answer_original": "ありがとうございます、楽しかったです。" }, { "category": "End", "text": "気をつけて帰ってください。", "audio": "/audio/Q305.mp3", "text_original": "気をつけて帰ってください。", "defaultAnswer": "はい、<ruby>失礼<rt>しつれい</rt></ruby>いたします。", "default_answer_original": "はい、失礼いたします。" }, { "category": "End", "text": "さようなら。", "audio": "/audio/Q306.mp3", "text_original": "さようなら。", "defaultAnswer": "さようなら、<ruby>失礼<rt>しつれい</rt></ruby>します。", "default_answer_original": "さようなら、失礼します。" }], "accelerated": [{ "category": "End", "text": "<ruby>以上<rt>いじょう</rt></ruby>で<ruby>特別<rt>とくべつ</rt></ruby><ruby>研究<rt>けんきゅう</rt></ruby>のディスカッションを<ruby>終了<rt>しゅうりょう</rt></ruby>します。", "audio": "/audio/Q450.mp3", "text_original": "以上で特別研究のディスカッションを終了します。", "defaultAnswer": "はい、ありがとうございました。", "default_answer_original": "はい、ありがとうございました。" }, { "category": "End", "text": "お時間となりましたので、本日の<ruby>試験<rt>しけん</rt></ruby><ruby>質問<rt>しつもん</rt></ruby><ruby>項目<rt>こうもく</rt></ruby>はすべて<ruby>終了<rt>しゅうりょう</rt></ruby>とさせていただきます。", "audio": "/audio/Q451.mp3", "text_original": "お時間となりましたので、本日の試験質問項目はすべて終了とさせていただきます。", "defaultAnswer": "<ruby>承知<rt>しょうち</rt></ruby>いたしました。<ruby>貴重<rt>きちょう</rt></ruby>な<ruby>機会<rt>きかい</rt></ruby>をありがとうございました。", "default_answer_original": "承知いたしました。貴重な機会をありがとうございました。" }, { "category": "End", "text": "<ruby>以上<rt>いじょう</rt></ruby>をもちまして、VCE日本語<ruby>口頭<rt>こうとう</rt></ruby><ruby>試験<rt>しけん</rt></ruby>の<ruby>全<rt>ぜん</rt></ruby><ruby>日程<rt>にってい</rt></ruby>を<ruby>終了<rt>しゅうりょう</rt></ruby>します。", "audio": "/audio/Q452.mp3", "text_original": "以上をもちまして、VCE日本語口頭試験の全日程を終了します。", "defaultAnswer": "はい、<ruby>大変<rt>たいへん</rt></ruby><ruby>お世話<rt>おせわ</rt></ruby>になりました。", "default_answer_original": "はい、大変お世話になりました。" }, { "category": "End", "text": "<ruby>大変<rt>たいへん</rt></ruby><ruby>お疲れ様<rt>おつかれさま</rt></ruby>でした。", "audio": "/audio/Q453.mp3", "text_original": "大変お疲れ様でした。", "defaultAnswer": "<ruby>お疲れ様<rt>おつかれさま</rt></ruby>でした、ありがとうございます。", "default_answer_original": "お疲れ様でした、ありがとうございます。" }, { "category": "End", "text": "<ruby>日頃<rt>ひごろ</rt></ruby>の<ruby>成果<rt>せいか</rt></ruby>を十分に<ruby>発揮<rt>はっき</rt></ruby>していただけたかと思います。", "audio": "/audio/Q454.mp3", "text_original": "日頃の成果を十分に発揮していただけたかと思います。", "defaultAnswer": "<ruby>温<rt>あたた</rt></ruby>かいお<ruby>言葉<rt>ことば</rt></ruby>をいただき、<ruby>誠<rt>まこと</rt></ruby>にありがとうございます。", "default_answer_original": "温かいお言葉をいただき、誠にありがとうございます。" }, { "category": "End", "text": "お気をつけてお帰りください。", "audio": "/audio/Q455.mp3", "text_original": "お気をつけてお帰りください。", "defaultAnswer": "はい、<ruby>失礼<rt>しつれい</rt></ruby>いたします。さようなら。", "default_answer_original": "はい、失礼いたします。さようなら。" }] };
const questions$1 = [];
const oralExamQuestionsData$1 = {
  beforeSec1,
  sec1,
  sec2,
  afterSec2,
  questions: questions$1
};
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-3 group", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "/jptutoraiyamato.png",
          alt: "AI Yamato Logo",
          className: "w-10 h-10 object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform"
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-slate-900 tracking-tight", children: "AI Yamato Japanese Hub" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline-block ml-2 text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium", children: "app.jptutoraiyamato.com" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700", children: [
        /* @__PURE__ */ jsx(Coins, { className: "w-4 h-4 text-amber-500" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Credits: ",
          /* @__PURE__ */ jsx("strong", { className: "text-slate-900", children: "120 pts" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 border-l border-slate-200 pl-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold shadow-inner", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "hidden md:block text-left text-xs", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900", children: "Tomonari Sasaki" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-500", children: "Teacher / Administrator" })
        ] })
      ] })
    ] })
  ] }) });
}
const meta$4 = () => {
  return [
    { title: "VCE Japanese Oral Exam - Free Audio Resources | JPTutor AI Yamato" },
    { name: "description", content: "VCE Japanese EOY Oral Exam Free Audio Resources" }
  ];
};
const questionData = oralExamQuestionsData$1;
function sanitizeAiOutput$1(text) {
  return text.replace(/^#{1,6}\s+/gm, "").replace(/\*\*/g, "");
}
function OralExamQuestions() {
  const [currentSection, setCurrentSection] = useState("sec1");
  const [currentPace, setCurrentPace] = useState("steady");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAiFullscreen, setIsAiFullscreen] = useState(false);
  const aiChatRef = useRef(null);
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Japanese Tutor AI Yamato. Have any questions about these VCE oral exam questions or need tips on your Japanese studies? Ask me anything!"
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [requestVisualAid, setRequestVisualAid] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [tutorLevel, setTutorLevel] = useState("steady");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleAiFullscreen = async () => {
    if (!aiChatRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await aiChatRef.current.requestFullscreen();
        setIsAiFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsAiFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsAiFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  const handlePlayAudio = (item, index) => {
    if (item.audio) {
      const audio = new Audio(item.audio);
      setPlayingIndex(index);
      audio.play().catch(() => {
        alert("音声ファイルの再生に失敗しました。");
        setPlayingIndex(null);
      });
      audio.onended = () => setPlayingIndex(null);
      audio.onerror = () => {
        setPlayingIndex(null);
      };
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("お使いのブラウザは音声読み上げに対応していません。");
      return;
    }
    window.speechSynthesis.cancel();
    const plainText = item.text.replace(/<[^>]*>?/gm, "");
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = "ja-JP";
    utterance.rate = currentPace === "steady" ? 0.85 : currentPace === "accelerated" ? 1.05 : 0.95;
    setPlayingIndex(index);
    utterance.onend = () => {
      setPlayingIndex(null);
    };
    utterance.onerror = () => {
      setPlayingIndex(null);
    };
    window.speechSynthesis.speak(utterance);
  };
  const handleSendTutorMessage = async (e) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;
    const userMsg = tutorInput.trim();
    const needsVisual = requestVisualAid;
    setTutorInput("");
    setRequestVisualAid(false);
    const newMessages = [...tutorMessages, { role: "user", content: userMsg }];
    setTutorMessages(newMessages);
    setIsTutorLoading(true);
    try {
      const visualPrompt = needsVisual ? `Educational instructional diagram and visual aid for VCE Japanese high school students explaining: ${userMsg}. Clean layout, high quality, professional illustration style.` : void 0;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: tutorMessages,
          learningPace: tutorLevel,
          visualPrompt
          // 🎨 バックエンドへ visualPrompt を送信
        })
      });
      if (!response.ok) {
        throw new Error("Failed to get response from AI tutor");
      }
      const data = await response.json();
      const replyText = data.reply || "I'm here to help you with your Japanese studies!";
      const imageUrl = data.imageUrl;
      const sanitizedReply = sanitizeAiOutput$1(replyText);
      setTutorMessages([
        ...newMessages,
        {
          role: "assistant",
          content: sanitizedReply,
          imageUrl
        }
      ]);
    } catch (err) {
      console.error(err);
      setTutorMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try asking again!" }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };
  const activeItems = questionData[currentSection][currentPace];
  return /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 min-h-screen text-slate-800 flex flex-col justify-between font-sans relative", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-4 py-10 flex-grow w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-amber-300 rounded-2xl p-6 sm:p-8 shadow-xl mb-10 text-center relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -right-1 -bottom-1 text-amber-100 text-9xl select-none pointer-events-none", children: "🎙️" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3", children: "VCE Oral Exam: Frequently Used Examiner Questions Audio Library" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6", children: "Listen to authentic examiner questions with exam-style speed and pronunciation. Switch between learning paces and sections to start improving your listening skills!" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "/#vce-app",
            className: "bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl shadow-xs transition text-sm flex items-center gap-2",
            children: /* @__PURE__ */ jsx("span", { children: "✨ Try AI Tutor" })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-amber-100/70 border border-amber-300 rounded-2xl p-5 mb-8 shadow-inner flex flex-col md:flex-row gap-6 justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-auto", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2", children: "Select Section" }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-wrap rounded-xl bg-white p-1 shadow-xs border border-amber-200 w-full sm:w-auto gap-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setCurrentSection("beforeSec1"),
                className: `flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition shadow-xs ${currentSection === "beforeSec1" ? "bg-amber-600 text-white" : "text-slate-700 hover:text-amber-700"}`,
                children: "Before"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setCurrentSection("sec1"),
                className: `flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition shadow-xs ${currentSection === "sec1" ? "bg-amber-600 text-white" : "text-slate-700 hover:text-amber-700"}`,
                children: "Section 1"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setCurrentSection("sec2"),
                className: `flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${currentSection === "sec2" ? "bg-amber-600 text-white shadow-xs" : "text-slate-700 hover:text-amber-700"}`,
                children: "Section 2"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setCurrentSection("afterSec2"),
                className: `flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition ${currentSection === "afterSec2" ? "bg-amber-600 text-white shadow-xs" : "text-slate-700 hover:text-amber-700"}`,
                children: "After"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-auto", children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-amber-900 mb-2", children: "Learning Pace" }),
          /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-xl bg-white p-1 shadow-xs border border-amber-200 w-full sm:w-auto", children: ["steady", "normal", "accelerated"].map((pace) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setCurrentPace(pace),
              className: `flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs sm:text-sm font-bold capitalize transition ${currentPace === pace ? "bg-amber-600 text-white shadow-xs" : "text-slate-700 hover:text-amber-700"}`,
              children: pace
            },
            pace
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: activeItems.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white border border-amber-200 rounded-xl p-5 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full", children: item.category }),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "question-text font-medium text-slate-900 pt-1",
                  dangerouslySetInnerHTML: { __html: item.text }
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: playingIndex === index,
                onClick: () => handlePlayAudio(item, index),
                className: "w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-xs shrink-0 disabled:opacity-60 cursor-pointer",
                children: playingIndex === index ? /* @__PURE__ */ jsx("span", { children: "⏳ 再生中..." }) : /* @__PURE__ */ jsx("span", { children: "🔊 音声をきく" })
              }
            )
          ]
        },
        index
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-white shadow-xl text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold mb-3", children: "Why not take your practice a step beyond just listening to audio and actually have a conversation with an AI?" }),
        /* @__PURE__ */ jsx("p", { className: "text-amber-100 text-sm sm:text-base max-w-xl mx-auto mb-6", children: "With the EOY Oral Exam AI Tutor app, you can experience a realistic mock oral exam tailored to your level and pace." }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/#vce-app",
            className: "inline-block bg-white text-amber-800 hover:bg-amber-50 font-extrabold px-8 py-3.5 rounded-full shadow-lg transition transform hover:-translate-y-0.5",
            children: "Check out the app today! 🚀"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("aside", { "aria-label": "AI Yamato", className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", children: [
      showScrollTop && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: scrollToTop,
          className: "bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all cursor-pointer text-sm flex items-center justify-center",
          title: "Scroll to top",
          children: "⬆️"
        }
      ),
      !isAiTutorOpen ? /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsAiTutorOpen(true),
          className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm",
          children: [
            /* @__PURE__ */ jsx("span", { children: "🤖" }),
            /* @__PURE__ */ jsx("span", { children: "AI Yamato" })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        "div",
        {
          ref: aiChatRef,
          className: `bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-2xl flex flex-col transition-all ${isAiFullscreen ? "w-screen h-screen rounded-none border-none p-6 sm:p-10 overflow-auto" : "w-80 sm:w-96 h-[500px] min-w-[280px] min-h-[350px] max-w-[90vw] max-h-[85vh] resize overflow-auto [transform:rotate(180deg)]"}`,
          children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full flex flex-col ${!isAiFullscreen ? "[transform:rotate(180deg)]" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-2 mb-3 shrink-0", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-emerald-900 flex items-center gap-2 m-0", children: [
                /* @__PURE__ */ jsx("span", { children: "🤖" }),
                " 日本語Tutor AI Yamato"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: toggleAiFullscreen,
                    className: "text-slate-500 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer border border-slate-200",
                    title: isAiFullscreen ? "元の大きさに戻す" : "デバイスの画面に合わせて最大化",
                    children: isAiFullscreen ? "🗗 縮小" : "🗖 最大化"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      if (document.fullscreenElement) {
                        document.exitFullscreen().catch(() => {
                        });
                      }
                      setIsAiTutorOpen(false);
                      setIsAiFullscreen(false);
                    },
                    className: "text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer",
                    children: "✕ Close"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed mb-3 shrink-0", children: "Ask questions about examiner phrasing, grammar, or get study advice!" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mb-3 flex items-center justify-between shrink-0", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-emerald-900", children: "Learning Pace" }),
              /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-emerald-200", children: ["steady", "normal", "accelerated"].map((level) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTutorLevel(level),
                  className: `px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition ${tutorLevel === level ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-emerald-700"}`,
                  children: level
                },
                level
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-2.5 flex-grow mb-3", children: [
              tutorMessages.map((msg, idx) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `max-w-[95%] p-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-emerald-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                      children: msg.role === "user" ? msg.content : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "ai-markdown-content overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-1.5 [&_th]:text-left [&_td]:border [&_td]:border-slate-200 [&_td]:p-1.5",
                            dangerouslySetInnerHTML: { __html: msg.content }
                          }
                        ),
                        msg.imageUrl && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg overflow-hidden border border-emerald-200 bg-emerald-50/50 p-1", children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: msg.imageUrl,
                              alt: "AI Yamato Visual Explanation",
                              onClick: () => setModalImageSrc(msg.imageUrl || null),
                              className: "w-full h-auto rounded-md object-contain max-h-48 cursor-pointer hover:opacity-95 transition",
                              title: "クリックして画像を拡大"
                            }
                          ),
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-800 text-center mt-1 font-medium cursor-pointer", onClick: () => setModalImageSrc(msg.imageUrl || null), children: "✨ ヤマト特製図解・イラスト（クリックして拡大）" })
                        ] })
                      ] })
                    }
                  )
                },
                idx
              )),
              isTutorLoading && /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 italic", children: "🤖 AI Yamato is thinking (and creating visual illustration)..." })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSendTutorMessage, className: "flex flex-col gap-2 shrink-0", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-1", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 cursor-pointer select-none", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: requestVisualAid,
                    onChange: (e) => setRequestVisualAid(e.target.checked),
                    disabled: isTutorLoading,
                    className: "rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: "🎨 explain with diagrams and illustrations" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: tutorInput,
                    onChange: (e) => setTutorInput(e.target.value),
                    placeholder: "Ask AI tutor anything...",
                    disabled: isTutorLoading,
                    className: "flex-grow p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isTutorLoading || !tutorInput.trim(),
                    className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",
                    children: "Send"
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    ] }),
    modalImageSrc && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4",
        onClick: () => setModalImageSrc(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2 shadow-2xl flex flex-col items-center", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setModalImageSrc(null),
              className: "absolute top-3 right-3 bg-slate-800/70 hover:bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition cursor-pointer z-10",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: modalImageSrc,
              alt: "Enlarged AI Yamato Visual",
              className: "max-w-full max-h-[80vh] rounded-lg object-contain"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 mt-2 font-medium", children: "✨ ヤマト特製図解・イラスト（拡大表示）" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("footer", { className: "bg-white border-t border-amber-200 py-6 mt-12 text-center text-xs text-slate-500", children: /* @__PURE__ */ jsx("p", { children: "© 2026 JPTutor AI Yamato. All rights reserved. Designed for Australian Curriculum & VCE Japanese Students." }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OralExamQuestions,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const meta$3 = () => {
  return [
    { title: "VCE Japanese - Elaborate Drill | JPTutor AI Yamato" },
    { name: "description", content: "Special training mode to elaborate answers in multiple sentences across 3 proficiency levels." }
  ];
};
const questionsData$2 = oralExamQuestionsData$1;
function formatDrillFeedbackToHtml$1(rawText) {
  let cleaned = rawText.replace(/^#{1,6}\s+/gm, "").replace(/\*\*/g, "");
  cleaned = cleaned.replace(
    /(🌟|👍|🙂|⚠|❌)\s*(Exceptional!|Perfect!|Great!|Good!|Satisfactory\.\.\.|Needs improvement\.\.\.)/g,
    '<div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #f3e8ff; color: #6b21a8; padding: 0.5rem 1rem; border-radius: 9999px; font-weight: bold; font-size: 1rem; border: 1px solid #d8b4fe; margin-bottom: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);"><span>$1</span> <span>$2</span></div>'
  );
  cleaned = cleaned.replace(
    /(?:Evaluation\s*(&|and)\s*Score|Score\s*&\s*Breakdown|Score):/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #0284c7; border-radius: 0.375rem;">📊 Evaluation & Score</div>'
  );
  cleaned = cleaned.replace(
    /(?:Analysis\s*(&|and)\s*Corrections|Key\s*Feedback\s*(&|and)\s*Corrections):/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #fef3c7; color: #b45309; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #d97706; border-radius: 0.375rem;">💡 Analysis & Corrections</div>'
  );
  cleaned = cleaned.replace(
    /Grammar\s*(&|and)\s*Vocabulary\s*Notes:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #ffedd5; color: #c2410c; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #ea580c; border-radius: 0.375rem;">📚 Grammar & Vocabulary Notes</div>'
  );
  cleaned = cleaned.replace(
    /(?:Refined\s*Expression\s*(&|and)\s*Polish|Model\s*Refinement):/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #d1fae5; color: #065f46; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #059669; border-radius: 0.375rem;">✨ Refined Expression & Polish</div>'
  );
  cleaned = cleaned.replace(
    /^(\d+)\.\s+([A-Za-z\s&]+):\s*(.*)$/gm,
    '<div style="margin: 0.5rem 0; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 0.9rem;"><strong style="color: #334155;">$1. $2:</strong> <span style="color: #0f172a; font-weight: 600;">$3</span></div>'
  );
  cleaned = cleaned.replace(/\n/g, "<br>");
  return cleaned;
}
function formatAiTutorFeedbackToHtml$1(rawText) {
  let cleaned = rawText.replace(/^#{1,6}\s+/gm, "").replace(/\*\*/g, "");
  cleaned = cleaned.replace(
    /Explanation\s*(&|and)\s*Overview:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #0284c7; border-radius: 0.375rem;">💡 Explanation & Overview</div>'
  );
  cleaned = cleaned.replace(
    /Usage\s*(&|and)\s*Grammar\s*Notes:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #fef3c7; color: #b45309; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #d97706; border-radius: 0.375rem;">✍️ Usage & Grammar Notes</div>'
  );
  cleaned = cleaned.replace(
    /Practical\s*Examples:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #d1fae5; color: #065f46; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #059669; border-radius: 0.375rem;">💬 Practical Examples</div>'
  );
  cleaned = cleaned.replace(
    /Common\s*Mistakes:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #fee2e2; color: #b91c1c; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #dc2626; border-radius: 0.375rem;">⚠️ Common Mistakes</div>'
  );
  cleaned = cleaned.replace(
    /Key\s*Takeaways:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #f3e8ff; color: #6b21a8; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #9333ea; border-radius: 0.375rem;">🎯 Key Takeaways</div>'
  );
  cleaned = cleaned.replace(
    /Next\s*Step:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #ccfbf1; color: #115e59; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #0d9488; border-radius: 0.375rem;">🚀 Next Step</div>'
  );
  cleaned = cleaned.replace(
    /AI\s*Yamato\s*Feedback:/gi,
    '<div style="font-weight: 900; color: #581c87; margin-bottom: 0.75rem; font-size: 1.05rem; border-bottom: 2px solid #f3e8ff; padding-bottom: 0.3rem;">🤖 AI Yamato Feedback</div>'
  );
  cleaned = cleaned.replace(
    /^(\d+)\.\s+([A-Za-z\s&]+):\s*(.*)$/gm,
    '<div style="margin: 0.5rem 0; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 0.9rem;"><strong style="color: #334155;">$1. $2:</strong> <span style="color: #0f172a; font-weight: 600;">$3</span></div>'
  );
  cleaned = cleaned.replace(/\n/g, "<br>");
  return cleaned;
}
function ElaborateDrillMode() {
  const [selectedLevel, setSelectedLevel] = useState("level2");
  const [selectedSection, setSelectedSection] = useState("sec1");
  const [selectedTopics, setSelectedTopics] = useState(["アルバイト (Part-time Job)"]);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAiFullscreen, setIsAiFullscreen] = useState(false);
  const [chatFontSize, setChatFontSize] = useState("base");
  const aiChatRef = useRef(null);
  const [currentDrillContext, setCurrentDrillContext] = useState(null);
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: "assistant",
      content: "Welcome! Feel free to ask me anything about Japanese grammar or study tips."
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [requestVisualAid, setRequestVisualAid] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [tutorLevel, setTutorLevel] = useState("steady");
  const getFontSizeClass = () => {
    switch (chatFontSize) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };
  const toggleAiFullscreen = async () => {
    if (!aiChatRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await aiChatRef.current.requestFullscreen();
        setIsAiFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsAiFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsAiFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const handleSendTutorMessage = async (e) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;
    const userMsg = tutorInput.trim();
    const needsVisual = requestVisualAid;
    setTutorInput("");
    setRequestVisualAid(false);
    const newMessages = [...tutorMessages, { role: "user", content: userMsg }];
    setTutorMessages(newMessages);
    setIsTutorLoading(true);
    try {
      const visualPrompt = needsVisual ? `Educational instructional diagram and visual aid for VCE Japanese high school students explaining: ${userMsg}. Clean layout, high quality, professional illustration style.` : void 0;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: tutorMessages,
          learningPace: tutorLevel,
          visualPrompt,
          drillContext: currentDrillContext
        })
      });
      if (!res.ok) {
        throw new Error("Failed to get response from AI tutor");
      }
      const data = await res.json();
      const replyText = data.reply || "I'm here to help you with your Japanese studies!";
      const imageUrl = data.imageUrl;
      const formattedReply = formatAiTutorFeedbackToHtml$1(replyText);
      setTutorMessages([
        ...newMessages,
        {
          role: "assistant",
          content: formattedReply,
          imageUrl
        }
      ]);
    } catch (err) {
      console.error(err);
      setTutorMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try asking again!" }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };
  const [orderMode, setOrderMode] = useState("sequential");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Welcome to the Elaborate Drill. Select your level and section, practice expanding your answers in multiple sentences, and click '🚀 Start Drill with Selected Range' above to start.",
      isHtml: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isWaitingForNext, setIsWaitingForNext] = useState(false);
  const getDifficultyKey = (level) => {
    if (level === "level1") return "steady";
    if (level === "level2") return "normal";
    return "accelerated";
  };
  const availableSec1Topics = useMemo(() => {
    const sectionObj = questionsData$2["sec1"];
    if (!sectionObj) return [];
    const diffKey = getDifficultyKey(selectedLevel);
    const targetList = sectionObj[diffKey] || sectionObj.steady || [];
    const categoriesSet = /* @__PURE__ */ new Set();
    targetList.forEach((item) => {
      if (item.category) {
        categoriesSet.add(item.category);
      }
    });
    return Array.from(categoriesSet);
  }, [selectedLevel]);
  const handleTopicClick = (top) => {
    let updated = [...selectedTopics];
    if (updated.includes(top)) {
      updated = updated.filter((t) => t !== top);
    } else {
      updated.push(top);
    }
    setSelectedTopics(updated);
  };
  const handleSelectAllTopics = () => setSelectedTopics(availableSec1Topics);
  const handleDeselectAllTopics = () => setSelectedTopics([]);
  const playTTS = async (textToSpeak) => {
    try {
      const cleanedText = textToSpeak.replace(/【.*?】/g, "").replace(/※.*$/gm, "").trim();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speakText: cleanedText })
      });
      if (!response.ok) return;
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error("Audio playback error:", err));
    } catch (err) {
      console.error("TTS request error:", err);
    }
  };
  const getFilteredQuestions = () => {
    let rawList = [];
    const diffKey = getDifficultyKey(selectedLevel);
    const sectionObj = questionsData$2[selectedSection];
    if (sectionObj) {
      const targetSource = sectionObj[diffKey] || sectionObj.steady || [];
      if (selectedSection === "sec1") {
        rawList = targetSource.filter((item) => selectedTopics.includes(item.category));
      } else {
        rawList = targetSource;
      }
    }
    return rawList.map((item, idx) => ({
      id: item.audio ? item.audio.replace("/audio/", "").replace(".mp3", "") : `q_${idx}`,
      category: item.category || "General",
      text: item.text || "",
      text_original: item.text_original || item.text,
      default_answer_original: item.default_answer_original || item.default_answer || "",
      keyInfoHint: item.keyInfoHint || "Incorporate reasons and specific examples, and elaborate using multiple sentences."
    }));
  };
  const startDrillPractice = () => {
    let qList = getFilteredQuestions();
    if (qList.length === 0) {
      alert("No questions found matching your criteria. Please select at least one topic.");
      return;
    }
    if (orderMode === "random") {
      qList = [...qList].sort(() => Math.random() - 0.5);
    }
    setActiveQuestions(qList);
    setCurrentQuestionIndex(0);
    setIsPracticing(true);
    setIsWaitingForNext(false);
    setInputMessage("");
    const firstQ = qList[0];
    const initialText = `[Elaborate Drill Started] First Question (Category: ${firstQ.category}):<br><br>「${firstQ.text}」<br><br>💡 Tip: ${firstQ.keyInfoHint}<br>Try answering richly using multiple sentences!`;
    setChatMessages([
      {
        role: "assistant",
        content: initialText,
        isHtml: true
      }
    ]);
    playTTS(firstQ.text_original || firstQ.text);
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudioToInput(audioBlob);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Microphone access denied or unavailable.");
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.key === " ") {
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
          return;
        }
        if (!isPracticing || isLoading || isWaitingForNext) {
          return;
        }
        e.preventDefault();
        if (!isRecording) {
          startRecording();
        } else {
          stopRecording();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPracticing, isLoading, isWaitingForNext, isRecording]);
  const transcribeAudioToInput = async (audioBlob) => {
    setIsLoading(true);
    const currentQ = activeQuestions[currentQuestionIndex];
    const formData = new FormData();
    formData.append("audio", audioBlob, "user-audio.webm");
    formData.append("expectedQuestion", currentQ.text_original || currentQ.text);
    formData.append("mode", "drill-elaborate-transcribe");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }
      const data = await response.json();
      const transcribedText = data.userText || "";
      setInputMessage(transcribedText);
    } catch (err) {
      console.error(err);
      alert("An error occurred during audio transcription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    const userText = inputMessage.trim();
    setInputMessage("");
    const newMessages = [...chatMessages, { role: "user", content: userText, isHtml: false }];
    setChatMessages(newMessages);
    setIsLoading(true);
    const currentQ = activeQuestions[currentQuestionIndex];
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          expectedQuestion: currentQ.text_original || currentQ.text,
          registeredAnswer: currentQ.default_answer_original,
          mode: "drill-elaborate",
          difficulty: getDifficultyKey(selectedLevel),
          section: selectedSection
        })
      });
      const data = await response.json();
      const rawAiFeedback = data.reply || "Content reviewed.";
      setCurrentDrillContext({
        question: currentQ.text_original || currentQ.text,
        userAnswer: userText,
        aiFeedback: rawAiFeedback
      });
      const formattedFeedback = formatDrillFeedbackToHtml$1(rawAiFeedback);
      let fullFeedback = `<div style="font-weight: 900; color: #581c87; margin-bottom: 0.75rem; font-size: 1.05rem; border-bottom: 2px solid #f3e8ff; padding-bottom: 0.3rem;">AI Yamato Feedback</div>${formattedFeedback}`;
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < activeQuestions.length) {
        fullFeedback += `<br><br><div style="text-align: center; margin-top: 1rem;"><strong style="color: #0d9488;">👉 Ready to Proceed?</strong></div>`;
        setIsWaitingForNext(true);
      } else {
        fullFeedback += `<br><br><div style="text-align: center; margin-top: 1rem; color: #15803d; font-weight: bold;">🎉 You have completed all questions! Great job expanding your answers!</div>`;
        setIsPracticing(false);
      }
      setChatMessages([...newMessages, { role: "assistant", content: fullFeedback, isHtml: true }]);
    } catch (err) {
      console.error(err);
      setChatMessages([...newMessages, { role: "assistant", content: "An error occurred. Please try again.", isHtml: false }]);
    } finally {
      setIsLoading(false);
    }
  };
  const proceedToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      const nextQ = activeQuestions[nextIndex];
      setInputMessage("");
      const nextMessage = {
        role: "assistant",
        content: `Next question (Category: ${nextQ.category}):<br><br>「${nextQ.text}」<br><br>💡 Tip: ${nextQ.keyInfoHint}<br>Try answering in detail using multiple sentences!`,
        isHtml: true
      };
      setChatMessages((prev) => [...prev, nextMessage]);
      setIsWaitingForNext(false);
      playTTS(nextQ.text_original || nextQ.text);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 min-h-screen text-slate-800 font-sans pb-16 relative", children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes rotate-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glow-border-btn {
          position: relative;
          background-color: #0d9488;
          color: white;
          border-radius: 12px;
          background-clip: padding-box;
          border: 3px solid transparent;
        }
        .glow-border-btn::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 14px;
          background: linear-gradient(90deg, #2dd4bf, #f59e0b, #3b82f6, #2dd4bf);
          background-size: 300% 300%;
          animation: rotate-border 2.5s linear infinite;
          z-index: -1;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      ` }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-purple-300 rounded-2xl p-6 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-slate-900 mb-2", children: "💡 Study Tips for Elaborate Drill" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600 leading-relaxed", children: [
          "Practice responding to questions tailored to your proficiency level by ",
          /* @__PURE__ */ jsx("strong", { children: "expanding and enriching your answers using multiple sentences" }),
          " (elaborating), rather than just single words. Spoken answers are transcribed automatically—review and edit if needed before sending! (Press ",
          /* @__PURE__ */ jsx("strong", { children: "Spacebar" }),
          " to toggle recording!)"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-purple-200 rounded-2xl p-6 shadow-md space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "🎯 Select Level" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: [
            { id: "level1", label: "🌱 Level 1 (Foundation)" },
            { id: "level2", label: "🌿 Level 2 (Standard)" },
            { id: "level3", label: "🌳 Level 3 (Advanced)" }
          ].map((lvl) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedLevel(lvl.id),
              disabled: isPracticing,
              className: `p-3 rounded-xl border text-sm font-bold transition cursor-pointer ${selectedLevel === lvl.id ? "bg-purple-300 text-purple-950 border-purple-400 shadow-xs" : "bg-purple-50/60 text-slate-700 border-purple-200 hover:bg-purple-100"}`,
              children: lvl.label
            },
            lvl.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2 border-t", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "📂 Select Section / Source" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
            { id: "beforeSec1", label: "Before Sec 1" },
            { id: "sec1", label: "Section 1" },
            { id: "sec2", label: "Section 2" },
            { id: "afterSec2", label: "After Sec 2" }
          ].map((sec) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedSection(sec.id),
              disabled: isPracticing,
              className: `p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${selectedSection === sec.id ? "bg-purple-300 text-purple-950 border-purple-400 shadow-xs" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,
              children: sec.label
            },
            sec.id
          )) })
        ] }),
        selectedSection === "sec1" && /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-md font-bold text-slate-900", children: [
              "🏷 Filter Topics (",
              selectedTopics.length,
              " selected)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSelectAllTopics,
                  disabled: isPracticing,
                  className: "text-xs bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold px-3 py-1 rounded transition cursor-pointer",
                  children: "Select All"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleDeselectAllTopics,
                  disabled: isPracticing,
                  className: "text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1 rounded transition cursor-pointer",
                  children: "Deselect All"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: availableSec1Topics.map((top) => {
            const isSelected = selectedTopics.includes(top);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleTopicClick(top),
                disabled: isPracticing,
                className: `px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${isSelected ? "bg-purple-300 text-purple-950 border-purple-400 shadow-2xs" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50"}`,
                children: [
                  isSelected ? "✓ " : "",
                  top
                ]
              },
              top
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700", children: "Order Mode:" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-sm cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "orderMode", checked: orderMode === "sequential", onChange: () => setOrderMode("sequential"), disabled: isPracticing }),
              " Sequential"
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-sm cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "orderMode", checked: orderMode === "random", onChange: () => setOrderMode("random"), disabled: isPracticing }),
              " Random"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: startDrillPractice,
              disabled: isPracticing,
              className: "w-full sm:w-auto bg-purple-300 hover:bg-purple-400 disabled:bg-slate-300 text-purple-950 border border-purple-400 font-bold px-6 py-3 rounded-xl shadow-xs transition cursor-pointer",
              children: "🚀 Start Drill with Selected Range"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-purple-200 rounded-2xl p-6 shadow-md space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "2. Conversation Practice with AI Yamato!🎙️" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-xl p-4 h-96 overflow-y-auto space-y-3", children: [
          chatMessages.map((msg, idx) => /* @__PURE__ */ jsx("div", { className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-teal-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-sm"}`, children: msg.isHtml ? /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: msg.content } }) : msg.content }) }, idx)),
          isLoading && /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 italic", children: "AI is analyzing your elaborate answer..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 p-3 bg-purple-50 border border-purple-200 rounded-xl flex-wrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-2 justify-center sm:justify-start flex-wrap", children: [
              !isRecording ? /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: startRecording,
                  disabled: !isPracticing || isLoading || isWaitingForNext,
                  className: "flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-bold px-6 py-3 rounded-full shadow-md transition cursor-pointer text-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "🎙️" }),
                    " Recording ",
                    /* @__PURE__ */ jsx("span", { className: "text-xs bg-rose-800 px-2 py-0.5 rounded-full opacity-90", children: "[Spacebar]" })
                  ]
                }
              ) : /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: stopRecording,
                  className: "flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full shadow-md transition animate-pulse cursor-pointer text-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "⏹" }),
                    " Stop Recording ",
                    /* @__PURE__ */ jsx("span", { className: "text-xs bg-amber-700 px-2 py-0.5 rounded-full opacity-90", children: "[Spacebar]" })
                  ]
                }
              ),
              isPracticing && activeQuestions[currentQuestionIndex] && /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const currentQ = activeQuestions[currentQuestionIndex];
                    if (currentQ) playTTS(currentQ.text_original || currentQ.text);
                  },
                  disabled: isLoading,
                  className: "flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-3 rounded-full shadow-md transition text-sm cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "🔊" }),
                    " Repeat Q"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center sm:justify-end min-w-[120px]", children: isWaitingForNext && /* @__PURE__ */ jsx("button", { type: "button", onClick: proceedToNextQuestion, className: "glow-border-btn font-bold px-6 py-3 rounded-xl text-sm shadow-lg transition cursor-pointer", children: "➡ Proceed" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSendMessage, className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: inputMessage,
                onChange: (e) => setInputMessage(e.target.value),
                placeholder: isWaitingForNext ? "Please click 'Proceed' above" : isPracticing ? "Type or record your answer..." : "Start drill above first...",
                disabled: !isPracticing || isLoading || isWaitingForNext,
                className: "flex-grow p-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none disabled:bg-slate-150"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: !isPracticing || isLoading || !inputMessage.trim() || isWaitingForNext,
                className: "bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold px-6 py-3 rounded-xl transition text-sm shrink-0 cursor-pointer",
                children: "Send"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("aside", { "aria-label": "AI Yamato", className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", children: !isAiTutorOpen ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsAiTutorOpen(true),
        className: "bg-purple-700 hover:bg-purple-800 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm",
        children: [
          /* @__PURE__ */ jsx("span", { children: "🤖" }),
          /* @__PURE__ */ jsx("span", { children: "AI Yamato" })
        ]
      }
    ) : /* @__PURE__ */ jsx(
      "div",
      {
        ref: aiChatRef,
        className: `bg-white border-2 border-purple-300 rounded-2xl p-5 shadow-2xl flex flex-col transition-all ${isAiFullscreen ? "w-screen h-screen rounded-none border-none p-6 sm:p-10 overflow-auto" : "w-80 sm:w-96 h-[560px] min-w-[280px] min-h-[350px] max-w-[90vw] max-h-[85vh] resize overflow-auto [transform:rotate(180deg)]"}`,
        children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full flex flex-col ${!isAiFullscreen ? "[transform:rotate(180deg)]" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-2 mb-3 shrink-0", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-purple-900 flex items-center gap-2 m-0", children: [
              /* @__PURE__ */ jsx("span", { children: "🤖" }),
              " 日本語Tutor AI Yamato"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: toggleAiFullscreen,
                  className: "text-slate-500 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer border border-slate-200",
                  title: isAiFullscreen ? "元の大きさに戻す" : "デバイスの画面に合わせて最大化",
                  children: isAiFullscreen ? "🗗 縮小" : "🗖 最大化"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {
                      });
                    }
                    setIsAiTutorOpen(false);
                    setIsAiFullscreen(false);
                  },
                  className: "text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer",
                  children: "✕ Close"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed mb-3 shrink-0", children: "Ask questions about grammar, or get study advice!" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-purple-50 border border-purple-200 rounded-xl p-2.5 mb-2 flex items-center justify-between shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-purple-900", children: "Learning Pace" }),
            /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-purple-200", children: ["steady", "normal", "accelerated"].map((level) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setTutorLevel(level),
                className: `px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition cursor-pointer ${tutorLevel === level ? "bg-purple-700 text-white shadow-xs" : "text-slate-600 hover:text-purple-800"}`,
                children: level
              },
              level
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 border border-slate-200 rounded-xl p-2.5 mb-3 flex items-center justify-between shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-700", children: "Font Size" }),
            /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-slate-200", children: [
              { key: "sm", label: "小" },
              { key: "base", label: "中" },
              { key: "lg", label: "大" },
              { key: "xl", label: "特大" }
            ].map((size) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setChatFontSize(size.key),
                className: `px-2 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${chatFontSize === size.key ? "bg-purple-700 text-white shadow-xs" : "text-slate-600 hover:text-purple-800"}`,
                children: size.label
              },
              size.key
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-2.5 flex-grow mb-3 ${getFontSizeClass()}`, children: [
            tutorMessages.map((msg, idx) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `max-w-[95%] p-2.5 rounded-xl leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-purple-700 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                    children: msg.role === "user" ? msg.content : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "ai-markdown-content overflow-x-auto",
                          dangerouslySetInnerHTML: { __html: msg.content }
                        }
                      ),
                      msg.imageUrl && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg overflow-hidden border border-purple-200 bg-purple-50/50 p-1", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: msg.imageUrl,
                            alt: "AI Yamato Visual Explanation",
                            onClick: () => setModalImageSrc(msg.imageUrl || null),
                            className: "w-full h-auto rounded-md object-contain max-h-48 cursor-pointer hover:opacity-95 transition",
                            title: "クリックして画像を拡大"
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-purple-900 text-center mt-1 font-medium cursor-pointer", onClick: () => setModalImageSrc(msg.imageUrl || null), children: "✨ ヤマト特製図解・イラスト（クリックして拡大）" })
                      ] })
                    ] })
                  }
                )
              },
              idx
            )),
            isTutorLoading && /* @__PURE__ */ jsx("div", { className: "text-slate-500 italic", children: "🤖 AI Yamato is thinking (and creating visual illustration)..." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSendTutorMessage, className: "flex flex-col gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-1", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-[11px] font-bold text-purple-900 cursor-pointer select-none", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: requestVisualAid,
                  onChange: (e) => setRequestVisualAid(e.target.checked),
                  disabled: isTutorLoading,
                  className: "rounded border-purple-300 text-purple-700 focus:ring-purple-500 w-3.5 h-3.5 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "🎨 explain with diagrams and illustrations" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: tutorInput,
                  onChange: (e) => setTutorInput(e.target.value),
                  placeholder: "Ask AI tutor anything...",
                  disabled: isTutorLoading,
                  className: "flex-grow p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50/50"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isTutorLoading || !tutorInput.trim(),
                  className: "px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",
                  children: "Send"
                }
              )
            ] })
          ] })
        ] })
      }
    ) }),
    modalImageSrc && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4",
        onClick: () => setModalImageSrc(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2 shadow-2xl flex flex-col items-center", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setModalImageSrc(null),
              className: "absolute top-3 right-3 bg-slate-800/70 hover:bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition cursor-pointer z-10",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: modalImageSrc,
              alt: "Enlarged AI Yamato Visual",
              className: "max-w-full max-h-[80vh] rounded-lg object-contain"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 mt-2 font-medium", children: "✨ AI Yamato 特製図解・イラスト（拡大表示）" })
        ] })
      }
    )
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ElaborateDrillMode,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      className: "fixed bottom-6 left-6 z-40 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition cursor-pointer text-xs font-bold",
      title: "ページトップへ戻る",
      children: "▲ Top"
    }
  );
}
function GenkoyoshiEditor() {
  const [format, setFormat] = useState("400");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAiTutorExpanded, setIsAiTutorExpanded] = useState(false);
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your Japanese Writing Tutor. Have any questions about your writing, kanji, or studies? Ask me anything!"
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [tutorLevel, setTutorLevel] = useState("steady");
  useEffect(() => {
    setIsClient(true);
  }, []);
  const isPunctuation = (char) => {
    return ["、", "。", "，", "．", "！", "？", "」", "』", "）", "〕", "］", "｝", "』", "〉", "》"].includes(char);
  };
  const isHalfWidthDigit = (char) => {
    return /^[0-9]$/.test(char);
  };
  const parseTextToItems = (inputText) => {
    const chars = Array.from(inputText);
    const items = [];
    let i = 0;
    while (i < chars.length) {
      const c1 = chars[i];
      if (isHalfWidthDigit(c1) && i + 1 < chars.length && isHalfWidthDigit(chars[i + 1])) {
        items.push({ type: "num", value: c1 + chars[i + 1] });
        i += 2;
      } else {
        items.push({ type: "char", value: c1 });
        i += 1;
      }
    }
    return items;
  };
  const createEmptyCell = () => ({ type: "char", value: "" });
  const padRowToLength = (row, colsPerLine = 20) => {
    const padded = [...row];
    while (padded.length < colsPerLine) {
      padded.push(createEmptyCell());
    }
    return padded;
  };
  const generatePages = () => {
    const colsPerLine = 20;
    const maxRows = format === "400" ? 20 : 10;
    const paragraphs = text.split("\n");
    const contentLines = [];
    for (const p of paragraphs) {
      const parsedItems = parseTextToItems(p);
      if (parsedItems.length > 0) {
        const first = parsedItems[0];
        if (!(first.type === "char" && first.value === " ")) {
          parsedItems.unshift({ type: "char", value: " " });
        }
      }
      let currentLineItems = [];
      let i = 0;
      while (i < parsedItems.length) {
        const item = parsedItems[i];
        if (currentLineItems.length === colsPerLine) {
          contentLines.push(padRowToLength(currentLineItems, colsPerLine));
          currentLineItems = [];
        }
        if (currentLineItems.length === 0 && item.type === "char" && isPunctuation(item.value) && contentLines.length > 0) {
          const prevLine = contentLines[contentLines.length - 1];
          if (prevLine.length > 0) {
            const lastItem = prevLine[prevLine.length - 1];
            if (lastItem.type === "co") {
              prevLine[prevLine.length - 1] = {
                type: "co",
                main: lastItem.main,
                sub: lastItem.sub + item.value
              };
            } else if (lastItem.type === "char") {
              prevLine[prevLine.length - 1] = {
                type: "co",
                main: lastItem.value,
                sub: item.value
              };
            }
            i++;
            continue;
          }
        }
        currentLineItems.push(item);
        i++;
      }
      if (currentLineItems.length > 0) {
        contentLines.push(padRowToLength(currentLineItems, colsPerLine));
      }
    }
    const allPagesLines = [];
    let currentPageLines = [];
    const row0 = Array.from({ length: colsPerLine }, createEmptyCell);
    if (title) {
      const titleItems = parseTextToItems(title);
      for (let idx = 0; idx < titleItems.length && 3 + idx < colsPerLine; idx++) {
        row0[3 + idx] = titleItems[idx];
      }
    }
    currentPageLines.push(row0);
    const row1 = Array.from({ length: colsPerLine }, createEmptyCell);
    if (name) {
      const nameItems = parseTextToItems(name);
      let startIndex = colsPerLine - 1 - nameItems.length;
      if (startIndex < 0) startIndex = 0;
      for (let idx = 0; idx < nameItems.length && startIndex + idx < colsPerLine - 1; idx++) {
        row1[startIndex + idx] = nameItems[idx];
      }
    }
    currentPageLines.push(row1);
    let contentIndex = 0;
    while (contentIndex < contentLines.length) {
      if (currentPageLines.length >= maxRows) {
        allPagesLines.push(currentPageLines);
        currentPageLines = [];
      }
      currentPageLines.push(contentLines[contentIndex]);
      contentIndex++;
    }
    if (currentPageLines.length > 0) {
      allPagesLines.push(currentPageLines);
    }
    return allPagesLines.map((pageLines) => {
      const paddedPage = [...pageLines];
      while (paddedPage.length < maxRows) {
        paddedPage.push(Array.from({ length: colsPerLine }, createEmptyCell));
      }
      return paddedPage;
    });
  };
  const pages = isClient ? generatePages() : [];
  const charCount = text.replace(/\n/g, "").length;
  const clearAll = () => {
    setTitle("");
    setName("");
    setText("");
  };
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
  const handleSendTutorMessage = async (e) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;
    const userMsg = tutorInput.trim();
    setTutorInput("");
    const newMessages = [...tutorMessages, { role: "user", content: userMsg }];
    setTutorMessages(newMessages);
    setIsTutorLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: tutorMessages,
          learningPace: tutorLevel
        })
      });
      if (!response.ok) {
        throw new Error("Failed to get response from AI tutor");
      }
      const data = await response.json();
      const replyText = data.reply || "I'm here to help you with your Japanese studies!";
      setTutorMessages([...newMessages, { role: "assistant", content: replyText }]);
    } catch (err) {
      console.error(err);
      setTutorMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try asking again!" }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "genko-editor-root", children: [
    /* @__PURE__ */ jsx("style", { children: `
        :root {
          --cell-size: 41px;
          --line-gap: 8px;
        }

        .genko-editor-root {
          font-family: sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f6f9;
          color: #333;
          min-height: 100vh;
          position: relative;
        }

        .genko-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .genko-editor-pane {
          flex: 1;
          min-width: 300px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .genko-preview-pane {
          flex: 1.5;
          min-width: 350px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow-x: auto;
        }

        .genko-control-group {
          margin-bottom: 15px;
        }

        .genko-control-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .genko-control-group input[type="text"],
        .genko-control-group textarea,
        .genko-control-group select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 1rem;
        }

        .genko-control-group textarea {
          height: 150px;
          resize: vertical;
        }

        .genko-btn-container {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .genko-btn-container button {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .genko-btn-print {
          background-color: #0066cc;
          color: #fff;
          flex: 1;
        }

        .genko-btn-print:hover {
          background-color: #0052a3;
        }

        .genko-btn-clear {
          background-color: #e0e0e0;
          color: #333;
        }

        .genko-btn-clear:hover {
          background-color: #d0d0d0;
        }

        .genko-stats {
          margin-top: 10px;
          font-size: 0.85rem;
          color: #555;
        }

        .genko-cta-box {
          margin-top: 25px;
          padding: 15px;
          background-color: #eef6ff;
          border: 1px solid #b6d4fe;
          border-radius: 6px;
        }

        .genko-cta-box h3 {
          margin-top: 0;
          font-size: 1rem;
          color: #004085;
        }

        .genko-cta-box p {
          font-size: 0.85rem;
          color: #333;
          margin-bottom: 10px;
        }

        .genko-cta-link {
          display: inline-block;
          font-weight: bold;
          color: #0066cc;
          text-decoration: underline;
        }

        .genko-sheet {
          background: #fff;
          border: 1px solid #ccc;
          padding: 30px;
          box-sizing: border-box;
          display: inline-block;
          min-width: 100%;
          margin-bottom: 20px;
        }

        .genko-grid {
          display: flex;
          flex-direction: column;
          gap: var(--line-gap);
        }

        .genko-row {
          display: flex;
          gap: 0;
        }

        .genko-cell {
          width: var(--cell-size);
          height: var(--cell-size);
          border: 1px solid #999;
          box-sizing: border-box;
          display: flex;
          align-items: flex-end;     
          justify-content: center;   
          padding-bottom: 2mm;        
          font-size: 1.35rem;         
          line-height: 1;
          position: relative;
          background-color: #fff;
        }

        .genko-cell::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border: 1px dotted #ffcccc;
          pointer-events: none;
        }

        .co-cell {
          justify-content: flex-end; 
          padding-right: 2px;
        }

        .co-wrapper {
          display: flex;
          align-items: flex-end;     
          font-size: 1.35rem;         
          line-height: 1;
          transform: translateX(3mm); 
        }

        .co-main {
          display: inline-block;
        }

        .co-sub {
          display: inline-block;
          font-size: 1.35rem;         
        }

        .num-cell {
          justify-content: center;
          align-items: flex-end;
          padding-bottom: 2mm;
        }

        .num-pair {
          display: inline-flex;
          font-size: 1.2rem;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        @page {
          size: B4 portrait;
          margin: 10mm;
        }

        @media print {
          body, .genko-editor-root {
            background: none !important;
            padding: 0 !important;
          }
          header,
          .genko-editor-pane,
          .genko-btn-container,
          .genko-cta-box,
          aside {
            display: none !important;
          }
          .genko-preview-pane {
            box-shadow: none !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          .genko-sheet {
            border: none !important;
            margin: 0 !important;
            page-break-after: always;
          }
        }
      ` }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("div", { className: "genko-container mt-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "genko-editor-pane", children: [
        /* @__PURE__ */ jsxs("div", { className: "genko-control-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "format", children: "用紙フォーマット" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "format",
              value: format,
              onChange: (e) => setFormat(e.target.value),
              children: [
                /* @__PURE__ */ jsx("option", { value: "400", children: "400字詰め（20字×20行）" }),
                /* @__PURE__ */ jsx("option", { value: "200", children: "200字詰め（20字×10行）" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "genko-control-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "titleInput", children: "題名（タイトル）" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "titleInput",
              placeholder: "例：日本のアニメについて",
              value: title,
              onChange: (e) => setTitle(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "genko-control-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "nameInput", children: "氏名" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "nameInput",
              placeholder: "例：山田 太郎",
              value: name,
              onChange: (e) => setName(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "genko-control-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "textInput", children: "本文" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "textInput",
              placeholder: "ここに文を書いてください。",
              value: text,
              onChange: (e) => setText(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "genko-stats", children: [
          "文字数: ",
          charCount,
          "字"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "genko-btn-container", children: [
          /* @__PURE__ */ jsx("button", { className: "genko-btn-print", onClick: handlePrint, children: "印刷する / PDF保存" }),
          /* @__PURE__ */ jsx("button", { className: "genko-btn-clear", onClick: clearAll, children: "消す" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "genko-cta-box", id: "vce-app", children: [
          /* @__PURE__ */ jsx("h3", { children: "Ready for your Exam Writing?" }),
          /* @__PURE__ */ jsx("p", { children: "Don't leave your marks to chance! Power up your writing prep with instant checks, grammar feedback, and scoring tips." }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "genko-cta-link", children: "Discover AI Writing Tutor →" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "genko-preview-pane", children: /* @__PURE__ */ jsx("div", { children: isClient && pages.map((pageRows, pageIdx) => /* @__PURE__ */ jsx("div", { className: "genko-sheet", children: /* @__PURE__ */ jsx("div", { className: "genko-grid", children: pageRows.map((rowItems, rowIdx) => /* @__PURE__ */ jsx("div", { className: "genko-row", children: rowItems.map((item, colIdx) => {
        if (item.type === "co") {
          return /* @__PURE__ */ jsx("div", { className: "genko-cell co-cell", children: /* @__PURE__ */ jsxs("div", { className: "co-wrapper", children: [
            /* @__PURE__ */ jsx("span", { className: "co-main", children: item.main }),
            /* @__PURE__ */ jsx("span", { className: "co-sub", children: item.sub })
          ] }) }, colIdx);
        } else if (item.type === "num") {
          return /* @__PURE__ */ jsx("div", { className: "genko-cell num-cell", children: /* @__PURE__ */ jsx("span", { className: "num-pair", children: item.value }) }, colIdx);
        } else if (item.type === "char") {
          return /* @__PURE__ */ jsx("div", { className: "genko-cell", children: item.value }, colIdx);
        }
        return /* @__PURE__ */ jsx("div", { className: "genko-cell" }, colIdx);
      }) }, rowIdx)) }) }, pageIdx)) }) })
    ] }),
    /* @__PURE__ */ jsx(ScrollTopButton, {}),
    /* @__PURE__ */ jsx("aside", { "aria-label": "AI Tutor", className: "fixed bottom-6 right-6 z-50 flex flex-col items-end", children: !isAiTutorOpen ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsAiTutorOpen(true),
        className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm",
        children: [
          /* @__PURE__ */ jsx("span", { children: "🤖" }),
          /* @__PURE__ */ jsx("span", { children: "AI Tutor" })
        ]
      }
    ) : /* @__PURE__ */ jsxs("div", { className: `bg-white border-2 border-blue-300 rounded-2xl p-5 shadow-2xl transition-all duration-200 space-y-4 ${isAiTutorExpanded ? "w-[90vw] sm:w-[500px] md:w-[600px]" : "w-80 sm:w-96"}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-2", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-blue-900 flex items-center gap-2 m-0", children: [
          /* @__PURE__ */ jsx("span", { children: "🤖" }),
          " Japanese Writing AI Tutor"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setIsAiTutorExpanded(!isAiTutorExpanded),
              className: "text-slate-500 hover:text-blue-700 text-xs font-bold px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 transition cursor-pointer",
              title: isAiTutorExpanded ? "元のサイズに戻す" : "窓を大きく広げる",
              children: isAiTutorExpanded ? "🗗 元に戻す" : "🗖 拡大"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setIsAiTutorOpen(false);
                setIsAiTutorExpanded(false);
              },
              className: "text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer",
              children: "✕ Close"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Ask questions about your writing, kanji, or get study advice!" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-blue-900", children: "Learning Pace" }),
        /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-blue-200", children: ["steady", "normal", "accelerated"].map((level) => /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setTutorLevel(level),
            className: `px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition cursor-pointer ${tutorLevel === level ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-blue-700"}`,
            children: level
          },
          level
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-2.5 transition-all duration-200 ${isAiTutorExpanded ? "h-96" : "h-44"}`, children: [
        tutorMessages.map((msg, idx) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `max-w-[90%] p-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                children: msg.content
              }
            )
          },
          idx
        )),
        isTutorLoading && /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 italic", children: "🤖 AI Tutor is thinking..." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSendTutorMessage, className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: tutorInput,
            onChange: (e) => setTutorInput(e.target.value),
            placeholder: "Ask AI tutor anything...",
            disabled: isTutorLoading,
            className: "flex-grow p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: isTutorLoading || !tutorInput.trim(),
            className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",
            children: "Send"
          }
        )
      ] })
    ] }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GenkoyoshiEditor
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [
    { title: "VCE Japanese - Unified Drill & Custom QA Bank | JPTutor AI Yamato" },
    { name: "description", content: "Unified drill practice supporting VCE exam sections, levels, and your own custom Q&A bank." }
  ];
};
const questionsData$1 = oralExamQuestionsData$1;
function formatDrillFeedbackToHtml(rawText) {
  if (!rawText) return "";
  let cleaned = rawText.replace(/^#{1,6}\s+/gm, "").replace(/\*\*/g, "");
  cleaned = cleaned.replace(
    /Evaluation\s*(&|and)\s*Score:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #0284c7; border-radius: 0.375rem;">📊 Evaluation & Score</div>'
  );
  cleaned = cleaned.replace(
    /Analysis\s*(&|and)\s*Corrections:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #fef3c7; color: #b45309; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #d97706; border-radius: 0.375rem;">💡 Analysis & Corrections</div>'
  );
  cleaned = cleaned.replace(
    /Grammar\s*(&|and)\s*Vocabulary\s*Notes:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #ffedd5; color: #c2410c; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #ea580c; border-radius: 0.375rem;">📚 Grammar & Vocabulary Notes</div>'
  );
  cleaned = cleaned.replace(
    /Refined\s*Expression\s*(&|and)\s*Polish:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #d1fae5; color: #065f46; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #059669; border-radius: 0.375rem;">✨ Refined Expression & Polish</div>'
  );
  cleaned = cleaned.replace(
    /^(\d+)\.\s+([A-Za-z\s&]+):\s*(.*)$/gm,
    '<div style="margin: 0.5rem 0; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 0.9rem;"><strong style="color: #334155;">$1. $2:</strong> <span style="color: #0f172a; font-weight: 600;">$3</span></div>'
  );
  cleaned = cleaned.replace(/\n/g, "<br>");
  return cleaned;
}
function formatAiTutorFeedbackToHtml(rawText) {
  let cleaned = rawText.replace(/^#{1,6}\s+/gm, "").replace(/\*\*/g, "");
  cleaned = cleaned.replace(
    /Explanation\s*(&|and)\s*Overview:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #0284c7; border-radius: 0.375rem;">💡 Explanation & Overview</div>'
  );
  cleaned = cleaned.replace(
    /Usage\s*(&|and)\s*Grammar\s*Notes:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #fef3c7; color: #b45309; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #d97706; border-radius: 0.375rem;">✍️ Usage & Grammar Notes</div>'
  );
  cleaned = cleaned.replace(
    /Practical\s*Examples:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #d1fae5; color: #065f46; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #059669; border-radius: 0.375rem;">💬 Practical Examples</div>'
  );
  cleaned = cleaned.replace(
    /Common\s*Mistakes:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #fee2e2; color: #b91c1c; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #dc2626; border-radius: 0.375rem;">⚠️ Common Mistakes</div>'
  );
  cleaned = cleaned.replace(
    /Key\s*Takeaways:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #f3e8ff; color: #6b21a8; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #9333ea; border-radius: 0.375rem;">🎯 Key Takeaways</div>'
  );
  cleaned = cleaned.replace(
    /Next\s*Step:/gi,
    '<div style="margin-top: 1.25rem; margin-bottom: 0.75rem; padding: 0.5rem 0.75rem; background: #ccfbf1; color: #115e59; font-weight: 800; font-size: 0.95rem; border-left: 4px solid #0d9488; border-radius: 0.375rem;">🚀 Next Step</div>'
  );
  cleaned = cleaned.replace(
    /AI\s*Yamato\s*Feedback:/gi,
    '<div style="font-weight: 900; color: #065f46; margin-bottom: 0.75rem; font-size: 1.05rem; border-bottom: 2px solid #a7f3d0; padding-bottom: 0.3rem;">🤖 AI Yamato Feedback</div>'
  );
  cleaned = cleaned.replace(
    /^(\d+)\.\s+([A-Za-z\s&]+):\s*(.*)$/gm,
    '<div style="margin: 0.5rem 0; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 0.5rem; border: 1px solid #e2e8f0; font-size: 0.9rem;"><strong style="color: #334155;">$1. $2:</strong> <span style="color: #0f172a; font-weight: 600;">$3</span></div>'
  );
  cleaned = cleaned.replace(/\n/g, "<br>");
  return cleaned;
}
function UnifiedDrillMode() {
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAiFullscreen, setIsAiFullscreen] = useState(false);
  const [chatFontSize, setChatFontSize] = useState("base");
  const aiChatRef = useRef(null);
  const [currentDrillContext, setCurrentDrillContext] = useState(null);
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: "assistant",
      content: "Welcome! Feel free to ask me anything about Japanese grammar or study tips."
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [requestVisualAid, setRequestVisualAid] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [tutorLevel, setTutorLevel] = useState("steady");
  const getFontSizeClass = () => {
    switch (chatFontSize) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };
  const toggleAiFullscreen = async () => {
    if (!aiChatRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await aiChatRef.current.requestFullscreen();
        setIsAiFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsAiFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsAiFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const handleSendTutorMessage = async (e) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;
    const userMsg = tutorInput.trim();
    const needsVisual = requestVisualAid;
    setTutorInput("");
    setRequestVisualAid(false);
    const newMessages = [...tutorMessages, { role: "user", content: userMsg }];
    setTutorMessages(newMessages);
    setIsTutorLoading(true);
    try {
      const visualPrompt = needsVisual ? `Educational instructional diagram and visual aid for VCE Japanese high school students explaining: ${userMsg}. Clean layout, high quality, professional illustration style.` : void 0;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: tutorMessages,
          learningPace: tutorLevel,
          visualPrompt,
          drillContext: currentDrillContext
        })
      });
      if (!res.ok) {
        throw new Error("Failed to get response from AI tutor");
      }
      const data = await res.json();
      const replyText = data.reply || "I'm here to help you with your Japanese studies!";
      const imageUrl = data.imageUrl;
      const formattedReply = formatAiTutorFeedbackToHtml(replyText);
      setTutorMessages([
        ...newMessages,
        {
          role: "assistant",
          content: formattedReply,
          imageUrl
        }
      ]);
    } catch (err) {
      console.error(err);
      setTutorMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try asking again!" }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };
  const [selectedLevel, setSelectedLevel] = useState("normal");
  const [selectedSection, setSelectedSection] = useState("sec1");
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [speechSpeed, setSpeechSpeed] = useState(1);
  const handleLevelChange = (newLevel) => {
    setSelectedLevel(newLevel);
    if (newLevel === "steady") setSpeechSpeed(0.85);
    else if (newLevel === "accelerated") setSpeechSpeed(1.1);
    else setSpeechSpeed(1);
  };
  const [currentLevelQuestions, setCurrentLevelQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [customQuestionsRaw, setCustomQuestionsRaw] = useState([
    { id: "c1", question_text: "家族とよく何をしますか？", answer_text: "私はよく家族と買い物をします。", category: "Family" }
  ]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newAnswerText, setNewAnswerText] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [orderMode, setOrderMode] = useState("sequential");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "ようこそ！ Select your level/section or custom bank, then click '🚀 Speak to AI Yamato' above to start.",
      isHtml: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isWaitingForNext, setIsWaitingForNext] = useState(false);
  const playTTS = async (textToSpeak) => {
    try {
      const cleanedText = textToSpeak.replace(/【.*?】/g, "").replace(/※.*$/gm, "").trim();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          speakText: cleanedText,
          level: selectedSection === "custom" ? "normal" : selectedLevel,
          learningPace: selectedSection === "custom" ? "normal" : selectedLevel,
          pace: selectedSection === "custom" ? "normal" : selectedLevel,
          speed: speechSpeed
        })
      });
      if (!response.ok) return;
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error("Audio playback error:", err));
    } catch (err) {
      console.error("TTS request error:", err);
    }
  };
  const availableTopics = useMemo(() => {
    const categoriesSet = /* @__PURE__ */ new Set();
    if (selectedSection === "custom") {
      customQuestionsRaw.forEach((q) => {
        if (q.category) categoriesSet.add(q.category);
      });
    } else {
      const dataObj = questionsData$1;
      const secData = dataObj[selectedSection];
      if (secData) {
        const targetList = secData[selectedLevel] || secData["normal"] || secData["steady"] || [];
        if (Array.isArray(targetList)) {
          targetList.forEach((q) => {
            if (q && q.category) categoriesSet.add(q.category);
          });
        }
      }
    }
    return Array.from(categoriesSet);
  }, [selectedSection, selectedLevel, customQuestionsRaw]);
  useEffect(() => {
    setSelectedTopic(availableTopics);
  }, [selectedLevel, selectedSection, availableTopics]);
  const handleSelectAllTopics = () => setSelectedTopic(availableTopics);
  const handleDeselectAllTopics = () => setSelectedTopic([]);
  const handleTopicClick = (top) => {
    let updated = [...selectedTopic];
    if (updated.includes(top)) {
      updated = updated.filter((t) => t !== top);
    } else {
      updated.push(top);
    }
    setSelectedTopic(updated);
  };
  useEffect(() => {
    const loadedQuestions = [];
    const initialAnswersMap = {};
    if (selectedSection === "custom") {
      customQuestionsRaw.forEach((q) => {
        if (selectedTopic.length > 0) {
          if (!q.category || !selectedTopic.includes(q.category)) return;
        }
        const qId = String(q.id);
        const qText = q.question_text;
        const ansText = q.answer_text;
        loadedQuestions.push({
          id: qId,
          question: qText,
          questionOriginal: qText,
          defaultAnswer: ansText,
          defaultAnswerWithRuby: ansText,
          category: q.category || "General",
          isCustom: true
        });
        initialAnswersMap[qId] = ansText;
      });
      setCurrentLevelQuestions(loadedQuestions);
      setAnswers(initialAnswersMap);
      setIsPracticing(false);
    } else {
      const dataObj = questionsData$1;
      let counter = 1;
      const sectionData = dataObj[selectedSection];
      if (sectionData) {
        const targetList = sectionData[selectedLevel] || sectionData["normal"] || sectionData["steady"] || [];
        if (Array.isArray(targetList)) {
          targetList.forEach((q) => {
            if (q && (q.text || q.text_original)) {
              if (selectedTopic.length > 0) {
                if (!q.category || !selectedTopic.includes(q.category)) return;
              }
              const qText = q.text || q.text_original;
              const qTextOriginal = q.text_original || q.text;
              const qId = q.audio ? q.audio.replace("/audio/", "").replace(".mp3", "") : `q-${counter++}`;
              const plainAnswer = q.default_answer_original || q.defaultAnswer || "Please enter your answer here.";
              const rubyAnswer = q.defaultAnswer || q.default_answer_original || "Please enter your answer here.";
              loadedQuestions.push({
                id: String(qId),
                question: qText,
                questionOriginal: qTextOriginal,
                defaultAnswer: plainAnswer,
                defaultAnswerWithRuby: rubyAnswer,
                category: q.category,
                isCustom: false
              });
              initialAnswersMap[String(qId)] = plainAnswer;
            }
          });
        }
      }
      setCurrentLevelQuestions(loadedQuestions);
      setAnswers({ ...initialAnswersMap });
      setIsPracticing(false);
    }
  }, [selectedLevel, selectedSection, selectedTopic, customQuestionsRaw]);
  const handleAnswerChange = (id, text) => {
    setAnswers((prev) => ({ ...prev, [id]: text }));
  };
  const handleAnswerBlur = (_id, _text, _isCustom) => {
  };
  const handleAddCustomQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !newAnswerText.trim()) {
      alert("Please enter both question and sample answer.");
      return;
    }
    const newItem = {
      id: `custom-${Date.now()}`,
      question_text: newQuestionText.trim(),
      answer_text: newAnswerText.trim(),
      category: newCategory.trim() || "General"
    };
    setCustomQuestionsRaw((prev) => [...prev, newItem]);
    setNewQuestionText("");
    setNewAnswerText("");
    setNewCategory("");
  };
  const handleDeleteCustom = (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    setCustomQuestionsRaw((prev) => prev.filter((q) => q.id !== id));
  };
  const handleFileUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      var _a2;
      try {
        const text = (_a2 = event.target) == null ? void 0 : _a2.result;
        const lines = text.split("\n");
        const itemsToInsert = [];
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;
          const cols = trimmed.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
          if (cols.length >= 2 && cols[0] && cols[1]) {
            itemsToInsert.push({
              id: `custom-${Date.now()}-${Math.random()}`,
              question_text: cols[0],
              answer_text: cols[1],
              category: cols[2] || "General"
            });
          }
        }
        if (itemsToInsert.length > 0) {
          setCustomQuestionsRaw((prev) => [...prev, ...itemsToInsert]);
          alert(`Successfully imported ${itemsToInsert.length} questions!`);
        }
      } catch (_err) {
        alert("Failed to import CSV.");
      } finally {
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  };
  const downloadCsvTemplate = () => {
    const content = "\uFEFFQuestion,Answer,Topic\n家族とよく何をしますか？,私はよく家族と買い物をします。,Family";
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "custom_questions_template.csv";
    link.click();
  };
  const startDrillPractice = () => {
    if (currentLevelQuestions.length === 0) {
      alert("No questions found matching the selected criteria.");
      return;
    }
    let qList = [...currentLevelQuestions];
    if (orderMode === "random") {
      qList = qList.sort(() => Math.random() - 0.5);
    }
    setActiveQuestions(qList);
    setCurrentQuestionIndex(0);
    setIsPracticing(true);
    setIsWaitingForNext(false);
    setInputMessage("");
    const firstQ = qList[0];
    const targetAns = answers[firstQ.id] || "";
    const topicDisplay = selectedTopic.length === availableTopics.length ? "All Topics" : `${selectedTopic.length} topics selected`;
    const modeDesc = selectedSection === "custom" ? "Custom Bank" : `${selectedLevel.toUpperCase()} / ${selectedSection}`;
    setChatMessages([
      {
        role: "assistant",
        content: `[Drill Started (${modeDesc} / ${topicDisplay})] Here is your first question:

「${firstQ.question}」

(Your Answer: 「${targetAns}」)

始めましょう！`,
        isHtml: true
      }
    ]);
    playTTS(firstQ.questionOriginal);
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudioToInput(blob);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (_err) {
      alert("Microphone access is denied or unavailable.");
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.key === " ") {
        const target = e.target;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
          return;
        }
        if (!isPracticing || isLoading || isWaitingForNext) {
          return;
        }
        e.preventDefault();
        if (!isRecording) {
          startRecording();
        } else {
          stopRecording();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPracticing, isLoading, isWaitingForNext, isRecording]);
  const transcribeAudioToInput = async (audioBlob) => {
    setIsLoading(true);
    const currentQ = activeQuestions[currentQuestionIndex];
    const formData = new FormData();
    formData.append("audio", audioBlob, "user-audio.webm");
    formData.append("expectedQuestion", currentQ.questionOriginal);
    formData.append("mode", selectedSection === "custom" ? "drill-custom-transcribe" : "drill-elaborate-transcribe");
    formData.append("learningPace", selectedLevel);
    formData.append("pace", selectedLevel);
    try {
      const res = await fetch("/api/chat", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setInputMessage(data.userText || "");
    } catch (_err) {
      alert("Transcription error.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
    const userText = inputMessage.trim();
    setInputMessage("");
    const newMessages = [...chatMessages, { role: "user", content: userText, isHtml: false }];
    setChatMessages(newMessages);
    setIsLoading(true);
    const currentQ = activeQuestions[currentQuestionIndex];
    const registeredAnswer = answers[currentQ.id] || "";
    const isExactMatch = userText.trim() === registeredAnswer.trim();
    try {
      let aiFeedback = "";
      if (isExactMatch) {
        aiFeedback = "◎ よくできました。完璧です！";
      } else {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            expectedQuestion: currentQ.questionOriginal,
            registeredAnswer,
            mode: selectedSection === "custom" ? "drill-custom" : "drill",
            level: selectedLevel,
            learningPace: selectedLevel,
            pace: selectedLevel,
            section: selectedSection
          })
        });
        const data = await res.json();
        aiFeedback = data.reply || "◎ よくできました。";
      }
      setCurrentDrillContext({
        question: currentQ.questionOriginal,
        userAnswer: userText,
        aiFeedback
      });
      const formattedFeedback = formatDrillFeedbackToHtml(aiFeedback);
      let fullFeedback = `<div style="font-weight: 900; color: #047857; margin-bottom: 0.75rem; font-size: 1.05rem; border-bottom: 2px solid #a7f3d0; padding-bottom: 0.3rem;">AI Yamato Feedback</div>${formattedFeedback}`;
      const nextIndex = currentQuestionIndex + 1;
      const isPerfect = isExactMatch || aiFeedback.trim().startsWith("◎");
      if (isPerfect && nextIndex < activeQuestions.length) {
        setTimeout(() => {
          setCurrentQuestionIndex(nextIndex);
          const nextQ = activeQuestions[nextIndex];
          const targetAns = answers[nextQ.id] || "";
          setChatMessages((prev) => [
            ...prev,
            { role: "assistant", content: fullFeedback, isHtml: true },
            { role: "assistant", content: `Next question:

「${nextQ.question}」

(Your Answer: 「${targetAns}」)

がんばってね！`, isHtml: true }
          ]);
          setIsWaitingForNext(false);
          playTTS(nextQ.questionOriginal);
        }, 400);
        setIsLoading(false);
        return;
      } else if (!isPerfect && nextIndex < activeQuestions.length) {
        fullFeedback += `<br><br><div style="text-align: center; margin-top: 1rem;"><strong style="color: #059669;">👉 Ready to Proceed?</strong></div>`;
        setIsWaitingForNext(true);
      } else {
        fullFeedback += `<br><br><div style="text-align: center; margin-top: 1rem; color: #047857; font-weight: bold;">🎉 You have completed all questions! Great job.</div>`;
        setIsPracticing(false);
      }
      setChatMessages([...newMessages, { role: "assistant", content: fullFeedback, isHtml: true }]);
    } catch (_err) {
      setChatMessages([...newMessages, { role: "assistant", content: "An error occurred.", isHtml: false }]);
    } finally {
      setIsLoading(false);
    }
  };
  const proceedToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      const nextQ = activeQuestions[nextIndex];
      const targetAns = answers[nextQ.id] || "";
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Next question:

「${nextQ.question}」

(Your Answer: 「${targetAns}」)

がんばってね！`, isHtml: true }
      ]);
      setIsWaitingForNext(false);
      playTTS(nextQ.questionOriginal);
    }
  };
  const topicLabelDisplay = selectedTopic.length === availableTopics.length ? "All Topics" : `${selectedTopic.length} topics selected`;
  return /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 min-h-screen text-slate-800 font-sans pb-16 relative", children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes rotate-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glow-border-btn {
          position: relative;
          background-color: #059669;
          color: white;
          border-radius: 12px;
          background-clip: padding-box;
          border: 3px solid transparent;
        }
        .glow-border-btn::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 14px;
          background: linear-gradient(90deg, #34d399, #f59e0b, #3b82f6, #34d399);
          background-size: 300% 300%;
          animation: rotate-border 2.5s linear infinite;
          z-index: -1;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      ` }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-amber-300 rounded-2xl p-6 shadow-md", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-slate-900 mb-2", children: "💡 How to Use Unified Drill Mode" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-600 leading-relaxed", children: [
          "Choose a VCE exam section or select ",
          /* @__PURE__ */ jsx("strong", { children: "My Custom Bank" }),
          " to load your own Q&A. Customize your answers, tune the AI speed, and practice interactively via microphone (or press ",
          /* @__PURE__ */ jsx("strong", { children: "Spacebar" }),
          " to toggle recording!) or text."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-amber-200 rounded-2xl p-6 shadow-md space-y-6", children: [
        selectedSection !== "custom" && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "🎯 Select Level" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: [
            { id: "steady", label: "🌱 Steady (Foundation)" },
            { id: "normal", label: "🌿 Normal (Standard)" },
            { id: "accelerated", label: "🌳 Accelerated (Advanced)" }
          ].map((lvl) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => handleLevelChange(lvl.id),
              className: `p-3 rounded-xl border text-sm font-bold transition cursor-pointer ${selectedLevel === lvl.id ? "bg-amber-500 text-white border-amber-500 shadow" : "bg-amber-50/60 text-slate-700 border-amber-200 hover:bg-amber-100"}`,
              children: lvl.label
            },
            lvl.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-slate-900", children: "🔊 AI Speech Speed" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full", children: [
              speechSpeed,
              "x"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
            { label: "🐢 Very Slow (0.7x)", value: 0.7 },
            { label: "🚶 Slow (0.85x)", value: 0.85 },
            { label: "🏃 Normal (1.0x)", value: 1 },
            { label: "⚡ Fast (1.15x)", value: 1.15 }
          ].map((item) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSpeechSpeed(item.value),
              className: `p-2 rounded-lg border text-xs font-bold transition cursor-pointer ${speechSpeed === item.value ? "bg-emerald-300 text-slate-900 border-emerald-300 shadow-2xl" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50"}`,
              children: item.label
            },
            item.value
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2 border-t", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "📂 Select Section / Source" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: [
            { id: "beforeSec1", label: "Before Sec 1" },
            { id: "sec1", label: "Section 1" },
            { id: "sec2", label: "Section 2" },
            { id: "afterSec2", label: "After Sec 2" },
            { id: "custom", label: "⭐ My Custom Bank" }
          ].map((sec) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelectedSection(sec.id),
              className: `p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${selectedSection === sec.id ? "bg-emerald-300 text-slate-900 border-emerald-300 shadow" : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"}`,
              children: sec.label
            },
            sec.id
          )) })
        ] }),
        availableTopics.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-md font-bold text-slate-900", children: [
              "🏷 Filter Topics (",
              selectedTopic.length,
              " selected)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSelectAllTopics,
                  className: "text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1 rounded transition cursor-pointer",
                  children: "Select All"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleDeselectAllTopics,
                  className: "text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1 rounded transition cursor-pointer",
                  children: "Deselect All"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: availableTopics.map((top) => {
            const isSelected = selectedTopic.includes(top);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleTopicClick(top),
                className: `px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${isSelected ? "bg-amber-500 text-white border-amber-500" : "bg-slate-50 text-slate-700 border-slate-200"}`,
                children: [
                  isSelected ? "✓ " : "",
                  top
                ]
              },
              top
            );
          }) })
        ] })
      ] }),
      selectedSection === "custom" && /* @__PURE__ */ jsxs("div", { className: "bg-white border border-amber-200 rounded-2xl p-6 shadow-md space-y-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "➕ Add Custom Question & Answer" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleAddCustomQuestion, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-600 mb-1", children: "Question" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: newQuestionText,
                  onChange: (e) => setNewQuestionText(e.target.value),
                  placeholder: "例：家族とよく何をしますか？",
                  className: "w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-600 mb-1", children: "Topic" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: newCategory,
                  onChange: (e) => setNewCategory(e.target.value),
                  placeholder: "例：Family",
                  className: "w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-600 mb-1", children: "Answer" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 2,
                value: newAnswerText,
                onChange: (e) => setNewAnswerText(e.target.value),
                placeholder: "例：私はよく家族と買い物をします。",
                className: "w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition cursor-pointer shadow-xs", children: "+ Add to Custom Bank" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-slate-900", children: "📂 Import from CSV" }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: downloadCsvTemplate, className: "bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-1 rounded text-xs cursor-pointer", children: "📥 Template" })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "file",
              accept: ".csv",
              onChange: handleFileUpload,
              className: "block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-white cursor-pointer"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-amber-200 rounded-2xl p-6 shadow-md space-y-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-md font-bold text-slate-900 border-b pb-2 flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "1. Review & Edit Q&A (",
            selectedSection === "custom" ? "Custom Bank" : `${selectedLevel.toUpperCase()} / ${selectedSection}`,
            " - ",
            topicLabelDisplay,
            ")"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full", children: [
            "Matches: ",
            currentLevelQuestions.length
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-[450px] overflow-y-auto pr-2", children: currentLevelQuestions.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 py-8 text-center font-medium", children: "No questions found matching the criteria." }) : currentLevelQuestions.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full", children: [
                "Q",
                index + 1
              ] }),
              item.category && /* @__PURE__ */ jsx("span", { className: "text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold", children: item.category })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-slate-900", dangerouslySetInnerHTML: { __html: item.question } })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-slate-600 shrink-0", children: "Sample Answer:" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-2xs leading-relaxed flex-grow", children: /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: item.defaultAnswerWithRuby } }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-slate-600", children: "Your Answer" }),
              item.isCustom && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => handleDeleteCustom(item.id), className: "text-rose-600 hover:text-rose-800 text-xs font-bold cursor-pointer", children: "Delete Question" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 2,
                value: answers[item.id] ?? "",
                onChange: (e) => handleAnswerChange(item.id, e.target.value),
                onBlur: (e) => handleAnswerBlur(item.id, e.target.value, item.isCustom),
                placeholder: "Enter your own answer...",
                className: "w-full text-sm p-3 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              }
            )
          ] })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700", children: "Order Mode:" }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-sm cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "orderMode", checked: orderMode === "sequential", onChange: () => setOrderMode("sequential") }),
              " Sequential"
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-sm cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "orderMode", checked: orderMode === "random", onChange: () => setOrderMode("random") }),
              " Random"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: startDrillPractice,
              disabled: currentLevelQuestions.length === 0,
              className: "w-full sm:w-auto bg-emerald-300 hover:bg-emerald-400 disabled:bg-slate-300 text-slate-900 font-bold px-6 py-3 rounded-xl shadow transition cursor-pointer",
              children: "🚀 Speak to AI Yamato"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-amber-200 rounded-2xl p-6 shadow-md space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-md font-bold text-slate-900 border-b pb-2", children: "2. Conversation Practice with AI Yamato!🎙️" }),
        /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-xl p-4 h-96 overflow-y-auto space-y-3", children: [
          chatMessages.map((msg, idx) => /* @__PURE__ */ jsx("div", { className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`, children: /* @__PURE__ */ jsx("div", { className: `max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-amber-500 text-white rounded-br-lg" : "bg-white border border-slate-200 text-slate-800 rounded-bl-lg shadow-xs"}`, children: msg.isHtml ? /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: msg.content } }) : msg.content }) }, idx)),
          isLoading && /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 italic", children: "AI is analyzing your answer..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex-wrap", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 flex items-center gap-2 justify-center sm:justify-start flex-wrap", children: [
              !isRecording ? /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: startRecording,
                  disabled: !isPracticing || isLoading || isWaitingForNext,
                  className: "flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-bold px-6 py-3 rounded-full shadow-md transition cursor-pointer text-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "🎙️" }),
                    " Recording ",
                    /* @__PURE__ */ jsx("span", { className: "text-xs bg-rose-800 px-2 py-0.5 rounded-full opacity-90", children: "[Spacebar]" })
                  ]
                }
              ) : /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: stopRecording,
                  className: "flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full shadow-md transition animate-pulse cursor-pointer text-sm",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "⏹" }),
                    " Stop Recording ",
                    /* @__PURE__ */ jsx("span", { className: "text-xs bg-amber-700 px-2 py-0.5 rounded-full opacity-90", children: "[Spacebar]" })
                  ]
                }
              ),
              isPracticing && /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const currentQ = activeQuestions[currentQuestionIndex];
                    if (currentQ) playTTS(currentQ.questionOriginal);
                  },
                  disabled: isLoading,
                  className: "flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-3 rounded-full shadow-md transition text-sm cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "🔊" }),
                    " Repeat Q"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center sm:justify-end min-w-[120px]", children: isWaitingForNext && /* @__PURE__ */ jsx("button", { type: "button", onClick: proceedToNextQuestion, className: "glow-border-btn font-bold px-6 py-3 rounded-xl text-sm shadow-lg transition cursor-pointer", children: "➡️ Proceed" }) })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSendMessage, className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: inputMessage,
                onChange: (e) => setInputMessage(e.target.value),
                placeholder: isWaitingForNext ? "Please click 'Proceed' above" : isPracticing ? "Type or record your answer..." : "Start drill above first...",
                disabled: !isPracticing || isLoading || isWaitingForNext,
                className: "flex-grow p-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:outline-none disabled:bg-slate-100"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: !isPracticing || isLoading || !inputMessage.trim() || isWaitingForNext,
                className: "bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold px-6 py-3 rounded-xl transition text-sm shrink-0 cursor-pointer",
                children: "Send"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("aside", { "aria-label": "AI Yamato", className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", children: !isAiTutorOpen ? /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsAiTutorOpen(true),
        className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm",
        children: [
          /* @__PURE__ */ jsx("span", { children: "🤖" }),
          /* @__PURE__ */ jsx("span", { children: "AI Yamato" })
        ]
      }
    ) : /* @__PURE__ */ jsx(
      "div",
      {
        ref: aiChatRef,
        className: `bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-2xl flex flex-col transition-all ${isAiFullscreen ? "w-screen h-screen rounded-none border-none p-6 sm:p-10 overflow-auto" : "w-80 sm:w-96 h-[560px] min-w-[280px] min-h-[350px] max-w-[90vw] max-h-[85vh] resize overflow-auto [transform:rotate(180deg)]"}`,
        children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full flex flex-col ${!isAiFullscreen ? "[transform:rotate(180deg)]" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-2 mb-3 shrink-0", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-emerald-900 flex items-center gap-2 m-0", children: [
              /* @__PURE__ */ jsx("span", { children: "🤖" }),
              " 日本語Tutor AI Yamato"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: toggleAiFullscreen,
                  className: "text-slate-500 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer border border-slate-200",
                  title: isAiFullscreen ? "元の大きさに戻す" : "デバイスの画面に合わせて最大化",
                  children: isAiFullscreen ? "🗗 縮小" : "🗖 最大化"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {
                      });
                    }
                    setIsAiTutorOpen(false);
                    setIsAiFullscreen(false);
                  },
                  className: "text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer",
                  children: "✕ Close"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed mb-3 shrink-0", children: "Ask questions about grammar, or get study advice!" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mb-2 flex items-center justify-between shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-emerald-900", children: "Learning Pace" }),
            /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-emerald-200", children: ["steady", "normal", "accelerated"].map((level) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setTutorLevel(level),
                className: `px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition cursor-pointer ${tutorLevel === level ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-emerald-700"}`,
                children: level
              },
              level
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 border border-slate-200 rounded-xl p-2.5 mb-3 flex items-center justify-between shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-700", children: "Font Size" }),
            /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-slate-200", children: [
              { key: "sm", label: "小" },
              { key: "base", label: "中" },
              { key: "lg", label: "大" },
              { key: "xl", label: "特大" }
            ].map((size) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setChatFontSize(size.key),
                className: `px-2 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${chatFontSize === size.key ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-emerald-700"}`,
                children: size.label
              },
              size.key
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-2.5 flex-grow mb-3 ${getFontSizeClass()}`, children: [
            tutorMessages.map((msg, idx) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `max-w-[95%] p-2.5 rounded-xl leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-emerald-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                    children: msg.role === "user" ? msg.content : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "ai-markdown-content overflow-x-auto",
                          dangerouslySetInnerHTML: { __html: msg.content }
                        }
                      ),
                      msg.imageUrl && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg overflow-hidden border border-emerald-200 bg-emerald-50/50 p-1", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: msg.imageUrl,
                            alt: "AI Yamato Visual Explanation",
                            onClick: () => setModalImageSrc(msg.imageUrl || null),
                            className: "w-full h-auto rounded-md object-contain max-h-48 cursor-pointer hover:opacity-95 transition",
                            title: "クリックして画像を拡大"
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-800 text-center mt-1 font-medium cursor-pointer", onClick: () => setModalImageSrc(msg.imageUrl || null), children: "✨ ヤマト特製図解・イラスト（クリックして拡大）" })
                      ] })
                    ] })
                  }
                )
              },
              idx
            )),
            isTutorLoading && /* @__PURE__ */ jsx("div", { className: "text-slate-500 italic", children: "🤖 AI Yamato is thinking (and creating visual illustration)..." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSendTutorMessage, className: "flex flex-col gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-1", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 cursor-pointer select-none", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: requestVisualAid,
                  onChange: (e) => setRequestVisualAid(e.target.checked),
                  disabled: isTutorLoading,
                  className: "rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "🎨 explain with diagrams and illustrations" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: tutorInput,
                  onChange: (e) => setTutorInput(e.target.value),
                  placeholder: "Ask AI tutor anything...",
                  disabled: isTutorLoading,
                  className: "flex-grow p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: isTutorLoading || !tutorInput.trim(),
                  className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",
                  children: "Send"
                }
              )
            ] })
          ] })
        ] })
      }
    ) }),
    modalImageSrc && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4",
        onClick: () => setModalImageSrc(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2 shadow-2xl flex flex-col items-center", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setModalImageSrc(null),
              className: "absolute top-3 right-3 bg-slate-800/70 hover:bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition cursor-pointer z-10",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: modalImageSrc,
              alt: "Enlarged AI Yamato Visual",
              className: "max-w-full max-h-[80vh] rounded-lg object-contain"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 mt-2 font-medium", children: "✨ AI Yamato 特製図解・イラスト（拡大表示）" })
        ] })
      }
    )
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UnifiedDrillMode,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    { title: "VCE Japanese - Mock Oral Mode | JPTutor AI Yamato" },
    { name: "description", content: "VCE Japanese Mock Oral mode featuring elapsed time, topic deep-dive rotation, examiner persona, and fluency tracking." }
  ];
};
const oralExamQuestionsData = {
  sec1: {
    steady: [
      {
        id: "s1_1",
        category: "Personal World",
        text: "あなたの家族について教えてください。",
        text_original: "あなたの家族について教えてください。"
      },
      {
        id: "s1_2",
        category: "School Life",
        text: "学校でどんな科目を勉強していますか。",
        text_original: "学校でどんな科目を勉強していますか。"
      }
    ],
    normal: [
      {
        id: "s1_1",
        category: "Personal World",
        text: "あなたの家族について教えてください。また、お父さんやお母さんはどんな人ですか。",
        text_original: "あなたの家族について教えてください。また、お父さんやお母さんはどんな人ですか。"
      },
      {
        id: "s1_2",
        category: "School Life",
        text: "学校で一番好きな科目は何ですか。それはどうしてですか。",
        text_original: "学校で一番好きな科目は何ですか。それはどうしてですか。"
      },
      {
        id: "s1_3",
        category: "Hobbies & Lifestyle",
        text: "週末に普段何をすることが好きですか。詳しく教えてください。",
        text_original: "週末に普段何をすることが好きですか。詳しく教えてください。"
      }
    ],
    accelerated: [
      {
        id: "s1_1",
        category: "Personal World",
        text: "将来、どんな仕事に就きたいですか。その理由は何ですか。",
        text_original: "将来、どんな仕事に就きたいですか。その理由は何ですか。"
      }
    ]
  },
  sec2: {
    normal: [
      {
        id: "s2_1",
        category: "Detailed Study",
        text: "あなたの詳細な研究（Detailed Study）のテーマは何ですか。選んだ理由は何ですか。",
        text_original: "あなたの詳細な研究（Detailed Study）のテーマは何ですか。選んだ理由は何ですか。"
      },
      {
        id: "s2_2",
        category: "Detailed Study",
        text: "そのテーマについて調べて、一番印象に残ったことは何ですか。",
        text_original: "そのテーマについて調べて、一番印象に残ったことは何ですか。"
      }
    ]
  }
};
const questionDataRaw = oralExamQuestionsData;
function MockOralMode() {
  const [examPhase, setExamPhase] = useState("config");
  const [selectedLevel, setSelectedLevel] = useState("normal");
  const [examType, setExamType] = useState("sec1");
  const [aiSpeed, setAiSpeed] = useState(1);
  const [questionSource, setQuestionSource] = useState("curriculum");
  const [customQuestions, setCustomQuestions] = useState([]);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [supportImageBase64, setSupportImageBase64] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef(null);
  const [systemWaitSeconds, setSystemWaitSeconds] = useState(0);
  const systemWaitSecondsRef = useRef(0);
  systemWaitSecondsRef.current = systemWaitSeconds;
  const totalActualSpeakingSecRef = useRef(0);
  const [activeTopicGroups, setActiveTopicGroups] = useState([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const topicGroupStartTimeRef = useRef(0);
  const currentGroupIndexRef = useRef(0);
  currentGroupIndexRef.current = currentGroupIndex;
  const topicQuestionCountRef = useRef(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState(/* @__PURE__ */ new Set());
  const usedQuestionIdsRef = useRef(/* @__PURE__ */ new Set());
  usedQuestionIdsRef.current = usedQuestionIds;
  const usedCategoriesRef = useRef(/* @__PURE__ */ new Set());
  const [chatMessages, setChatMessages] = useState([]);
  const chatMessagesRef = useRef([]);
  chatMessagesRef.current = chatMessages;
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const isRecordingRef = useRef(false);
  isRecordingRef.current = isRecording;
  const [silenceCount, setSilenceCount] = useState(0);
  const [fillerCount, setFillerCount] = useState(0);
  const questionPromptedTimeRef = useRef(0);
  const [hesitationTimes, setHesitationTimes] = useState([]);
  const recordingStartTimeRef = useRef(0);
  const [totalOutputChars, setTotalOutputChars] = useState(0);
  const [speechRates, setSpeechRates] = useState([]);
  const totalOutputCharsRef = useRef(0);
  totalOutputCharsRef.current = totalOutputChars;
  const speechRatesRef = useRef([]);
  speechRatesRef.current = speechRates;
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const isCurrentlySilentRef = useRef(false);
  const [examResult, setExamResult] = useState(null);
  const sessionStartTimeRef = useRef(0);
  const activeAudioRef = useRef(null);
  const activeAbortControllerRef = useRef(null);
  const handleImageUpload = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setImageFileName(file.name);
    setIsCompressingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      var _a2;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 1200;
        if (width > height && width > MAX_SIZE) {
          height = Math.round(height * MAX_SIZE / width);
          width = MAX_SIZE;
        } else if (height >= width && height > MAX_SIZE) {
          width = Math.round(width * MAX_SIZE / height);
          height = MAX_SIZE;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
          setSupportImageBase64(compressedBase64);
        }
        setIsCompressingImage(false);
      };
      img.src = (_a2 = event.target) == null ? void 0 : _a2.result;
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (questionSource === "custom") {
      fetchCustomQuestions();
    }
  }, [questionSource]);
  const fetchCustomQuestions = async () => {
    setIsLoadingCustom(true);
    try {
      const fallbackCustom = [
        { id: "custom-q-1", category: "Custom Topics", text: "あなたの趣味について詳しく教えてください。", text_original: "あなたの趣味について詳しく教えてください。" }
      ];
      setCustomQuestions(fallbackCustom);
    } catch (err) {
      console.error("Error fetching custom questions:", err);
      setQuestionSource("curriculum");
    } finally {
      setIsLoadingCustom(false);
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isLoading]);
  const playTTS = async (textToSpeak, onAudioEnd) => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    activeAbortControllerRef.current = abortController;
    const ttsStartTime = Date.now();
    try {
      const cleanedText = (textToSpeak || "").replace(/<rt>.*?<\/rt>/g, "").replace(/<\/?ruby>/g, "").replace(/【.*?】/g, "").replace(/※.*$/gm, "").trim();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speakText: cleanedText, level: selectedLevel, speed: aiSpeed }),
        signal: abortController.signal
      });
      if (!response.ok) {
        setSystemWaitSeconds((prev) => prev + Math.round((Date.now() - ttsStartTime) / 1e3));
        if (onAudioEnd) onAudioEnd();
        return;
      }
      const audioBlob = await response.blob();
      if (abortController.signal.aborted) {
        setSystemWaitSeconds((prev) => prev + Math.round((Date.now() - ttsStartTime) / 1e3));
        if (onAudioEnd) onAudioEnd();
        return;
      }
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      activeAudioRef.current = audio;
      audio.onended = () => {
        if (activeAudioRef.current === audio) {
          activeAudioRef.current = null;
        }
        setSystemWaitSeconds((prev) => prev + Math.round((Date.now() - ttsStartTime) / 1e3));
        questionPromptedTimeRef.current = Date.now();
        if (onAudioEnd) onAudioEnd();
      };
      audio.play().catch((err) => {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Audio playback error:", err);
        }
        setSystemWaitSeconds((prev) => prev + Math.round((Date.now() - ttsStartTime) / 1e3));
        questionPromptedTimeRef.current = Date.now();
        if (onAudioEnd) onAudioEnd();
      });
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("TTS request error:", err);
      }
      setSystemWaitSeconds((prev) => prev + Math.round((Date.now() - ttsStartTime) / 1e3));
      questionPromptedTimeRef.current = Date.now();
      if (onAudioEnd) onAudioEnd();
    }
  };
  useEffect(() => {
    if (examPhase === "examining") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1e3);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examPhase]);
  const startMockOral = () => {
    var _a, _b, _c, _d;
    if (timerRef.current) clearInterval(timerRef.current);
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    if (activeAbortControllerRef.current) {
      activeAbortControllerRef.current.abort();
    }
    if (isRecording) {
      stopRecording();
    }
    const groupByCategory = (rawList) => {
      const map = {};
      rawList.forEach((q) => {
        const textCheck = (q == null ? void 0 : q.text) || (q == null ? void 0 : q.text_original) || (q == null ? void 0 : q.question_text) || "";
        if (questionSource === "curriculum" && (textCheck.includes("何年生") || textCheck.includes("なんねんせい"))) return;
        const cat = (q == null ? void 0 : q.category) || "General";
        if (!map[cat]) map[cat] = [];
        map[cat].push(q);
      });
      return Object.keys(map).map((cat) => ({
        category: cat,
        questions: map[cat]
      }));
    };
    const shuffleArray = (array) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    let combinedGroups = [];
    if (questionSource === "free") {
      const freeCategories = ["General World", "Personal Background", "School & Study", "Hobbies & Lifestyle"];
      combinedGroups = freeCategories.map((cat, idx) => ({
        category: cat,
        questions: [{ id: `free-q-${idx}`, category: cat, text: "AI Free Generation", text_original: "AI Free Generation" }]
      }));
    } else {
      let rawSourceList = [];
      let rawSec2List = [];
      if (questionSource === "custom") {
        rawSourceList = customQuestions;
      } else {
        const dataObj = questionDataRaw;
        rawSourceList = ((_a = dataObj["sec1"]) == null ? void 0 : _a[selectedLevel]) || ((_b = dataObj["sec1"]) == null ? void 0 : _b["normal"]) || [];
        rawSec2List = examType === "sec1_2" ? ((_c = dataObj["sec2"]) == null ? void 0 : _c[selectedLevel]) || ((_d = dataObj["sec2"]) == null ? void 0 : _d["normal"]) || [] : [];
      }
      const sec1Groups = groupByCategory(rawSourceList);
      const randomizedSec1Groups = shuffleArray(sec1Groups).map((g) => ({
        category: g.category,
        questions: shuffleArray(g.questions).map((q, idx) => ({
          id: (q == null ? void 0 : q.id) || `exam-q-${g.category}-${idx}`,
          category: g.category,
          text: (q == null ? void 0 : q.text) || (q == null ? void 0 : q.text_original) || (q == null ? void 0 : q.question_text) || "No question text",
          text_original: (q == null ? void 0 : q.text_original) || (q == null ? void 0 : q.text) || (q == null ? void 0 : q.question_text) || "No question text"
        }))
      }));
      const sec2Groups = examType === "sec1_2" ? groupByCategory(rawSec2List) : [];
      const randomizedSec2Groups = shuffleArray(sec2Groups).map((g) => ({
        category: g.category,
        questions: shuffleArray(g.questions).map((q, idx) => ({
          id: (q == null ? void 0 : q.id) || `exam-q-sec2-${g.category}-${idx}`,
          category: g.category,
          text: (q == null ? void 0 : q.text) || (q == null ? void 0 : q.text_original) || "No question text",
          text_original: (q == null ? void 0 : q.text_original) || (q == null ? void 0 : q.text) || "No question text"
        }))
      }));
      combinedGroups = [...randomizedSec1Groups, ...randomizedSec2Groups];
    }
    if (combinedGroups.length === 0 || combinedGroups[0].questions.length === 0) {
      alert("Failed to load exam questions.");
      return;
    }
    setActiveTopicGroups(combinedGroups);
    setCurrentGroupIndex(0);
    setCurrentGroupIndexRef(0);
    topicGroupStartTimeRef.current = 0;
    topicQuestionCountRef.current = 0;
    setUsedQuestionIds(/* @__PURE__ */ new Set());
    usedQuestionIdsRef.current = /* @__PURE__ */ new Set();
    usedCategoriesRef.current = /* @__PURE__ */ new Set();
    setSilenceCount(0);
    setFillerCount(0);
    setHesitationTimes([]);
    setTotalOutputChars(0);
    setSpeechRates([]);
    setSystemWaitSeconds(0);
    totalActualSpeakingSecRef.current = 0;
    setElapsedSeconds(0);
    sessionStartTimeRef.current = Date.now();
    setExamPhase("examining");
    const firstGroup = combinedGroups[0];
    const firstQ = firstGroup.questions[Math.floor(Math.random() * firstGroup.questions.length)];
    const newUsedSet = /* @__PURE__ */ new Set([firstQ.id]);
    setUsedQuestionIds(newUsedSet);
    usedQuestionIdsRef.current = newUsedSet;
    usedCategoriesRef.current.add(firstGroup.category);
    const freeInitialQuestions = [
      "こんにちは。",
      "おはようございます。",
      "いい天気ですね。",
      "お元気ですか。",
      "リラックスして、いきましょう。"
    ];
    const randomFreeQuestion = freeInitialQuestions[Math.floor(Math.random() * freeInitialQuestions.length)];
    const initialQuestionText = questionSource === "free" ? randomFreeQuestion : (firstQ == null ? void 0 : firstQ.text) || "";
    setChatMessages([
      {
        role: "assistant",
        content: `【VCE Mock Exam Started (${questionSource.toUpperCase()})${supportImageBase64 ? " [With Support Material Photo]" : ""}】

Examiner: 「${initialQuestionText}」

(Waiting for student response...)`,
        isHtml: true
      }
    ]);
    playTTS(initialQuestionText);
  };
  const setCurrentGroupIndexRef = (val) => {
    currentGroupIndexRef.current = val;
  };
  const countFillers = (text) => {
    const fillerRegex = /(ええと|あのう|あのー|えーと|うーん|うーんと|まあ|ええ|あの|えー|んー)/g;
    const matches = text.match(fillerRegex);
    return matches ? matches.length : 0;
  };
  const startRecording = async () => {
    if (isRecordingRef.current) return;
    recordingStartTimeRef.current = Date.now();
    if (questionPromptedTimeRef.current > 0) {
      const hesitationSec = Math.max(0, Math.round((Date.now() - questionPromptedTimeRef.current) / 1e3));
      setHesitationTimes((prev) => [...prev, hesitationSec]);
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;
      isCurrentlySilentRef.current = false;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const checkVolume = () => {
        if (!isRecordingRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const average = sum / dataArray.length;
        const SILENCE_THRESHOLD = 15;
        if (average < SILENCE_THRESHOLD) {
          if (!isCurrentlySilentRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              if (isRecordingRef.current) {
                setSilenceCount((prev) => prev + 1);
                isCurrentlySilentRef.current = true;
              }
            }, 1200);
          }
        } else {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          isCurrentlySilentRef.current = false;
        }
        requestAnimationFrame(checkVolume);
      };
      checkVolume();
      const options = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? { mimeType: "audio/webm;codecs=opus" } : { mimeType: "audio/webm" };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
          audioContextRef.current.close();
        }
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAndAutoSend(audioBlob);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Microphone access is denied or unavailable. Please check your browser settings.");
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      try {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        console.error("Error stopping media recorder:", err);
      }
      setIsRecording(false);
    }
  };
  const transcribeAndAutoSend = async (audioBlob) => {
    setIsLoading(true);
    const reqStartTime = Date.now();
    const recordingDurationSec = Math.max(1, Math.round((Date.now() - recordingStartTimeRef.current) / 1e3));
    totalActualSpeakingSecRef.current += recordingDurationSec;
    const gIndex = currentGroupIndexRef.current;
    let nextGIndex = gIndex;
    const currentElapsed = elapsedSeconds;
    const timeInCurrentTopic = currentElapsed - topicGroupStartTimeRef.current;
    topicQuestionCountRef.current += 1;
    let isTopicSwitched = false;
    if ((topicQuestionCountRef.current >= 4 || timeInCurrentTopic >= 60) && activeTopicGroups.length > 1) {
      topicQuestionCountRef.current = 0;
      let candidateGroups = activeTopicGroups.map((group, idx) => ({ idx, category: group.category })).filter((item) => item.idx !== gIndex && !usedCategoriesRef.current.has(item.category)).map((item) => item.idx);
      if (candidateGroups.length === 0) {
        candidateGroups = activeTopicGroups.map((_, idx) => idx).filter((idx) => idx !== gIndex);
      }
      if (candidateGroups.length === 0) {
        candidateGroups = [gIndex];
      }
      nextGIndex = candidateGroups[Math.floor(Math.random() * candidateGroups.length)];
      topicGroupStartTimeRef.current = currentElapsed;
      setCurrentGroupIndex(nextGIndex);
      setCurrentGroupIndexRef(nextGIndex);
      isTopicSwitched = true;
    }
    const targetGroup = activeTopicGroups[nextGIndex] || activeTopicGroups[0];
    if (targetGroup == null ? void 0 : targetGroup.category) {
      usedCategoriesRef.current.add(targetGroup.category);
    }
    const currentUsedSet = usedQuestionIdsRef.current;
    let availableQuestions = targetGroup.questions.filter((q) => !currentUsedSet.has(q.id));
    if (availableQuestions.length === 0) {
      availableQuestions = targetGroup.questions;
    }
    const userTurnCount = chatMessagesRef.current.filter((m) => m.role === "user").length + 1;
    const formData = new FormData();
    formData.append("audio", audioBlob, "user-audio.webm");
    formData.append("mode", "mock-oral");
    formData.append("level", selectedLevel);
    formData.append("examType", examType);
    formData.append("currentCategory", targetGroup.category);
    formData.append("questionSource", questionSource);
    formData.append("userTurnCount", userTurnCount.toString());
    formData.append("isTopicSwitched", isTopicSwitched.toString());
    if (supportImageBase64) {
      formData.append("hasFiles", "true");
      formData.append("imageBase64", supportImageBase64);
    } else {
      formData.append("hasFiles", "false");
    }
    formData.append("usedCategories", JSON.stringify(Array.from(usedCategoriesRef.current)));
    formData.append("questionCandidates", JSON.stringify(availableQuestions.slice(0, 6)));
    try {
      const response = await fetch("/api/chat", { method: "POST", body: formData });
      const reqDuration = Math.round((Date.now() - reqStartTime) / 1e3);
      setSystemWaitSeconds((prev) => prev + reqDuration);
      if (!response.ok) throw new Error("Server communication failed");
      const data = await response.json();
      const transcribedText = ((data == null ? void 0 : data.userText) || "").trim();
      const examinerReply = ((data == null ? void 0 : data.reply) || "").trim();
      const nextQuestionText = (data == null ? void 0 : data.nextQuestion) || "もう少し詳しく教えてください。";
      if (!transcribedText || transcribedText === "（音声回答）" || transcribedText.includes("本日はご覧いただきありがとうございます")) {
        alert("音声がうまく聞き取れませんでした。もう一度クリアに発話してください。");
        setIsLoading(false);
        return;
      }
      const textLength = transcribedText.length;
      if (textLength > 0) {
        setTotalOutputChars((prev) => prev + textLength);
        const currentCPS = parseFloat((textLength / recordingDurationSec).toFixed(2));
        setSpeechRates((prev) => [...prev, currentCPS]);
      }
      const detectedFillers = countFillers(transcribedText);
      if (detectedFillers > 0) {
        setFillerCount((prev) => prev + detectedFillers);
      }
      const matchedQ = targetGroup.questions.find((q) => q.text === nextQuestionText || q.text_original === nextQuestionText) || availableQuestions[0];
      if (matchedQ) {
        const updatedUsedSet = new Set(currentUsedSet);
        updatedUsedSet.add(matchedQ.id);
        setUsedQuestionIds(updatedUsedSet);
        usedQuestionIdsRef.current = updatedUsedSet;
      }
      const assistantContent = examinerReply ? `Examiner: 「${examinerReply}」

Next Question:
「${nextQuestionText}」` : `Next Question:
「${nextQuestionText}」`;
      const updatedMessages = [
        ...chatMessagesRef.current,
        { role: "user", content: transcribedText, isHtml: false },
        { role: "assistant", content: assistantContent, isHtml: true }
      ];
      setChatMessages(updatedMessages);
      setIsLoading(false);
      playTTS(examinerReply + nextQuestionText);
    } catch (err) {
      const reqDuration = Math.round((Date.now() - reqStartTime) / 1e3);
      setSystemWaitSeconds((prev) => prev + reqDuration);
      console.warn("Mock oral API warning:", err);
      alert("Failed to process your response. Please try speaking again.");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      var _a;
      if (examPhase === "examining" && !isLoading && ((_a = document.activeElement) == null ? void 0 : _a.tagName) !== "INPUT") {
        if (e.code === "Space") {
          e.preventDefault();
          if (isRecordingRef.current) {
            stopRecording();
          } else {
            startRecording();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [examPhase, isLoading]);
  const finishExam = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isRecordingRef.current) stopRecording();
    const closingMessage = "では、おわりましょう。ありがとうございました。";
    const finalMessages = [
      ...chatMessagesRef.current,
      { role: "assistant", content: `Examiner: 「${closingMessage}」`, isHtml: true }
    ];
    setChatMessages(finalMessages);
    setIsLoading(true);
    playTTS(closingMessage, async () => {
      var _a, _b, _c, _d, _e, _f;
      const totalSec = elapsedSeconds > 0 ? elapsedSeconds : Math.round((Date.now() - sessionStartTimeRef.current) / 1e3);
      const netSpeakingSec = Math.max(1, totalSec - systemWaitSecondsRef.current);
      const actualSpeakingSec = totalActualSpeakingSecRef.current;
      const thinkingSec = Math.max(0, netSpeakingSec - actualSpeakingSec);
      const currentRates = speechRatesRef.current;
      const finalTotalChars = totalOutputCharsRef.current;
      const netAvgCPS = netSpeakingSec > 0 && finalTotalChars > 0 ? parseFloat((finalTotalChars / netSpeakingSec).toFixed(1)) : currentRates.length > 0 ? parseFloat((currentRates.reduce((a, b) => a + b, 0) / currentRates.length).toFixed(1)) : 2.5;
      try {
        const formData = new FormData();
        formData.append("mode", "evaluate-exam");
        formData.append("chatHistory", JSON.stringify(finalMessages));
        formData.append("level", selectedLevel);
        formData.append("examType", examType);
        formData.append("clientSilenceCount", silenceCount.toString());
        formData.append("clientFillerCount", fillerCount.toString());
        const avgH = hesitationTimes.length > 0 ? Math.round(hesitationTimes.reduce((a, b) => a + b, 0) / hesitationTimes.length) : 1;
        formData.append("clientHesitationAvg", avgH.toString());
        formData.append("clientAvgSpeechRate", netAvgCPS.toString());
        formData.append("clientTotalChars", finalTotalChars.toString());
        const response = await fetch("/api/chat", {
          method: "POST",
          body: formData
        });
        if (response.ok) {
          const evalData = await response.json();
          const result = {
            totalTimeSec: totalSec,
            netSpeakingTimeSec: netSpeakingSec,
            actualSpeakingSec,
            thinkingSec,
            sectionsCompleted: evalData.sectionsCompleted || (examType === "sec1" ? ["Section 1 (Personal World & Topics)"] : ["Section 1", "Section 2 (Detailed Study Discussion)"]),
            grammarScore: evalData.grammarScore || "7 / 10",
            elaborationScore: evalData.elaborationScore || "7 / 10",
            detectedGrammarItems: evalData.detectedGrammarItems || [],
            fluencyMetrics: {
              silenceCount: ((_a = evalData.fluencyMetrics) == null ? void 0 : _a.silenceCount) ?? silenceCount,
              fillerCount: ((_b = evalData.fluencyMetrics) == null ? void 0 : _b.fillerCount) ?? fillerCount,
              initialHesitationAvgSec: ((_c = evalData.fluencyMetrics) == null ? void 0 : _c.initialHesitationAvgSec) ?? avgH,
              smoothnessRating: ((_d = evalData.fluencyMetrics) == null ? void 0 : _d.smoothnessRating) || "Fair / Needs Expansion",
              avgSpeechRateCPS: ((_e = evalData.fluencyMetrics) == null ? void 0 : _e.avgSpeechRateCPS) ?? netAvgCPS,
              totalOutputChars: ((_f = evalData.fluencyMetrics) == null ? void 0 : _f.totalOutputChars) ?? finalTotalChars
            },
            performanceOverview: evalData.performanceOverview || "Your responses were frequently too brief.",
            weaknessesAnalysis: evalData.weaknessesAnalysis || "Lacked sufficient detail and elaboration.",
            actionPlan: evalData.actionPlan || "Please practice adding more depth to each response."
          };
          setExamResult(result);
        } else {
          throw new Error("Evaluation API error");
        }
      } catch (err) {
        console.error("Failed to fetch dynamic evaluation, using fallback evaluation:", err);
        const avgH = hesitationTimes.length > 0 ? Math.round(hesitationTimes.reduce((a, b) => a + b, 0) / hesitationTimes.length) : 1;
        const fallbackResult = {
          totalTimeSec: totalSec,
          netSpeakingTimeSec: netSpeakingSec,
          actualSpeakingSec,
          thinkingSec,
          sectionsCompleted: examType === "sec1" ? ["Section 1 (Personal World & Topics)"] : ["Section 1", "Section 2 (Detailed Study Discussion)"],
          grammarScore: "6 / 10",
          elaborationScore: "6 / 10",
          detectedGrammarItems: [],
          fluencyMetrics: {
            silenceCount,
            fillerCount,
            initialHesitationAvgSec: avgH,
            smoothnessRating: "Needs Improvement (Requires more detail)",
            avgSpeechRateCPS: netAvgCPS,
            totalOutputChars: finalTotalChars
          },
          performanceOverview: "Your responses were consistently very brief.",
          weaknessesAnalysis: "VCE oral assessment criteria require you to elaborate fully.",
          actionPlan: "Please practice adding more depth to each response."
        };
        setExamResult(fallbackResult);
      }
      setExamPhase("result");
      setIsLoading(false);
    });
  };
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const renderTenScaleStarRating = (scoreText) => {
    let numericScore = 7;
    const match10 = scoreText.match(/([0-9]+(?:\.[0-9]+)?)\s*\/\s*10/);
    if (match10) {
      numericScore = parseFloat(match10[1]);
    } else {
      const match5 = scoreText.match(/([1-5](?:\.[0-9]+)?)\s*\/\s*5/);
      if (match5) {
        numericScore = parseFloat(match5[1]) * 2;
      } else if (scoreText.includes("A")) {
        numericScore = 9;
      } else if (scoreText.includes("B")) {
        numericScore = 7.5;
      } else if (scoreText.includes("C")) {
        numericScore = 6;
      } else if (scoreText.includes("D")) {
        numericScore = 4;
      } else if (scoreText.includes("E")) {
        numericScore = 2;
      }
    }
    const integerRating = Math.max(1, Math.min(10, Math.round(numericScore)));
    return /* @__PURE__ */ jsx("div", { className: "space-y-1.5 pt-1", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex text-base tracking-tighter", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
        const isFull = star <= integerRating;
        return /* @__PURE__ */ jsx("span", { className: isFull ? "text-amber-500" : "text-slate-300", children: "★" }, star);
      }) }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-slate-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200", children: [
        integerRating,
        " / 10"
      ] })
    ] }) });
  };
  return (
    // ⬅️ ② 全体を囲む親要素を `bg-slate-50 min-h-screen text-slate-800 font-sans relative` に統一
    /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 min-h-screen text-slate-800 font-sans relative pb-16", children: [
      /* @__PURE__ */ jsx("style", { children: `
        @keyframes avatar-pulse {
          0%, 100% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.6); }
        }
        .avatar-glow {
          animation: avatar-pulse 3s infinite ease-in-out;
        }
      ` }),
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("main", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
        examPhase === "config" && /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-300 rounded-2xl p-6 shadow-md space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 border-b border-blue-200 pb-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-900", children: "Mock Oral Settings" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed", children: "Practice in an authentic exam environment with topic deep-dive rotation and AI examiner dialogue. Choose your preferred question source below to begin." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-700 mb-2", children: "📌 Question Source Mode:" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
                { id: "curriculum", title: "🏫 AI Yamato Questions", desc: "Use question pools by teaching experts." },
                { id: "custom", title: "👤 My Custom Questions", desc: "Practice with your saved questions." },
                { id: "free", title: "🌟 AI Ad-lib Free Mode", desc: "AI dynamically generates questions under VCE rules." }
              ].map((mode2) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setQuestionSource(mode2.id),
                  className: `p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${questionSource === mode2.id ? "bg-blue-300 text-slate-900 border-blue-400 font-bold shadow-sm" : "bg-blue-50/60 text-slate-700 border-blue-200 hover:bg-blue-100"}`,
                  children: /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: mode2.title }),
                    /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-1 leading-tight ${questionSource === mode2.id ? "text-slate-800" : "text-slate-500"}`, children: mode2.desc })
                  ] })
                },
                mode2.id
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-700 mb-2", children: "🎯 Difficulty Level:" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3", children: [
                { id: "steady", label: "🌱 Steady (Foundation)" },
                { id: "normal", label: "🌿 Normal (Standard)" },
                { id: "accelerated", label: "🌳 Accelerated (Advanced)" }
              ].map((lvl) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedLevel(lvl.id),
                  className: `p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${selectedLevel === lvl.id ? "bg-blue-300 text-slate-900 border-blue-400 shadow-sm" : "bg-blue-50/60 text-slate-700 border-blue-200 hover:bg-blue-100"}`,
                  children: lvl.label
                },
                lvl.id
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-bold text-slate-700 mb-2", children: [
                "🔊 Examiner Speech Speed: ",
                /* @__PURE__ */ jsxs("span", { className: "text-blue-700", children: [
                  aiSpeed,
                  "x"
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "range",
                  min: "0.8",
                  max: "1.2",
                  step: "0.05",
                  value: aiSpeed,
                  onChange: (e) => setAiSpeed(parseFloat(e.target.value)),
                  className: "w-full accent-blue-300 cursor-pointer"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[10px] text-slate-500 mt-1", children: [
                /* @__PURE__ */ jsx("span", { children: "Slow (0.8x)" }),
                /* @__PURE__ */ jsx("span", { children: "Normal (1.0x)" }),
                /* @__PURE__ */ jsx("span", { children: "Fast (1.2x)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-xs font-bold text-slate-700 mb-2", children: "⏱ Exam Section & Format:" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExamType("sec1"),
                    className: `p-4 rounded-xl border text-left transition cursor-pointer ${examType === "sec1" ? "bg-blue-300 text-slate-900 border-blue-400 shadow-sm font-bold" : "bg-blue-50/60 border-blue-200 text-slate-700 hover:bg-blue-100"}`,
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: "Section 1 Intensive (~7 Mins target)" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs mt-1 opacity-90", children: "General interview and Personal World questions." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExamType("sec1_2"),
                    className: `p-4 rounded-xl border text-left transition cursor-pointer ${examType === "sec1_2" ? "bg-blue-300 text-slate-900 border-blue-400 shadow-sm font-bold" : "bg-blue-50/60 border-blue-200 text-slate-700 hover:bg-blue-100"}`,
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: "Section 1 + 2 Full Mock (~15 Mins target)" }),
                      /* @__PURE__ */ jsx("div", { className: "text-xs mt-1 opacity-90", children: "Comprehensive exam including personal interview and Detailed Study discussion." })
                    ]
                  }
                )
              ] })
            ] }),
            examType === "sec1_2" && /* @__PURE__ */ jsxs("div", { className: "bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2", children: [
              /* @__PURE__ */ jsxs("label", { className: "block text-xs font-bold text-blue-900 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { children: "🖼️" }),
                " Section 2 Detailed Study Support Material (Optional Photo / Image):"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-600 leading-relaxed", children: "Upload your Detailed Study support photo/image. The AI examiner will examine the visual details and ask targeted questions based on it during Section 2!" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageUpload,
                    className: "text-xs text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  }
                ),
                isCompressingImage && /* @__PURE__ */ jsx("span", { className: "text-xs text-blue-600 font-bold animate-pulse", children: "Compressing..." }),
                supportImageBase64 && !isCompressingImage && /* @__PURE__ */ jsxs("span", { className: "text-xs text-emerald-600 font-bold", children: [
                  "✅ Photo Ready (",
                  imageFileName || "Attached",
                  ")"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-blue-200 flex justify-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: startMockOral,
              disabled: isLoadingCustom || isCompressingImage,
              className: "bg-blue-300 hover:bg-blue-400 text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-md transition cursor-pointer text-sm disabled:opacity-50",
              children: isLoadingCustom ? "⏳ Loading Custom Questions..." : "🚀 Start Mock Oral"
            }
          ) })
        ] }),
        examPhase === "examining" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white border border-blue-200 rounded-2xl p-5 shadow-md flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: `w-14 h-14 rounded-full border-2 flex items-center justify-center text-2xl relative ${isRecording ? "bg-rose-100 border-rose-500 animate-pulse" : "bg-blue-100 border-blue-500 avatar-glow"}`, children: [
              /* @__PURE__ */ jsx("span", { children: isRecording ? "🎙" : "🧑‍🏫" }),
              /* @__PURE__ */ jsx("span", { className: `absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${isRecording ? "bg-rose-500 animate-ping" : "bg-blue-500"}` })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-500 font-semibold", children: [
                "AI Yamato Examiner • ",
                /* @__PURE__ */ jsxs("span", { className: "text-blue-700 font-bold", children: [
                  "Mock Exam Mode (",
                  questionSource.toUpperCase(),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-slate-900", children: isRecording ? "🔴 Recording (Speak now / Press [Space] to submit)" : isLoading ? "⏳ AI Scoring & Generating Response..." : "🟢 Ready" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white border border-blue-200 rounded-2xl p-6 shadow-md space-y-4 relative", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-slate-600 border-b border-blue-200 pb-2 flex justify-between items-center", children: /* @__PURE__ */ jsx("span", { children: "VCE Oral Exam Simulation (Deep-Dive Topic Rotation)" }) }),
            /* @__PURE__ */ jsxs("div", { ref: chatContainerRef, className: "bg-slate-50 border border-slate-200 rounded-xl p-4 h-80 overflow-y-auto space-y-3", children: [
              chatMessages.map((msg, idx) => /* @__PURE__ */ jsx("div", { className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`, children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: `max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                  dangerouslySetInnerHTML: { __html: msg.content }
                }
              ) }, idx)),
              isLoading && /* @__PURE__ */ jsx("div", { className: "text-xs text-blue-700 font-bold bg-blue-50 p-3 rounded-xl border border-blue-200 animate-pulse text-center", children: "⏳ Generating Response..." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3 pt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-600 font-medium", children: "💡 *Tip: You can also use the Space key to start and stop recording!*" }),
              !isRecording ? /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: startRecording,
                  disabled: isLoading,
                  className: "bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg shadow transition cursor-pointer shrink-0",
                  children: "🎙 Start Recording"
                }
              ) : /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: stopRecording,
                  className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow transition animate-pulse cursor-pointer shrink-0",
                  children: "⏹ Stop & Submit"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 pt-3 border-t border-blue-200", children: [
              /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 px-3.5 py-1.5 rounded-xl border shadow-xs transition ${elapsedSeconds >= 420 ? "bg-rose-100 border-rose-400 animate-pulse" : "bg-blue-50 border-blue-200"}`, children: [
                /* @__PURE__ */ jsx("span", { className: "text-[11px] text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1", children: elapsedSeconds >= 420 ? "⚠ Target 7m Reached:" : "Elapsed Time:" }),
                /* @__PURE__ */ jsx("span", { className: `text-sm font-mono font-bold ${elapsedSeconds >= 420 ? "text-rose-700" : "text-blue-700"}`, children: formatTime(elapsedSeconds) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: finishExam,
                  disabled: isLoading,
                  className: "bg-slate-800 hover:bg-slate-900 text-white font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer shadow disabled:opacity-50",
                  children: "🏁 Finish Exam & Get Report"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-2 text-xs text-slate-500", children: /* @__PURE__ */ jsx("span", { children: '*The timer counts up from zero. Topics rotate for natural deep-diving. Click "Finish Exam" when ready.' }) })
          ] })
        ] }),
        examPhase === "result" && examResult && (() => {
          const speed = examResult.fluencyMetrics.avgSpeechRateCPS;
          const chars = examResult.fluencyMetrics.totalOutputChars;
          const isFast = speed > 2.5;
          const isMany = chars > 300;
          let quadrantId = 4;
          if (isFast && isMany) quadrantId = 1;
          else if (!isFast && isMany) quadrantId = 2;
          else if (isFast && !isMany) quadrantId = 3;
          else quadrantId = 4;
          return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-blue-200 rounded-2xl p-6 shadow-md space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "border-b border-blue-200 pb-4 flex justify-between items-center flex-wrap gap-2", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-slate-900", children: [
                "🎉 Mock Oral Comprehensive Report ",
                examType === "sec1" ? "for Section 1" : "for Section 1 & 2"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-600 mt-1", children: [
                "VCE Japanese Mock Oral Assessment Summary (",
                examType === "sec1" ? "Section 1 Intensive" : "Section 1 + 2 Full Mock",
                ")"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { children: "📊" }),
                " Assessment Breakdown Metrics (Net Speaking Time Base):"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-3 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center gap-2.5 border-b border-blue-100 pb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xl", children: "📖" }),
                    /* @__PURE__ */ jsx("span", { children: "Grammar & Vocabulary (VCE Checklist Matching)" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { children: renderTenScaleStarRating(examResult.grammarScore) }),
                  /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-blue-100 space-y-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-blue-900 flex items-center gap-1.5", children: /* @__PURE__ */ jsx("span", { children: "✨ Detected VCE Grammar & Expressions Used:" }) }),
                    examResult.detectedGrammarItems && examResult.detectedGrammarItems.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: examResult.detectedGrammarItems.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-300 rounded-lg p-2 text-xs text-slate-800 space-y-0.5 flex-1 min-w-[200px] shadow-xs", children: [
                      /* @__PURE__ */ jsxs("div", { className: "font-bold text-blue-800 flex items-center justify-between", children: [
                        /* @__PURE__ */ jsx("span", { children: item.pattern }),
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500 font-normal", children: item.category })
                      ] }),
                      item.exampleUsed && /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-slate-600 italic", children: [
                        "「",
                        item.exampleUsed,
                        "」"
                      ] })
                    ] }, index)) }) : /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 italic bg-slate-50 p-3 rounded-lg border border-slate-200", children: "No specific VCE checklist grammar patterns were explicitly identified, or responses were too brief. Try incorporating more diverse sentence structures next time!" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-2 sm:col-span-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center gap-2.5 border-b border-blue-100 pb-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xl", children: "💬" }),
                    /* @__PURE__ */ jsx("span", { children: "Elaboration" })
                  ] }),
                  /* @__PURE__ */ jsx("div", { children: renderTenScaleStarRating(examResult.elaborationScore) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-4 shadow-xs space-y-1.5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-slate-900 flex items-center justify-between border-b border-blue-100 pb-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1.5", children: "⏱️ Elapsed Time" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setModalContent({
                          title: "Elapsed Time",
                          text: "The total duration of your mock oral session from start to finish, including examiner questions and system pauses."
                        }),
                        className: "text-blue-700 underline text-[10px] font-bold cursor-pointer",
                        children: "Note"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm font-mono font-bold text-slate-900 pt-0.5", children: [
                    Math.floor(examResult.totalTimeSec / 60),
                    "m ",
                    examResult.totalTimeSec % 60,
                    "s"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-4 shadow-xs space-y-1.5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-slate-900 flex items-center justify-between border-b border-blue-100 pb-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1.5", children: "📣 Speaking Time" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setModalContent({
                          title: "Actual Speaking Time",
                          text: "The total cumulative time you spent actively recording and speaking answers into the microphone during the session."
                        }),
                        className: "text-blue-700 underline text-[10px] font-bold cursor-pointer",
                        children: "Note"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm font-mono font-bold text-blue-700 pt-0.5", children: [
                    Math.floor(examResult.actualSpeakingSec / 60),
                    "m ",
                    examResult.actualSpeakingSec % 60,
                    "s"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-4 shadow-xs space-y-1.5", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-slate-900 flex items-center justify-between border-b border-blue-100 pb-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "flex items-center gap-1.5", children: "🧠 Thinking Time" }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setModalContent({
                          title: "Thinking Time",
                          text: "The time spent pondering or hesitating before your responses, calculated by subtracting your active speaking time from your net turn time."
                        }),
                        className: "text-blue-700 underline text-[10px] font-bold cursor-pointer",
                        children: "Note"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "text-sm font-mono font-bold text-blue-800 pt-0.5", children: [
                    Math.floor(examResult.thinkingSec / 60),
                    "m ",
                    examResult.thinkingSec % 60,
                    "s"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center justify-between border-b border-blue-100 pb-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🗣" }),
                      /* @__PURE__ */ jsx("span", { children: "Speech Speed" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setModalContent({
                          title: "Speech Speed & Fluency",
                          text: "Measures how smoothly and continuously you speak without excessive pausing. A natural pace (2.5 - 4.5 chars/sec) shows confidence and linguistic automaticity."
                        }),
                        className: "text-blue-700 underline text-xs font-bold cursor-pointer",
                        children: "Note"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-slate-900", children: [
                      examResult.fluencyMetrics.avgSpeechRateCPS,
                      " characters / sec"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 pt-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: `p-2 rounded-lg text-xs flex items-center justify-between border transition ${examResult.fluencyMetrics.avgSpeechRateCPS <= 2.5 ? "bg-blue-100 border-blue-400 font-bold text-blue-900 shadow-xs" : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"}`, children: [
                        /* @__PURE__ */ jsx("span", { children: "🐢 Deliberate Pace" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: "≤ 2.5 chars/sec" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: `p-2 rounded-lg text-xs flex items-center justify-between border transition ${examResult.fluencyMetrics.avgSpeechRateCPS > 2.5 && examResult.fluencyMetrics.avgSpeechRateCPS < 4.5 ? "bg-emerald-100 border-emerald-400 font-bold text-emerald-900 shadow-xs" : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"}`, children: [
                        /* @__PURE__ */ jsx("span", { children: "👍 Natural Pace" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: "2.5 - 4.5 chars/sec" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: `p-2 rounded-lg text-xs flex items-center justify-between border transition ${examResult.fluencyMetrics.avgSpeechRateCPS >= 4.5 ? "bg-rose-100 border-rose-400 font-bold text-rose-900 shadow-xs" : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"}`, children: [
                        /* @__PURE__ */ jsx("span", { children: "⚡ Fast Pace" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: "≥ 4.5 chars/sec" })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] text-slate-500 pt-1", children: /* @__PURE__ */ jsx("span", { children: "Target Reference: 3.0 - 4.5 characters / sec" }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center justify-between border-b border-blue-100 pb-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xl", children: "📝" }),
                      /* @__PURE__ */ jsx("span", { children: "Total Output Volume" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setModalContent({
                          title: "Total Output Volume & Elaboration",
                          text: "Measures the depth and amount of information in your responses. VCE assessment criteria require you to elaborate fully with reasons and examples rather than giving brief, single-sentence answers."
                        }),
                        className: "text-blue-700 underline text-xs font-bold cursor-pointer",
                        children: "Note"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-slate-900", children: [
                      examResult.fluencyMetrics.totalOutputChars,
                      " characters spoken"
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 pt-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: `p-2 rounded-lg text-xs flex items-center justify-between border transition ${examResult.fluencyMetrics.totalOutputChars < 150 ? "bg-rose-100 border-rose-400 font-bold text-rose-900 shadow-xs" : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"}`, children: [
                        /* @__PURE__ */ jsx("span", { children: "🛑 Brief / Too Short" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: "< 150 chars" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: `p-2 rounded-lg text-xs flex items-center justify-between border transition ${examResult.fluencyMetrics.totalOutputChars >= 150 && examResult.fluencyMetrics.totalOutputChars < 300 ? "bg-blue-100 border-blue-400 font-bold text-blue-900 shadow-xs" : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"}`, children: [
                        /* @__PURE__ */ jsx("span", { children: "🌿 Moderate Elaboration" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: "150 - 300 chars" })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: `p-2 rounded-lg text-xs flex items-center justify-between border transition ${examResult.fluencyMetrics.totalOutputChars >= 300 ? "bg-emerald-100 border-emerald-400 font-bold text-emerald-900 shadow-xs" : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"}`, children: [
                        /* @__PURE__ */ jsx("span", { children: "🌟 Rich Elaboration (Goal)" }),
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px]", children: "≥ 300 chars" })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "text-[11px] text-slate-500 pt-0.5", children: /* @__PURE__ */ jsx("span", { children: "Target Reference: ≥ 300 characters" }) }),
                  /* @__PURE__ */ jsxs("details", { className: "group pt-2 border-t border-blue-100", children: [
                    /* @__PURE__ */ jsxs("summary", { className: "text-xs font-bold text-blue-700 cursor-pointer hover:underline flex items-center justify-between", children: [
                      /* @__PURE__ */ jsx("span", { children: "🎙️ View My Spoken Transcript" }),
                      /* @__PURE__ */ jsx("span", { className: "transition group-open:rotate-180", children: "▼" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "mt-2 max-h-48 overflow-y-auto space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700", children: chatMessages.filter((msg) => msg.role === "user").length > 0 ? chatMessages.filter((msg) => msg.role === "user").map((msg, i) => /* @__PURE__ */ jsxs("div", { className: "border-b border-slate-200 pb-2 last:border-b-0 last:pb-0", children: [
                      /* @__PURE__ */ jsxs("div", { className: "font-bold text-[10px] text-blue-800 mb-0.5", children: [
                        "Response #",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "leading-relaxed", children: msg.content })
                    ] }, i)) : /* @__PURE__ */ jsx("div", { className: "text-slate-400 italic", children: "No user speech recorded." }) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-300 rounded-2xl p-6 shadow-sm space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-blue-200 pb-3 flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-slate-900 flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-lg", children: "🗺️" }),
                    /* @__PURE__ */ jsx("span", { children: "Your Speaking Style Matrix (Speed vs. Volume)" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setModalContent({
                        title: "Speaking Style Matrix Guide",
                        text: "This 2x2 matrix maps your speech speed against your total output volume to help you identify your current speaking pattern. Your goal as a VCE student is to reach Quadrant 1 (Fast & Many), where you speak fluently and elaborate extensively."
                      }),
                      className: "text-xs text-blue-700 font-bold underline cursor-pointer",
                      children: "Note"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed", children: "Based on your net speech rate and total output volume, your current performance falls into one of the four categories below:" }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 pt-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border-2 transition ${quadrantId === 1 ? "bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400" : "bg-slate-50/60 border-slate-200 opacity-60"}`, children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-emerald-900", children: "🌟 Quadrant 1: Fast & Many (Goal)" }),
                      quadrantId === 1 && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full", children: "📍 You Are Here" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-700 leading-relaxed", children: "High speed and rich elaboration. You speak smoothly and provide detailed explanations with examples." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border-2 transition ${quadrantId === 2 ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-400" : "bg-slate-50/60 border-slate-200 opacity-60"}`, children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-blue-900", children: "🐢 Quadrant 2: Slow & Many" }),
                      quadrantId === 2 && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full", children: "📍 You Are Here" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-700 leading-relaxed", children: "You want to say a lot, but you pause frequently to search for vocabulary or grammar." })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border-2 transition ${quadrantId === 3 ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-400" : "bg-slate-50/60 border-slate-200 opacity-60"}`, children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-blue-900", children: "⚡ Quadrant 3: Fast & Few" }),
                      quadrantId === 3 && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full", children: "📍 You Are Here" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-700 leading-relaxed", children: 'Quick, snappy answers, but too brief ("Yes/No" style). Lacks elaboration.' })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl border-2 transition ${quadrantId === 4 ? "bg-rose-50 border-rose-500 shadow-md ring-2 ring-rose-400" : "bg-slate-50/60 border-slate-200 opacity-60"}`, children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-rose-900", children: "🛑 Quadrant 4: Slow & Few" }),
                      quadrantId === 4 && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full", children: "📍 You Are Here" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-700 leading-relaxed", children: "Struggling with both speed and volume. Long silences and short sentences." })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { children: "📋" }),
                " Examiner's Feedback & Advice:"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center gap-2.5 border-b border-blue-100 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xl", children: "📊" }),
                  /* @__PURE__ */ jsx("span", { children: "Performance Overview" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pt-1", children: examResult.performanceOverview })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center gap-2.5 border-b border-blue-100 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xl", children: "⚠️" }),
                  /* @__PURE__ */ jsx("span", { children: "Key Weaknesses & Hesitation Analysis" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pt-1", children: examResult.weaknessesAnalysis })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-200 rounded-xl p-5 shadow-xs space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-base font-bold text-slate-900 flex items-center gap-2.5 border-b border-blue-100 pb-2", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xl", children: "🎯" }),
                  /* @__PURE__ */ jsx("span", { children: "Action Plan for Real VCE Exam" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-700 leading-relaxed whitespace-pre-wrap pt-1", children: examResult.actionPlan })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-blue-200 flex justify-end gap-3", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setExamPhase("config"),
                  className: "bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition cursor-pointer",
                  children: "🔄 Retake Mock Oral"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/dashboard",
                  className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition cursor-pointer shadow",
                  children: "🏠 Return to Dashboard"
                }
              )
            ] })
          ] });
        })()
      ] }),
      modalContent && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border-2 border-blue-300 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center border-b border-blue-200 pb-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-base text-slate-900 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: "ℹ" }),
            " ",
            modalContent.title
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setModalContent(null),
              className: "text-slate-400 hover:text-slate-700 font-bold text-lg cursor-pointer",
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-700 leading-relaxed", children: modalContent.text }),
        /* @__PURE__ */ jsx("div", { className: "pt-2 flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setModalContent(null),
            className: "bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2 rounded-xl transition cursor-pointer shadow",
            children: "Got it"
          }
        ) })
      ] }) })
    ] })
  );
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: MockOralMode,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function renderGrammarText(text, modalKey) {
  const grammarLinks = {
    "べきです": "/grammar#beki-desu",
    "〜べきだ": "/grammar#beki-desu",
    "ので": "/grammar#kara-node",
    "から": "/grammar#kara-node",
    "一方で": "/grammar#ippou",
    "によると": "/grammar#particles",
    "によると〜そうです": "/grammar#sou-desu-hearsay"
  };
  const matchedKey = Object.keys(grammarLinks).find(
    (key) => text.includes(key)
  );
  if (matchedKey) {
    const parts = text.split(matchedKey);
    return /* @__PURE__ */ jsxs("span", { children: [
      /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: parts[0] } }),
      /* @__PURE__ */ jsx(
        Link$1,
        {
          to: grammarLinks[matchedKey],
          className: "text-blue-600 underline font-semibold hover:text-blue-800",
          onClick: (e) => {
            e.stopPropagation();
            if (typeof window !== "undefined") {
              sessionStorage.setItem("reopenModalTitle", modalKey);
            }
          },
          children: matchedKey
        }
      ),
      /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: parts[1] } })
    ] });
  }
  return /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: text } });
}
function TextTypeModal({
  isOpen,
  onClose,
  modalKey,
  title,
  purpose,
  structure,
  sample,
  sampleImage
}) {
  if (!isOpen) return null;
  const renderPurposeWithJump = (text) => {
    const targetPhrase = "Refer to each text type for details.";
    if (text.includes(targetPhrase)) {
      const parts = text.split(targetPhrase);
      return /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: parts[0] } }),
        targetPhrase,
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              onClose();
              setTimeout(() => {
                const banner = document.getElementById("text-type-instruction");
                if (banner) {
                  banner.scrollIntoView({ behavior: "smooth" });
                  banner.classList.add("ring-4", "ring-emerald-400");
                  setTimeout(() => {
                    banner.classList.remove("ring-4", "ring-emerald-400");
                  }, 1500);
                }
              }, 100);
            },
            className: "ml-1.5 inline-baseline text-blue-500 hover:text-blue-600 hover:scale-110 transition-transform cursor-pointer align-baseline",
            title: "Go to Text Type instruction",
            children: "▶️"
          }
        ),
        parts[1] && /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: parts[1] } })
      ] });
    }
    return /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: text } });
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4",
      onClick: onClose,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white p-6 w-full max-w-2xl rounded-xl shadow-2xl relative max-h-[85vh] overflow-y-auto box-border",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "absolute top-3 right-4 bg-transparent border-none text-2xl cursor-pointer text-slate-500 hover:text-slate-900 transition-colors",
                onClick: onClose,
                children: "×"
              }
            ),
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: "mt-0 text-slate-800 text-2xl font-bold pr-8",
                dangerouslySetInnerHTML: { __html: title }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-slate-50 p-5 rounded-lg border border-slate-200", children: [
              /* @__PURE__ */ jsx("h4", { className: "m-0 mb-3 font-bold text-slate-800 text-lg", children: "📌 Key points" }),
              /* @__PURE__ */ jsxs("p", { className: "m-0 text-lg text-slate-700 mb-4 leading-relaxed", children: [
                /* @__PURE__ */ jsx("strong", { children: "✨" }),
                " ",
                renderPurposeWithJump(purpose)
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "m-0 pl-5 text-slate-700 space-y-3 text-lg", children: structure.map((point, index) => {
                if (point.startsWith("Main Text:")) {
                  const mainTextSubItems = [
                    "Start from the 3rd line, leaving the 1st square blank",
                    "Indent 1 space for a new paragraph",
                    "Do not leave a blank line between paragraphs"
                  ];
                  return /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Main Text:" }),
                    /* @__PURE__ */ jsx("ul", { className: "mt-1 pl-5 list-disc space-y-1", children: mainTextSubItems.map((sub, subIndex) => /* @__PURE__ */ jsx("li", { className: "text-base text-slate-600", children: sub }, subIndex)) })
                  ] }, index);
                }
                if (point.startsWith("Square Usage:")) {
                  const squareUsageSubItems = [
                    "1 character per square",
                    "Use Arabic numerals (2 digits per square) for horizontal dates",
                    "Punctuation never goes in the first square; instead, put it in the last square along with the character already in that square"
                  ];
                  return /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Square Usage:" }),
                    /* @__PURE__ */ jsx("ul", { className: "mt-1 pl-5 list-disc space-y-1", children: squareUsageSubItems.map((sub, subIndex) => /* @__PURE__ */ jsx("li", { className: "text-base text-slate-600", children: sub }, subIndex)) })
                  ] }, index);
                }
                if (point.startsWith("Items you should include:")) {
                  const contentAfterColon = point.substring("Items you should include:".length).trim();
                  const subItems = contentAfterColon ? contentAfterColon.split(",").map((s) => s.trim()) : [];
                  return /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Items you should include:" }),
                    subItems.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-1 pl-5 list-disc space-y-1", children: subItems.map((sub, subIndex) => /* @__PURE__ */ jsx("li", { className: "text-base text-slate-600", children: renderGrammarText(sub, modalKey) }, subIndex)) })
                  ] }, index);
                }
                if (point.startsWith("Content:")) {
                  const contentAfterColon = point.substring("Content:".length).trim();
                  const subItems = contentAfterColon ? contentAfterColon.split(",").map((s) => s.trim()) : [];
                  return /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
                    /* @__PURE__ */ jsx("strong", { children: "Content:" }),
                    subItems.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-1 pl-5 list-disc space-y-1", children: subItems.map((sub, subIndex) => /* @__PURE__ */ jsx("li", { className: "text-base text-slate-600", children: renderGrammarText(sub, modalKey) }, subIndex)) })
                  ] }, index);
                }
                if (point.startsWith("Sentence style:") || point.startsWith("Possible grammar patterns:")) {
                  const prefix = point.startsWith("Sentence style:") ? "Sentence style:" : "Possible grammar patterns:";
                  const contentAfterColon = point.substring(prefix.length).trim();
                  const subItems = contentAfterColon ? contentAfterColon.split(",").map((s) => s.trim()) : [];
                  return /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
                    /* @__PURE__ */ jsx("strong", { children: prefix }),
                    subItems.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-1 pl-5 list-disc space-y-1", children: subItems.map((sub, subIndex) => /* @__PURE__ */ jsx("li", { className: "text-base text-slate-600", children: renderGrammarText(sub, modalKey) }, subIndex)) })
                  ] }, index);
                }
                const colonIndex = point.indexOf(":");
                if (colonIndex !== -1) {
                  const label = point.substring(0, colonIndex + 1);
                  const rest = point.substring(colonIndex + 1).trim();
                  const subItems = rest ? rest.split(",").map((s) => s.trim()) : [];
                  return /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
                    /* @__PURE__ */ jsx("strong", { children: label }),
                    subItems.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-1 pl-5 list-disc space-y-1", children: subItems.map((sub, subIndex) => /* @__PURE__ */ jsx("li", { className: "text-base text-slate-600", children: renderGrammarText(sub, modalKey) }, subIndex)) })
                  ] }, index);
                }
                return /* @__PURE__ */ jsx("li", { className: "mb-1", children: renderGrammarText(point, modalKey) }, index);
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-slate-50 p-5 rounded-lg border border-slate-200", children: [
              /* @__PURE__ */ jsx("h4", { className: "m-0 mb-3 font-bold text-slate-800 text-lg", children: "💡 Sample" }),
              sampleImage ? /* @__PURE__ */ jsx("div", { className: "mt-2", children: sampleImage.endsWith(".pdf") ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: sampleImage,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-base font-medium no-underline transition-colors shadow-sm",
                    children: "📄 View PDF Sample in New Tab ↗"
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "border border-slate-300 rounded-lg overflow-hidden h-[450px] sm:h-[550px]", children: /* @__PURE__ */ jsx(
                  "iframe",
                  {
                    src: sampleImage,
                    width: "100%",
                    height: "100%",
                    className: "border-none"
                  }
                ) })
              ] }) : /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: sampleImage,
                  alt: `${title} Sample`,
                  className: "max-w-full h-auto rounded-md border border-slate-300 shadow-sm"
                }
              ) }) }) : /* @__PURE__ */ jsx("p", { className: "italic text-slate-700 bg-white p-4 rounded-md border-l-4 border-blue-600 m-0 whitespace-pre-wrap text-base", children: sample })
            ] })
          ]
        }
      )
    }
  );
}
const questionsData = /* @__PURE__ */ JSON.parse(`[{"id":1,"category":"Informative","textType":"Speech","english":"You are an exchange student at a sister school in Japan. Write a speech script in Japanese for the whole school assembly, explaining how Australian high school students participate in volunteer activities during their holidays and after school, and what they gain from these experiences.","japanese":"日本の姉妹校の<ruby>全校<rt>ぜんこう</rt></ruby><ruby>集会<rt>しゅうかい</rt></ruby>で、オーストラリアの高校生が休みの日や<ruby>放課後<rt>ほうかご</rt></ruby>にどのようにボランティア活動に<ruby>参加<rt>さんか</rt></ruby>しているか、またそこから何を学ぶかについて<ruby>説明<rt>せつめい</rt></ruby>するスピーチの<ruby>原稿<rt>げんこう</rt></ruby>を書きなさい。","japanese_original":"日本の姉妹校の全校集会で、オーストラリアの高校生が休みの日や放課後にどのようにボランティア活動に参加しているか、またそこから何を学ぶかについて説明するスピーチの原稿を書きなさい。"},{"id":2,"category":"Informative","textType":"Article","english":"Write an article in Japanese for the online newsletter of your Japanese sister school, introducing the culture and art of Australia’s Indigenous peoples and explaining why it is important for young people to learn about them.","japanese":"日本の姉妹校のオンラインニュースレターのために、オーストラリアの<ruby>先住民<rt>せんじゅうみん</rt></ruby>族の<ruby>文化<rt>ぶんか</rt></ruby>やアートについて<ruby>紹介<rt>しょうかい</rt></ruby>し、<ruby>若<rt>わか</rt></ruby>い人がそれらを学ぶことがなぜ<ruby>大切<rt>たいせつ</rt></ruby>か<ruby>説明<rt>せつめい</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"日本の姉妹校のオンラインニュースレターのために、オーストラリアの先住民族の文化やアートについて紹介し、若い人がそれらを学ぶことがなぜ大切か説明する記事を書きなさい。"},{"id":3,"category":"Informative","textType":"Email","english":"Write an email to a friend in Japan who is planning to come to Australia for a short-term study exchange, explaining what kind of clothes they should bring and what the local climate is like.","japanese":"日本からオーストラリアに<ruby>短期<rt>たんき</rt></ruby><ruby>留学<rt>りゅうがく</rt></ruby>する<ruby>予定<rt>よてい</rt></ruby>の友人に、どのような<ruby>服<rt>ふく</rt></ruby>を持ってくればよいか、また<ruby>現地<rt>げんち</rt></ruby>の<ruby>気候<rt>きこう</rt></ruby>について<ruby>説明<rt>せつめい</rt></ruby>するメールを書きなさい。","japanese_original":"日本からオーストラリアに短期留学する予定の友人に、どのような服を持ってくればよいか、また現地の気候について説明するメールを書きなさい。"},{"id":4,"category":"Informative","textType":"Speech","english":"Deliver a speech to your entire school about the privacy issues teenagers face when using social media and how to use it safely.","japanese":"高校生がソーシャルメディアを使うときにぶつかるプライバシーの<ruby>問題<rt>もんだい</rt></ruby>と、<ruby>安全<rt>あんぜん</rt></ruby>に使う<ruby>方法<rt>ほうほう</rt></ruby>について学校のみんなの前で話すスピーチを書きなさい。","japanese_original":"高校生がソーシャルメディアを使うときにぶつかるプライバシーの問題と、安全に使う方法について学校のみんなの前で話すスピーチを書きなさい。"},{"id":5,"category":"Informative","textType":"Report","english":"Write a report on how Japanese pop culture has influenced the lifestyles and interests of teenagers in Australia.","japanese":"日本のポップカルチャーがオーストラリアの<ruby>若者<rt>わかもの</rt></ruby>の生活や<ruby>興味<rt>きょうみ</rt></ruby>にどのような<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えたかについてのレポートを書きなさい。","japanese_original":"日本のポップカルチャーがオーストラリアの若者の生活や興味にどのような影響を与えたかについてのレポートを書きなさい。"},{"id":6,"category":"Informative","textType":"Email","english":"Write an email to a Japanese friend who is torn between university and a gap year after graduation, offering advice based on your own thoughts and experiences.","japanese":"<ruby>卒業<rt>そつぎょう</rt></ruby>してから大学に行くかギャップイヤーにするかで<ruby>迷<rt>まよ</rt></ruby>っている日本の友人に、自分の<ruby>経験<rt>けいけん</rt></ruby>や考えをもとにアドバイスをするメールを書きなさい。","japanese_original":"卒業してから大学に行くかギャップイヤーにするかで迷っている日本の友人に、自分の経験や考えをもとにアドバイスをするメールを書きなさい。"},{"id":7,"category":"Informative","textType":"Email","english":"Write an email to a Japanese friend introducing the charms of a nature-rich national park in Australia and inviting them to go camping together during the next holiday.","japanese":"日本の友人に、オーストラリアの<ruby>自然<rt>しぜん</rt></ruby>が<ruby>豊<rt>ゆた</rt></ruby>かな国立<ruby>公園<rt>こうえん</rt></ruby>の<ruby>魅力<rt>みりょく</rt></ruby>を<ruby>紹介<rt>しょうかい</rt></ruby>し、次の休みに<ruby>一緒<rt>いっしょ</rt></ruby>にキャンプに行かないかと<ruby>誘<rt>さそ</rt></ruby>うメールを書きなさい。","japanese_original":"日本の友人に、オーストラリアの自然が豊かな国立公園の魅力を紹介し、次の休みに一緒にキャンプに行かないかと誘うメールを書きなさい。"},{"id":8,"category":"Informative","textType":"Email","english":"Write an email to your family in Japan describing the unique neighbors and atmosphere around your newly moved house.","japanese":"新しく<ruby>引っ越<rt>ひっこ</rt></ruby>した家のまわりにいる<ruby>面白<rt>おもしろ</rt></ruby>い近所の人たちや、<ruby>街<rt>まち</rt></ruby>の<ruby>雰囲気<rt>ふんいき</rt></ruby>について日本の家族に<ruby>伝<rt>つた</rt></ruby>えるメールを書きなさい。","japanese_original":"新しく引っ越した家のまわりにいる面白い近所の人たちや、街の雰囲気について日本の家族に伝えるメールを書きなさい。"},{"id":9,"category":"Informative","textType":"Speech","english":"Deliver a speech to the morning assembly explaining how Australian families practice energy and water saving methods at home.","japanese":"オーストラリアの<ruby>家庭<rt>かてい</rt></ruby>で、どのように電気や水を<ruby>節約<rt>せつやく</rt></ruby>しているか<ruby>説明<rt>せつめい</rt></ruby>する<ruby>朝礼<rt>ちょうれい</rt></ruby>のスピーチを書きなさい。","japanese_original":"オーストラリアの家庭で、どのように電気や水を節約しているか説明する朝礼のスピーチを書きなさい。"},{"id":10,"category":"Informative","textType":"Speech","english":"Deliver a speech to your class comparing the typical daily schedule and annual events of high school students in Australia and Japan.","japanese":"日本とオーストラリアの高校生の毎日のスケジュールや年間の行事の<ruby>違<rt>ちが</rt></ruby>いについて<ruby>説明<rt>せつめい</rt></ruby>するスピーチを書きなさい。","japanese_original":"日本とオーストラリアの高校生の毎日のスケジュールや年間の行事の違いについて説明するスピーチを書きなさい。"},{"id":11,"category":"Informative","textType":"Report","english":"Write a report summarizing the achievements of a local sports club and its contribution to the health and wellbeing of local residents.","japanese":"<ruby>地元<rt>じもと</rt></ruby>のスポーツクラブの活動と、<ruby>地域<rt>ちいき</rt></ruby>の人たちの<ruby>健康<rt>けんこう</rt></ruby>や生活への<ruby>貢献<rt>こうけん</rt></ruby>についてまとめたレポートを書きなさい。","japanese_original":"地元のスポーツクラブの活動と、地域の人たちの健康や生活への貢献についてまとめたレポートを書きなさい。"},{"id":12,"category":"Informative","textType":"Article","english":"Write an informative article outlining the manners tourists should follow to protect Australia's beautiful natural environment.","japanese":"オーストラリアの<ruby>美<rt>うつく</rt></ruby>しい<ruby>自然<rt>しぜん</rt></ruby>を<ruby>守<rt>まも</rt></ruby>るために、旅行<ruby>者<rt>しゃ</rt></ruby>が<ruby>守<rt>まも</rt></ruby>るべきマナーについてまとめた<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアの美しい自然を守るために、旅行者が守るべきマナーについてまとめた記事を書きなさい。"},{"id":13,"category":"Informative","textType":"Speech","english":"Deliver a speech introducing the value and community benefits of a newly opened community center in your town.","japanese":"自分の町に新しくできたコミュニティセンターの使い道や、<ruby>地域<rt>ちいき</rt></ruby>にとってのよさについて<ruby>紹介<rt>しょうかい</rt></ruby>するスピーチを書きなさい。","japanese_original":"自分の町に新しくできたコミュニティセンターの使い道や、地域にとってのよさについて紹介するスピーチを書きなさい。"},{"id":14,"category":"Informative","textType":"Speech","english":"Deliver a speech to Year 10 students encouraging them to continue studying Japanese up to Year 12 by highlighting its long-term benefits.","japanese":"10年生に<ruby>向<rt>む</rt></ruby>けて、12年生まで日本語の勉強を<ruby>続<rt>つづ</rt></ruby>けることの<ruby>良<rt>よ</rt></ruby>さを<ruby>伝<rt>つた</rt></ruby>えて、がんばるようにすすめるスピーチを書きなさい。","japanese_original":"10年生に向けて、12年生まで日本語の勉強を続けることの良さを伝えて、がんばるようにすすめるスピーチを書きなさい。"},{"id":15,"category":"Informative","textType":"Report","english":"Write a report for your teacher explaining Japanese food customs and table manners you learned during your year-long stay in Japan.","japanese":"日本に一年間いたときに学んだ、日本の食<ruby>習慣<rt>しゅうかん</rt></ruby>や食事のマナーについてくわしく<ruby>説明<rt>せつめい</rt></ruby>するレポートを書きなさい。","japanese_original":"日本に一年間いたときに学んだ、日本の食習慣や食事のマナーについてくわしく説明するレポートを書きなさい。"},{"id":16,"category":"Informative","textType":"Article","english":"Write an article introducing public transport systems in Melbourne and giving useful tips for foreign visitors on how to use them easily.","japanese":"メルボルンの<ruby>公共<rt>こうきょう</rt></ruby><ruby>交通<rt>こうつう</rt></ruby><ruby>機関<rt>きかん</rt></ruby>について<ruby>紹介<rt>しょうかい</rt></ruby>し、外国からの旅行<ruby>者<rt>しゃ</rt></ruby>が<ruby>簡単<rt>かんたん</rt></ruby>に<ruby>利用<rt>りよう</rt></ruby>するための<ruby>便利<rt>べんり</rt></ruby>なコツをまとめた<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"メルボルンの公共交通機関について紹介し、外国からの旅行者が簡単に利用するための便利なコツをまとめた記事を書きなさい。"},{"id":17,"category":"Informative","textType":"Report","english":"Write a report explaining how local councils in Australia manage waste recycling and what citizens are expected to do.","japanese":"オーストラリアの<ruby>地域<rt>ちいき</rt></ruby>社会がどのようにゴミのリサイクルを<ruby>管理<rt>かんり</rt></ruby>しているか、また<ruby>市民<rt>しみん</rt></ruby>に何が<ruby>求<rt>もと</rt></ruby>められているかについて<ruby>説明<rt>せつめい</rt></ruby>するレポートを書きなさい。","japanese_original":"オーストラリアの地域社会がどのようにゴミのリサイクルを管理しているか、また市民に何が求められているかについて説明するレポートを書きなさい。"},{"id":18,"category":"Informative","textType":"Speech","english":"Deliver a speech introducing popular traditional Australian foods and modern cafe culture to Japanese exchange students.","japanese":"日本の<ruby>留学生<rt>りゅうがくせい</rt></ruby>に<ruby>向<rt>む</rt></ruby>けて、オーストラリアの<ruby>伝統<rt>でんとう</rt></ruby><ruby>的<rt>てき</rt></ruby>な食べ物や<ruby>現代<rt>げんだい</rt></ruby>のカフェ<ruby>文化<rt>ぶんか</rt></ruby>について<ruby>紹介<rt>しょうかい</rt></ruby>するスピーチを書きなさい。","japanese_original":"日本の留学生に向けて、オーストラリアの伝統的な食べ物や現代のカフェ文化について紹介するスピーチを書きなさい。"},{"id":19,"category":"Informative","textType":"Article","english":"Write an article introducing unique Australian wildlife and the protection efforts being made in national parks.","japanese":"オーストラリアのユニークな<ruby>野生<rt>やせい</rt></ruby>動物と、国立<ruby>公園<rt>こうえん</rt></ruby>で行われている<ruby>保護<rt>ほご</rt></ruby>の<ruby>取り組<rt>とりく</rt></ruby>みについて<ruby>紹介<rt>しょうかい</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアのユニークな野生動物と、国立公園で行われている保護の取り組みについて紹介する記事を書きなさい。"},{"id":20,"category":"Informative","textType":"Report","english":"Write a report detailing the history and cultural significance of major annual festivals held in Melbourne.","japanese":"メルボルンで<ruby>開<rt>ひら</rt></ruby>かれる<ruby>主<rt>おも</rt></ruby>な年間行事の<ruby>歴史<rt>れきし</rt></ruby>や<ruby>文化<rt>ぶんか</rt></ruby><ruby>的<rt>てき</rt></ruby>な<ruby>意味<rt>いみ</rt></ruby>についてくわしく<ruby>説明<rt>せつめい</rt></ruby>するレポートを書きなさい。","japanese_original":"メルボルンで開かれる主な年間行事の歴史や文化的な意味についてくわしく説明するレポートを書きなさい。"},{"id":21,"category":"Informative","textType":"Email","english":"Write an email to a pen pal in Japan explaining the seasonal changes and weather patterns in Melbourne throughout the year.","japanese":"日本のペンフレンドに、一年を<ruby>通<rt>とお</rt></ruby>したメルボルンの<ruby>季節<rt>きせつ</rt></ruby>の<ruby>変化<rt>へんか</rt></ruby>や天気の<ruby>特徴<rt>とくちょう</rt></ruby>について<ruby>説明<rt>せつめい</rt></ruby>するメールを書きなさい。","japanese_original":"日本のペンフレンドに、一年を通したメルボルンの季節の変化や天気の特徴について説明するメールを書きなさい。"},{"id":22,"category":"Informative","textType":"Speech","english":"Deliver a speech explaining the history and rules of Australian Rules Football (AFL) to students who have never seen it before.","japanese":"オーストラリアンフットボール（AFL）を見たことがない人に<ruby>向<rt>む</rt></ruby>けて、その<ruby>歴史<rt>れきし</rt></ruby>やルールについて<ruby>説明<rt>せつめい</rt></ruby>するスピーチを書きなさい。","japanese_original":"オーストラリアンフットボール（AFL）を見たことがない人に向けて、その歴史やルールについて説明するスピーチを書きなさい。"},{"id":23,"category":"Informative","textType":"Report","english":"Write a report on how part-time job culture works for high school students in Australia, including typical roles and working hours.","japanese":"オーストラリアの高校生のアルバイト<ruby>文化<rt>ぶんか</rt></ruby>について、<ruby>主<rt>おも</rt></ruby>な仕事や働く時間を<ruby>含<rt>ふく</rt></ruby>めて<ruby>説明<rt>せつめい</rt></ruby>するレポートを書きなさい。","japanese_original":"オーストラリアの高校生のアルバイト文化について、主な仕事や働く時間を含めて説明するレポートを書きなさい。"},{"id":24,"category":"Evaluative","textType":"Report","english":"Write an evaluative report in Japanese addressed to the school librarian and your Japanese teacher, analyzing the advantages and disadvantages of high school students using 'e-books' for school assignments and reading.","japanese":"学校の<ruby>図書館<rt>としょかん</rt></ruby>長と日本語の先生に<ruby>向<rt>む</rt></ruby>けて、高校生が<ruby>課題<rt>かだい</rt></ruby>や読書のために電子<ruby>書籍<rt>しょせき</rt></ruby>を使うことの<ruby>良<rt>よ</rt></ruby>い点と<ruby>悪<rt>わる</rt></ruby>い点を<ruby>分析<rt>ぶんせき</rt></ruby>して<ruby>評価<rt>ひょうか</rt></ruby>するレポートを書きなさい。","japanese_original":"学校の図書館長と日本語の先生に向けて、高校生が課題や読書のために電子書籍を使うことの良い点と悪い点を分析して評価するレポートを書きなさい。"},{"id":25,"category":"Evaluative","textType":"Article","english":"Write an evaluative article in Japanese for a Japanese-language newspaper in Melbourne, assessing the pros and cons of the convenient services and products provided by convenience stores in Japan based on your experiences.","japanese":"メルボルンの日本語の新聞の<ruby>読者<rt>どくしゃ</rt></ruby>に<ruby>向<rt>む</rt></ruby>けて、日本にいたときに<ruby>利用<rt>りよう</rt></ruby>したコンビニの<ruby>便利<rt>べんり</rt></ruby>なサービスや<ruby>商品<rt>しょうひん</rt></ruby>の長所と<ruby>短所<rt>たんしょ</rt></ruby>をいろいろな<ruby>方向<rt>ほうこう</rt></ruby>から<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"メルボルンの日本語の新聞の読者に向けて、日本にいたときに利用したコンビニの便利なサービスや商品の長所と短所をいろいろな方向から評価する記事を書きなさい。"},{"id":26,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the advantages and disadvantages of making school uniforms mandatory in Australian schools.","japanese":"オーストラリアの学校で<ruby>制服<rt>せいふく</rt></ruby>を着ることが<ruby>義務<rt>ぎむ</rt></ruby>になっていることの、メリットとデメリットを<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアの学校で制服を着ることが義務になっていることの、メリットとデメリットを評価する記事を書きなさい。"},{"id":27,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the convenience of digital payments compared to the enduring value of using cash in a cashless society.","japanese":"キャッシュレス社会の中で、<ruby>現金<rt>げんきん</rt></ruby>を使うよさとデジタル<ruby>払<rt>はら</rt></ruby>いの<ruby>便利<rt>べんり</rt></ruby>さをくらべて<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"キャッシュレス社会の中で、現金を使うよさとデジタル払いの便利さをくらべて評価する記事を書きなさい。"},{"id":28,"category":"Evaluative","textType":"Article","english":"Write a detailed review of a newly opened authentic Japanese restaurant in your local town, evaluating its food, service, and atmosphere.","japanese":"<ruby>地元<rt>じもと</rt></ruby>の町に新しくできた<ruby>本格<rt>ほんかく</rt></ruby><ruby>的<rt>てき</rt></ruby>な日本食レストランに行って書いた、<ruby>料理<rt>りょうり</rt></ruby>やサービス、<ruby>雰囲気<rt>ふんいき</rt></ruby>についてのくわしいレビューを書きなさい。","japanese_original":"地元の町に新しくできた本格的な日本食レストランに行って書いた、料理やサービス、雰囲気についてのくわしいレビューを書きなさい。"},{"id":29,"category":"Evaluative","textType":"Article","english":"Write a comparative review of long-distance trains and domestic flights in Australia, evaluating their comfort, cost, and convenience for travelers.","japanese":"オーストラリアで旅行するときに乗った<ruby>長距離<rt>ちょうきょり</rt></ruby><ruby>列車<rt>れっしゃ</rt></ruby>と<ruby>国内線<rt>こくないせん</rt></ruby>の<ruby>飛行機<rt>ひこうき</rt></ruby>について、<ruby>快適<rt>かいてき</rt></ruby>さや<ruby>費用<rt>ひよう</rt></ruby>、<ruby>便利<rt>べんり</rt></ruby>さをくらべて<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアで旅行するときに乗った長距離列車と国内線の飛行機について、快適さや費用、便利さをくらべて評価する記事を書きなさい。"},{"id":30,"category":"Evaluative","textType":"Article","english":"Write a critical review evaluating the functionality and educational effectiveness of popular online learning platforms and language apps.","japanese":"人気があるオンラインの学習プラットフォームや語学アプリの<ruby>機能<rt>きのう</rt></ruby>や学習への<ruby>効果<rt>こうか</rt></ruby>について<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"人気があるオンラインの学習プラットフォームや語学アプリの機能や学習への効果について評価する記事を書きなさい。"},{"id":31,"category":"Evaluative","textType":"Article","english":"Write a review of a newly opened eco-friendly cafe in your city, evaluating its environmental philosophy and the quality of its food and service.","japanese":"<ruby>市内<rt>しない</rt></ruby>で<ruby>話題<rt>わだい</rt></ruby>になっている<ruby>環境<rt>かんきょう</rt></ruby>にやさしいカフェの考え方や、<ruby>料理<rt>りょうり</rt></ruby>とサービスの<ruby>質<rt>しつ</rt></ruby>のよさについて<ruby>評価<rt>ひょうか</rt></ruby>するレビューを書きなさい。","japanese_original":"市内で話題になっている環境にやさしいカフェの考え方や、料理とサービスの質のよさについて評価するレビューを書きなさい。"},{"id":32,"category":"Evaluative","textType":"Article","english":"Write a review evaluating the convenience of self-checkout systems at Australian supermarkets and their impact on customer satisfaction.","japanese":"オーストラリアのスーパーにあるセルフレジの使いやすさと、<ruby>お客<rt>おきゃく</rt></ruby>さんの<ruby>満足<rt>まんぞく</rt></ruby><ruby>度<rt>ど</rt></ruby>について<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアのスーパーにあるセルフレジの使いやすさと、お客さんの満足度について評価する記事を書きなさい。"},{"id":33,"category":"Evaluative","textType":"Email","english":"Write an email exchanging opinions with a Japanese friend on whether a city full of theme parks or a city with vast nature is better for a graduation trip destination.","japanese":"<ruby>卒業<rt>そつぎょう</rt></ruby>旅行の行き先として、テーマパークが多い都会と広い<ruby>自然<rt>しぜん</rt></ruby>がある町のどちらがよいか、日本の友人と<ruby>意見<rt>いけん</rt></ruby>をかわすメールを書きなさい。","japanese_original":"卒業旅行の行き先として、テーマパークが多い都会と広い自然がある町のどちらがよいか、日本の友人と意見をかわすメールを書きなさい。"},{"id":34,"category":"Evaluative","textType":"Report","english":"Write a report evaluating the advantages and disadvantages of online classes versus face-to-face classes from a student's perspective.","japanese":"オンラインの<ruby>授業<rt>じゅぎょう</rt></ruby>と<ruby>対面<rt>たいめん</rt></ruby>での<ruby>授業<rt>じゅぎょう</rt></ruby>のそれぞれの<ruby>良<rt>よ</rt></ruby>い点と<ruby>悪<rt>わる</rt></ruby>い点を、<ruby>生徒<rt>せいと</rt></ruby>の<ruby>目線<rt>めせん</rt></ruby>から<ruby>客観<rt>きゃっかん</rt></ruby><ruby>的<rt>てき</rt></ruby>に<ruby>評価<rt>ひょうか</rt></ruby>するレポートを書きなさい。","japanese_original":"オンラインの授業と対面での授業のそれぞれの良い点と悪い点を、生徒の目線から客観的に評価するレポートを書きなさい。"},{"id":35,"category":"Evaluative","textType":"Report","english":"Write an evaluative report on how the rapid spread of AI will impact future school education and human employment.","japanese":"AIが<ruby>急<rt>きゅう</rt></ruby>に広がることが、これからの学校<ruby>教育<rt>きょういく</rt></ruby>や人間の仕事にどのような<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えるかについての<ruby>評価<rt>ひょうか</rt></ruby>レポートを書きなさい。","japanese_original":"AIが急に広がることが、これからの学校教育や人間の仕事にどのような影響を与えるかについての評価レポートを書きなさい。"},{"id":36,"category":"Evaluative","textType":"Article","english":"Write an article discussing the pros and cons of newly introduced school social media rules in terms of balancing student freedom and discipline.","japanese":"新しくできた学校のソーシャルメディアのルールについて、<ruby>生徒<rt>せいと</rt></ruby>の<ruby>自由<rt>じゆう</rt></ruby>と<ruby>規律<rt>きりつ</rt></ruby>のバランスという点からその<ruby>是非<rt>ぜひ</rt></ruby>を<ruby>論<rt>ろん</rt></ruby>じる<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"新しくできた学校のソーシャルメディアのルールについて、生徒の自由と規律のバランスという点からその是非を論じる記事を書きなさい。"},{"id":37,"category":"Evaluative","textType":"Article","english":"Write an article evaluating and comparing university education and vocational training/employment as career paths after high school graduation.","japanese":"高校を<ruby>卒業<rt>そつぎょう</rt></ruby>したあとの<ruby>進路<rt>しんろ</rt></ruby>として、大学<ruby>進学<rt>しんがく</rt></ruby>と<ruby>専門<rt>せんもん</rt></ruby>学校や<ruby>就職<rt>しゅうしょく</rt></ruby>をくらべて<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"高校を卒業したあとの進路として、大学進学と専門学校や就職をくらべて評価する記事を書きなさい。"},{"id":38,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the advantages and disadvantages of high school seniors driving their own cars to school.","japanese":"12年生が自分で車を<ruby>運転<rt>うんてん</rt></ruby>して学校に<ruby>通<rt>かよ</rt></ruby>うことについて、その<ruby>良<rt>よ</rt></ruby>い点と<ruby>悪<rt>わる</rt></ruby>い点を<ruby>評価<rt>ひょうか</rt></ruby>して自分の<ruby>意見<rt>いけん</rt></ruby>をまとめた<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"12年生が自分で車を運転して学校に通うことについて、その良い点と悪い点を評価して自分の意見をまとめた記事を書きなさい。"},{"id":39,"category":"Evaluative","textType":"Article","english":"Write a review of a newly opened local sports gym, evaluating its exercise equipment, membership pricing, and support systems for high school students.","japanese":"学校の近くに新しくできたスポーツジムの<ruby>機械<rt>きかい</rt></ruby>、<ruby>料金<rt>りょうきん</rt></ruby>プラン、高校生<ruby>向<rt>む</rt></ruby>けのサポートについてくわしく<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"学校の近くに新しくできたスポーツジムの機械、料金プラン、高校生向けのサポートについてくわしく評価する記事を書きなさい。"},{"id":40,"category":"Evaluative","textType":"Report","english":"Write a report analyzing the convenience and etiquette challenges of shared electric bicycles ('dockless e-bikes') becoming popular on city streets.","japanese":"<ruby>街<rt>まち</rt></ruby>中で<ruby>増<rt>ふ</rt></ruby>えている電動シェアサイクルの<ruby>便利<rt>べんり</rt></ruby>さと、マナーについての<ruby>問題<rt>もんだい</rt></ruby>点を<ruby>分析<rt>ぶんせき</rt></ruby>した<ruby>評価<rt>ひょうか</rt></ruby>レポートを書きなさい。","japanese_original":"街中で増えている電動シェアサイクルの便利さと、マナーについての問題点を分析した評価レポートを書きなさい。"},{"id":41,"category":"Evaluative","textType":"Article","english":"Write a review of a special exhibition at your local art museum, evaluating the quality of the exhibits, clarity of explanations, and overall atmosphere.","japanese":"<ruby>地元<rt>じもと</rt></ruby>の<ruby>美術館<rt>びじゅつかん</rt></ruby>の<ruby>特別<rt>とくべつ</rt></ruby><ruby>展<rt>てん</rt></ruby>について<ruby>評価<rt>ひょうか</rt></ruby>するレビューを書きなさい。","japanese_original":"地元の美術館の特別展について評価するレビューを書きなさい。"},{"id":42,"category":"Evaluative","textType":"Article","english":"Write a film review evaluating the messaging, direction, and educational impact of a recently trending environmental documentary.","japanese":"<ruby>最近<rt>さいきん</rt></ruby><ruby>増<rt>ふ</rt></ruby>えている<ruby>環境<rt>かんきょう</rt></ruby><ruby>保護<rt>ほご</rt></ruby>についてのドキュメンタリー<ruby>映画<rt>えいが</rt></ruby>のメッセージや、つくりかたについて<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>映画<rt>えいが</rt></ruby>のレビューを書きなさい。","japanese_original":"最近増えている環境保護についてのドキュメンタリー映画のメッセージや、つくりかたについて評価する映画のレビューを書きなさい。"},{"id":43,"category":"Evaluative","textType":"Article","english":"Write a review evaluating the support quality and reliability of a homestay agency from the perspective of a student who used it during study abroad.","japanese":"<ruby>留学<rt>りゅうがく</rt></ruby>のときに<ruby>利用<rt>りよう</rt></ruby>したホームステイの会社のサポートや<ruby>信頼<rt>しんらい</rt></ruby>できるかということについて、<ruby>実際<rt>じっさい</rt></ruby>に<ruby>利用<rt>りよう</rt></ruby>した学生の<ruby>目線<rt>めせん</rt></ruby>から<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"留学のときに利用したホームステイの会社のサポートや信頼できるかということについて、実際に利用した学生の目線から評価する記事を書きなさい。"},{"id":44,"category":"Evaluative","textType":"Report","english":"Write a report evaluating the accuracy and the degree of human-like communication shown by AI concierge robots newly introduced in a shopping mall.","japanese":"ショッピングモールに新しく入ったAIの<ruby>案内<rt>あんない</rt></ruby>ロボットの<ruby>正確<rt>せいかく</rt></ruby>さと、人間とのコミュニケーションの<ruby>度合<rt>どあ</rt></ruby>いについて<ruby>評価<rt>ひょうか</rt></ruby>するレポートを書きなさい。","japanese_original":"ショッピングモールに新しく入ったAIの案内ロボットの正確さと、人間とのコミュニケーションの度合いについて評価するレポートを書きなさい。"},{"id":45,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the updated facilities of a local public swimming pool and fitness center and how well they serve the local community.","japanese":"新しくなった<ruby>地元<rt>じもと</rt></ruby>の<ruby>市民<rt>しみん</rt></ruby>プールやフィットネスセンターの<ruby>設備<rt>せつび</rt></ruby>と、<ruby>地域<rt>ちいき</rt></ruby>の人たちへの<ruby>役立<rt>やくだ</rt></ruby>ち方について<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"新しくなった地元の市民プールやフィットネスセンターの設備と、地域の人たちへの役立ち方について評価する記事を書きなさい。"},{"id":46,"category":"Evaluative","textType":"Article","english":"Write a critical article on the growing spread of eco-friendly electric vehicles (EVs) and evaluate how convenient they are for everyday drivers.","japanese":"<ruby>街<rt>まち</rt></ruby>で見かけるようになった<ruby>環境<rt>かんきょう</rt></ruby>にやさしい電気自動車の広がりと、ふだん<ruby>運転<rt>うんてん</rt></ruby>する人にとっての<ruby>便利<rt>べんり</rt></ruby>さについて<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"街で見かけるようになった環境にやさしい電気自動車の広がりと、ふだん運転する人にとっての便利さについて評価する記事を書きなさい。"},{"id":47,"category":"Evaluative","textType":"Article","english":"Write a review evaluating the entertainment value and educational benefits of trending Japanese learning or cultural podcast programs from a listener's perspective.","japanese":"<ruby>最近<rt>さいきん</rt></ruby><ruby>話題<rt>わだい</rt></ruby>の日本語学習や<ruby>文化<rt>ぶんか</rt></ruby>を<ruby>紹介<rt>しょうかい</rt></ruby>するポッドキャスト<ruby>番組<rt>ばんぐみ</rt></ruby>の<ruby>面白<rt>おもしろ</rt></ruby>さと学ぶ<ruby>価値<rt>かち</rt></ruby>について、聞く人の<ruby>目線<rt>めせん</rt></ruby>からレビューしなさい。","japanese_original":"最近話題の日本語学習や文化を紹介するポッドキャスト番組の面白さと学ぶ価値について、聞く人の目線からレビューしなさい。"},{"id":48,"category":"Evaluative","textType":"Article","english":"Write a review evaluating the quality, service, and atmosphere of a newly opened Japanese restaurant called 'Haruya' based on your actual dining experience.","japanese":"<ruby>地元<rt>じもと</rt></ruby>に新しくできた日本食レストラン「はる屋」に行った<ruby>経験<rt>けいけん</rt></ruby>をもとに、<ruby>料理<rt>りょうり</rt></ruby>の<ruby>味<rt>あじ</rt></ruby>やサービスの<ruby>良<rt>よ</rt></ruby>い点と<ruby>直<rt>なお</rt></ruby>したほうがよい点をくわしく<ruby>評価<rt>ひょうか</rt></ruby>するレビューを書きなさい。","japanese_original":"地元に新しくできた日本食レストラン「はる屋」に行った経験をもとに、料理の味やサービスの良い点と直したほうがよい点をくわしく評価するレビューを書きなさい。"},{"id":49,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the advantages and disadvantages of obtaining a driver's license as a high school student in Australia.","japanese":"オーストラリアの高校生が<ruby>運転<rt>うんてん</rt></ruby><ruby>免許<rt>めんきょ</rt></ruby>を<ruby>取<rt>と</rt></ruby>ることの長所と<ruby>短所<rt>たんしょ</rt></ruby>を<ruby>評価<rt>ひょうか</rt></ruby>し、社会への<ruby>影響<rt>えいきょう</rt></ruby>を考える<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアの高校生が運転免許を取ることの長所と短所を評価し、社会への影響を考える記事を書きなさい。"},{"id":50,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the pros and cons of teenagers using smartphones and the internet in their daily lives and study habits.","japanese":"スマホやインターネットが今の高校生のふだんの生活や勉強にどのような<ruby>影響<rt>えいきょう</rt></ruby>をあたえているかについて<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"スマホやインターネットが今の高校生のふだんの生活や勉強にどのような影響をあたえているかについて評価する記事を書きなさい。"},{"id":51,"category":"Evaluative","textType":"Article","english":"Write a review evaluating the pros and cons of online shopping based on its booming popularity among consumers in Melbourne.","japanese":"ネット<ruby>通販<rt>つうはん</rt></ruby>が広がっていることが社会に<ruby>与<rt>あた</rt></ruby>える<ruby>影響<rt>えいきょう</rt></ruby>について、ネットショッピングの<ruby>良<rt>よ</rt></ruby>い点と<ruby>悪<rt>わる</rt></ruby>い点をいろいろな<ruby>角度<rt>かくど</rt></ruby>から<ruby>分析<rt>ぶんせき</rt></ruby>して<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"ネット通販が広がっていることが社会に与える影響について、ネットショッピングの良い点と悪い点をいろいろな角度から分析して評価する記事を書きなさい。"},{"id":52,"category":"Evaluative","textType":"Report","english":"Write a report evaluating the service quality, comfort, and pros and cons of taking the inaugural flight of a new Japanese airline from Melbourne to Tokyo.","japanese":"新しい日本の<ruby>航空<rt>こうくう</rt></ruby>会社の<ruby>最初<rt>さいしょ</rt></ruby>の<ruby>便<rt>びん</rt></ruby>でメルボルンから東京へ<ruby>飛<rt>と</rt></ruby>んだときの、サービスのよさや<ruby>快適<rt>かいてき</rt></ruby>さ、<ruby>良<rt>よ</rt></ruby>い点と<ruby>悪<rt>わる</rt></ruby>い点を<ruby>評価<rt>ひょうか</rt></ruby>するレポートを書きなさい。","japanese_original":"新しい日本の航空会社の最初の便でメルボルンから東京へ飛んだときの、サービスのよさや快適さ、良い点と悪い点を評価するレポートを書きなさい。"},{"id":53,"category":"Evaluative","textType":"Article","english":"Write an evaluative article discussing whether high-tech machines like computers and home appliances have truly made human life happier.","japanese":"コンピュータや家電などのハイテクな<ruby>機械<rt>きかい</rt></ruby>は<ruby>本当<rt>ほんとう</rt></ruby>に人間の生活を<ruby>幸<rt>しあわ</rt></ruby>せにしたかというテーマについて、メリットとデメリットから<ruby>冷静<rt>れいせい</rt></ruby>に<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"コンピュータや家電などのハイテクな機械は本当に人間の生活を幸せにしたかというテーマについて、メリットとデメリットから冷静に評価する記事を書きなさい。"},{"id":54,"category":"Evaluative","textType":"Article","english":"Write an article evaluating the impact of part-time jobs on high school students' academic performance and time management skills.","japanese":"アルバイトが高校生の勉強や時間の<ruby>管理<rt>かんり</rt></ruby>にどのような<ruby>影響<rt>えいきょう</rt></ruby>をあたえているかについて、<ruby>良<rt>よ</rt></ruby>い<ruby>面<rt>めん</rt></ruby>と<ruby>悪<rt>わる</rt></ruby>い<ruby>面<rt>めん</rt></ruby>を<ruby>評価<rt>ひょうか</rt></ruby>する<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"アルバイトが高校生の勉強や時間の管理にどのような影響をあたえているかについて、良い面と悪い面を評価する記事を書きなさい。"},{"id":55,"category":"Evaluative","textType":"Report","english":"Write a report evaluating the pros and cons of introducing a four-day school week for senior high school students.","japanese":"高校の<ruby>上級生<rt>じょうきゅうせい</rt></ruby>を<ruby>対象<rt>たいしょう</rt></ruby>に週4日<ruby>登校<rt>とうこう</rt></ruby>の<ruby>制度<rt>せいど</rt></ruby>を<ruby>導入<rt>どうにゅう</rt></ruby>することのメリットとデメリットについて<ruby>評価<rt>ひょうか</rt></ruby>するレポートを書きなさい。","japanese_original":"高校の上級生を対象に週4日登校の制度を導入することのメリットとデメリットについて評価するレポートを書きなさい。"},{"id":56,"category":"Persuasive","textType":"Speech","english":"Write a persuasive speech script in Japanese addressed to the school council members and the principal, arguing why the school should completely eliminate single-use plastics and urging everyone to adopt eco-friendly habits like bringing reusable bags and bottles.","japanese":"学校の<ruby>代表<rt>だいひょう</rt></ruby>や校長先生の前で、<ruby>使い捨<rt>つかいす</rt></ruby>てのプラスチックをすべてなくすべきだと<ruby>訴<rt>うった</rt></ruby>え、エコバッグや<ruby>水筒<rt>すいとう</rt></ruby>を持ってくることを強くすすめるスピーチの<ruby>原稿<rt>げんこう</rt></ruby>を書きなさい。","japanese_original":"学校の代表や校長先生の前で、使い捨てのプラスチックをすべてなくすべきだと訴え、エコバッグや水筒を持ってくることを強くすすめるスピーチの原稿を書きなさい。"},{"id":57,"category":"Persuasive","textType":"Essay","english":"Write a persuasive essay in Japanese for your Japanese teacher, discussing the serious negative impacts of sleep deprivation on high school students physical/mental health and learning efficiency, and arguing for the urgent need to improve sleep habits.","japanese":"高校生の<ruby>睡眠<rt>すいみん</rt></ruby><ruby>不足<rt>ふそく</rt></ruby>が<ruby>心<rt>こころ</rt></ruby>や体の<ruby>健康<rt>けんこう</rt></ruby>、勉強の<ruby>効率<rt>こうりつ</rt></ruby>に<ruby>与<rt>あた</rt></ruby>える<ruby>深刻<rt>しんこく</rt></ruby>な<ruby>悪影響<rt>あくえいきょう</rt></ruby>について書き、生活<ruby>習慣<rt>しゅうかん</rt></ruby>をすぐによくすることがいかに<ruby>大切<rt>たいせつ</rt></ruby>かについて自分の<ruby>主張<rt>しゅちょう</rt></ruby>をまとめた作文を書きなさい。","japanese_original":"高校生の睡眠不足が心や体の健康、勉強の効率に与える深刻な悪影響について書き、生活習慣をすぐによくすることがいかに大切かについて自分の主張をまとめた作文を書きなさい。"},{"id":58,"category":"Persuasive","textType":"Letter","english":"Write a letter to a close friend who is hesitant to join the school's 'Digital Detox Week,' persuading them of the benefits of participating and encouraging them to join.","japanese":"学校のデジタルデトックス週間に<ruby>参加<rt>さんか</rt></ruby>するか<ruby>迷<rt>まよ</rt></ruby>っている<ruby>友達<rt>ともだち</rt></ruby>に、<ruby>参加<rt>さんか</rt></ruby>するメリットを<ruby>伝<rt>つた</rt></ruby>えていっしょに<ruby>参加<rt>さんか</rt></ruby>しようと強くすすめる手紙を書きなさい。","japanese_original":"学校のデジタルデトックス週間に参加するか迷っている友達に、参加するメリットを伝えていっしょに参加しようと強くすすめる手紙を書きなさい。"},{"id":59,"category":"Persuasive","textType":"Email","english":"Write an email to apply to be a buddy for an exchange student coming from your sister school in Japan, explaining your hospitality and suitability for the role.","japanese":"日本の姉妹校から来る<ruby>留学生<rt>りゅうがくせい</rt></ruby>の<ruby>お世話<rt>おせわ</rt></ruby><ruby>係<rt>がかり</rt></ruby>に<ruby>立候補<rt>りっこうほ</rt></ruby>するため、自分がその<ruby>役割<rt>やくわり</rt></ruby>に<ruby>向<rt>む</rt></ruby>いている<ruby>理由<rt>りゆう</rt></ruby>をアピールするメールを書きなさい。","japanese_original":"日本の姉妹校から来る留学生のお世話係に立候補するため、自分がその役割に向いている理由をアピールするメールを書きなさい。"},{"id":60,"category":"Persuasive","textType":"Speech","english":"Deliver a speech to the school assembly arguing that teenage participation in volunteer work is essential for future career development.","japanese":"<ruby>若<rt>わか</rt></ruby>い人がボランティア活動に<ruby>参加<rt>さんか</rt></ruby>することは<ruby>将来<rt>しょうらい</rt></ruby>の仕事のためにとても<ruby>大切<rt>たいせつ</rt></ruby>であるというテーマでスピーチを書きなさい。","japanese_original":"若い人がボランティア活動に参加することは将来の仕事のためにとても大切であるというテーマでスピーチを書きなさい。"},{"id":61,"category":"Persuasive","textType":"Email","english":"Write an email to a friend who replied that they are 'too busy to join' a local volunteer cleanup, persuading them that even a short participation is worthwhile.","japanese":"<ruby>地元<rt>じもと</rt></ruby>のボランティアの<ruby>掃除<rt>そうじ</rt></ruby>に<ruby>誘<rt>さそ</rt></ruby>ったところ<ruby>忙<rt>いそが</rt></ruby>しいから<ruby>断<rt>ことわ</rt></ruby>りたいと<ruby>返事<rt>へんじ</rt></ruby>をした<ruby>友達<rt>ともだち</rt></ruby>に、少しの時間だけでも<ruby>参加<rt>さんか</rt></ruby>する<ruby>価値<rt>かち</rt></ruby>があることを<ruby>伝<rt>つた</rt></ruby>えるメールを書きなさい。","japanese_original":"地元のボランティアの掃除に誘ったところ忙しいから断りたいと返事をした友達に、少しの時間だけでも参加する価値があることを伝えるメールを書きなさい。"},{"id":62,"category":"Persuasive","textType":"Letter","english":"Write a letter to a local community leader proposing the setup of a Japanese cultural food stall at the upcoming international food festival.","japanese":"<ruby>地域<rt>ちいき</rt></ruby>でひらかれるお<ruby>祭<rt>まつ</rt></ruby>りで日本<ruby>文化<rt>ぶんか</rt></ruby>の食べ物のブースを出そうと<ruby>地域<rt>ちいき</rt></ruby>の人に<ruby>お願<rt>おねが</rt></ruby>いする手紙を書きなさい。","japanese_original":"地域でひらかれるお祭りで日本文化の食べ物のブースを出そうと地域の人にお願いする手紙を書きなさい。"},{"id":63,"category":"Persuasive","textType":"Letter","english":"Write a letter to your school librarian politely and persuasively requesting them to introduce more Japanese novels and magazines to the library.","japanese":"学校の<ruby>図書館<rt>としょかん</rt></ruby>に日本語の<ruby>小説<rt>しょうせつ</rt></ruby>や<ruby>雑誌<rt>ざっし</rt></ruby>をもっと<ruby>置<rt>お</rt></ruby>いてほしいと、<ruby>図書館<rt>としょかん</rt></ruby>の先生に<ruby>熱心<rt>ねっしん</rt></ruby>に<ruby>お願<rt>おねが</rt></ruby>いする手紙を書きなさい。","japanese_original":"学校の図書館に日本語の小説や雑誌をもっと置いてほしいと、図書館の先生に熱心にお願いする手紙を書きなさい。"},{"id":64,"category":"Persuasive","textType":"Letter","english":"Write a letter to local shop owners calling for their cooperation in an eco-project aimed at reducing plastic waste in your local neighborhood.","japanese":"<ruby>地域<rt>ちいき</rt></ruby>の店の人たちにプラスチックのゴミをへらすエコのプロジェクトに<ruby>協力<rt>きょうりょく</rt></ruby>してもらうよう<ruby>呼<rt>よ</rt></ruby>びかける手紙を書きなさい。","japanese_original":"地域の店の人たちにプラスチックのゴミをへらすエコのプロジェクトに協力してもらうよう呼びかける手紙を書きなさい。"},{"id":65,"category":"Persuasive","textType":"Speech","english":"Deliver a speech as a student representative to the entire school calling for cooperation on a school-wide food waste reduction plan.","japanese":"学校<ruby>全体<rt>ぜんたい</rt></ruby>で<ruby>取り組<rt>とりく</rt></ruby>む食べ物のムダをなくす<ruby>計画<rt>けいかく</rt></ruby>について、<ruby>生徒<rt>せいと</rt></ruby>の<ruby>代表<rt>だいひょう</rt></ruby>として<ruby>全校<rt>ぜんこう</rt></ruby><ruby>生徒<rt>せいと</rt></ruby>に<ruby>協力<rt>きょうりょく</rt></ruby>を<ruby>呼<rt>よ</rt></ruby>びかけるスピーチを書きなさい。","japanese_original":"学校全体で取り組む食べ物のムダをなくす計画について、生徒の代表として全校生徒に協力を呼びかけるスピーチを書きなさい。"},{"id":66,"category":"Persuasive","textType":"Article","english":"Write an article discussing the importance of incorporating Indigenous Australian (Aboriginal) culture and art into the school education system.","japanese":"オーストラリアの<ruby>先住民<rt>せんじゅうみん</rt></ruby>族の<ruby>文化<rt>ぶんか</rt></ruby>やアートを学校の<ruby>教育<rt>きょういく</rt></ruby>に<ruby>取り入<rt>とりい</rt></ruby>れることがなぜ<ruby>大切<rt>たいせつ</rt></ruby>かについて書く<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"オーストラリアの先住民族の文化やアートを学校の教育に取り入れることがなぜ大切かについて書く記事を書きなさい。"},{"id":67,"category":"Persuasive","textType":"Speech","english":"Deliver a speech at a Japanese speech contest arguing that learning a foreign language holds a value far beyond a mere communication tool.","japanese":"外国語を学ぶことはただのコミュニケーションの<ruby>道具<rt>どうぐ</rt></ruby><ruby>以上<rt>いじょう</rt></ruby>の<ruby>価値<rt>かち</rt></ruby>があるというテーマで日本語を勉強する<ruby>意味<rt>いみ</rt></ruby>を<ruby>熱<rt>あつ</rt></ruby>く話すスピーチを書きなさい。","japanese_original":"外国語を学ぶことはただのコミュニケーションの道具以上の価値があるというテーマで日本語を勉強する意味を熱く話すスピーチを書きなさい。"},{"id":68,"category":"Persuasive","textType":"Letter","english":"Write a letter to the local council arguing for the creation of more bicycle lanes to ensure safer commuting for students.","japanese":"<ruby>生徒<rt>せいと</rt></ruby>が<ruby>安全<rt>あんぜん</rt></ruby>に<ruby>通学<rt>つうがく</rt></ruby>できるように<ruby>自転車<rt>じてんしゃ</rt></ruby><ruby>専用<rt>せんよう</rt></ruby>の道をもっと<ruby>増<rt>ふ</rt></ruby>やすよう、<ruby>市役所<rt>しやくしょ</rt></ruby>に強く<ruby>お願<rt>おねが</rt></ruby>いする手紙を書きなさい。","japanese_original":"生徒が安全に通学できるように自転車専用の道をもっと増やすよう、市役所に強くお願いする手紙を書きなさい。"},{"id":69,"category":"Persuasive","textType":"Speech","english":"Deliver a speech arguing that high schools should incorporate practical financial literacy classes into their curriculum.","japanese":"高校で<ruby>実用<rt>じつよう</rt></ruby><ruby>的<rt>てき</rt></ruby>なお金の<ruby>管理<rt>かんり</rt></ruby>についての<ruby>授業<rt>じゅぎょう</rt></ruby>を<ruby>必修<rt>ひっしゅう</rt></ruby><ruby>科目<rt>かもく</rt></ruby>にすべきだと<ruby>訴<rt>うった</rt></ruby>えるスピーチを書きなさい。","japanese_original":"高校で実用的なお金の管理についての授業を必修科目にすべきだと訴えるスピーチを書きなさい。"},{"id":70,"category":"Persuasive","textType":"Article","english":"Write an article persuading readers that regular physical exercise is essential not only for physical health but also for mental wellbeing.","japanese":"毎日の<ruby>適度<rt>てきど</rt></ruby>な<ruby>運動<rt>うんどう</rt></ruby>が体の<ruby>健康<rt>けんこう</rt></ruby>だけでなく<ruby>心<rt>こころ</rt></ruby>の<ruby>健康<rt>けんこう</rt></ruby>にとってもいかに<ruby>大切<rt>たいせつ</rt></ruby>かを<ruby>読者<rt>どくしゃ</rt></ruby>に強く<ruby>訴<rt>うった</rt></ruby>える<ruby>記事<rt>きじ</rt></ruby>を書きなさい。","japanese_original":"毎日の適度な運動が体の健康だけでなく心の健康にとってもいかに大切かを読者に強く訴える記事を書きなさい。"},{"id":71,"category":"Persuasive","textType":"Email","english":"Write an email to persuade the school principal to approve a student-led fundraising event for environmental protection.","japanese":"<ruby>環境<rt>かんきょう</rt></ruby><ruby>保護<rt>ほご</rt></ruby>のための<ruby>募金<rt>ぼきん</rt></ruby>活動を学校で行う<ruby>許可<rt>きょか</rt></ruby>を校長先生にもらうため、<ruby>熱意<rt>ねつい</rt></ruby>を<ruby>伝<rt>つた</rt></ruby>えて<ruby>納得<rt>なっとく</rt></ruby>してもらうメールを書きなさい。","japanese_original":"環境保護のための募金活動を学校で行う許可を校長先生にもらうため、熱意を伝えて納得してもらうメールを書きなさい。"},{"id":72,"category":"Personal","textType":"Letter","english":"Write a personal letter in Japanese to your host family in Japan after returning to Australia, updating them on your life and expressing your gratitude for their support and the things you learned during your stay.","japanese":"オーストラリアの自分の家に<ruby>戻<rt>もど</rt></ruby>ったあと日本で<ruby>お世話<rt>おせわ</rt></ruby>になったホストファミリーに<ruby>最近<rt>さいきん</rt></ruby>の<ruby>様子<rt>ようす</rt></ruby>と<ruby>感謝<rt>かんしゃ</rt></ruby>の気持ちを<ruby>伝<rt>つた</rt></ruby>える手紙を書きなさい。","japanese_original":"オーストラリアの自分の家に戻ったあと日本でお世話になったホストファミリーに最近の様子と感謝の気持ちを伝える手紙を書きなさい。"},{"id":73,"category":"Personal","textType":"Journal","english":"Write a journal entry in Japanese reflecting on your experiences, challenges, and personal growth since you started volunteering to teach Japanese to local children last month.","japanese":"先月から近所の子どもたちに日本語を教えるボランティアを始めてから<ruby>感<rt>かん</rt></ruby>じた<ruby>大変<rt>たいへん</rt></ruby>なことや自分の<ruby>成長<rt>せいちょう</rt></ruby>について<ruby>振り返<rt>ふりかえ</rt></ruby>る<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"先月から近所の子どもたちに日本語を教えるボランティアを始めてから感じた大変なことや自分の成長について振り返る日記を書きなさい。"},{"id":74,"category":"Personal","textType":"Letter","english":"Write a letter to your host family expressing your gratitude for their birthday and describing the experience of cooking a traditional dish for them.","japanese":"ホストファミリーの<ruby>誕生<rt>たんじょう</rt></ruby>日に手作りの<ruby>料理<rt>りょうり</rt></ruby>をごちそうしたときのエピソードと家族への<ruby>感謝<rt>かんしゃ</rt></ruby>の気持ちを書いた手紙を書きなさい。","japanese_original":"ホストファミリーの誕生日に手作りの料理をごちそうしたときのエピソードと家族への感謝の気持ちを書いた手紙を書きなさい。"},{"id":75,"category":"Personal","textType":"Letter","english":"Write a letter to your parents in Japan, reflecting on the challenges and growth you have experienced halfway through your study abroad program.","japanese":"<ruby>留学<rt>りゅうがく</rt></ruby>生活のちょうど<ruby>真ん中<rt>まんなか</rt></ruby>の<ruby>時期<rt>じき</rt></ruby>をむかえこれまでの<ruby>苦労<rt>くろう</rt></ruby>と<ruby>成長<rt>せいちょう</rt></ruby>を<ruby>振り返<rt>ふりかえ</rt></ruby>りながら日本の<ruby>両親<rt>りょうしん</rt></ruby>に<ruby>最近<rt>さいきん</rt></ruby>の<ruby>様子<rt>ようす</rt></ruby>を<ruby>伝<rt>つた</rt></ruby>える手紙を書きなさい。","japanese_original":"留学生活のちょうど真ん中の時期をむかえこれまでの苦労と成長を振り返りながら日本の両親に最近の様子を伝える手紙を書きなさい。"},{"id":76,"category":"Personal","textType":"Essay","english":"Write an essay about the most difficult challenge you have faced in your life and how you overcame it with the help of those around you.","japanese":"これまでの人生で一番<ruby>大変<rt>たいへん</rt></ruby>だったことに<ruby>立ち向<rt>たちむ</rt></ruby>かいまわりの人たちの<ruby>助<rt>たす</rt></ruby>けを<ruby>借<rt>か</rt></ruby>りながら乗りこえた<ruby>経験<rt>けいけん</rt></ruby>についての作文を書きなさい。","japanese_original":"これまでの人生で一番大変だったことに立ち向かいまわりの人たちの助けを借りながら乗りこえた経験についての作文を書きなさい。"},{"id":77,"category":"Personal","textType":"Journal","english":"Write a journal entry on the first night after finishing your work experience placement, expressing both the harshness of the job and your sense of achievement.","japanese":"<ruby>職場<rt>しょくば</rt></ruby>の<ruby>体験<rt>たいけん</rt></ruby>を終えた<ruby>最初<rt>さいしょ</rt></ruby>の夜仕事の<ruby>大変<rt>たいへん</rt></ruby>さと<ruby>やり遂<rt>やりと</rt></ruby>げたという気持ちを<ruby>素直<rt>すなお</rt></ruby>に書いた<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"職場の体験を終えた最初の夜仕事の大変さとやり遂げたという気持ちを素直に書いた日記を書きなさい。"},{"id":78,"category":"Personal","textType":"Essay","english":"Write an essay about a special person who has had the greatest impact on your life, detailing specific memories you share with them.","japanese":"自分の人生に一番大きな<ruby>影響<rt>えいきょう</rt></ruby>を<ruby>与<rt>あた</rt></ruby>えてくれた<ruby>特別<rt>とくべつ</rt></ruby>な人との思い出やその人から学んだことについての作文を書きなさい。","japanese_original":"自分の人生に一番大きな影響を与えてくれた特別な人との思い出やその人から学んだことについての作文を書きなさい。"},{"id":79,"category":"Personal","textType":"Journal","english":"Write a New Year's Eve journal entry reflecting on the goals you set at the beginning of the year, your current progress, and the lessons you have learned.","japanese":"年の<ruby>初<rt>はじ</rt></ruby>めにたてた<ruby>目標<rt>もくひょう</rt></ruby>がどうなっているかこれまでの<ruby>失敗<rt>しっぱい</rt></ruby>や学びを<ruby>振り返<rt>ふりかえ</rt></ruby>る<ruby>大晦日<rt>おおみそか</rt></ruby>の<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"年の初めにたてた目標がどうなっているかこれまでの失敗や学びを振り返る大晦日の日記を書きなさい。"},{"id":80,"category":"Personal","textType":"Journal","english":"Write a journal entry expressing your mixed feelings and anxiety as you approach the end of your high school life and face important career decisions.","japanese":"高校生活の終わりが近づき<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>進路<rt>しんろ</rt></ruby>を<ruby>決<rt>き</rt></ruby>めることへの<ruby>不安<rt>ふあん</rt></ruby>やいろいろな気持ちを書いた<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"高校生活の終わりが近づき将来の進路を決めることへの不安やいろいろな気持ちを書いた日記を書きなさい。"},{"id":81,"category":"Personal","textType":"Letter","english":"Write a letter to your teacher in Japan sharing your online participation experience in a Japanese university open campus and your strong desire to study in Japan in the future.","japanese":"日本の大学のオープンキャンパスにオンラインで<ruby>参加<rt>さんか</rt></ruby>した<ruby>感想<rt>かんそう</rt></ruby>と<ruby>将来<rt>しょうらい</rt></ruby>日本で勉強したいという強い気持ちを日本の先生に<ruby>伝<rt>つた</rt></ruby>える手紙を書きなさい。","japanese_original":"日本の大学のオープンキャンパスにオンラインで参加した感想と将来日本で勉強したいという強い気持ちを日本の先生に伝える手紙を書きなさい。"},{"id":82,"category":"Personal","textType":"Letter","english":"Write a letter of gratitude to your host mother who kindly looked after you when you fell ill during your study abroad, describing how you are feeling now.","japanese":"<ruby>留学<rt>りゅうがく</rt></ruby>中に病気になったときにていねいに<ruby>看病<rt>かんびょう</rt></ruby>してくれたホストマザーに<ruby>感謝<rt>かんしゃ</rt></ruby>の気持ちと今の元気な<ruby>様子<rt>ようす</rt></ruby>を<ruby>伝<rt>つた</rt></ruby>える手紙を書きなさい。","japanese_original":"留学中に病気になったときにていねいに看病してくれたホストマザーに感謝の気持ちと今の元気な様子を伝える手紙を書きなさい。"},{"id":83,"category":"Personal","textType":"Email","english":"Write an email to your workplace manager asking to adjust your shifts so that you can focus more on your studies as a part-time worker.","japanese":"アルバイトをしている<ruby>職場<rt>しょくば</rt></ruby>の店長に勉強に<ruby>集中<rt>しゅうちゅう</rt></ruby>するためにシフトを<ruby>変<rt>か</rt></ruby>えてほしいと<ruby>お願<rt>おねが</rt></ruby>いするメールを書きなさい。","japanese_original":"アルバイトをしている職場の店長に勉強に集中するためにシフトを変えてほしいとお願いするメールを書きなさい。"},{"id":84,"category":"Personal","textType":"Letter","english":"Write a letter to your family and friends expressing gratitude for their support and sharing your future aspirations after winning a prize in a Japanese speech contest.","japanese":"日本語のスピーチ大会で<ruby>入賞<rt>にゅうしょう</rt></ruby>した自分を<ruby>応援<rt>おうえん</rt></ruby>してくれた家族や<ruby>友達<rt>ともだち</rt></ruby>に<ruby>感謝<rt>かんしゃ</rt></ruby>とこれからの<ruby>目標<rt>もくひょう</rt></ruby>を<ruby>伝<rt>つた</rt></ruby>える手紙を書きなさい。","japanese_original":"日本語のスピーチ大会で入賞した自分を応援してくれた家族や友達に感謝とこれからの目標を伝える手紙を書きなさい。"},{"id":85,"category":"Personal","textType":"Email","english":"Write an email to a close friend in Japan who is far away, offering warm and practical advice and encouraging words in response to their worries.","japanese":"<ruby>遠<rt>とお</rt></ruby>くにいる日本の<ruby>友達<rt>ともだち</rt></ruby>から<ruby>届<rt>とど</rt></ruby>いた<ruby>悩<rt>なや</rt></ruby>みの<ruby>相談<rt>そうだん</rt></ruby><ruby>に対<rt>にたい</rt></ruby>してあたたかいアドバイスと<ruby>励<rt>はげ</rt></ruby>ましの<ruby>言葉<rt>ことば</rt></ruby>を<ruby>送<rt>おく</rt></ruby>るメールを書きなさい。","japanese_original":"遠くにいる日本の友達から届いた悩みの相談に対してあたたかいアドバイスと励ましの言葉を送るメールを書きなさい。"},{"id":86,"category":"Personal","textType":"Email","english":"Write an email to a friend you met through a Japanese cultural exchange program, proposing that you continue your communication in Japanese.","japanese":"日本の<ruby>文化<rt>ぶんか</rt></ruby>を<ruby>体験<rt>たいけん</rt></ruby>するプログラムで<ruby>知り合<rt>しりあ</rt></ruby>った<ruby>友達<rt>ともだち</rt></ruby>にこれからも日本語で<ruby>連絡<rt>れんらく</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>けようと<ruby>提案<rt>ていあん</rt></ruby>するメールを書きなさい。","japanese_original":"日本の文化を体験するプログラムで知り合った友達にこれからも日本語で連絡を続けようと提案するメールを書きなさい。"},{"id":87,"category":"Personal","textType":"Letter","english":"Write a letter to your grandparents sharing the joy of winning a prize in a photography contest, which is one of your favorite hobbies.","japanese":"自分の<ruby>趣味<rt>しゅみ</rt></ruby>である<ruby>写真<rt>しゃしん</rt></ruby>のコンテストで<ruby>賞<rt>しょう</rt></ruby>をもらった<ruby>喜<rt>よろこ</rt></ruby>びをいつも<ruby>応援<rt>おうえん</rt></ruby>してくれているおじいさんとおばあちゃんに<ruby>伝<rt>つた</rt></ruby>える手紙を書きなさい。","japanese_original":"自分の趣味である写真のコンテストで賞をもらった喜びをいつも応援してくれているおじいさんとおばあちゃんに伝える手紙を書きなさい。"},{"id":88,"category":"Personal","textType":"Journal","english":"Write a journal entry recording the mental stress and pressure you felt during the VCE exam period, and how you encouraged yourself.","japanese":"テストの<ruby>時期<rt>じき</rt></ruby>に<ruby>感<rt>かん</rt></ruby>じたプレッシャーとそれに<ruby>負<rt>ま</rt></ruby>けないように自分で自分を<ruby>励<rt>はげ</rt></ruby>ましたときの気持ちを<ruby>記録<rt>きろく</rt></ruby>した<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"テストの時期に感じたプレッシャーとそれに負けないように自分で自分を励ましたときの気持ちを記録した日記を書きなさい。"},{"id":89,"category":"Personal","textType":"Essay","english":"Write an essay reflecting on the emotional changes you experienced by looking at photographs from a family trip you took during your childhood.","japanese":"<ruby>子供<rt>こども</rt></ruby>のころに行った家族旅行の<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>見返<rt>みかえ</rt></ruby>してそのころと今の気持ちの<ruby>変化<rt>へんか</rt></ruby>について<ruby>振り返<rt>ふりかえ</rt></ruby>る作文を書きなさい。","japanese_original":"子供のころに行った家族旅行の写真を見返してそのころと今の気持ちの変化について振り返る作文を書きなさい。"},{"id":90,"category":"Personal","textType":"Essay","english":"Write an essay about a club activity you have dedicated yourself to for years, reflecting on the hard work, sense of achievement, and impact it had on you.","japanese":"長いあいだ<ruby>一生懸命<rt>いっしょうけんめい</rt></ruby>つづけてきたクラブ活動を<ruby>引退<rt>いんたい</rt></ruby>する日にこれまでの<ruby>努力<rt>どりょく</rt></ruby>と<ruby>仲間<rt>なかま</rt></ruby>への<ruby>感謝<rt>かんしゃ</rt></ruby>の気持ちを書いた作文を書きなさい。","japanese_original":"長いあいだ一生懸命つづけてきたクラブ活動を引退する日にこれまでの努力と仲間への感謝の気持ちを書いた作文を書きなさい。"},{"id":91,"category":"Personal","textType":"Account","english":"Write a personal account detailing a major cultural misunderstanding you faced during a homestay in Japan and the emotional conflict you overcame.","japanese":"日本でのホームステイのとき<ruby>文化<rt>ぶんか</rt></ruby>の<ruby>違<rt>ちが</rt></ruby>いから大きな<ruby>誤解<rt>ごかい</rt></ruby>をしてしまいそれを乗りこえるまでに自分が<ruby>感<rt>かん</rt></ruby>じたことについての<ruby>体験<rt>たいけん</rt></ruby><ruby>談<rt>だん</rt></ruby>を書きなさい。","japanese_original":"日本でのホームステイのとき文化の違いから大きな誤解をしてしまいそれを乗りこえるまでに自分が感じたことについての体験談を書きなさい。"},{"id":92,"category":"Personal","textType":"Journal","english":"Write a reflective journal entry in a quiet school library, deeply contemplating your future dreams and how you want to live your life.","japanese":"<ruby>放課後<rt>ほうかご</rt></ruby>の<ruby>静<rt>しず</rt></ruby>かな<ruby>図書館<rt>としょかん</rt></ruby>で<ruby>将来<rt>しょうらい</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>や自分の生き方について<ruby>深<rt>ふか</rt></ruby>く考えたときの気持ちを書いた<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"放課後の静かな図書館で将来の夢や自分の生き方について深く考えたときの気持ちを書いた日記を書きなさい。"},{"id":93,"category":"Personal","textType":"Essay","english":"Write an essay about a time you experienced the truth behind the saying 'failure is stepping stone to success,' detailing how you recovered from a big mistake.","japanese":"<ruby>失敗<rt>しっぱい</rt></ruby>は<ruby>成功<rt>せいこう</rt></ruby>のもとという<ruby>言葉<rt>ことば</rt></ruby>を<ruby>本当<rt>ほんとう</rt></ruby>にそうだと思った<ruby>昔<rt>むかし</rt></ruby>の大きな<ruby>失敗<rt>しっぱい</rt></ruby>とそこから<ruby>立ち直<rt>たちなお</rt></ruby>った<ruby>経験<rt>けいけん</rt></ruby>についての作文を書きなさい。","japanese_original":"失敗は成功のもとという言葉を本当にそうだと思った昔の大きな失敗とそこから立ち直った経験についての作文を書きなさい。"},{"id":94,"category":"Personal","textType":"Journal","english":"Write a journal entry capturing the feelings of loneliness and excitement you experienced while waiting in an airport lobby for your first solo trip abroad.","japanese":"<ruby>初<rt>はじ</rt></ruby>めてひとりで海外旅行に出発するため<ruby>空港<rt>くうこう</rt></ruby>のロビーで待っているときに<ruby>感<rt>かん</rt></ruby>じた<ruby>寂<rt>さび</rt></ruby>しさとワクワクした気持ちを書いた<ruby>日記<rt>にっき</rt></ruby>を書きなさい。","japanese_original":"初めてひとりで海外旅行に出発するため空港のロビーで待っているときに感じた寂しさとワクワクした気持ちを書いた日記を書きなさい。"},{"id":95,"category":"Personal","textType":"Essay","english":"Write a reflective essay about the scenery of summer vacations spent at your grandparents' house and the timeless teachings that still stay with you.","japanese":"<ruby>祖父母<rt>そふぼ</rt></ruby>の家で<ruby>過<rt>す</rt></ruby>ごした<ruby>昔<rt>むかし</rt></ruby>の夏休みの思い出と今でも自分の中にある<ruby>大切<rt>たいせつ</rt></ruby>な教えについて<ruby>振り返<rt>ふりかえ</rt></ruby>る作文を書きなさい。","japanese_original":"祖父母の家で過ごした昔の夏休みの思い出と今でも自分の中にある大切な教えについて振り返る作文を書きなさい。"},{"id":96,"category":"Personal","textType":"Essay","english":"Write an essay about taking on a major responsibility in a school project and experiencing personal growth through battling the immense pressure.","japanese":"学校のプロジェクトで大きな仕事をまかされプレッシャーと<ruby>戦<rt>たたか</rt></ruby>いながら<ruby>やり遂<rt>やりと</rt></ruby>げたことで自分が<ruby>成長<rt>せいちょう</rt></ruby>した<ruby>経験<rt>けいけん</rt></ruby>についての作文を書きなさい。","japanese_original":"学校のプロジェクトで大きな仕事をまかされプレッシャーと戦いながらやり遂げたことで自分が成長した経験についての作文を書きなさい。"},{"id":97,"category":"Imaginative","textType":"Story","english":"Write an imaginative story in Japanese for a short story writing contest aimed at young readers, beginning with finding an unfamiliar ticket in the gap of an old bookshelf in a library and boarding a train to an unexpected world.","japanese":"<ruby>図書館<rt>としょかん</rt></ruby>の古い<ruby>本棚<rt>ほんだな</rt></ruby>のすきまから見たこともない<ruby>切符<rt>きっぷ</rt></ruby>を見つけて、その電車に乗ったことで思いがけない<ruby>世界<rt>せかい</rt></ruby>に行ってしまったという<ruby>若<rt>わか</rt></ruby>い人<ruby>向<rt>む</rt></ruby>けの物語を書きなさい。","japanese_original":"図書館の古い本棚のすきまから見たこともない切符を見つけて、その電車に乗ったことで思いがけない世界に行ってしまったという若い人向けの物語を書きなさい。"},{"id":98,"category":"Imaginative","textType":"Story","english":"Write an imaginative story in Japanese for a youth magazine, centered around meditating on a garden stone in an old temple in Kyoto, which suddenly causes you to time-slip and encounter people from the Heian period.","japanese":"京都の古いお寺の<ruby>庭<rt>にわ</rt></ruby>の<ruby>石<rt>いし</rt></ruby>に<ruby>座<rt>すわ</rt></ruby>って目を<ruby>閉<rt>と</rt></ruby>じていたら<ruby>突然<rt>とつぜん</rt></ruby>タイムスリップして<ruby>平安<rt>へいあん</rt></ruby><ruby>時代<rt>じだい</rt></ruby>の人たちに出会ったという<ruby>不思議<rt>ふしぎ</rt></ruby>な<ruby>体験<rt>たいけん</rt></ruby>についての物語を<ruby>若<rt>わか</rt></ruby>い人<ruby>向<rt>む</rt></ruby>けに書きなさい。","japanese_original":"京都の古いお寺の庭の石に座って目を閉じていたら突然タイムスリップして平安時代の人たちに出会ったという不思議な体験についての物語を若い人向けに書きなさい。"},{"id":99,"category":"Imaginative","textType":"Story","english":"Write a children's story about a little koala that gets lost in the Australian bush and uses its wits to find its way back home to its family.","japanese":"オーストラリアの<ruby>森<rt>もり</rt></ruby>の中で<ruby>迷子<rt>まいご</rt></ruby>になってしまった小さなコアラが<ruby>知恵<rt>ちえ</rt></ruby>を働かせて家族のところへ帰る<ruby>子供<rt>こども</rt></ruby><ruby>向<rt>む</rt></ruby>けの物語を書きなさい。","japanese_original":"オーストラリアの森の中で迷子になってしまった小さなコアラが知恵を働かせて家族のところへ帰る子供向けの物語を書きなさい。"},{"id":100,"category":"Imaginative","textType":"Story","english":"Write a sci-fi story about a protagonist who accidentally time-travels from the present day to the year 2100 and must navigate a world of flying cars and robots.","japanese":"<ruby>現代<rt>げんだい</rt></ruby>から<ruby>偶然<rt>ぐうぜん</rt></ruby>2100年の<ruby>未来<rt>みらい</rt></ruby>にタイムスリップしてしまった<ruby>主人公<rt>しゅじんこう</rt></ruby>が<ruby>空<rt>そら</rt></ruby>を<ruby>飛<rt>と</rt></ruby>ぶ車やロボットばかりの<ruby>世界<rt>せかい</rt></ruby>で<ruby>生き抜<rt>いきぬ</rt></ruby>くSFの物語を書きなさい。","japanese_original":"現代から偶然2100年の未来にタイムスリップしてしまった主人公が空を飛ぶ車やロボットばかりの世界で生き抜くSFの物語を書きなさい。"},{"id":101,"category":"Imaginative","textType":"Story","english":"Write a narrative from the perspective of an old leather wallet left behind on a train, describing its humorous adventure until it is picked up by a new owner.","japanese":"電車の中に<ruby>忘<rt>わす</rt></ruby>れられた古い<ruby>革<rt>かわ</rt></ruby>の<ruby>財布<rt>さいふ</rt></ruby>の<ruby>目線<rt>めせん</rt></ruby>から新しい<ruby>持ち主<rt>もちぬし</rt></ruby>に<ruby>拾<rt>ひろ</rt></ruby>われるまでの<ruby>面白<rt>おもしろ</rt></ruby>い<ruby>冒険<rt>ぼうけん</rt></ruby>の物語を書きなさい。","japanese_original":"電車の中に忘れられた古い革の財布の目線から新しい持ち主に拾われるまでの面白い冒険の物語を書きなさい。"},{"id":102,"category":"Imaginative","textType":"Story","english":"Write a story about waking up one morning to find that your ears have turned into cat ears and you are suddenly able to understand and speak with cats.","japanese":"ある朝<ruby>起<rt>お</rt></ruby>きたら自分の耳が<ruby>猫<rt>ねこ</rt></ruby>のようになっていて話す<ruby>猫<rt>ねこ</rt></ruby>たちと会話ができるようになったという<ruby>不思議<rt>ふしぎ</rt></ruby>な朝の物語を書きなさい。","japanese_original":"ある朝起きたら自分の耳が猫のようになっていて話す猫たちと会話ができるようになったという不思議な朝の物語を書きなさい。"},{"id":103,"category":"Imaginative","textType":"Story","english":"Write a story about a monkey soaking in a hot spring who begins to observe and deeply contemplate human nature from an unique animal viewpoint.","japanese":"<ruby>温泉<rt>おんせん</rt></ruby>にゆっくり入っている一<ruby>匹<rt>ひき</rt></ruby>のサルが人間たちの<ruby>様子<rt>ようす</rt></ruby>を動物ならではの<ruby>目線<rt>めせん</rt></ruby>で<ruby>深<rt>ふか</rt></ruby>く<ruby>観察<rt>かんさつ</rt></ruby>している物語を書きなさい。","japanese_original":"温泉にゆっくり入っている一匹のサルが人間たちの様子を動物ならではの目線で深く観察している物語を書きなさい。"},{"id":104,"category":"Imaginative","textType":"Story","english":"Write a story about discovering a tiny, hidden door behind the bookshelf and opening it to find a whole miniature world waiting for you.","japanese":"<ruby>本棚<rt>ほんだな</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>に小さなドアを見つけ<ruby>勇気<rt>ゆうき</rt></ruby>を出して<ruby>開<rt>あ</rt></ruby>けた先で広がっていた小さなおもちゃのような<ruby>世界<rt>せかい</rt></ruby>の物語を書きなさい。","japanese_original":"本棚の奥に小さなドアを見つけ勇気を出して開けた先で広がっていた小さなおもちゃのような世界の物語を書きなさい。"},{"id":105,"category":"Imaginative","textType":"Story","english":"Write a narrative about a high school student who suddenly becomes able to hear the voices of all animals and plants around them, resulting in a chaotic day.","japanese":"ある日<ruby>突然<rt>とつぜん</rt></ruby>まわりにいるすべての動物や<ruby>植物<rt>しょくぶつ</rt></ruby>の<ruby>声<rt>こえ</rt></ruby>が聞こえるようになった高校生が<ruby>体験<rt>たいけん</rt></ruby>するにぎやかな一日の物語を書きなさい。","japanese_original":"ある日突然まわりにいるすべての動物や植物の声が聞こえるようになった高校生が体験するにぎやかな一日の物語を書きなさい。"},{"id":106,"category":"Imaginative","textType":"Story","english":"Write a story about a secret midnight gathering in an art museum where the characters inside the paintings come alive and discuss their worlds.","japanese":"<ruby>真夜中<rt>まよなか</rt></ruby>の<ruby>美術館<rt>びじゅつかん</rt></ruby>で<ruby>絵<rt>え</rt></ruby>の中の人たちが動き出し自分たちの<ruby>世界<rt>せかい</rt></ruby>について<ruby>話し合<rt>はなしあ</rt></ruby>う<ruby>秘密<rt>ひみつ</rt></ruby>の夜会についての物語を書きなさい。","japanese_original":"真夜中の美術館で絵の中の人たちが動き出し自分たちの世界について話し合う秘密の夜会についての物語を書きなさい。"},{"id":107,"category":"Imaginative","textType":"Story","english":"Write a narrative about reading an old letter found inside a glass bottle on the beach, only to realize it was written by a girl your age fifty years ago.","japanese":"<ruby>海辺<rt>うみべ</rt></ruby>の<ruby>砂浜<rt>すなはま</rt></ruby>で<ruby>拾<rt>ひろ</rt></ruby>ったガラスびんの中に入っていた古い手紙を読んだところ50年前の自分と同じ年の女の子からのメッセージだったという物語を書きなさい。","japanese_original":"海辺の砂浜で拾ったガラスびんの中に入っていた古い手紙を読んだところ50年前の自分と同じ年の女の子からのメッセージだったという物語を書きなさい。"},{"id":108,"category":"Imaginative","textType":"Story","english":"Write a sci-fi survival story about a pair of scientists whose time machine malfunctions, stranding them in a prehistoric era where dinosaurs roam.","japanese":"タイムマシンがこわれて<ruby>恐竜<rt>きょうりゅう</rt></ruby>が歩き回る<ruby>大昔<rt>おおむかし</rt></ruby>の<ruby>時代<rt>じだい</rt></ruby>に<ruby>取り残<rt>とりのこ</rt></ruby>されてしまった<ruby>科学<rt>かがく</rt></ruby><ruby>者<rt>しゃ</rt></ruby>ふたりのハラハラするサバイバルの物語を書きなさい。","japanese_original":"タイムマシンがこわれて恐竜が歩き回る大昔の時代に取り残されてしまった科学者ふたりのハラハラするサバイバルの物語を書きなさい。"},{"id":109,"category":"Imaginative","textType":"Story","english":"Write a humorous story about a pet dog that secretly manages a local bakery while its owners are away at work.","japanese":"<ruby>飼い主<rt>かいぬし</rt></ruby>が仕事に出かけているあいだに、<ruby>飼い犬<rt>かいいぬ</rt></ruby>がこっそりパン屋を<ruby>経営<rt>けいえい</rt></ruby>していたというユーモアあふれる物語を書きなさい。","japanese_original":"飼い主が仕事に出かけているあいだに、飼い犬がこっそりパン屋を経営していたというユーモアあふれる物語を書きなさい。"},{"id":110,"category":"Imaginative","textType":"Story","english":"Write a story about a forgotten toy in the attic that decides to embark on a great adventure to find the child who once played with it.","japanese":"<ruby>屋根裏<rt>やねうら</rt></ruby><ruby>部屋<rt>へや</rt></ruby>で<ruby>忘<rt>わす</rt></ruby>れられていたおもちゃが、<ruby>昔<rt>むかし</rt></ruby><ruby>遊<rt>あそ</rt></ruby>んでくれた<ruby>子供<rt>こども</rt></ruby>を<ruby>探<rt>さが</rt></ruby>すために<ruby>壮大<rt>そうだい</rt></ruby>な<ruby>冒険<rt>ぼうけん</rt></ruby>に出るという<ruby>感動<rt>かんどう</rt></ruby><ruby>的<rt>てき</rt></ruby>な物語を書きなさい。","japanese_original":"屋根裏部屋で忘れられていたおもちゃが、昔遊んでくれた子供を探すために壮大な冒険に出るという感動的な物語を書きなさい。"}]`);
const Article = { "title": "Article (<ruby>記事<rt>きじ</rt></ruby>)", "purpose": "Articles are used to inform, persuade, or entertain readers through a structured publication format.", "structure": ["Items you should include: Title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Plain style in general, Polite style is also acceptable"], "sampleImage": "/article.pdf", "title_original": "Article (記事)", "purpose_original": "Articles are used to inform, persuade, or entertain readers through a structured publication format.", "structure_original": ["Items you should include: Title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Plain style in general, Polite style is also acceptable"] };
const Email = { "title": "Email (Eメール)", "purpose": "Emails are used to quickly convey a message, consultation, or advice to a specific recipient more casually or formally than a letter.", "structure": ["Items you should include: Name of the recipient, Subject line, Main text, Last line, Name of the sender", "Sentence style: Polite style or, Plain style depending on the relationship"], "sampleImage": "/email.pdf", "title_original": "Email (Eメール)", "purpose_original": "Emails are used to quickly convey a message, consultation, or advice to a specific recipient more casually or formally than a letter.", "structure_original": ["Items you should include: Name of the recipient, Subject line, Main text, Last line, Name of the sender", "Sentence style: Polite style or, Plain style depending on the relationship"] };
const Essay = { "title": "Essay (作文)", "purpose": "Essays are used to present and logically argue your own thoughts or reflections on a given theme through structured paragraphs.", "structure": ["Items you should include: Topic, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"], "sampleImage": "/essay.pdf", "title_original": "Essay (作文)", "purpose_original": "Essays are used to present and logically argue your own thoughts or reflections on a given theme through structured paragraphs.", "structure_original": ["Items you should include: Topic, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"] };
const Journal = { "title": "Journal, Diary Entry (<ruby>日記<rt>にっき</rt></ruby>)", "purpose": "Journals are used to personally record daily events, changes in mood, reflections, and future plans.", "structure": ["Items you should include: Month, date, day of the week, Weather", "Content: Introduction, Body, Conclusion", "Sentence style: Plain style in general as you write to yourself"], "sampleImage": "/journal.pdf", "title_original": "Journal, Diary Entry (日記)", "purpose_original": "Journals are used to personally record daily events, changes in mood, reflections, and future plans.", "structure_original": ["Items you should include: Month, date, day of the week, Weather", "Content: Introduction, Body, Conclusion", "Sentence style: Plain style in general as you write to yourself"] };
const Message = { "title": "Message (<ruby>伝言<rt>でんごん</rt></ruby>、メッセージ)", "purpose": "Messages are used to leave brief, concise information or instructions for someone who is absent.", "structure": ["Items you should include: Name of addressee, Content, Date and time, Name of addressor (fictional)", "Sentence style: Polite style or, Plain style depending on recipient"], "title_original": "Message (伝言、メッセージ)", "purpose_original": "Messages are used to leave brief, concise information or instructions for someone who is absent.", "structure_original": ["Items you should include: Name of addressee, Content, Date and time, Name of addressor (fictional)", "Sentence style: Polite style or, Plain style depending on recipient"] };
const Account = { "title": "Personal Account (<ruby>体験<rt>たいけん</rt></ruby><ruby>談<rt>だん</rt></ruby>)", "purpose": "Personal accounts are used to describe a personal experience, including challenges faced and the process of overcoming them.", "structure": ["Items you should include: Title, Name of author (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"], "sampleImage": "/personal_account.pdf", "title_original": "Personal Account (体験談)", "purpose_original": "Personal accounts are used to describe a personal experience, including challenges faced and the process of overcoming them.", "structure_original": ["Items you should include: Title, Name of author (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"] };
const Letter = { "title": "Personal Letter (手紙)", "purpose": "Personal letters are used to share updates, express gratitude, or maintain personal connections with a recipient.", "structure": ["Items you should include: Date, Starting line, Name of the addressee, Signing off at the end, Name of the sender", "Content: Introduction, Body of the letter, Conclusion", "Sentence style: Polite style or, Plain style depending on the relationship"], "sampleImage": "/letter.pdf", "title_original": "Personal Letter (手紙)", "purpose_original": "Personal letters are used to share updates, express gratitude, or maintain personal connections with a recipient.", "structure_original": ["Items you should include: Date, Starting line, Name of the addressee, Signing off at the end, Name of the sender", "Content: Introduction, Body of the letter, Conclusion", "Sentence style: Polite style or, Plain style depending on the relationship"] };
const Report = { "title": "Report - Research, Analysis (レポート)", "purpose": "Reports are used to organize and present research findings, objective analyses, or facts clearly.", "structure": ["Items you should include: Title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"], "sampleImage": "/report.pdf", "title_original": "Report - Research, Analysis (レポート)", "purpose_original": "Reports are used to organize and present research findings, objective analyses, or facts clearly.", "structure_original": ["Items you should include: Title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"] };
const Review = { "title": "Review (<ruby>批評<rt>ひひょう</rt></ruby>)", "purpose": "Reviews are used to evaluate books, movies, products, or performances and provide an informed opinion to readers.", "structure": ["Items you should include: Title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"], "title_original": "Review (批評)", "purpose_original": "Reviews are used to evaluate books, movies, products, or performances and provide an informed opinion to readers.", "structure_original": ["Items you should include: Title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"] };
const Speech = { "title": "Speech Script（スピーチの<ruby>原稿<rt>げんこう</rt></ruby>）", "purpose": "Speeches are used to directly communicate opinions or information to a live audience.", "structure": ["Items you should include: Title, Greeting（e.g. こんにちは。）, Introduction to the topic（e.g. ～について話したいと思います。）, Body of the speech, Closing expression（e.g. ありがとうございました。）", "Sentence style: Polite style"], "sampleImage": "/speech_script.pdf", "title_original": "Speech Script（スピーチの原稿）", "purpose_original": "Speeches are used to directly communicate opinions or information to a live audience.", "structure_original": ["Items you should include: Title, Greeting（e.g. こんにちは。）, Introduction to the topic（e.g. ～について話したいと思います。）, Body of the speech, Closing expression（e.g. ありがとうございました。）", "Sentence style: Polite style"] };
const Story = { "title": "Story (物語)", "purpose": "Stories are used to write imaginative narratives featuring characters, settings, and a dynamic plot.", "structure": ["Items you should include: Title, Author's name (fictional), A clear plot and character development", "Content: Introduction, Body, Conclusion", "Sentence style: Plain style or, Polite style"], "sampleImage": "/story.pdf", "title_original": "Story (物語)", "purpose_original": "Stories are used to write imaginative narratives featuring characters, settings, and a dynamic plot.", "structure_original": ["Items you should include: Title, Author's name (fictional), A clear plot and character development", "Content: Introduction, Body, Conclusion", "Sentence style: Plain style or, Polite style"] };
const Summary = { "title": "Summary（まとめ）", "purpose": "Summaries are used to concisely condense the main points and arguments of a source text or data.", "structure": ["Items you should include: Topic, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"], "title_original": "Summary（まとめ）", "purpose_original": "Summaries are used to concisely condense the main points and arguments of a source text or data.", "structure_original": ["Items you should include: Topic, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"] };
const Genkooyooshi = { "title": "Genkooyooshi Usage Guide", "purpose": "This guide outlines the general rules for formatting titles, names, main text, and square usage on genkooyooshi. Refer to each text type for details.", "structure": ["Title (Line 1): Leave 3 spaces at the beginning, then write the title", "Name (Line 2): Write at the end, leaving the last square blank", "Main Text:", "Square Usage:"], "sampleImage": "/genkoyoshi.pdf", "title_original": "Genkooyooshi Usage Guide", "purpose_original": "This guide outlines the general rules for formatting titles, names, main text, and square usage on genkooyooshi. Refer to each text type for details.", "structure_original": ["Title (Line 1): Leave 3 spaces at the beginning, then write the title", "Name (Line 2): Write at the end, leaving the last square blank", "Main Text:", "Square Usage:"] };
const textTypesData = {
  Article,
  Email,
  Essay,
  Journal,
  Message,
  Account,
  Letter,
  Report,
  "Official Report": { "title": "Report - Official, Business (<ruby>報告<rt>ほうこく</rt></ruby>書)", "purpose": "Official reports are used to communicate factual investigation results or business activities within an organization.", "structure": ["Items you should include: Topic / title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"], "title_original": "Report - Official, Business (報告書)", "purpose_original": "Official reports are used to communicate factual investigation results or business activities within an organization.", "structure_original": ["Items you should include: Topic / title, Author's name (fictional)", "Content: Introduction, Body, Conclusion", "Sentence style: Polite style or, Plain style"] },
  Review,
  Speech,
  Story,
  Summary,
  Genkooyooshi
};
function BugReportCard() {
  return /* @__PURE__ */ jsx("div", { className: "w-full p-4 bg-white hover:bg-amber-50 text-amber-800 border border-amber-200 hover:border-amber-300 rounded-xl font-bold text-lg shadow-sm transition-all cursor-pointer", children: "🐛 Report a Bug / Issue" });
}
function QuickFeedbackCard() {
  return /* @__PURE__ */ jsx("div", { className: "w-full p-4 bg-white hover:bg-blue-50 text-blue-800 border border-blue-200 hover:border-blue-300 rounded-xl font-bold text-lg shadow-sm transition-all cursor-pointer", children: "💬 Quick Feedback & Suggestions" });
}
const questions = questionsData;
const modalData = textTypesData;
function sanitizeAiOutput(text) {
  if (!text) return "";
  return text.replace(/^#{1,6}\s+/gm, "").replace(/\*\*/g, "");
}
function HighlightChecker() {
  const [text, setText] = useState(
    "私は日本へ行って、日本語の勉強をたくさんしなければなりません。"
  );
  const vceKanjiList = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "百",
    "千",
    "万",
    "本",
    "人",
    "回",
    "才",
    "円",
    "番",
    "春",
    "夏",
    "秋",
    "冬",
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
    "曜",
    "年",
    "時",
    "分",
    "夕",
    "半",
    "午",
    "毎",
    "週",
    "間",
    "今",
    "先",
    "朝",
    "晩",
    "昼",
    "夜",
    "去",
    "目",
    "口",
    "耳",
    "手",
    "体",
    "上",
    "中",
    "下",
    "右",
    "左",
    "前",
    "後",
    "東",
    "西",
    "南",
    "北",
    "外",
    "学",
    "校",
    "英",
    "語",
    "文",
    "漢",
    "字",
    "勉",
    "強",
    "父",
    "母",
    "子",
    "家",
    "族",
    "兄",
    "弟",
    "姉",
    "妹",
    "友",
    "私",
    "男",
    "女",
    "大",
    "小",
    "好",
    "安",
    "高",
    "新",
    "古",
    "多",
    "少",
    "楽",
    "長",
    "近",
    "正",
    "広",
    "早",
    "明",
    "行",
    "来",
    "休",
    "出",
    "入",
    "生",
    "見",
    "思",
    "書",
    "言",
    "話",
    "読",
    "売",
    "買",
    "食",
    "飲",
    "知",
    "作",
    "住",
    "会",
    "使",
    "着",
    "発",
    "聞",
    "帰",
    "持",
    "待",
    "教",
    "乗",
    "働",
    "動",
    "歩",
    "終",
    "始",
    "泊",
    "洗",
    "立",
    "考",
    "習",
    "山",
    "川",
    "田",
    "花",
    "島",
    "海",
    "天",
    "雨",
    "雪",
    "牛",
    "魚",
    "馬",
    "犬",
    "京",
    "都",
    "市",
    "県",
    "州",
    "国",
    "町",
    "神",
    "寺",
    "駅",
    "店",
    "電",
    "車",
    "道",
    "旅",
    "赤",
    "青",
    "白",
    "黒",
    "色",
    "銀",
    "々",
    "何",
    "紙",
    "元",
    "気",
    "活",
    "社",
    "自",
    "物",
    "名",
    "方",
    "院",
    "所",
    "屋",
    "肉",
    "場",
    "飯",
    "洋",
    "和",
    "病",
    "次",
    "同",
    "仕",
    "事",
    "点"
  ];
  const vceGrammarList = [
    "しなければなりませんでした",
    "なければなりません",
    "なくてはいけません",
    "たくなかったです",
    "いたいと思っています",
    "にいったことがあります",
    "ことがある",
    "ことが好きじゃないです",
    "ことができました",
    "ことができます",
    "ことがはじまります",
    "ほうがいいです",
    "てもいいですか",
    "ていただけませんか",
    "てくださいませんか",
    "いでください",
    "かもしれません",
    "たのしみにしています",
    "にきょうみがあります",
    "としてしられています",
    "でゆう名です",
    "のおかげで、",
    "のほかに、",
    "だけでなく",
    "とchigaimasu",
    "にとにています",
    "をつうじて",
    "たいです",
    "たくないです",
    "たがります",
    "たがっている",
    "つもりです",
    "が上手です",
    "下手です",
    "やすい",
    "づらい",
    "にくい",
    "が好きです",
    "大好です",
    "きらいです",
    "ほしいです",
    "がいります",
    "分かります",
    "はじめました",
    "おえました",
    "に来ます",
    "行きます",
    "てしまいます",
    "試してみます",
    "みたいです",
    "もいいです",
    "はいけません",
    "てはだめです",
    "なくてもいいです",
    "なくてもよかったです",
    "べきです",
    "べきじゃないです",
    "べきでした",
    "ましょう",
    "ましょうか",
    "ませんか",
    "てください",
    "すぎます",
    "という",
    "などの",
    "ために",
    "あいだ",
    "まえに",
    "あとで",
    "からです",
    "ですから",
    "そうだです",
    "らしいです",
    "ようです",
    "でしょう",
    "だろう",
    "のようです",
    "と思います",
    "と言います",
    "んです",
    "られます",
    "といえば、",
    "たとえば、",
    "だから、",
    "しかし、",
    "また、",
    "そして、",
    "一方、",
    "によると、",
    "として",
    "は一番",
    "ことは",
    "ながら",
    "なので、",
    "てから、",
    "でから、",
    "から、",
    "ので、",
    "たら、",
    "ば、",
    "でも",
    "ても、",
    "けれど",
    "けど",
    "のに",
    "し、",
    "くて",
    "より",
    "など",
    "ほか",
    "て、",
    "ています",
    "でいます",
    "でから、"
  ];
  const getHighlightedText = () => {
    let processedText = text;
    const placeholders = {};
    let placeholderIndex = 0;
    const foundUniqueGrammar = /* @__PURE__ */ new Set();
    vceGrammarList.forEach((grammar) => {
      if (processedText.includes(grammar)) {
        let canonicalGrammar = grammar;
        if (grammar === "でいます") {
          canonicalGrammar = "ています";
        } else if (grammar === "でから、") {
          canonicalGrammar = "てから、";
        }
        foundUniqueGrammar.add(canonicalGrammar);
        while (processedText.includes(grammar)) {
          const key = `__GRAMMAR_PLACEHOLDER_${placeholderIndex}__`;
          placeholders[key] = `<span style="background-color: #dcfce7; color: #15803d; border: 1px solid #86efac; border-radius: 4px; padding: 2px 4px; margin: 0 2px; font-weight: bold; font-size: 20px;">${grammar}</span>`;
          const targetIndex = processedText.indexOf(grammar);
          if (targetIndex !== -1) {
            processedText = processedText.substring(0, targetIndex) + key + processedText.substring(targetIndex + grammar.length);
          } else {
            break;
          }
          placeholderIndex++;
        }
      }
    });
    const grammarCount2 = foundUniqueGrammar.size;
    const foundUniqueKanji = /* @__PURE__ */ new Set();
    vceKanjiList.forEach((kanji) => {
      const cleanCheck = processedText.replace(
        /__GRAMMAR_PLACEHOLDER_\d+__/g,
        ""
      );
      const realMatches = cleanCheck.match(
        new RegExp(kanji.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g")
      );
      if (realMatches) {
        foundUniqueKanji.add(kanji);
        while (processedText.includes(kanji)) {
          const key = `__KANJI_PLACEHOLDER_${placeholderIndex}__`;
          placeholders[key] = `<span style="background-color: #fef08a; color: #854d0e; border: 1px solid #fde047; border-radius: 4px; padding: 2px 4px; margin: 0 2px; font-weight: bold; font-size: 20px;">${kanji}</span>`;
          const targetIndex = processedText.indexOf(kanji);
          if (targetIndex !== -1) {
            processedText = processedText.substring(0, targetIndex) + key + processedText.substring(targetIndex + kanji.length);
          } else {
            break;
          }
          placeholderIndex++;
        }
      }
    });
    const kanjiCount2 = foundUniqueKanji.size;
    let finalHtml = processedText;
    Object.keys(placeholders).forEach((key) => {
      finalHtml = finalHtml.split(key).join(placeholders[key]);
    });
    return { html: finalHtml, kanjiCount: kanjiCount2, grammarCount: grammarCount2 };
  };
  const { html, kanjiCount, grammarCount } = getHighlightedText();
  return /* @__PURE__ */ jsxs("div", { className: "mb-10 p-6 rounded-xl border-2 border-dashed border-slate-200 bg-white shadow-sm", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-3 mt-0", children: "✨ VCE Kanji & Grammar Checker" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 mb-5", children: "💡 Paste the text transcribed by your AI Tutor from the photo of your handwritten answer here to instantly check your unique VCE Kanji (🟡 Yellow) and VCE Grammar (🟢 Green)!" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          value: text,
          onChange: (e) => setText(e.target.value),
          placeholder: "Type or paste Japanese text here...",
          className: "w-full h-36 p-4 rounded-lg border border-slate-300 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y box-border bg-white text-slate-800"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg border border-slate-200 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4 mb-4 border-b border-slate-100 pb-3 flex-wrap", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-yellow-800 bg-yellow-100 px-3.5 py-1.5 rounded-md", children: [
            "🟡 Kanji Count (Unique): ",
            kanjiCount
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-green-800 bg-green-100 px-3.5 py-1.5 rounded-md", children: [
            "🟢 Grammar Count (Unique): ",
            grammarCount
          ] })
        ] }),
        text ? /* @__PURE__ */ jsx(
          "div",
          {
            className: "text-[20px] leading-relaxed text-slate-700 mb-4",
            dangerouslySetInnerHTML: { __html: html }
          }
        ) : /* @__PURE__ */ jsx("div", { className: "text-slate-400 italic mb-4 text-xl", children: "Enter text to see the highlighted results here." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-red-50 border border-red-300 rounded-lg p-4 text-lg text-red-900 leading-relaxed", children: [
          /* @__PURE__ */ jsx("strong", { children: "⚠️ Note for Students:" }),
          " The counting is based on exact matches of grammar patterns and kanji. Because unexpected phrases or typos might occasionally trigger false matches, please use these numbers ",
          /* @__PURE__ */ jsx("strong", { children: "for reference only" }),
          " and double-check your work!"
        ] })
      ] })
    ] })
  ] });
}
function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTextType, setActiveTextType] = useState("all");
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAiFullscreen, setIsAiFullscreen] = useState(false);
  const [chatFontSize, setChatFontSize] = useState("base");
  const aiChatRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    document.title = "Learning Dashboard | VCE EOY Exam Writing Tutor";
  }, []);
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm AI Yamato, your Japanese Tutor. Ask me anything about VCE Japanese writing practice, grammar, or phrasing! You can also upload photos of your handwritten answers."
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [requestVisualAid, setRequestVisualAid] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [tutorLevel, setTutorLevel] = useState("steady");
  const getFontSizeClass = () => {
    switch (chatFontSize) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      default:
        return "text-base";
    }
  };
  const toggleAiFullscreen = async () => {
    if (!aiChatRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await aiChatRef.current.requestFullscreen();
        setIsAiFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsAiFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setIsAiFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const assignedQuestionText = selectedQuestion ? `Q${selectedQuestion.id}: ${selectedQuestion.english}` : "";
  const handleImageChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSendTutorMessage = async (e) => {
    e.preventDefault();
    if (!tutorInput.trim() && !selectedImage || isTutorLoading) return;
    const userMsg = tutorInput.trim() || "Please check this handwritten answer image.";
    const needsVisual = requestVisualAid;
    const imageBase64 = selectedImagePreview;
    setTutorInput("");
    setSelectedImage(null);
    setSelectedImagePreview(null);
    setRequestVisualAid(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    const newMessages = [
      ...tutorMessages,
      { role: "user", content: userMsg, imageUrl: imageBase64 || void 0 }
    ];
    setTutorMessages(newMessages);
    setIsTutorLoading(true);
    try {
      const visualPrompt = needsVisual ? `Educational diagram for: ${userMsg}` : void 0;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: tutorMessages,
          learningPace: tutorLevel,
          pace: tutorLevel,
          visualPrompt,
          assignedQuestion: assignedQuestionText,
          userNickname: "Student",
          imageBase64
        })
      });
      const data = await res.json();
      setTutorMessages([...newMessages, { role: "assistant", content: sanitizeAiOutput(data.reply || data.replyText || ""), imageUrl: data.imageUrl }]);
    } catch (err) {
      setTutorMessages([...newMessages, { role: "assistant", content: "Sorry, an error occurred. Please try asking again!" }]);
    } finally {
      setIsTutorLoading(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = activeCategory === "all" || q.category === activeCategory;
    const matchesTextType = activeTextType === "all" || q.textType === activeTextType;
    return matchesCategory && matchesTextType;
  });
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-screen bg-white font-sans", children: /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold text-slate-700 animate-pulse", children: "Checking your session... Secure Portal loading... 🔒" }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-white text-slate-800 font-sans relative", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-4 py-8 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold text-slate-800 m-0 mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "📌" }),
          " Useful Resources & Help Centre"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setActiveModal("Genkooyooshi"),
              className: "w-full text-left p-4 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 hover:border-rose-300 rounded-xl cursor-pointer font-bold text-lg shadow-sm transition-all box-border",
              children: "📝 How to use Genkooyooshi"
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/faq",
              className: "w-full p-4 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-300 rounded-xl no-underline font-bold text-lg block box-border shadow-sm transition-all",
              children: [
                /* @__PURE__ */ jsx("div", { className: "text-emerald-900 mb-0.5", children: "💡 FAQs: Exams and AI Yamato" }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-normal text-emerald-700", children: "Name rules, word counts, kanji and more" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(BugReportCard, {}),
          /* @__PURE__ */ jsx(QuickFeedbackCard, {})
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "mb-6 p-5 bg-indigo-50 border border-indigo-200 rounded-xl shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-indigo-900 font-bold text-lg flex-wrap", children: [
          /* @__PURE__ */ jsx("span", { children: "🤖" }),
          " AI Yamato is ready for you"
        ] }),
        /* @__PURE__ */ jsxs("div", { id: "active-ai-tutor-banner", className: "px-4 py-3 bg-white/80 border border-indigo-200 rounded-lg text-indigo-900 text-base font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-xs scroll-mt-6 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("span", { children: "🎯 Active Question Q" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                min: "1",
                max: questions.length,
                value: selectedQuestion ? selectedQuestion.id : "",
                onChange: (e) => {
                  const qId = parseInt(e.target.value, 10);
                  const found = questions.find((q) => q.id === qId);
                  if (found) {
                    setSelectedQuestion(found);
                  } else if (e.target.value === "") {
                    setSelectedQuestion(null);
                  }
                },
                placeholder: "No.",
                className: "w-16 px-2 py-1 bg-white border border-indigo-300 rounded text-center text-indigo-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              }
            ),
            selectedQuestion ? /* @__PURE__ */ jsxs("span", { className: "text-sm font-normal text-indigo-700 truncate max-w-xs sm:max-w-sm", children: [
              "(",
              selectedQuestion.textType,
              ") ",
              selectedQuestion.english
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-normal text-amber-700", children: "⚠️ None selected (Type ID or select below)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                onChange: handleImageChange,
                className: "hidden"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                className: "px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "📷" }),
                  /* @__PURE__ */ jsx("span", { children: selectedImagePreview ? "Change Answer Photo" : "Upload Answer Photo" })
                ]
              }
            ),
            selectedImagePreview && /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-700 font-bold bg-emerald-100 px-2 py-1 rounded", children: "✓ Attached" })
          ] })
        ] }),
        selectedImagePreview && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white border border-indigo-200 px-3 py-2 rounded-lg text-sm", children: [
          /* @__PURE__ */ jsx("img", { src: selectedImagePreview, alt: "Preview", className: "w-10 h-10 object-cover rounded border" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-indigo-900 text-xs", children: "Handwritten Answer Ready for AI Tutor" }),
            /* @__PURE__ */ jsx("div", { className: "text-slate-600 text-xs truncate", children: "You can now open the chat and send it!" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedImage(null);
                setSelectedImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              },
              className: "text-red-600 hover:text-red-800 text-xs font-bold px-2 py-1 bg-red-50 rounded",
              children: "Remove ✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-indigo-100 text-slate-700 text-base leading-relaxed", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-2 text-indigo-900 font-bold", children: "To get started, please follow these two quick steps:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-indigo-900 shrink-0", children: "1️⃣" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Select your question & photo:" }),
                " Enter the question number above (or click task button) and upload your handwritten answer photo using the button above. 📋📸"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold text-indigo-900 shrink-0", children: "2️⃣" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Chat with AI Yamato:" }),
                " Open the chat bubble at the bottom-right and click send!"
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsx(HighlightChecker, {}) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-end border-b-2 border-slate-200 pb-2 mb-6", children: /* @__PURE__ */ jsxs("h1", { className: "text-slate-800 text-2xl sm:text-3xl font-bold m-0", children: [
        "📚 Task List (",
        filteredQuestions.length,
        " questions)"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2 text-lg font-bold text-slate-600", children: "Filter by Writing Style" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2.5 flex-wrap mb-4", children: [
          "all",
          "Informative",
          "Evaluative",
          "Persuasive",
          "Personal",
          "Imaginative"
        ].map((cat) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveCategory(cat),
            className: `px-4 py-2 rounded-lg text-base font-bold cursor-pointer transition-colors ${activeCategory === cat ? "bg-blue-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"}`,
            children: cat === "all" ? "All" : cat
          },
          cat
        )) }),
        /* @__PURE__ */ jsx("div", { className: "mb-2 text-lg font-bold text-slate-600", children: "Filter by Text Type" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2.5 flex-wrap", children: [
          "all",
          "Speech",
          "Email",
          "Letter",
          "Article",
          "Journal",
          "Essay",
          "Story",
          "Report",
          "Account",
          "Message",
          "Review",
          "Summary",
          "Official Report"
        ].map((type) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setActiveTextType(type),
            className: `px-4 py-2 rounded-lg text-base font-bold cursor-pointer transition-colors ${activeTextType === type ? "bg-blue-600 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"}`,
            children: type === "all" ? "All" : type
          },
          type
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { id: "text-type-instruction", className: "bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-lg text-emerald-800 flex items-center gap-3 shadow-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl", children: "💡" }),
        /* @__PURE__ */ jsx("span", { children: "Click on the green text type tag on each question to see what is required for that text type and view a sample." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6 mb-12", children: filteredQuestions.map((q) => {
        const isSelected = (selectedQuestion == null ? void 0 : selectedQuestion.id) === q.id;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `p-6 border rounded-xl bg-white shadow-sm transition-all ${isSelected ? "border-indigo-500 ring-2 ring-indigo-200" : "border-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-base bg-sky-100 text-sky-800 px-3 py-1 rounded-md font-bold", children: q.category }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      onClick: () => setActiveModal(q.textType),
                      className: "text-base bg-emerald-100 text-emerald-800 px-3 py-1 rounded-md font-bold cursor-pointer hover:bg-emerald-200 transition-colors",
                      children: q.textType
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-lg text-slate-600 font-bold", children: [
                  "Q",
                  q.id
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[20px] text-slate-800 mb-3 leading-relaxed font-medium", children: q.english }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "text-lg sm:text-[20px] text-slate-700 mb-4 border-l-4 border-slate-200 pl-4 leading-relaxed",
                  dangerouslySetInnerHTML: { __html: q.japanese }
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedQuestion(q);
                    const banner = document.getElementById("active-ai-tutor-banner");
                    if (banner) {
                      banner.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  },
                  className: `px-4 py-2 text-base rounded-lg cursor-pointer font-bold transition-colors shadow-sm ${isSelected ? "bg-indigo-600 text-white" : "bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-700"}`,
                  children: isSelected ? "🤖 Currently Active in AI Tutor Bubble" : "🎯 Select for AI Tutor"
                }
              )
            ]
          },
          q.id
        );
      }) }),
      /* @__PURE__ */ jsxs("aside", { "aria-label": "AI Yamato", className: "fixed bottom-6 right-6 z-[2147483647] flex flex-col items-end gap-3 text-base", children: [
        showScrollTop && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            className: "p-3.5 bg-white hover:bg-slate-50 rounded-full shadow-xl cursor-pointer transition-all flex items-center justify-center w-12 h-12 border-2 border-red-500",
            "aria-label": "Scroll to top",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 text-red-600",
                fill: "currentColor",
                viewBox: "0 0 24 24",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ jsx("path", { d: "M12 4l-8 8h5v8h6v-8h5z" })
              }
            )
          }
        ),
        !isAiTutorOpen ? /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setIsAiTutorOpen(true),
            className: "bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 transition-all cursor-pointer text-base border-2 border-white",
            children: [
              /* @__PURE__ */ jsx("span", { children: "🤖" }),
              /* @__PURE__ */ jsx("span", { children: "AI Yamato" }),
              selectedQuestion && /* @__PURE__ */ jsxs("span", { className: "text-xs bg-blue-800 px-2 py-0.5 rounded text-blue-100", children: [
                "Q",
                selectedQuestion.id
              ] }),
              selectedImagePreview && /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" })
            ]
          }
        ) : /* @__PURE__ */ jsx(
          "div",
          {
            ref: aiChatRef,
            className: `bg-white border-2 border-blue-300 rounded-2xl p-5 shadow-2xl flex flex-col ${isAiFullscreen ? "fixed inset-0 w-full h-full max-w-none max-h-none rounded-none z-[2147483647]" : "w-80 sm:w-96 h-[520px] min-w-[280px] min-h-[350px] max-w-[90vw] max-h-[85vh] resize overflow-auto"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-2 mb-3 shrink-0", children: [
                /* @__PURE__ */ jsxs("h3", { className: "text-base font-bold text-blue-900 flex items-center gap-2 m-0", children: [
                  /* @__PURE__ */ jsx("span", { children: "🤖" }),
                  " AIYAMATO Tutor",
                  selectedQuestion && /* @__PURE__ */ jsxs("span", { className: "text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-normal", children: [
                    "Q",
                    selectedQuestion.id,
                    " Active"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: toggleAiFullscreen,
                      className: "text-slate-500 hover:text-slate-700 text-sm font-bold px-2 py-1 rounded-md transition cursor-pointer",
                      children: isAiFullscreen ? "🗗 Exit Fullscreen" : "🗖 Fullscreen"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setIsAiTutorOpen(false),
                      className: "text-slate-400 hover:text-slate-600 text-sm font-bold px-2 py-1 rounded-md transition cursor-pointer",
                      children: "✕ Close"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-600 leading-relaxed mb-3 shrink-0", children: "Ask questions about writing phrasing, grammar, or send your uploaded answer photo!" }),
              /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-xl p-2.5 mb-2 flex items-center justify-between shrink-0", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-blue-900", children: "Learning Pace" }),
                /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-blue-200", children: ["steady", "normal", "accelerated"].map((level) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setTutorLevel(level),
                    className: `px-3 py-1 rounded-md text-xs font-bold capitalize transition ${tutorLevel === level ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-blue-700"}`,
                    children: level
                  },
                  level
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bg-slate-100 border border-slate-200 rounded-xl p-2.5 mb-3 flex items-center justify-between shrink-0", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-slate-700", children: "Font Size" }),
                /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-slate-200", children: [
                  { key: "sm", label: "小" },
                  { key: "base", label: "中" },
                  { key: "lg", label: "大" },
                  { key: "xl", label: "特大" }
                ].map((size) => /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setChatFontSize(size.key),
                    className: `px-2.5 py-1 rounded-md text-xs font-bold transition ${chatFontSize === size.key ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-blue-700"}`,
                    children: size.label
                  },
                  size.key
                )) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: `bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-3 flex-grow mb-3 ${getFontSizeClass()}`, children: [
                tutorMessages.map((msg, idx) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
                    children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: `max-w-[95%] p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                        children: msg.role === "user" ? /* @__PURE__ */ jsxs("div", { children: [
                          msg.content,
                          msg.imageUrl && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: msg.imageUrl,
                              alt: "User Upload",
                              className: "rounded-lg max-w-full max-h-36 object-cover cursor-pointer",
                              onClick: () => setModalImageSrc(msg.imageUrl || null)
                            }
                          ) })
                        ] }) : /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "ai-markdown-content overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-slate-200 [&_td]:p-2",
                              dangerouslySetInnerHTML: { __html: msg.content }
                            }
                          ),
                          msg.imageUrl && /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: msg.imageUrl,
                              alt: "Visual Aid",
                              className: "rounded-lg max-w-full cursor-pointer hover:opacity-90 transition",
                              onClick: () => setModalImageSrc(msg.imageUrl || null)
                            }
                          ) })
                        ] })
                      }
                    )
                  },
                  idx
                )),
                isTutorLoading && /* @__PURE__ */ jsx("div", { className: "text-slate-500 italic", children: "🤖 AI Yamato is thinking & reading your answer... 📸" })
              ] }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleSendTutorMessage, className: "flex flex-col gap-2 shrink-0", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: requestVisualAid,
                      onChange: (e) => setRequestVisualAid(e.target.checked),
                      className: "rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { children: "Request Visual Aid / Diagram" })
                ] }) }),
                selectedImagePreview && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-blue-50 border border-blue-200 px-2.5 py-2 rounded-lg text-xs", children: [
                  /* @__PURE__ */ jsx("img", { src: selectedImagePreview, alt: "Preview", className: "w-8 h-8 object-cover rounded" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate flex-grow text-blue-900 font-medium", children: "Answer photo attached from dashboard" }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedImage(null);
                        setSelectedImagePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      },
                      className: "text-red-600 hover:text-red-800 font-bold px-1",
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: tutorInput,
                      onChange: (e) => setTutorInput(e.target.value),
                      placeholder: selectedImagePreview ? "Ask feedback for attached photo..." : "Ask AI tutor...",
                      disabled: isTutorLoading,
                      className: "flex-grow p-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "submit",
                      disabled: isTutorLoading || !tutorInput.trim() && !selectedImage,
                      className: "px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",
                      children: "Send"
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      ] }),
      modalImageSrc && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 z-[2147483648] bg-black/80 flex items-center justify-center p-4",
          onClick: () => setModalImageSrc(null),
          children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh]", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setModalImageSrc(null),
                className: "absolute -top-10 right-0 text-white text-xl font-bold bg-black/50 px-3 py-1 rounded-full hover:bg-black/80 transition",
                children: "✕ Close"
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: modalImageSrc,
                alt: "Enlarged View",
                className: "max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl bg-white"
              }
            )
          ] })
        }
      ),
      activeModal && modalData[activeModal] && /* @__PURE__ */ jsx(
        TextTypeModal,
        {
          isOpen: true,
          onClose: () => setActiveModal(null),
          modalKey: activeModal,
          ...modalData[activeModal]
        }
      )
    ] })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [{ title: "ヤマト API テスト画面" }];
};
function TestYamatoPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput("");
    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await fetch("https://api.jptutoraiyamato.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          // 今回のユーザーメッセージ
          history: messages,
          // 過去の会話履歴
          appType: "general",
          // テスト用（"writing" や "oral" にも変更可能）
          learningPace: "normal",
          userNickname: "生徒さん"
        })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error((errData == null ? void 0 : errData.error) || "APIエラーが発生しました");
      }
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `エラー：${err.message || "ヤマトとの通信に失敗しました。"}` }
      ]);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { style: { maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif", padding: "20px" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "🇯🇵 ヤマト API 動作テスト" }),
    /* @__PURE__ */ jsx("p", { style: { color: "#666", fontSize: "14px" }, children: "Socraticな指導ペルソナが正しく機能しているかテストします（接続先: api.jptutoraiyamato.com）。" }),
    /* @__PURE__ */ jsxs("div", { style: { border: "1px solid #ccc", borderRadius: "8px", height: "400px", overflowY: "auto", padding: "16px", marginBottom: "16px", background: "#f9f9f9" }, children: [
      messages.length === 0 && /* @__PURE__ */ jsx("p", { style: { color: "#996", textAlign: "center", marginTop: "150px" }, children: "何か話しかけてみてください（例：「先生、この文法が分かりません」）" }),
      messages.map((m, i) => /* @__PURE__ */ jsx("div", { style: { marginBottom: "12px", textAlign: m.role === "user" ? "right" : "left" }, children: /* @__PURE__ */ jsx("span", { style: { display: "inline-block", padding: "10px 14px", borderRadius: "12px", background: m.role === "user" ? "#0070f3" : "#e5e5ea", color: m.role === "user" ? "#fff" : "#000", maxWidth: "80%", textAlign: "left", whiteSpace: "pre-wrap" }, children: m.content }) }, i)),
      loading && /* @__PURE__ */ jsx("p", { style: { color: "#666", fontSize: "12px", fontStyle: "italic" }, children: "ヤマトが考えています..." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: sendMessage, style: { display: "flex", gap: "8px" }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "ヤマトにメッセージを入力...",
          style: { flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }
        }
      ),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, style: { padding: "10px 20px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }, children: "送信" })
    ] })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TestYamatoPage,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function IgoBoard() {
  const SIZE = 5;
  const [board, setBoard] = useState(
    Array(SIZE).fill(null).map(() => Array(SIZE).fill(0))
  );
  const [turn, setTurn] = useState(1);
  const [message, setMessage] = useState("黒の番です");
  const handleIntersectionClick = (row, col) => {
    if (board[row][col] !== 0) return;
    const newBoard = board.map(
      (r, rIdx) => r.map((cell, cIdx) => rIdx === row && cIdx === col ? turn : cell)
    );
    setBoard(newBoard);
    if (turn === 1) {
      setTurn(2);
      setMessage("白の番です");
    } else {
      setTurn(1);
      setMessage("黒の番です");
    }
  };
  const resetGame = () => {
    setBoard(Array(SIZE).fill(null).map(() => Array(SIZE).fill(0)));
    setTurn(1);
    setMessage("黒の番です");
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-2", children: "ミニ5路 囲碁" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-4", children: message }),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-[#e6c280] p-6 rounded shadow-lg w-64 h-64 flex items-center justify-center mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-6 grid grid-cols-4 grid-rows-4 pointer-events-none", children: Array(16).fill(0).map((_, i) => /* @__PURE__ */ jsx("div", { className: "border border-amber-900" }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-4 grid grid-cols-5 grid-rows-5", children: board.map(
        (row, rIdx) => row.map((cell, cIdx) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => handleIntersectionClick(rIdx, cIdx),
            className: "relative flex items-center justify-center cursor-pointer group",
            children: [
              cell === 0 && /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-transparent group-hover:bg-amber-900/30 transition-colors" }),
              cell === 1 && /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-black shadow-md" }),
              cell === 2 && /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-white border border-gray-400 shadow-md" })
            ]
          },
          `${rIdx}-${cIdx}`
        ))
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: resetGame,
        className: "px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded font-medium transition-colors cursor-pointer",
        children: "リセット"
      }
    )
  ] });
}
function IgoRoute() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#f4f1ea] pb-16", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "max-w-xl mx-auto px-4 pt-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-lg shadow-md", children: /* @__PURE__ */ jsx(IgoBoard, {}) }) })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: IgoRoute
}, Symbol.toStringTag, { value: "Module" }));
function Prices() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    document.title = "Pricing & Plans - JP Tutor AI Yamato";
    const savedTheme = localStorage.getItem("theme");
    const isDarkModeActive = savedTheme === "dark" || !savedTheme && document.documentElement.classList.contains("dark");
    setIsDark(isDarkModeActive);
    if (isDarkModeActive) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsxs("section", { className: "pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-4 shadow-sm", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Transparent & Flexible Pricing" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4", children: "Plans & Pricing Options" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed", children: "Choose an all-in-one package for maximum value, or select individual applications tailored precisely to your goals." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }),
            /* @__PURE__ */ jsx("span", { children: "Recommended Packages (All-in-One)" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1", children: "The smartest way to get complete coverage for your Japanese learning journey." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-slate-500 uppercase tracking-wider mb-2", children: "Free" }),
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-4", children: [
                "$0 ",
                /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-slate-500", children: "/ forever" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed", children: "Access to traditional games, Genkoyoshi editor, and basic community features." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }),
                  " Free Traditional Games (Go, Hanafuda)"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }),
                  " Genkoyoshi Grid & PDF Tool"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/",
                className: "w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center transition-all",
                children: "Get Started Free"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2", children: "Junior Years" }),
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-4", children: [
                "$98 ",
                /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-slate-500", children: "/ year" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed", children: "Foundational modules and interactive vocabulary building for Year 7-10 students." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-indigo-500 flex-shrink-0" }),
                  " Year 7-10 Curriculum Support"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-indigo-500 flex-shrink-0" }),
                  " Interactive Vocab & Audio Drills"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800/60 text-slate-400 text-center cursor-not-allowed", children: "Coming Soon" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-indigo-900 to-slate-900 rounded-3xl p-6 border-2 border-indigo-500 text-white flex flex-col justify-between shadow-xl relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider", children: "Best Value 🌟" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2", children: "VCE Senior Pass" }),
              /* @__PURE__ */ jsxs("div", { className: "text-3xl font-extrabold text-white mb-4", children: [
                "$198 ",
                /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-indigo-200", children: "/ year" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-indigo-200 mb-6 leading-relaxed", children: "All-in-one package for Year 11-12 students. Complete exam prep & unlimited coaching." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-indigo-100 mb-6", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-400 flex-shrink-0" }),
                  " Full VCE Writing AI Tutor (110 Qs)"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-400 flex-shrink-0" }),
                  " VCE Oral Exam Audio Hub & AI Practice"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-emerald-400 flex-shrink-0" }),
                  " Unlimited AI Yamato Chat Coaching"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://vceeoywriting.jptutoraiyamato.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white text-center shadow-md transition-all flex items-center justify-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Select VCE Senior Pass" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2", children: "School License" }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-extrabold text-slate-900 dark:text-white mb-4", children: "Custom" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed", children: "Enterprise solution for Japanese language departments and classroom teachers." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-purple-500 flex-shrink-0" }),
                  " Multi-Student Access & Teacher Dashboard"
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-purple-500 flex-shrink-0" }),
                  " Priority Support & Custom Setup"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:support@jptutoraiyamato.com",
                className: "w-full py-3 px-4 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white text-center transition-all",
                children: "Contact for School"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12", children: /* @__PURE__ */ jsx("div", { className: "border-t border-slate-200 dark:border-slate-800" }) }),
      /* @__PURE__ */ jsxs("section", { id: "alacarte", className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium mb-3", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx("span", { children: "A La Carte Options" })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight", children: "Individual App & Module Purchase Menu" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto", children: "Looking for a specific feature only? Purchase individual apps separately. (Tip: Adding just $68 more gives you the full VCE Senior Pass above!)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white", children: [
                  "$130 ",
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-slate-500", children: "/ year" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-2", children: "VCE Oral Exam AI Tutor Module" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6", children: "Specialised oral exam simulation featuring Whisper speech-to-text, interactive examiner questions, and AI audio feedback." })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://vceeoywriting.jptutoraiyamato.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-center transition-all flex items-center justify-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Buy Oral Exam App Only ($130)" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold", children: /* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { className: "text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white", children: [
                  "$130 ",
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-slate-500", children: "/ year" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-slate-900 dark:text-white mb-2", children: "VCE Writing AI Tutor Module" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6", children: "Complete access to 110 original writing questions, handwriting photo evaluation, and detailed VCE-aligned grammar checking." })
            ] }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://vceeoywriting.jptutoraiyamato.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-center transition-all flex items-center justify-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Buy Writing App Only ($130)" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 py-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " JP Tutor AI Yamato. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex space-x-6 mt-4 sm:mt-0", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-slate-700 dark:hover:text-slate-400 transition-colors", children: "Home" }),
        /* @__PURE__ */ jsx("span", { className: "hover:text-slate-700 dark:hover:text-slate-400 transition-colors", children: "Powered by AI Yamato" })
      ] })
    ] }) })
  ] });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Prices
}, Symbol.toStringTag, { value: "Module" }));
const SUPABASE_URL = "https://ybquwzoreecxxbewjpdn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_kxxOp7nY3OuRNYp_Cxl5Sw_QtVCG_te";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
async function signUpAndRegisterPasskey(email) {
  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    throw new Error("Please enter your email address.");
  }
  const tempPassword = Math.random().toString(36).slice(-8) + "Aa1!";
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: trimmedEmail,
    password: tempPassword
  });
  if (signUpError) throw signUpError;
  if (!signUpData.session) {
    throw new Error(
      "Account created successfully, but auth session failed to initialize. Please sign in again."
    );
  }
  const { error: registerError } = await supabase.auth.registerPasskey();
  if (registerError) throw registerError;
  return true;
}
async function signInWithPasskey() {
  const { error } = await supabase.auth.signInWithPasskey();
  if (error) throw error;
  return true;
}
const STRIPE_PRICES = {
  starter: "price_1UOmko2ZJezqyZ9eR0l8cvUk",
  standard: "price_1xxxx_standard",
  pro: "price_1xxxx_pro"
};
const DEMO_CONVERSATIONS = [
  {
    user: "How do I practice Japanese writing?",
    yamato: "Hello!🌸 You can use our EOY Writing Exam Tutor with 110 original prompts, Genkoyoshi layout tools, and instant AI feedback."
  },
  {
    user: "Can I practice oral conversations here?",
    yamato: "Yes! Our EOY Oral Mock Exam module provides realistic voice interaction and real-time AI examiner scoring."
  },
  {
    user: "How do credits work?",
    yamato: "Chats and vocabulary Q&A cost 1-2 credits. You also get daily free credits upon login, or you can top up anytime!"
  }
];
function formatAiOutput(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />");
}
function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(10);
  const [checkoutLoadingPriceId, setCheckoutLoadingPriceId] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [emailInput, setEmailInput] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedUserText, setDisplayedUserText] = useState("");
  const [displayedYamatoText, setDisplayedYamatoText] = useState("");
  const [isTypingYamato, setIsTypingYamato] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAiFullscreen, setIsAiFullscreen] = useState(false);
  const aiChatRef = useRef(null);
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm AI Yamato (やまと先生). Have any questions about the Japanese language, grammar, kanji, or Japanese culture? Ask me anything!"
    }
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [requestVisualAid, setRequestVisualAid] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(null);
  const [tutorLevel, setTutorLevel] = useState("steady");
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleAiFullscreen = async () => {
    if (!aiChatRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await aiChatRef.current.requestFullscreen();
        setIsAiFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsAiFullscreen(false);
      }
    } catch (err) {
      console.error("Fullscreen toggle failed:", err);
    }
  };
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsAiFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const handleSendTutorMessage = async (e) => {
    e.preventDefault();
    if (!tutorInput.trim() || isTutorLoading) return;
    const userMsg = tutorInput.trim();
    const needsVisual = requestVisualAid;
    setTutorInput("");
    setRequestVisualAid(false);
    const newMessages = [...tutorMessages, { role: "user", content: userMsg }];
    setTutorMessages(newMessages);
    setIsTutorLoading(true);
    try {
      const visualPrompt = needsVisual ? `Educational instructional diagram and visual aid for Japanese language learners explaining: ${userMsg}. Clean layout, high quality, professional illustration style.` : void 0;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          chatHistory: tutorMessages,
          learningPace: tutorLevel,
          requestVisualAid: needsVisual,
          // ★ チェックボックスのON/OFFフラグを明示的送信
          visualPrompt,
          appType: "general"
        })
      });
      if (!response.ok) {
        throw new Error("Failed to get response from AI tutor");
      }
      const data = await response.json();
      const replyText = data.reply || "I'm here to help you with your Japanese studies!";
      const imageUrl = data.imageUrl;
      const formattedReply = formatAiOutput(replyText);
      setTutorMessages([
        ...newMessages,
        {
          role: "assistant",
          content: formattedReply,
          imageUrl
        }
      ]);
    } catch (err) {
      console.error(err);
      setTutorMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I encountered an error. Please try asking again!" }
      ]);
    } finally {
      setIsTutorLoading(false);
    }
  };
  useEffect(() => {
    const currentConv = DEMO_CONVERSATIONS[currentStep];
    let timeout;
    if (displayedUserText.length < currentConv.user.length) {
      timeout = setTimeout(() => {
        setDisplayedUserText(currentConv.user.slice(0, displayedUserText.length + 1));
      }, 45);
    } else if (!isTypingYamato && displayedYamatoText.length === 0) {
      timeout = setTimeout(() => {
        setIsTypingYamato(true);
      }, 350);
    } else if (isTypingYamato && displayedYamatoText.length < currentConv.yamato.length) {
      timeout = setTimeout(() => {
        setDisplayedYamatoText(currentConv.yamato.slice(0, displayedYamatoText.length + 1));
      }, 25);
    } else if (isTypingYamato && displayedYamatoText.length === currentConv.yamato.length) {
      timeout = setTimeout(() => {
        setDisplayedUserText("");
        setDisplayedYamatoText("");
        setIsTypingYamato(false);
        setCurrentStep((prev) => (prev + 1) % DEMO_CONVERSATIONS.length);
      }, 3e3);
    }
    return () => clearTimeout(timeout);
  }, [displayedUserText, displayedYamatoText, isTypingYamato, currentStep]);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get("success") === "true") {
      alert("Payment successful! Your credits have been updated.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser((session == null ? void 0 : session.user) ?? null);
      if (session == null ? void 0 : session.user) {
        fetchUserCredits(session.user.id);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser((session == null ? void 0 : session.user) ?? null);
      if (session == null ? void 0 : session.user) {
        fetchUserCredits(session.user.id);
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  const fetchUserCredits = async (userId) => {
    try {
      const { data, error } = await supabase.from("profiles").select("credits").eq("id", userId).single();
      if (data && !error) {
        setCredits(data.credits ?? 10);
      }
    } catch (err) {
      console.error("Failed to fetch credits:", err);
    }
  };
  const handlePasskeyAuth = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      if (authMode === "signup") {
        if (!emailInput) {
          throw new Error("Please enter your email address for passkey registration.");
        }
        await signUpAndRegisterPasskey(emailInput);
        alert("Passkey registration successful! Welcome to AI Yamato.");
      } else {
        await signInWithPasskey();
        alert("Passkey sign in successful!");
      }
      setIsAuthModalOpen(false);
      setEmailInput("");
    } catch (err) {
      console.error(err);
      setAuthError(err.message || "Passkey authentication failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  const handleCheckout = async (priceId) => {
    if (!user) {
      setAuthMode("signup");
      setIsAuthModalOpen(true);
      return;
    }
    try {
      setCheckoutLoadingPriceId(priceId);
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          priceId,
          userId: user.id
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert(`Checkout error: ${err.message || "Please try again."}`);
    } finally {
      setCheckoutLoadingPriceId(null);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `min-h-screen font-sans ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"} transition-colors duration-300 relative flex flex-col justify-between`, children: [
    /* @__PURE__ */ jsx("header", { className: `sticky top-0 z-50 backdrop-blur-md border-b ${isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-blue-600", children: /* @__PURE__ */ jsx("img", { src: "/jptutoraiyamato.png", alt: "AI Yamato Logo", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxs("span", { className: "font-extrabold tracking-tight text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: [
          "JP Tutor AI ",
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold ml-1", children: "Yamato" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        user ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("div", { className: `flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${isDarkMode ? "bg-slate-800 border-slate-700 text-amber-400" : "bg-amber-50 border-amber-200 text-amber-700"}`, children: [
            /* @__PURE__ */ jsx(Coins, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Credits: ",
              credits
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleSignOut,
              className: `text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all flex items-center space-x-1 ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`,
              children: [
                /* @__PURE__ */ jsx(LogOut, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Sign Out" })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setAuthMode("signin");
                setIsAuthModalOpen(true);
              },
              className: `text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all flex items-center space-x-1 ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-200" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`,
              children: [
                /* @__PURE__ */ jsx(KeyRound, { className: "w-3.5 h-3.5 text-blue-500" }),
                /* @__PURE__ */ jsx("span", { children: "Passkey Sign In" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setAuthMode("signup");
                setIsAuthModalOpen(true);
              },
              className: "text-xs font-semibold px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all flex items-center space-x-1",
              children: [
                /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "Register Passkey" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: `text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${isDarkMode ? "border-slate-700 hover:bg-slate-800 text-slate-200" : "border-slate-200 hover:bg-slate-100 text-slate-700"}`, children: "Pricing & Plans" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsDarkMode(!isDarkMode),
            className: `p-2 rounded-full border transition-all ${isDarkMode ? "border-slate-700 bg-slate-800 text-amber-400" : "border-slate-200 bg-slate-100 text-slate-600"}`,
            "aria-label": "Toggle Theme",
            children: isDarkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Moon, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsx("span", { children: "AI Yamato" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 flex-grow w-full", children: [
      /* @__PURE__ */ jsxs("section", { className: "text-center space-y-6 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-sm", children: [
          /* @__PURE__ */ jsx(Award, { className: "w-3.5 h-3.5 text-blue-600" }),
          /* @__PURE__ */ jsx("span", { children: "Decades of Expertise in Japanese Language Education" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-6xl font-black tracking-tight leading-tight", children: [
          "Your Gateway to ",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent", children: "Japanese Mastery" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: `text-base sm:text-lg max-w-2xl mx-auto ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Backed by decades of expert classroom teaching, now available to learners worldwide. Experience precision AI-driven Japanese tutoring tailored to your unique goals." }),
        /* @__PURE__ */ jsxs("div", { className: `mt-8 p-4 sm:p-6 rounded-2xl border shadow-2xl backdrop-blur-sm ${isDarkMode ? "bg-slate-900/95 border-slate-800" : "bg-white border-slate-200"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 mb-4 border-b border-slate-700/20", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold", children: "侍" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: "AI Yamato (Auto Demo)" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-medium animate-pulse", children: "● Live Demo" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-slate-400 bg-slate-500/10 px-2.5 py-1 rounded-md", children: [
              "Step ",
              currentStep + 1,
              " / ",
              DEMO_CONVERSATIONS.length
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-slate-500/5 p-2.5 rounded-xl mb-4 text-xs font-medium", children: [
            /* @__PURE__ */ jsx("span", { className: "text-slate-500", children: "Auto Playback Preview" }),
            /* @__PURE__ */ jsx("div", { className: "flex space-x-1 bg-slate-500/10 p-1 rounded-lg", children: /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded bg-blue-600 text-white shadow-sm", children: "Zero API Cost" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-[85%] p-3.5 rounded-2xl rounded-tr-sm text-xs sm:text-sm shadow-sm text-left bg-blue-600 text-white font-medium", children: /* @__PURE__ */ jsxs("p", { children: [
            displayedUserText,
            /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-3 ml-0.5 bg-white animate-pulse" })
          ] }) }) }),
          /* @__PURE__ */ jsxs("div", { className: `p-4 rounded-xl flex items-start space-x-3 mb-4 text-left ${isDarkMode ? "bg-slate-800/60" : "bg-blue-50/50"}`, children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs", children: "侍" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm space-y-1", children: /* @__PURE__ */ jsxs("p", { className: "font-medium leading-relaxed", children: [
              displayedYamatoText,
              isTypingYamato && displayedYamatoText.length < DEMO_CONVERSATIONS[currentStep].yamato.length && /* @__PURE__ */ jsx("span", { className: "inline-block w-1.5 h-3.5 ml-0.5 bg-blue-500 animate-pulse" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between border border-slate-500/30 rounded-xl p-3 bg-slate-500/5 text-sm gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-500 px-2 text-center sm:text-left", children: [
              /* @__PURE__ */ jsx("span", { children: "🚀" }),
              /* @__PURE__ */ jsx("span", { children: "Want to ask Yamato your own questions?" })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setAuthMode("signup");
                  setIsAuthModalOpen(true);
                },
                className: "px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap",
                children: [
                  /* @__PURE__ */ jsx("span", { children: "Launch App (Free Register)" }),
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-12 text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold tracking-tight", children: "Choose Your Plan & Credit Packs" }),
          /* @__PURE__ */ jsx("p", { className: `text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Start for free with daily credits, or top up with prepaid charge packs for intensive study." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left", children: [
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-500", children: "Free Plan" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-black", children: "\\$0" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 ml-1", children: "/ forever" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold", children: "Daily 2 Free Credits" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Recharged daily upon login. Enjoy basic chat, traditional games, and Genkoyoshi editor tools." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-slate-600 dark:text-slate-300", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Daily Login Credits" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Free Traditional Games & Tools" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setAuthMode("signup");
                  setIsAuthModalOpen(true);
                },
                className: "mt-6 w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer",
                children: "Get Started Free"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-blue-600", children: "Starter Pack" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-black", children: "\\$10" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 ml-1", children: "AUD" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold", children: "1,000 Credits" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Great for beginners. Ideal for a few essay corrections or voice roleplay sessions." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-slate-600 dark:text-slate-300", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Standard AI Chat & Q&A" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Pay-as-you-go flexibility" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleCheckout(STRIPE_PRICES.starter),
                disabled: checkoutLoadingPriceId === STRIPE_PRICES.starter,
                className: "mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer",
                children: [
                  checkoutLoadingPriceId === STRIPE_PRICES.starter && /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }),
                  /* @__PURE__ */ jsx("span", { children: "Buy Starter Pack" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border-2 border-blue-600 flex flex-col justify-between relative ${isDarkMode ? "bg-slate-900" : "bg-white"} shadow-xl`, children: [
            /* @__PURE__ */ jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-full", children: "Most Popular" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-blue-600", children: "Standard Pack" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-black", children: "\\$25" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 ml-1", children: "AUD" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "inline-block px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-bold", children: "2,800 Credits (Approx. 10% Bonus)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Our most popular choice. Perfect for regular study routines and test preparation." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-slate-600 dark:text-slate-300", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "10% Bonus Credit Value" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-blue-600" }),
                  /* @__PURE__ */ jsx("span", { children: "Regular Study & Test Practice" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleCheckout(STRIPE_PRICES.standard),
                disabled: checkoutLoadingPriceId === STRIPE_PRICES.standard,
                className: "mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer",
                children: [
                  checkoutLoadingPriceId === STRIPE_PRICES.standard && /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }),
                  /* @__PURE__ */ jsx("span", { children: "Buy Standard Pack" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-purple-600", children: "Pro Intensivist" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-4xl font-black", children: "\\$50" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500 ml-1", children: "AUD" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "inline-block px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 text-xs font-bold", children: "6,000 Credits (Approx. 20% Bonus)" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "For heavy users and premium-intensive drills. Maximum value with 20% bonus credits." }),
              /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-xs text-slate-600 dark:text-slate-300", children: [
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-purple-600" }),
                  /* @__PURE__ */ jsx("span", { children: "20% Bonus Credit Value" })
                ] }),
                /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-purple-600" }),
                  /* @__PURE__ */ jsx("span", { children: "VCE Exam Prep & Essays" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => handleCheckout(STRIPE_PRICES.pro),
                disabled: checkoutLoadingPriceId === STRIPE_PRICES.pro,
                className: "mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-600/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer",
                children: [
                  checkoutLoadingPriceId === STRIPE_PRICES.pro && /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }),
                  /* @__PURE__ */ jsx("span", { children: "Buy Pro Pack" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `max-w-2xl mx-auto p-4 rounded-2xl border text-xs ${isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200"} shadow-sm`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center space-x-2 font-bold mb-3", children: [
            /* @__PURE__ */ jsx(Coins, { className: "w-4 h-4 text-amber-500" }),
            /* @__PURE__ */ jsx("span", { children: "Credit Consumption Guide" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-slate-500", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-slate-500/10 pb-1.5", children: [
              /* @__PURE__ */ jsx("span", { children: "Text Chat (Q&A / Vocabulary)" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700 dark:text-slate-300", children: "1-2 credits / turn" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-slate-500/10 pb-1.5", children: [
              /* @__PURE__ */ jsx("span", { children: "Essay / Genkoyoshi Correctors" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700 dark:text-slate-300", children: "20-30 credits / session" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-b border-slate-500/10 pb-1.5", children: [
              /* @__PURE__ */ jsx("span", { children: "Oral Exam / Voice Roleplay" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-700 dark:text-slate-300", children: "15-25 credits / min" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between pt-0.5", children: [
              /* @__PURE__ */ jsx("span", { children: "Mini Games & Drills" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-emerald-600", children: "Free / 0.5 credits" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-extrabold tracking-tight", children: "Portal Pages & Modules" }),
          /* @__PURE__ */ jsx("p", { className: `text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`, children: "Direct access to all specialized exam prep modules, tools, and pricing pages." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-blue-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "EOY Oral Drill" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Targeted practice drills focusing on conversational fluidity and pronunciation for VCE oral exams." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Module" }),
              /* @__PURE__ */ jsxs("a", { href: "/eoy-oral-drill", className: "text-blue-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "Open Page" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-blue-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "EOY Oral Elaboration" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Deep-dive elaboration strategies and AI-assisted vocabulary building for Section 2 Detailed Study." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Module" }),
              /* @__PURE__ */ jsxs("a", { href: "/eoy-oral-elaborate", className: "text-indigo-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "Open Page" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-blue-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "EOY Oral Mock Exam" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Full-length simulated VCE oral exam environment with real-time AI examiner evaluation and scoring." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Module" }),
              /* @__PURE__ */ jsxs("a", { href: "/eoy-oral-mock", className: "text-purple-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "Open Page" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-pink-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "EOY Writing Exam Tutor" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Comprehensive writing exam practice suite featuring 110 original prompts and structured feedback." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Module" }),
              /* @__PURE__ */ jsxs("a", { href: "/eoy-writing", className: "text-pink-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "Open Page" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-emerald-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Gamepad2, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "Go (Igo) Mini Game" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Traditional Japanese board game mini-app with AI play modes to relax and build strategic thinking." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Mini Game" }),
              /* @__PURE__ */ jsxs("a", { href: "/game-igo", className: "text-emerald-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "Open Game" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-amber-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Grid, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "Genkoyoshi Editor" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Digital manuscript paper editor for precise Japanese character layout, counting, and PDF export." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Free Tool" }),
              /* @__PURE__ */ jsxs("a", { href: "/genkoyoshi-editor", className: "text-amber-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "Open Editor" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-blue-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "Oral Exam Questions" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Curated database of official and practice VCE oral examination questions with audio samples." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Reference" }),
              /* @__PURE__ */ jsxs("a", { href: "/oral-exam-questions", className: "text-blue-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "View Questions" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `p-6 rounded-3xl border flex flex-col justify-between ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} shadow-sm hover:border-purple-500/50 transition-colors`, children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center", children: /* @__PURE__ */ jsx(Coins, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-base", children: "Pricing & Plans Page" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500 leading-relaxed", children: "Dedicated standalone pricing and credit pack selection page with detailed feature breakdowns." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 pt-4 border-t border-slate-500/10 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "text-slate-400 font-medium", children: "Billing" }),
              /* @__PURE__ */ jsxs("a", { href: "/prices", className: "text-purple-600 font-bold flex items-center space-x-1 hover:underline cursor-pointer", children: [
                /* @__PURE__ */ jsx("span", { children: "View Pricing" }),
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-sm", children: [
        /* @__PURE__ */ jsx(Gamepad2, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { children: "Play & Learn" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("aside", { "aria-label": "AI Yamato", className: "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3", children: [
      showScrollTop && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: scrollToTop,
          className: "bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg transition-all cursor-pointer text-sm flex items-center justify-center",
          title: "Scroll to top",
          children: "⬆️"
        }
      ),
      !isAiTutorOpen ? /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsAiTutorOpen(true),
          className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm",
          children: [
            /* @__PURE__ */ jsx("span", { children: "🤖" }),
            /* @__PURE__ */ jsx("span", { children: "AI Yamato" })
          ]
        }
      ) : /* @__PURE__ */ jsx(
        "div",
        {
          ref: aiChatRef,
          className: `bg-white border-2 border-emerald-300 rounded-2xl p-5 shadow-2xl flex flex-col transition-all ${isAiFullscreen ? "w-screen h-screen rounded-none border-none p-6 sm:p-10 overflow-auto" : "w-80 sm:w-96 h-[500px] min-w-[280px] min-h-[350px] max-w-[90vw] max-h-[85vh] resize overflow-auto [transform:rotate(180deg)]"}`,
          children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full flex flex-col ${!isAiFullscreen ? "[transform:rotate(180deg)]" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-2 mb-3 shrink-0", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-emerald-900 flex items-center gap-2 m-0", children: [
                /* @__PURE__ */ jsx("span", { children: "🤖" }),
                " 日本語Tutor AI Yamato"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: toggleAiFullscreen,
                    className: "text-slate-500 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer border border-slate-200",
                    title: isAiFullscreen ? "元の大きさに戻す" : "デバイスの画面に合わせて最大化",
                    children: isAiFullscreen ? "🗗 縮小" : "🗖 最大化"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      if (document.fullscreenElement) {
                        document.exitFullscreen().catch(() => {
                        });
                      }
                      setIsAiTutorOpen(false);
                      setIsAiFullscreen(false);
                    },
                    className: "text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer",
                    children: "✕ Close"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 leading-relaxed mb-3 shrink-0", children: "Ask questions about Japanese language, grammar, kanji, or culture!" }),
            /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mb-3 flex items-center justify-between shrink-0", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-emerald-900", children: "Learning Pace" }),
              /* @__PURE__ */ jsx("div", { className: "inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-emerald-200", children: ["steady", "normal", "accelerated"].map((level) => /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTutorLevel(level),
                  className: `px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition ${tutorLevel === level ? "bg-emerald-600 text-white shadow-xs" : "text-slate-600 hover:text-emerald-700"}`,
                  children: level
                },
                level
              )) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-2.5 flex-grow mb-3", children: [
              tutorMessages.map((msg, idx) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
                  children: /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `max-w-[95%] p-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-emerald-600 text-white rounded-br-xs" : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,
                      children: msg.role === "user" ? msg.content : /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "ai-markdown-content overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-1.5 [&_th]:text-left [&_td]:border [&_td]:border-slate-200 [&_td]:p-1.5",
                            dangerouslySetInnerHTML: { __html: msg.content }
                          }
                        ),
                        msg.imageUrl && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg overflow-hidden border border-emerald-200 bg-emerald-50/50 p-1", children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: msg.imageUrl,
                              alt: "AI Yamato Visual Explanation",
                              onClick: () => setModalImageSrc(msg.imageUrl || null),
                              className: "w-full h-auto rounded-md object-contain max-h-48 cursor-pointer hover:opacity-95 transition",
                              title: "クリックして画像を拡大"
                            }
                          ),
                          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-800 text-center mt-1 font-medium cursor-pointer", onClick: () => setModalImageSrc(msg.imageUrl || null), children: "✨ ヤマト特製図解・イラスト（クリックして拡大）" })
                        ] })
                      ] })
                    }
                  )
                },
                idx
              )),
              isTutorLoading && /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500 italic", children: "🤖 AI Yamato is thinking (and creating visual illustration)..." })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSendTutorMessage, className: "flex flex-col gap-2 shrink-0", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 px-1", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 cursor-pointer select-none", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: requestVisualAid,
                    onChange: (e) => setRequestVisualAid(e.target.checked),
                    disabled: isTutorLoading,
                    className: "rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                  }
                ),
                /* @__PURE__ */ jsx("span", { children: "🎨 explain with diagrams and illustrations" })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: tutorInput,
                    onChange: (e) => setTutorInput(e.target.value),
                    placeholder: "Ask AI tutor anything...",
                    disabled: isTutorLoading,
                    className: "flex-grow p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: isTutorLoading || !tutorInput.trim(),
                    className: "px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",
                    children: "Send"
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    ] }),
    modalImageSrc && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4",
        onClick: () => setModalImageSrc(null),
        children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-2 shadow-2xl flex flex-col items-center", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setModalImageSrc(null),
              className: "absolute top-3 right-3 bg-slate-800/70 hover:bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition cursor-pointer z-10",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: modalImageSrc,
              alt: "Enlarged AI Yamato Visual",
              className: "max-w-full max-h-[80vh] rounded-lg object-contain"
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-600 mt-2 font-medium", children: "✨ ヤマト特製図解・イラスト（拡大表示）" })
        ] })
      }
    ),
    isAuthModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxs("div", { className: `w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl relative ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-200 text-slate-900"}`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsAuthModalOpen(false),
          className: "absolute top-5 right-5 p-2 rounded-full hover:bg-slate-500/10 transition-colors text-slate-400 cursor-pointer",
          children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30", children: /* @__PURE__ */ jsx(KeyRound, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-extrabold tracking-tight", children: authMode === "signup" ? "Create Account with Passkey" : "Sign In with Passkey" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: authMode === "signup" ? "Register securely using biometrics, Touch ID, Face ID, or a security key." : "Authenticate instantly with your registered biometric passkey." })
        ] }),
        authError && /* @__PURE__ */ jsx("div", { className: "p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium", children: authError }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handlePasskeyAuth, className: "space-y-4", children: [
          authMode === "signup" && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5 text-left", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-slate-500", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                required: true,
                placeholder: "your.email@school.vic.edu.au",
                value: emailInput,
                onChange: (e) => setEmailInput(e.target.value),
                className: `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${isDarkMode ? "bg-slate-800 border-slate-700 focus:border-blue-500 text-slate-100" : "bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-900"}`
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: authLoading,
              className: "w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(ShieldCheck, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: authLoading ? "Verifying Passkey..." : authMode === "signup" ? "Register Passkey" : "Sign In" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-center text-xs", children: authMode === "signup" ? /* @__PURE__ */ jsxs("p", { className: "text-slate-500", children: [
          "Already have a passkey?",
          " ",
          /* @__PURE__ */ jsx("button", { onClick: () => setAuthMode("signin"), className: "text-blue-600 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer", children: "Sign In" })
        ] }) : /* @__PURE__ */ jsxs("p", { className: "text-slate-500", children: [
          "New to AI Yamato?",
          " ",
          /* @__PURE__ */ jsx("button", { onClick: () => setAuthMode("signup"), className: "text-blue-600 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer", children: "Create Account" })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: `border-t py-8 text-center text-xs text-slate-500 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`, children: /* @__PURE__ */ jsx("p", { children: "© 2026 JP Tutor AI Yamato. All rights reserved." }) })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  STRIPE_PRICES,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-QgImKjH1.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/components-iyMch4aB.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-C3dyei9H.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/components-iyMch4aB.js"], "css": ["/assets/root-DJMmChcT.css"] }, "routes/oral-exam-questions": { "id": "routes/oral-exam-questions", "parentId": "root", "path": "oral-exam-questions", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/oral-exam-questions-B8oTyybr.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/oral-exam-questions-CpFNa1O_.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/eoy-oral-elaborate": { "id": "routes/eoy-oral-elaborate", "parentId": "root", "path": "eoy-oral-elaborate", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/eoy-oral-elaborate-DiC1RNki.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/oral-exam-questions-CpFNa1O_.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/genkoyoshi-editor": { "id": "routes/genkoyoshi-editor", "parentId": "root", "path": "genkoyoshi-editor", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/genkoyoshi-editor-BVPyhCf_.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/eoy-oral-drill": { "id": "routes/eoy-oral-drill", "parentId": "root", "path": "eoy-oral-drill", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/eoy-oral-drill-uI2dVTPP.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/oral-exam-questions-CpFNa1O_.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/eoy-oral-mock": { "id": "routes/eoy-oral-mock", "parentId": "root", "path": "eoy-oral-mock", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/eoy-oral-mock-i8EyFKwr.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/eoy-writing": { "id": "routes/eoy-writing", "parentId": "root", "path": "eoy-writing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/eoy-writing-BFZTEudw.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/test-yamato": { "id": "routes/test-yamato", "parentId": "root", "path": "test-yamato", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/test-yamato-jWuWvqCG.js", "imports": ["/assets/index-8NflKPZb.js"], "css": [] }, "routes/game-igo": { "id": "routes/game-igo", "parentId": "root", "path": "game-igo", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/game-igo-BQD0EZuK.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/header-CPDPlMra.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/prices": { "id": "routes/prices", "parentId": "root", "path": "prices", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/prices-ChpVN2IN.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/header-CPDPlMra.js", "/assets/sparkles-C61ajk4e.js", "/assets/components-iyMch4aB.js", "/assets/coins-BrjBTC8G.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BkO0c-Lo.js", "imports": ["/assets/index-8NflKPZb.js", "/assets/coins-BrjBTC8G.js", "/assets/sparkles-C61ajk4e.js"], "css": [] } }, "url": "/assets/manifest-582b61fd.js", "version": "582b61fd" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/oral-exam-questions": {
    id: "routes/oral-exam-questions",
    parentId: "root",
    path: "oral-exam-questions",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/eoy-oral-elaborate": {
    id: "routes/eoy-oral-elaborate",
    parentId: "root",
    path: "eoy-oral-elaborate",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/genkoyoshi-editor": {
    id: "routes/genkoyoshi-editor",
    parentId: "root",
    path: "genkoyoshi-editor",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/eoy-oral-drill": {
    id: "routes/eoy-oral-drill",
    parentId: "root",
    path: "eoy-oral-drill",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/eoy-oral-mock": {
    id: "routes/eoy-oral-mock",
    parentId: "root",
    path: "eoy-oral-mock",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/eoy-writing": {
    id: "routes/eoy-writing",
    parentId: "root",
    path: "eoy-writing",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/test-yamato": {
    id: "routes/test-yamato",
    parentId: "root",
    path: "test-yamato",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/game-igo": {
    id: "routes/game-igo",
    parentId: "root",
    path: "game-igo",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/prices": {
    id: "routes/prices",
    parentId: "root",
    path: "prices",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
