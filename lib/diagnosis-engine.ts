import { QUESTIONS } from "@/lib/questions";
import { computeMbtiType, flipMbtiType, getMbtiProfile } from "@/lib/mbti";
import type { DiagnosisExtras, DiagnosisRecord, StatBlock } from "@/lib/types";

type ScoreMap = Record<string, number>;

const ELEMENTS = [
  { key: "strength", value: "炎" },
  { key: "intellect", value: "雷" },
  { key: "spirit", value: "光" },
  { key: "chaos", value: "闇" },
  { key: "agility", value: "風" },
  { key: "empathy", value: "水" }
] as const;

const CORE_KEYS = [
  "strength",
  "intellect",
  "spirit",
  "chaos",
  "order",
  "agility",
  "empathy"
] as const;

type HiddenJob = {
  name: string;
  specialMove: (element: string) => string;
  storyLine: string;
};

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

function computeScores(answers: number[]): ScoreMap {
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

  return scores;
}

function clampStat(value: number) {
  return Math.max(40, Math.min(98, Math.round(value)));
}

function deriveRarity(scores: ScoreMap) {
  const highest = Math.max(...Object.values(scores));
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);

  if (highest >= 14 || total >= 42) {
    return "SSR";
  }

  if (highest >= 11 || total >= 41) {
    return "SR";
  }

  return "R";
}

function deriveElement(scores: ScoreMap) {
  const winner = [...ELEMENTS].sort((a, b) => scores[b.key] - scores[a.key])[0];
  return winner.value;
}

function deriveHiddenJob(scores: ScoreMap): HiddenJob | null {
  if (scores.chaos >= 14 && scores.order <= 4) {
    return {
      name: "魔王の後継者",
      specialMove: (element) => `${element}属性禁呪「カタストロフ・ノヴァ」`,
      storyLine: "その混沌の魂に、封じられていた魔王の玉座が勝手に反応し始めている。"
    };
  }

  if (scores.luck >= 4) {
    return {
      name: "世界一運のいい村人",
      specialMove: (element) => `${element}属性天恵「ミラクル・ジャックポット」`,
      storyLine: "剣も魔法も並のはずが、なぜか歩いた道の後ろで奇跡だけが起き続けている。"
    };
  }

  if (scores.empathy >= 14 && scores.spirit >= 10) {
    return {
      name: "奇跡の大聖者",
      specialMove: (element) => `${element}属性秘蹟「セイント・レクイエム」`,
      storyLine: "その祈りは戦場の空気ごと浄化し、敵すら涙して剣を置くという。"
    };
  }

  const coreValues = CORE_KEYS.map((key) => scores[key]);
  const coreMax = Math.max(...coreValues);
  const coreMin = Math.min(...coreValues);

  if (coreMin >= 4 && coreMax - coreMin <= 2) {
    return {
      name: "無銘の勇者",
      specialMove: (element) => `${element}属性真伝「ブレイブ・オリジン」`,
      storyLine: "何にも突出せず、何にも欠けない。伝説の勇者の素質とは、まさにこの均衡を指す。"
    };
  }

  return null;
}

function deriveJobName(scores: ScoreMap) {
  const powerType = scores.strength >= scores.intellect ? "剣" : "魔導";
  const vibe =
    scores.spirit >= scores.chaos
      ? scores.empathy >= scores.agility + 2
        ? "星晶"
        : "天翔"
      : scores.agility >= scores.order
        ? "幻影"
        : "深淵";
  const role =
    scores.order >= scores.chaos
      ? scores.empathy >= scores.strength + 3
        ? "聖導士"
        : "騎装士"
      : scores.agility >= scores.spirit
        ? "遊撃士"
        : "召喚士";

  if (scores.intellect >= 12 && scores.spirit >= 8) {
    return `${vibe}の魔導賢者`;
  }

  if (scores.strength >= 10 && scores.order >= 8) {
    return `${vibe}の守護騎士`;
  }

  if (scores.chaos >= 10 && scores.agility >= 8) {
    return `${vibe}の影疾風`;
  }

  if (scores.empathy >= 10 && scores.spirit >= 8) {
    return `${vibe}の祝祭詠唱師`;
  }

  return `${vibe}${powerType}${role}`;
}

function deriveStats(scores: ScoreMap): StatBlock {
  return {
    HP: clampStat(44 + scores.strength * 3 + scores.order),
    ATK: clampStat(40 + scores.strength * 3 + scores.chaos),
    DEF: clampStat(40 + scores.order * 3 + scores.empathy),
    MAGIC: clampStat(38 + scores.intellect * 2 + scores.spirit),
    SPEED: clampStat(40 + scores.agility * 3 + scores.chaos),
    LUCK: clampStat(34 + scores.luck * 8 + scores.chaos + scores.spirit)
  };
}

function deriveSpecialMove(jobName: string, element: string, scores: ScoreMap) {
  if (scores.intellect >= scores.strength && scores.spirit >= scores.chaos) {
    return `${element}属性奥義「アストラル・ルーンブレイク」`;
  }

  if (scores.chaos > scores.order) {
    return `${element}属性秘技「ミラージュ・リベリオン」`;
  }

  if (scores.empathy >= 10) {
    return `${element}属性共鳴技「ハーモニック・ブレイブハート」`;
  }

  return `${jobName}奥義「ネオン・ヴァリアント」`;
}

function deriveAdventureStyle(scores: ScoreMap) {
  if (scores.order >= 12) {
    return "王道攻略型。拠点整備と役割分担を固め、安定した攻略ルートを切り開くタイプ。";
  }

  if (scores.chaos >= 12) {
    return "ハイリスク突破型。セオリー外の発想で、停滞した戦況を一気にひっくり返すタイプ。";
  }

  if (scores.intellect >= 14) {
    return "探索考察型。遺跡、魔法、伏線の回収が得意で、未知の領域に強いタイプ。";
  }

  return "仲間成長型。チーム全体の雰囲気と結束を高めながら進む、長期戦に強いタイプ。";
}

