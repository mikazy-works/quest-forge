import type { Question } from "@/lib/types";

export const QUESTIONS: Question[] = [
  {
    id: "battle-role",
    category: "Battle Role",
    question: "仲間とダンジョンへ突入。最初に取る行動は？",
    options: [
      {
        title: "先頭に立って敵を引きつける",
        description: "危険を背負ってでも前線を支える。",
        weights: { strength: 3, order: 2, empathy: 1 },
        mbti: { E: 2, J: 1 }
      },
      {
        title: "後方から状況を読み、最適解を探す",
        description: "一歩引いて盤面をコントロールする。",
        weights: { intellect: 3, order: 1, spirit: 1 },
        mbti: { I: 2, T: 2 }
      },
      {
        title: "奇襲ルートを見つけて一気に崩す",
        description: "型にはまらない突破口を作る。",
        weights: { agility: 2, chaos: 3 },
        mbti: { N: 1, P: 2 }
      },
      {
        title: "仲間を強化しつつ安全を確保する",
        description: "チーム全体の安定感を高める。",
        weights: { spirit: 2, empathy: 3, order: 1 },
        mbti: { F: 2, J: 1 }
      }
    ]
  },
  {
    id: "treasure",
    category: "Treasure Sense",
    question: "伝説の宝箱を見つけたとき、いちばん気になるのは？",
    options: [
      {
        title: "中の武具の火力",
        description: "強さに直結する装備こそ正義。",
        weights: { strength: 2, chaos: 1 },
        mbti: { S: 2, T: 1 }
      },
      {
        title: "封印や仕掛けの意味",
        description: "歴史や魔法陣の構造に興味がある。",
        weights: { intellect: 3, spirit: 1 },
        mbti: { N: 2, T: 1 }
      },
      {
        title: "仲間にどう配ると全体が強くなるか",
        description: "最適な編成を自然と考えてしまう。",
        weights: { empathy: 2, order: 2 },
        mbti: { F: 2, J: 1 }
      },
      {
        title: "罠を逆利用できないか",
        description: "危険の中に遊び心を見つける。",
        weights: { chaos: 3, agility: 1 },
        mbti: { N: 2, P: 2 }
      }
    ]
  },
  {
    id: "magic-source",
    category: "Magic Source",
    question: "あなたの力の源にもっとも近いものは？",
    options: [
      {
        title: "努力で鍛えた肉体と技",
        description: "現場で積み上げた実戦経験。",
        weights: { strength: 3, order: 1 },
        mbti: { S: 2, J: 1 }
      },
      {
        title: "知識、研究、術式の理解",
        description: "理屈を積み上げて強くなる。",
        weights: { intellect: 3, order: 1 },
        mbti: { T: 2, N: 1 }
      },
      {
        title: "信念、祈り、心の熱量",
        description: "目に見えない意思の力を信じる。",
        weights: { spirit: 3, empathy: 1 },
        mbti: { F: 2, N: 1 }
      },
      {
        title: "ひらめきと本能",
        description: "勢いと直感が奇跡を呼ぶ。",
        weights: { chaos: 2, agility: 2, luck: 1 },
        mbti: { N: 2, P: 2 }
      }
    ]
  },
  {
    id: "team-position",
    category: "Party Chemistry",
    question: "パーティで自然と任されがちな役割は？",
    options: [
      {
        title: "隊長やまとめ役",
        description: "全体方針を決め、みんなを前に進める。",
        weights: { order: 3, empathy: 1, strength: 1 },
        mbti: { E: 2, J: 2 }
      },
      {
        title: "作戦参謀",
        description: "状況判断と分析で勝率を上げる。",
        weights: { intellect: 3, order: 1 },
        mbti: { I: 1, T: 2 }
      },
      {
        title: "ムードメーカー",
        description: "場を明るくして仲間の心を支える。",
        weights: { empathy: 3, chaos: 1 },
        mbti: { E: 2, F: 2 }
      },
      {
        title: "切り札担当",
        description: "ここぞで流れを変える仕事が似合う。",
        weights: { agility: 2, spirit: 1, chaos: 2 },
        mbti: { I: 1, P: 2 }
      }
    ]
  },
  {
    id: "crisis",
    category: "Crisis Response",
    question: "強敵に追い込まれた終盤、どう逆転する？",
    options: [
      {
        title: "真正面から奥義を叩き込む",
        description: "最後は力で押し切る。",
        weights: { strength: 3, spirit: 1 },
        mbti: { E: 1, S: 2 }
      },
      {
        title: "弱点を見抜いて一撃で崩す",
        description: "観察と計算で勝ち筋を作る。",
        weights: { intellect: 3, agility: 1 },
        mbti: { T: 2, N: 1 }
      },
      {
        title: "仲間を信じて支援に回る",
        description: "全員の能力を底上げして逆転する。",
        weights: { empathy: 2, spirit: 2, order: 1 },
        mbti: { F: 2 }
      },
      {
        title: "予想外の一手で空気ごとひっくり返す",
        description: "常識外れこそ最大の武器。",
        weights: { chaos: 3, agility: 2 },
        mbti: { N: 2, P: 2 }
      }
    ]
  },
  {
    id: "journey",
    category: "Adventure Style",
    question: "理想の冒険にいちばん近いのは？",
    options: [
      {
        title: "王道の英雄譚",
        description: "みんなを守りながら世界を救う。",
        weights: { order: 2, strength: 2, spirit: 1 },
        mbti: { J: 2, S: 1 }
      },
      {
        title: "失われた知識を探す旅",
        description: "世界の真理に触れたい。",
        weights: { intellect: 3, spirit: 1 },
        mbti: { I: 1, N: 2 }
      },
      {
        title: "自由気ままなトレジャーハント",
        description: "刺激と発見があれば最高。",
        weights: { agility: 2, chaos: 2, luck: 1 },
        mbti: { E: 1, P: 2 }
      },
      {
        title: "仲間との絆を深める遠征",
        description: "誰と進むかが何より大事。",
        weights: { empathy: 3, spirit: 1 },
        mbti: { E: 1, F: 2 }
      }
    ]
  },
  {
    id: "victory-night",
    category: "Soul: E / I",
    question: "大きな依頼をやり遂げた夜、あなたはどう過ごす？",
    options: [
      {
        title: "酒場で祝宴を開いて、みんなで騒ぐ",
        description: "喜びは仲間と分かち合ってこそ。",
        weights: { empathy: 2, chaos: 1 },
        mbti: { E: 3 }
      },
      {
        title: "静かな部屋で装備を手入れして休む",
        description: "ひとりの時間で心を整える。",
        weights: { order: 2, intellect: 1 },
        mbti: { I: 3 }
      },
      {
        title: "街の人に土産話をして回る",
        description: "冒険の物語は語ってこそ完成する。",
        weights: { empathy: 2, spirit: 1 },
        mbti: { E: 2, F: 1 }
      },
      {
        title: "ひとりで次の冒険の地図を眺める",
        description: "余韻より、次の景色に心が向かう。",
        weights: { intellect: 2, agility: 1 },
        mbti: { I: 2, N: 1 }
      }
    ]
  },
  {
    id: "ancient-rune",
    category: "Soul: S / N",
    question: "誰も解読できていない古代の魔法陣を発見。最初にすることは？",
    options: [
      {
        title: "紋様をひとつずつ正確に写し取る",
        description: "確かな記録こそ、解読への最短ルート。",
        weights: { order: 2, intellect: 1 },
        mbti: { S: 3 }
      },
      {
        title: "この陣の先にある世界を想像して胸が高鳴る",
        description: "見えないものにこそ、真実が眠っている。",
        weights: { spirit: 2, chaos: 1 },
        mbti: { N: 3 }
      },
      {
        title: "過去に見た魔法陣の記録と照合する",
        description: "積み上げた知識と経験で答えを絞り込む。",
        weights: { intellect: 2, order: 1 },
        mbti: { S: 2, T: 1 }
      },
      {
        title: "直感を信じて、とりあえず起動してみる",
        description: "考えるより先に、手が動いていた。",
        weights: { chaos: 2, luck: 1 },
        mbti: { N: 2, P: 1 }
      }
    ]
  },
  {
    id: "party-loss",
    category: "Soul: T / F",
    question: "仲間のミスで報酬を丸ごと失った。最初にすることは？",
    options: [
      {
        title: "原因を分析して、再発しない仕組みを作る",
        description: "責めるより、同じ失敗を二度させない。",
        weights: { intellect: 2, order: 1 },
        mbti: { T: 3 }
      },
      {
        title: "まず仲間の気持ちに寄り添う",
        description: "いちばん落ち込んでいるのは本人だから。",
        weights: { empathy: 3 },
        mbti: { F: 3 }
      },
      {
        title: "損失を計算して、取り返す作戦を立てる",
        description: "感傷より先に、次の一手を示す。",
        weights: { intellect: 1, order: 2 },
        mbti: { T: 2, J: 1 }
      },
      {
        title: "「全員無事なら大勝利」と笑い飛ばす",
        description: "空気ごと軽くして、前を向かせる。",
        weights: { spirit: 2, empathy: 1 },
        mbti: { F: 2, P: 1 }
      }
    ]
  },
  {
    id: "expedition-eve",
    category: "Soul: J / P",
    question: "明日は大遠征。前日の夜のあなたは？",
    options: [
      {
        title: "荷物と行程を完璧に整えてから眠る",
        description: "準備の質が、冒険の質を決める。",
        weights: { order: 3 },
        mbti: { J: 3 }
      },
      {
        title: "「なんとかなる」と早めに寝る",
        description: "現地で起きることは、現地で決める。",
        weights: { chaos: 1, agility: 1, luck: 1 },
        mbti: { P: 3 }
      },
      {
        title: "予備計画を2パターン用意しておく",
        description: "想定外すら想定しておきたい。",
        weights: { intellect: 2, order: 1 },
        mbti: { J: 2, T: 1 }
      },
      {
        title: "ワクワクしすぎて眠れない",
        description: "冒険は前夜から始まっている。",
        weights: { spirit: 1, agility: 2 },
        mbti: { P: 2, E: 1 }
      }
    ]
  }
];
