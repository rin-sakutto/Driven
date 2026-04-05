# DRIVEN

アパレルブランド「Driven」の公式ホームページ。

## 概要

謎の集団。それだけでいい。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Hosting**: Vercel

## セクション構成

- **Hero** — 強烈な第一印象。パーティクルアニメーション背景。
- **About** — Drivenのビジョン。我々は語らない。ただ纏う。
- **Gallery** — SS25コレクション。モダンなグリッドレイアウト。
- **Contact** — 連絡フォーム。返信するかどうかは、我々が決める。

## 環境変数

| 変数名 | 必須 | 説明 |
|--------|------|------|
| `RESEND_API_KEY` | ✅ | [Resend](https://resend.com) の API キー |
| `RESEND_FROM_EMAIL` | ⚠️ 本番必須 | 送信元メールアドレス。Resend で検証済みのドメインのアドレスを設定する（例: `Driven Contact <noreply@yourdomain.com>`）。未設定時は `onboarding@resend.dev`（テスト用送信者）にフォールバックするが、その場合は Resend アカウントの登録メールアドレス宛にしか送信できないため、本番環境では必ず設定すること。 |
| `CONTACT_EMAIL` | ✅ | 問い合わせメールの受信先。複数指定する場合はカンマ区切り（例: `a@example.com,b@example.com`）。未設定時は Resend のテスト用受信アドレス `delivered@resend.dev` にフォールバックする。 |

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run start
```
