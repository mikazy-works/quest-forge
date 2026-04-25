import { DiagnosisWizard } from "@/components/diagnosis-wizard";

export default function DiagnosisPage() {
  return (
    <main className="page-shell app-section">
      <div className="container">
        <div className="glass-card">
          <span className="eyebrow">Adventure Setup</span>
          <h1 className="section-title">冒険者適性を診断しよう</h1>
          <p className="lead">
            名前を入力して、6つの質問に答えるだけ。回答の傾向から、あなたの架空RPG職業をロジックベースで生成します。
          </p>
          <DiagnosisWizard />
        </div>
      </div>
    </main>
  );
}
