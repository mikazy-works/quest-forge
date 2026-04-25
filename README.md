# 架空RPG職業診断

Next.js App Router + TypeScript + Supabase + Vercel で動く、ロジックベースの RPG 職業診断 MVP です。

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 必要な環境変数

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (任意: 絶対 URL 共有表示用)

診断結果の保存と取得はサーバー側の Route Handler から行うため、`SUPABASE_SERVICE_ROLE_KEY` を設定してください。

## 画面

- `/` トップページ
- `/diagnosis` 診断ページ
- `/results/[id]` 共有可能な結果ページ

## Supabase

`supabase/schema.sql` を SQL Editor に貼り付けて実行してください。

## Vercel デプロイ

1. GitHub に push
2. Vercel で import
3. 上記 3 つの環境変数を設定
4. Deploy

## 診断結果の保存でエラーが出るとき

`Missing required Supabase environment variables` が出る場合は、Supabase の接続情報が未設定です。

### ローカル開発

1. `.env.example` をコピーして `.env.local` を作成
2. 次の値を入力

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-or-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Supabase の SQL Editor で `supabase/schema.sql` を実行
4. 開発サーバーを再起動

### Vercel 本番

1. `Project Settings > Environment Variables` を開く
2. 上と同じ 4 つの環境変数を登録
3. 再デプロイする
