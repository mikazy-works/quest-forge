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
    share_url: `/results/${row.id}`
  };
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
    throw new Error(`Supabase 保存エラー: ${error.message}`);
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
    throw new Error(`Supabase 取得エラー: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return toRecord(data as SupabaseRow);
}
