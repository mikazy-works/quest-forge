import { NextResponse } from "next/server";
import { diagnoseAdventureProfile } from "@/lib/diagnosis-engine";
import { createDiagnosisResult } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const answers = Array.isArray(body.answers) ? body.answers : [];

    if (!name) {
      return NextResponse.json({ error: "名前を入力してください。" }, { status: 400 });
    }

    if (answers.length < 5) {
      return NextResponse.json({ error: "5問以上の回答が必要です。" }, { status: 400 });
    }

    const diagnosis = diagnoseAdventureProfile(name, answers);
    const saved = await createDiagnosisResult(diagnosis);

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存に失敗しました。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
