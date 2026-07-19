import { NextResponse } from "next/server";
import { diagnoseAdventureProfile } from "@/lib/diagnosis-engine";
import { countRecentDiagnosisResults, createDiagnosisResult } from "@/lib/data";
import { checkDiagnosisRateLimit } from "@/lib/rate-limit";
import { isAllowedOrigin, sanitizeName, validateAnswers } from "@/lib/security";
import { SETUP_ERROR_NAME } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const GLOBAL_WINDOW_MS = 60 * 1000;
const GLOBAL_MAX_PER_WINDOW = 60;

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "許可されていないリクエストです。" }, { status: 403 });
    }

    const rateLimit = checkDiagnosisRateLimit(request);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "短時間の送信回数が多すぎます。少し待ってから再度お試しください。" },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimit.retryAfterMs ?? 0) / 1000))
          }
        }
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? sanitizeName(body.name) : "";
    const answers = body.answers;

    if (!name) {
      return NextResponse.json({ error: "名前を入力してください。" }, { status: 400 });
    }

    if (!validateAnswers(answers)) {
      return NextResponse.json(
        { error: "回答データが不正です。最初からもう一度診断してください。" },
        { status: 400 }
      );
    }

    const recentCount = await countRecentDiagnosisResults(GLOBAL_WINDOW_MS);

    if (recentCount !== null && recentCount >= GLOBAL_MAX_PER_WINDOW) {
      return NextResponse.json(
        { error: "ただいま混み合っています。少し待ってから再度お試しください。" },
        {
          status: 429,
          headers: {
            "Retry-After": "60"
          }
        }
      );
    }

    const diagnosis = diagnoseAdventureProfile(name, answers);
    const saved = await createDiagnosisResult(diagnosis);

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("diagnosis api error:", error);

    // 環境変数未設定の案内だけはデプロイ導線として表示し、それ以外の内部情報は返さない
    const message =
      error instanceof Error && error.name === SETUP_ERROR_NAME
        ? error.message
        : "診断結果の保存に失敗しました。しばらくしてからもう一度お試しください。";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
