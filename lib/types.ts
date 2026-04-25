export type StatBlock = {
  HP: number;
  ATK: number;
  DEF: number;
  MAGIC: number;
  SPEED: number;
  LUCK: number;
};

export type DiagnosisRecord = {
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
};

export type Question = {
  id: string;
  category: string;
  question: string;
  options: QuestionOption[];
};
