import Link from "next/link";
import { notFound } from "next/navigation";
import { ResultCard } from "@/components/result-card";
import { getDiagnosisResultById } from "@/lib/data";
import { isValidResultId } from "@/lib/security";

export const dynamic = "force-dynamic";

type ResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  if (!isValidResultId(id)) {
    notFound();
  }

  const result = await getDiagnosisResultById(id);

  if (!result) {
    notFound();
  }

  return (
    <main className="page-shell app-section">
      <div className="container result-layout">
        <ResultCard result={result} />
        <div className="button-row">
          <Link className="cta" href="/diagnosis">
            もう一度診断する
          </Link>
          <Link className="secondary-button" href="/">
            トップに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
