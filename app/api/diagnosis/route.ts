import { NextResponse } from "next/server";
import { diagnoseAdventureProfile } from "@/lib/diagnosis-engine";
import { createDiagnosisResult } from "@/lib/data";
import { isAllowedOrigin, sanitizeName, validateAnswers } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: "許可されていないリクエストです。" }, { status: 403 });
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

    const diagnosis = diagnoseAdventureProfile(name, answers);
    const saved = await createDiagnosisResult(diagnosis);

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "診断結果の保存に失敗しました。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
