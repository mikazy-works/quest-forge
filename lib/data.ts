import { deriveExtras } from "@/lib/diagnosis-engine";
import { getSupabaseAdminClient } from "@/lib/supabase";
import type { DiagnosisRecord } from "@/lib/types";

const TABLE_NAME = "diagnosis_results";

type SupabaseRow = {
  id: string;
  created_at: string;
  name: string;
  job_name: string;
  element: string;
  rarity: string;
  stats: DiagnosisRecord["stats"];
  special_move: string;
  adventure_style: string;
  party_synergy: string;
  story: string;
  answers: number[];
};

function toRecord(row: SupabaseRow): DiagnosisRecord {
  return {
    ...row,
    ...deriveExtras(row.answers ?? []),
    share_url: `/results/${row.id}`
  };
}

// インメモリのIP別レート制限はサーバーレス環境でインスタンスごとにリセットされるため、
// DB全体への書き込み量をカウントする最終防衛ライン。集計に失敗した場合は可用性を優先して通す
export async function countRecentDiagnosisResults(windowMs: number) {
  const supabase = getSupabaseAdminClient();
  const since = new Date(Date.now() - windowMs).toISOString();

  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select("id", { count: "exact", head: true })
    .gte("created_at", since);

  if (error) {
    console.error("Supabase count error:", error);
    return null;
  }

  return count ?? 0;
}

export async function createDiagnosisResult(input: DiagnosisRecord) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      name: input.name,
      job_name: input.job_name,
      element: input.element,
      rarity: input.rarity,
      stats: input.stats,
      special_move: input.special_move,
      adventure_style: input.adventure_style,
      party_synergy: input.party_synergy,
      story: input.story,
      answers: input.answers
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error("診断結果の保存に失敗しました。しばらくしてからもう一度お試しください。");
  }

  return toRecord(data as SupabaseRow);
}

export async function getDiagnosisResultById(id: string) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error("診断結果の取得に失敗しました。しばらくしてからもう一度お試しください。");
  }

  if (!data) {
    return null;
  }

  return toRecord(data as SupabaseRow);
}