function derivePartySynergy(scores: ScoreMap) {
  if (scores.empathy >= 12) {
    return "回復役や防御役と組むと真価を発揮。仲間の長所を引き上げ、全体の完成度を底上げする。";
  }

  if (scores.strength >= 10) {
    return "支援職やバフ役と好相性。強化を受けた瞬間、前線の主役として一気に勝負を決める。";
  }

  if (scores.intellect >= 14) {
    return "高機動アタッカーや索敵役と好相性。情報を処理しながら最適な連携を作れる。";
  }

  return "個性の強い仲間と組むほど面白い。波のあるメンバーを活かして、意外性ある勝ち筋を演出する。";
}

function deriveWeakness(scores: ScoreMap) {
  const weaknessMap: Record<(typeof CORE_KEYS)[number], string> = {
    strength: "重い扉が開けられず、毎回さりげなく仲間を呼ぶ。腕相撲の戦績は非公開。",
    intellect: "地図が読めない。ダンジョンで3回に1回は「近道」と言いながら迷子になる。",
    spirit: "怖い話を聞いた夜は、宿屋のランプを消せなくなる。",
    chaos: "真面目すぎて、宴会の無礼講が本気でわからない。羽目の外し方を本で調べたことがある。",
    order: "片付けが苦手で、アイテム袋の底からいつか買った薬草が3束出てくる。",
    agility: "朝が絶望的に弱い。集合時間に間に合った遠征のほうが少ない。",
    empathy: "照れると素直になれず、感謝の言葉がいつも3日遅れで届く。"
  };

  const lowestKey = CORE_KEYS.reduce((lowest, key) =>
    scores[key] < scores[lowest] ? key : lowest
  );

  return weaknessMap[lowestKey];
}

function deriveCurse(scores: ScoreMap) {
  if (scores.luck <= 0) {
    return "開けた宝箱の中身が、だいたい薬草になる呪い。";
  }

  if (scores.chaos >= 12) {
    return "静かに歩こうとするほど、なぜか物音が大きくなる呪い。";
  }

  if (scores.order >= 12) {
    return "旅先でも装備を全部並べ直さないと眠れない呪い。";
  }

  if (scores.empathy >= 12) {
    return "もらい泣きが早すぎて、感動の場面でいちばん先に泣いてしまう呪い。";
  }

  return "ここぞという場面の決め台詞を、だいたい噛む呪い。";
}

function deriveRivalScores(scores: ScoreMap): ScoreMap {
  const highest = Math.max(...CORE_KEYS.map((key) => scores[key]), 1);
  const inverted: ScoreMap = buildBaseScores();

  Object.keys(inverted).forEach((key) => {
    inverted[key] = Math.max(0, highest - (scores[key] ?? 0));
  });

  return inverted;
}

export function deriveExtras(answers: number[]): DiagnosisExtras {
  const scores = computeScores(answers);
  const mbtiType = computeMbtiType(answers);
  const mbtiProfile = getMbtiProfile(mbtiType);
  const rivalMbtiType = flipMbtiType(mbtiType);
  const rivalMbtiProfile = getMbtiProfile(rivalMbtiType);
  const rivalScores = deriveRivalScores(scores);

  return {
    mbti_type: mbtiType,
    mbti_title: mbtiProfile.title,
    mbti_description: mbtiProfile.description,
    rival_job_name: deriveJobName(rivalScores),
    rival_element: deriveElement(rivalScores),
    rival_mbti_type: rivalMbtiType,
    rival_mbti_title: rivalMbtiProfile.title,
    weakness: deriveWeakness(scores),
    curse: deriveCurse(scores)
  };
}

function deriveStory(
  name: string,
  jobName: string,
  element: string,
  mbtiTitle: string,
  scores: ScoreMap,
  hiddenJob: HiddenJob | null
) {
  const temperament =
    scores.spirit >= scores.chaos
      ? "胸の奥に静かな使命感を宿し"
      : "予想外の状況ほど笑って受け入れ";
  const hiddenLine = hiddenJob ? ` ${hiddenJob.storyLine}` : "";

  return `${name}は${element}属性をまとう${jobName}として覚醒した。その魂は「${mbtiTitle}」の相を帯びている。${temperament}、
  仲間がためらう一歩先へ踏み込み、崩れかけた戦線を自分の色で塗り替えていく。${hiddenLine}
  その名はまだ伝説の序章にすぎない。`.replace(/\s+/g, " ");
}

export function diagnoseAdventureProfile(name: string, answers: number[]): DiagnosisRecord {
  const scores = computeScores(answers);
  const extras = deriveExtras(answers);

  const hiddenJob = deriveHiddenJob(scores);
  const jobName = hiddenJob ? hiddenJob.name : deriveJobName(scores);
  const element = deriveElement(scores);
  const rarity = hiddenJob ? "UR" : deriveRarity(scores);
  const stats = deriveStats(scores);
  const specialMove = hiddenJob
    ? hiddenJob.specialMove(element)
    : deriveSpecialMove(jobName, element, scores);

  return {
    id: "",
    created_at: new Date().toISOString(),
    name,
    job_name: jobName,
    element,
    rarity,
    stats,
    special_move: specialMove,
    adventure_style: deriveAdventureStyle(scores),
    party_synergy: derivePartySynergy(scores),
    story: deriveStory(name, jobName, element, extras.mbti_title, scores, hiddenJob),
    answers,
    ...extras
  };
}
