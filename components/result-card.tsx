import { JobPortrait } from "@/components/job-portrait";
import { ShareActions } from "@/components/share-actions";
import type { DiagnosisRecord } from "@/lib/types";

type ResultCardProps = {
  result: DiagnosisRecord;
};

export function ResultCard({ result }: ResultCardProps) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "");
  const sharePath = result.share_url ?? `/results/${result.id}`;
  const shareUrl = siteUrl ? `${siteUrl}${sharePath}` : sharePath;
  return (
    <article className="result-card">
      <div className="result-header">
        <div>
          <span className="eyebrow">Adventurer Result</span>
          <h1 className="result-title">{result.job_name}</h1>
          <p className="lead">
            {result.name} の冒険者適性は <strong>{result.job_name}</strong>。戦場での振る舞いと価値観から導かれた職業です。
          </p>
        </div>
        <div className="result-meta">
          <span className="meta-pill">属性: {result.element}</span>
          <span className="meta-pill">レア度: {result.rarity}</span>
          <span className="meta-pill">共有ID: {result.id.slice(0, 8)}</span>
        </div>
      </div>

      <div className="result-hero-grid">
        <section className="portrait-panel">
          <div className="portrait-orb">
            <JobPortrait jobName={result.job_name} element={result.element} />
          </div>
          <p className="subtle portrait-copy">
            属性と職業タイプに応じて自動生成される、ゲーム風の職業ビジュアルです。
          </p>
        </section>

        <section className="panel">
          <h3>共有 URL</h3>
          <p className="share-url">{shareUrl}</p>
          <ShareActions shareUrl={shareUrl} title={`${result.name}の診断結果`} />
          <p className="subtle">
            この URL をそのまま共有すると、同じ結果カードを開けます。
          </p>
        </section>
      </div>

      <div className="stats-grid">
        <section className="panel">
          <h3>ステータス</h3>
          <div className="stat-list">
            {Object.entries(result.stats).map(([label, value]) => (
              <div className="stat-row" key={label}>
                <div className="stat-label">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="stat-track">
                  <div className="stat-fill" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>必殺技</h3>
          <p>{result.special_move}</p>
          <h4>冒険タイプ</h4>
          <p>{result.adventure_style}</p>
          <h4>仲間との相性</h4>
          <p>{result.party_synergy}</p>
        </section>
      </div>

      <div className="detail-grid">
        <section className="panel">
          <h4>診断名</h4>
          <p>{result.name}</p>
        </section>
        <section className="panel">
          <h4>属性と希少度</h4>
          <p>
            {result.element}属性 / {result.rarity}
          </p>
        </section>
        <section className="panel">
          <h4>保存日時</h4>
          <p>{new Date(result.created_at).toLocaleString("ja-JP")}</p>
        </section>
      </div>

      <section className="story-panel">
        <h3>ショートストーリー</h3>
        <p>{result.story}</p>
      </section>
    </article>
  );
}
