# 架空RPG職業診断

Next.js App Router + TypeScript + Supabase + Vercel で動く、ロジックベースの RPG 職業診断 MVP です。

## 診断でわかること

- **職業・属性・レア度 (R / SR / SSR / UR)**: 10問の回答から8軸スコアを集計して判定
- **魂のタイプ (MBTI風)**: 外向/内向・感覚/直観・思考/感情・判断/知覚の4軸で16タイプを判定し、「祝祭の冒険者」などRPG風の称号として表示
- **隠しジョブ (UR)**: 特定のスコア条件でのみ出現(魔王の後継者、世界一運のいい村人、奇跡の大聖者、無銘の勇者)
- **最高の相棒**: 魂のタイプの黄金ペア(E/IとJ/Pを反転、S/N・T/Fは共通)から相棒タイプを判定し、16人の相棒NPCキャラ(月詠の預言者ルナなど)を表示。ペアは対称なので、相棒タイプの人から見てもあなたが相棒になる
- **宿敵**: スコアと魂のタイプを反転させた「正反対の好敵手」を自動生成
- **弱点・呪い**: いちばん低いスコアなどから決まるユーモア要素

MBTI風タイプ・宿敵・弱点・呪いは保存済みの回答データから表示時に導出するため、**DBスキーマの変更は不要**で、過去の診断結果にも自動で表示されます。

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
