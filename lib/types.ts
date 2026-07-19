export type StatBlock = {
  HP: number;
  ATK: number;
  DEF: number;
  MAGIC: number;
  SPEED: number;
  LUCK: number;
};

export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type MbtiWeights = Partial<Record<MbtiLetter, number>>;

export type DiagnosisExtras = {
  mbti_type: string;
  mbti_title: string;
  mbti_description: string;
  rival_job_name: string;
  rival_element: string;
  rival_mbti_type: string;
  rival_mbti_title: string;
  partner_mbti_type: string;
  partner_mbti_title: string;
  partner_npc_name: string;
  partner_comment: string;
  weakness: string;
  curse: string;
};

export type DiagnosisRecord = DiagnosisExtras & {
  id: string;
  created_at: string;
  name: string;
  job_name: string;
  element: string;
  rarity: string;
  stats: StatBlock;
  special_move: string;
  adventure_style: string;
  party_synergy: string;
  story: string;
  answers: number[];
  share_url?: string;
};

export type QuestionOption = {
  title: string;
  description: string;
  weights: Record<string, number>;
  mbti?: MbtiWeights;
};

export type Question = {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
};
