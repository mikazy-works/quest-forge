import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const DEFAULT_RETENTION_DAYS = 30;

function getRetentionDays() {
  const raw = Number(process.env.RESULT_RETENTION_DAYS);

  if (!Number.isFinite(raw) || raw < 1) {
    return DEFAULT_RETENTION_DAYS;
  }

  return Math.floor(raw);
}

// Vercel Cron(vercel.json)から毎日呼び出される日次メンテナンス。
// 1. DBへのアクセスでSupabase無料プランの自動休止タイマーをリセット(キープアライブ)
// 2. 保存期間を過ぎた診断結果を削除してデータ肥大を防止
export async function GET(request: Request) {
  // Vercelは環境変数CRON_SECRETが設定されていると "Authorization: Bearer <CRON_SECRET>" を付けて呼び出す
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const retentionDays = getRetentionDays();
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();

    const { count, error } = await supabase
      .from("diagnosis_results")
      .delete({ count: "exact" })
      .lt("created_at", cutoff);

    if (error) {
      console.error("keepalive cleanup error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      retention_days: retentionDays,
      deleted: count ?? 0
    });
  } catch (error) {
    console.error("keepalive error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
