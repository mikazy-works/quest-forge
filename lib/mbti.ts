import { QUESTIONS } from "@/lib/questions";
import type { MbtiLetter } from "@/lib/types";

export const MBTI_AXES: readonly [MbtiLetter, MbtiLetter][] = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"]
];

type MbtiProfile = {
  title: string;
  description: string;
};

export const MBTI_PROFILES: Record<string, MbtiProfile> = {
  INTJ: {
    title: "深淵の大戦術家",
    description: "盤面のすべてを見通し、静かに勝利を設計する。誰も気づかぬうちに、詰みまでの手順は完成している。"
  },
  INTP: {
    title: "真理の探究者",
    description: "世界の仕組みを解き明かすことに魂を燃やす。戦いよりも、その魔法が「なぜ発動するのか」が気になるタイプ。"
  },
  ENTJ: {
    title: "覇道の軍師",
    description: "軍勢を率い、最短距離で玉座へ向かう。停滞した会議はあなたの号令で3分で終わる。"
  },
  ENTP: {
    title: "異端の錬金術師",
    description: "常識と常識を混ぜて爆発させる、発想の天才。パーティの禁じ手はだいたいあなたが発明した。"
  },
  INFJ: {
    title: "静寂の預言者",
    description: "言葉は少なく、しかし確かに未来を照らす。仲間の悩みには、本人より先に気づいている。"
  },
  INFP: {
    title: "夢紡ぎの吟遊詩人",
    description: "理想を歌に変えて、仲間の心を守る。世界を救う理由が「みんなに笑ってほしいから」で完結している。"
  },
  ENFJ: {
    title: "導きの聖導師",
    description: "人の可能性を信じ、光の道へ導く。あなたに励まされた新人冒険者は、なぜか全員大成する。"
  },
  ENFP: {
    title: "祝祭の冒険者",
    description: "出会いと偶然を追い風に変える、旅の太陽。初めて訪れた街でも、夕方には友達が10人できている。"
  },
  ISTJ: {
    title: "鉄壁の守人",
    description: "約束と規律を守り抜く、最も信頼される盾。ギルドの納期を一度も破ったことがない伝説を持つ。"
  },
  ISFJ: {
    title: "献身の白盾",
    description: "気づけばいつも、誰かの傷を癒している。回復薬の在庫管理はあなたなしでは回らない。"
  },
  ESTJ: {
    title: "軍団の指揮官",
    description: "秩序と実行力で遠征を必ず成功させる。あなたの立てた行軍計画は、雨の日すら想定済み。"
  },
  ESFJ: {
    title: "団欒の灯守",
    description: "宿営地に温かい火を絶やさない世話役。あなたの作る野営スープでパーティの士気は倍になる。"
  },
  ISTP: {
    title: "孤高の武器職人",
    description: "言葉より腕前で語る、冷静な技巧派。壊れた魔導機関は、あなたが黙って直しておいた。"
  },
  ISFP: {
    title: "森隠れの絵師",
    description: "静かな感性で、世界の美しさを掬い取る。戦利品より、崖の上から見た朝焼けを覚えている。"
  },
  ESTP: {
    title: "疾風の勝負師",
    description: "危険な賭けほど笑って乗りこなす。「行けると思った」が口癖で、実際だいたい行けてしまう。"
  },
  ESFP: {
    title: "舞台の花形",
    description: "その場の全員を主役の気分にさせる華。祝勝会の主役は倒した勇者ではなく、踊るあなただった。"
  }
};

const FALLBACK_PROFILE: MbtiProfile = {
  title: "未知の魂",
  description: "既存の16分類に収まらない、規格外の魂。"
};

type PartnerNpc = {
  npcName: string;
  comment: string;
};

