"use client";

import { useState } from "react";

type ShareActionsProps = {
  shareUrl: string;
  title: string;
};

export function ShareActions({ shareUrl, title }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title,
        url: shareUrl
      });
    } catch {
      // Ignore cancelled shares.
    }
  };

  return (
    <div className="button-row share-actions">
      <button type="button" className="cta" onClick={handleCopy}>
        {copied ? "コピーしました" : "URL をコピー"}
      </button>
      <button type="button" className="secondary-button" onClick={handleNativeShare}>
        共有メニューを開く
      </button>
    </div>
  );
}
