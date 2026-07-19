import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Supabase無料プランは約1週間アクセスがないと自動休止するため、
// Vercel Cron(vercel.json)から毎日呼び出して休止タイマーをリセットする
export async function GET(request: Request) {
  // Vercelは環境変数CRON_SECRETが設定されていると "Authorization: Bearer <CRON_SECRET>" を付けて呼び出す
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase
      .from("diagnosis_results")
      .select("id", { count: "exact", head: true })
      .limit(1);

    if (error) {
      console.error("keepalive query error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("keepalive error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
