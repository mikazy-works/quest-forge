import { NextResponse } from "next/server";
import { getDiagnosisResultById } from "@/lib/data";
import { isValidResultId } from "@/lib/security";

export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;

    if (!isValidResultId(id)) {
      return NextResponse.json({ error: "結果IDの形式が不正です。" }, { status: 400 });
    }

    const result = await getDiagnosisResultById(id);

    if (!result) {
      return NextResponse.json({ error: "結果が見つかりません。" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("results api error:", error);

    return NextResponse.json(
      { error: "診断結果の取得に失敗しました。しばらくしてからもう一度お試しください。" },
      { status: 500 }
    );
  }
}
