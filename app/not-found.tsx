import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="page-shell center-shell">
      <div className="container">
        <div className="glass-card">
          <span className="eyebrow">Result Not Found</span>
          <h1 className="section-title">この冒険者カードは見つかりませんでした</h1>
          <p className="lead">
            URL が間違っているか、まだ結果が保存されていない可能性があります。
          </p>
          <div className="button-row">
            <Link className="cta" href="/diagnosis">
              診断を始める
            </Link>
            <Link className="secondary-button" href="/">
              トップへ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
