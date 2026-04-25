import { QUESTIONS } from "@/lib/questions";
import type { DiagnosisRecord, StatBlock } from "@/lib/types";

type ScoreMap = Record<string, number>;

const ELEMENTS = [
  { key: "strength", value: "炎" },
  { key: "intellect", value: "雷" },
  { key: "spirit", value: "光" },
  { key: "chaos", value: "闇" },
  { key: "agility", value: "風" },
  { key: "empathy", value: "水" }
] as const;

function buildBaseScores(): ScoreMap {
  return {
    strength: 0,
    intellect: 0,
    spirit: 0,
    chaos: 0,
    order: 0,
    agility: 0,
    empathy: 0,
    luck: 0
  };
}

function clampStat(value: number) {
  return Math.max(40, Math.min(98, value));
}

function deriveRarity(scores: ScoreMap) {
  const highest = Math.max(...Object.values(scores));
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);

  if (highest >= 10 || total >= 28) {
    return "SSR";
  }

  if (highest >= 8 || total >= 24) {
    return "SR";
  }

  return "R";
}

function deriveElement(scores: ScoreMap) {
  const winner = [...ELEMENTS].sort((a, b) => scores[b.key] - scores[a.key])[0];
  return winner.value;
}

function deriveJobName(scores: ScoreMap) {
  const powerType = scores.strength >= scores.intellect ? "剣" : "魔導";
  const vibe =
    scores.spirit >= scores.chaos
      ? scores.empathy >= scores.agility
        ? "星晶"
        : "天翔"
      : scores.agility >= scores.order
        ? "幻影"
        : "深淵";
  const role =
    scores.order >= scores.chaos
      ? scores.empathy >= scores.strength
        ? "聖導士"
        : "騎装士"
      : scores.agility >= scores.spirit
        ? "遊撃士"
        : "召喚士";

  if (scores.intellect >= 8 && scores.spirit >= 7) {
    return `${vibe}の魔導賢者`;
  }

  if (scores.strength >= 8 && scores.order >= 7) {
    return `${vibe}の守護騎士`;
  }

  if (scores.chaos >= 8 && scores.agility >= 7) {
    return `${vibe}の影疾風`;
  }

  if (scores.empathy >= 8 && scores.spirit >= 7) {
    return `${vibe}の祝祭詠唱師`;
  }

  return `${vibe}${powerType}${role}`;
}

function deriveStats(scores: ScoreMap): StatBlock {
  return {
    HP: clampStat(46 + scores.strength * 4 + scores.order * 2),
    ATK: clampStat(42 + scores.strength * 5 + scores.chaos * 2),
    DEF: clampStat(38 + scores.order * 5 + scores.empathy * 2),
    MAGIC: clampStat(40 + scores.intellect * 5 + scores.spirit * 3),
    SPEED: clampStat(40 + scores.agility * 6 + scores.chaos * 2),
    LUCK: clampStat(35 + scores.luck * 8 + scores.chaos * 2 + scores.spirit)
  };
}

function deriveSpecialMove(jobName: string, element: string, scores: ScoreMap) {
  if (scores.intellect >= scores.strength && scores.spirit >= scores.chaos) {
    return `${element}属性奥義「アストラル・ルーンブレイク」`;
  }

  if (scores.chaos > scores.order) {
    return `${element}属性秘技「ミラージュ・リベリオン」`;
  }

  if (scores.empathy >= 7) {
    return `${element}属性共鳴技「ハーモニック・ブレイブハート」`;
  }

  return `${jobName}奥義「ネオン・ヴァリアント」`;
}

function deriveAdventureStyle(scores: ScoreMap) {
  if (scores.order >= 8) {
    return "王道攻略型。拠点整備と役割分担を固め、安定した攻略ルートを切り開くタイプ。";
  }

  if (scores.chaos >= 8) {
    return "ハイリスク突破型。セオリー外の発想で、停滞した戦況を一気にひっくり返すタイプ。";
  }

  if (scores.intellect >= 8) {
    return "探索考察型。遺跡、魔法、伏線の回収が得意で、未知の領域に強いタイプ。";
  }

  return "仲間成長型。チーム全体の雰囲気と結束を高めながら進む、長期戦に強いタイプ。";
}

function derivePartySynergy(scores: ScoreMap) {
  if (scores.empathy >= 8) {
    return "回復役や防御役と組むと真価を発揮。仲間の長所を引き上げ、全体の完成度を底上げする。";
  }

  if (scores.strength >= 8) {
    return "支援職やバフ役と好相性。強化を受けた瞬間、前線の主役として一気に勝負を決める。";
  }

  if (scores.intellect >= 8) {
    return "高機動アタッカーや索敵役と好相性。情報を処理しながら最適な連携を作れる。";
  }

  return "個性の強い仲間と組むほど面白い。波のあるメンバーを活かして、意外性ある勝ち筋を演出する。";
}

function deriveStory(name: string, jobName: string, element: string, scores: ScoreMap) {
  const temperament =
    scores.spirit >= scores.chaos
      ? "胸の奥に静かな使命感を宿し"
      : "予想外の状況ほど笑って受け入れ";

  return `${name}は${element}属性をまとう${jobName}として覚醒した。${temperament}、
  仲間がためらう一歩先へ踏み込み、崩れかけた戦線を自分の色で塗り替えていく。
  その名はまだ伝説の序章にすぎない。`.replace(/\s+/g, " ");
}

export function diagnoseAdventureProfile(name: string, answers: number[]): DiagnosisRecord {
  const scores = buildBaseScores();

  QUESTIONS.forEach((question, questionIndex) => {
    const selectedOption = question.options[answers[questionIndex]];

    if (!selectedOption) {
      return;
    }

    Object.entries(selectedOption.weights).forEach(([key, value]) => {
      scores[key] = (scores[key] ?? 0) + value;
    });
  });

  const jobName = deriveJobName(scores);
  const element = deriveElement(scores);
  const rarity = deriveRarity(scores);
  const stats = deriveStats(scores);

  return {
    id: "",
    created_at: new Date().toISOString(),
    name,
    job_name: jobName,
    element,
    rarity,
    stats,
    special_move: deriveSpecialMove(jobName, element, scores),
    adventure_style: deriveAdventureStyle(scores),
    party_synergy: derivePartySynergy(scores),
    story: deriveStory(name, jobName, element, scores),
    answers
  };
}