// キーは相棒NPC自身のタイプ。NPCは黄金ペアの相手(E/IとJ/Pを反転したタイプ)にだけ表示される
const PARTNER_NPCS: Record<string, PartnerNpc> = {
  INTJ: {
    npcName: "沈黙の軍師ヴェイル",
    comment:
      "あなたの暴走気味の発明を、最短の勝ち筋に組み込んでくれる。口数は少ないが、あなたの奇策をいちばん面白がっている。"
  },
  INTP: {
    npcName: "禁書庫の魔導学者ノーチェ",
    comment:
      "あなたが号令をかける前に、必要な術式を調べ終えている。進軍の裏付けは、全部この相棒の書庫にある。"
  },
  ENTJ: {
    npcName: "竜騎士団長ガルド",
    comment:
      "あなたの仮説を「面白い、やってみろ」と即断で実戦投入してくれる。考える人と決める人、最強の分業。"
  },
  ENTP: {
    npcName: "爆炎の発明家ピロ",
    comment:
      "あなたの緻密な計画に、誰も予想しない飛び道具を足してくれる。計画の3割は爆発するが、残り7割は伝説になる。"
  },
  INFJ: {
    npcName: "月詠の預言者ルナ",
    comment:
      "あなたが直感で飛び込んだ先の危険を、静かな予知で先回りして払ってくれる。騒いだ夜の帰り道、隣で小さく笑っている。"
  },
  INFP: {
    npcName: "星歌いの吟遊詩人リラ",
    comment:
      "あなたが導いた仲間たちの物語を、歌にして残してくれる。あなたの理想を、いちばん深く分かっている。"
  },
  ENFJ: {
    npcName: "暁の大聖導師セラフ",
    comment:
      "あなたの胸の中の理想を言葉にして、みんなに届けてくれる。あなたの夢は、この相棒の声で世界に広がる。"
  },
  ENFP: {
    npcName: "旅する太陽児ソル",
    comment:
      "あなたの静かな予感を「じゃあ行こう！」と冒険に変えてくれる。あなたが見た未来を、いちばん楽しそうに走ってくれる相棒。"
  },
  ISTJ: {
    npcName: "白銀の門番グラム",
    comment:
      "あなたの無茶な賭けの後ろで、退路と補給を完璧に守っている。「また勝ったのか」とため息をつきつつ、実は毎回楽しみにしている。"
  },
  ISFJ: {
    npcName: "癒し手の白盾ミア",
    comment:
      "舞台で輝くあなたの、衣装のほつれも疲れも見逃さない。あなたが最高の笑顔でいられるのは、この相棒の支度のおかげ。"
  },
  ESTJ: {
    npcName: "遠征団長バルト",
    comment:
      "あなたが黙って直した装備の価値を、正しく評価して報酬に反映してくれる。職人と親方、言葉少なでも通じ合う。"
  },
  ESFJ: {
    npcName: "宿場の名料理人ポム",
    comment:
      "あなたが描いた絵をいちばんいい席に飾って、みんなに自慢してくれる。あなたの感性の、最初のファン。"
  },
  ISTP: {
    npcName: "無口な鍛冶師ロッド",
    comment:
      "あなたの遠征計画に必要な装備を、頼む前に打ち上げている。納期は完璧、文句は一切なし、酒には付き合う。"
  },
  ISFP: {
    npcName: "森の風景画家スイ",
    comment:
      "あなたの宿場の温かさを、絵に残して旅人に伝えてくれる。あなたの何気ない日常が、この相棒には宝物に見えている。"
  },
  ESTP: {
    npcName: "賭場の風雲児ジェット",
    comment:
      "あなたが守り抜いた日常に、ちょうどいい刺激を運んでくる。規律と無謀、なぜか組むと勝率が上がる。"
  },
  ESFP: {
    npcName: "旅一座の看板姫ティア",
    comment:
      "あなたの献身を舞台の上から「うちの誇り！」と叫んでくれる。あなたの陰の働きを、いちばん光の当たる場所で讃える相棒。"
  }
};

const FALLBACK_PARTNER: PartnerNpc = {
  npcName: "名もなき旅人",
  comment: "あなたの旅路のどこかで、必ず出会うことになる相棒。"
};

export function computeMbtiType(answers: number[]): string {
  const tally: Record<MbtiLetter, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  };

  QUESTIONS.forEach((question, questionIndex) => {
    const selectedOption = question.options[answers[questionIndex]];

    if (!selectedOption?.mbti) {
      return;
    }

    Object.entries(selectedOption.mbti).forEach(([letter, value]) => {
      tally[letter as MbtiLetter] += value ?? 0;
    });
  });

  return MBTI_AXES.map(([first, second]) =>
    tally[first] >= tally[second] ? first : second
  ).join("");
}

export function flipMbtiType(type: string): string {
  const flip: Record<string, string> = {
    E: "I",
    I: "E",
    S: "N",
    N: "S",
    T: "F",
    F: "T",
    J: "P",
    P: "J"
  };

  return type
    .split("")
    .map((letter) => flip[letter] ?? letter)
    .join("");
}

export function getMbtiProfile(type: string): MbtiProfile {
  return MBTI_PROFILES[type] ?? FALLBACK_PROFILE;
}

// 黄金ペア方式: E/IとJ/Pを反転し、S/NとT/Fは共有する(ENFP↔INFJなど)。
// 対称なので、相棒タイプの人から見てもこちらが相棒になる
export function derivePartnerType(type: string): string {
  const flip: Record<string, string> = { E: "I", I: "E", J: "P", P: "J" };

  return type
    .split("")
    .map((letter, index) => (index === 0 || index === 3 ? flip[letter] ?? letter : letter))
    .join("");
}

export function getPartnerNpc(partnerType: string): PartnerNpc {
  return PARTNER_NPCS[partnerType] ?? FALLBACK_PARTNER;
}
