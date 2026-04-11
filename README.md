# CODE 904 / MALFUNCTION / MEAN SLIPPER

Cloudflare Pages + Pages Functions + **OpenAI API** 用の PWA です。  
画像アップロードまたはカメラ撮影から、**英語主表示 + 日本語補助表示**の疑似マニュアルを生成します。

この版は、**共通パスワードを知っている人だけ使える**構成です。  
OpenAI の API キーは **Cloudflare secret** に置き、ブラウザ側には出しません。

## できること

- 画像読込
- カメラ撮影
- OBJECT / SUBJECT モード切替
- SCAN ごとの文言生成
- TXT / JSON / JPEG CARD 書き出し
- PWA インストール
- 共通パスワードによるサーバー側アクセス制御
- OpenAI API 未設定時のローカルフォールバック

## フォルダ構成

- `index.html` — 画面本体
- `styles.css` — CRT / HUD スタイル
- `app.js` — フロントエンド処理
- `manifest.webmanifest` — PWA 設定
- `sw.js` — service worker
- `functions/api/auth.js` — パスワード検証 API
- `functions/api/generate.js` — OpenAI 生成 API
- `functions/api/health.js` — バックエンド確認 API

## Cloudflare Pages で必要なもの

Cloudflare Pages の **Environment Variables / Secrets** に、少なくとも下記を設定してください。

### Secret

- `OPENAI_API_KEY`  
  OpenAI の API キー
- `APP_PASSWORD`  
  このアプリに入るための共通パスワード

### Variable（任意）

- `OPENAI_MODEL`  
  省略時は `gpt-4.1-mini`

## デプロイ

このプロジェクトは `functions` フォルダを含むため、Wrangler でのデプロイが確実です。

```powershell
cd C:\Users\Masato\Desktop\code904
npx wrangler pages deploy . --project-name code-904
```

Cloudflare 側で secret を入れる場合の例です。

```powershell
cd C:\Users\Masato\Desktop\code904
npx wrangler pages secret put OPENAI_API_KEY --project-name code-904
npx wrangler pages secret put APP_PASSWORD --project-name code-904
```

`OPENAI_MODEL` は Cloudflare ダッシュボードの Pages > Settings > Environment variables から追加してください。

## 使い方

1. アプリを開く
2. 共通パスワードを入力して解錠
3. 画像を読み込むかカメラで撮影
4. `OBJECT` か `SUBJECT` を選ぶ
5. `SCAN` を押す
6. 右側に出力された文を `EXPORT TXT` / `EXPORT JSON` / `JPEG CARD` で保存

## セキュリティ方針

- OpenAI API キーは **Cloudflare secret** にのみ置きます
- フロントエンドには API キーを書きません
- パスワード判定は `functions/api/auth.js` と `functions/api/generate.js` 側で行います
- 人物モードは、**個人識別や属性推定をしない**ようにしています

## 注意

- 共通パスワード方式なので、知っている人同士での限定利用向けです
- より強い認証が必要なら、後で Cloudflare Access に切り替えられます
- OpenAI API が失敗した場合はローカル文言へフォールバックします
