import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell hero">
      <div className="container">
        <section className="hero-card">
          <div>
            <span className="eyebrow">Fantasy Diagnosis Terminal</span>
            <h1>
              架空<span className="gradient-text">RPG職業診断</span>
            </h1>
            <p className="lead">
              名前と選択肢をもとに、あなたの戦闘スタイル、属性、レア度、必殺技まで一気に診断。
              シェアできる冒険者カードを生成する、ゲーム風 MVP です。
            </p>
            <div className="button-row">
              <Link className="cta" href="/diagnosis">
                診断を開始する
              </Link>
              <a
                className="secondary-button"
                href="#features"
              >
                できることを見る
              </a>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-card">
              <span className="chip">Result Card Preview</span>
              <h2 className="section-title">星晶の魔導剣士</h2>
              <p className="subtle">
                光属性 / SSR / 前衛と知略を両立する、華やかなフィニッシャー。
              </p>
            </div>
            <div className="hero-art-card">
              <Image
                src="/images/rpg-class-portraits.png"
                alt="架空RPG職業診断の職業ビジュアル一覧"
                width={1536}
                height={1024}
                priority
                className="hero-art-image"
              />
              <div className="hero-art-overlay">
                <span className="chip">Class Artwork</span>
                <p>
                  騎士、魔導士、神官、召喚士などの雰囲気を、ゲーム風アートとして表示。
                </p>
              </div>
            </div>
            <div className="preview-grid" id="features">
              <div className="preview-card">
                <h3>6 Questions</h3>
                <p className="subtle">5問以上の選択式で性格と戦術を判定。</p>
              </div>
              <div className="preview-card">
                <h3>Share URL</h3>
                <p className="subtle">結果ページは URL でそのまま共有可能。</p>
              </div>
              <div className="preview-card">
                <h3>Supabase Save</h3>
                <p className="subtle">診断結果を DB に保存して再表示。</p>
              </div>
              <div className="preview-card">
                <h3>Game UI</h3>
                <p className="subtle">ネオン、カード、少しアニメ風の演出。</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
