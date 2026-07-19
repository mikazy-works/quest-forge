"use client";

import { useState, type ReactNode } from "react";

type RevealGateProps = {
  rarity: string;
  children: ReactNode;
};

const RARITY_LABELS: Record<string, string> = {
  R: "何かの気配がする…",
  SR: "強い気配がする…！",
  SSR: "黄金の気配がする…！！",
  UR: "尋常ではない気配がする…！！！"
};

export function RevealGate({ rarity, children }: RevealGateProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <div className="reveal-entrance">{children}</div>;
  }

  const auraClass = ["R", "SR", "SSR", "UR"].includes(rarity)
    ? ` reveal-card--${rarity.toLowerCase()}`
    : "";

  return (
    <div className="reveal-gate">
      <button
        type="button"
        className={`reveal-card${auraClass}`}
        onClick={() => setRevealed(true)}
      >
        <span className="reveal-mark">？</span>
        <span className="reveal-hint">{RARITY_LABELS[rarity] ?? RARITY_LABELS.R}</span>
        <span className="reveal-cta">タップして開封する</span>
      </button>
    </div>
  );
}
