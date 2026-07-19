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
